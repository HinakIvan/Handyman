/**
 * Lightweight runtime translations for the existing English source UI.
 * Dictionaries in /public/i18n are keyed by the original English text.
 * Language changes are serialized so a slow earlier request cannot override
 * a later user selection.
 */
let activeDictionary: Record<string, string> = {};
let observer: MutationObserver | null = null;
let requestVersion = 0;
let applyingTranslations = false;
const ORIGINAL_TEXT = new WeakMap<Text, string>();
const ORIGINAL_ATTR = new WeakMap<Element, Record<string, string>>();

function originalText(node: Text): string {
  if (!ORIGINAL_TEXT.has(node)) ORIGINAL_TEXT.set(node, node.textContent ?? '');
  return ORIGINAL_TEXT.get(node) ?? '';
}

function translateTextNode(node: Text, dict: Record<string, string>) {
  const original = originalText(node);
  const trimmed = original.trim();
  if (!trimmed || trimmed.length < 2) return;
  const translated = dict[trimmed];
  const leading = original.match(/^\s*/)?.[0] ?? '';
  const trailing = original.match(/\s*$/)?.[0] ?? '';
  const nextText = translated ? `${leading}${translated}${trailing}` : original;
  if (node.textContent !== nextText) node.textContent = nextText;
}

function translateTree(root: Node, dict: Record<string, string>) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) translateTextNode(node as Text, dict);

  const element = root instanceof Element ? root : root === document ? document.documentElement : null;
  if (!element) return;
  const selector = '[placeholder], [aria-label], [title], [alt]';
  const elements = [
    ...(element.matches?.(selector) ? [element] : []),
    ...Array.from(element.querySelectorAll(selector)),
  ];
  for (const el of elements) {
    if (!ORIGINAL_ATTR.has(el)) {
      const originals: Record<string, string> = {};
      for (const attr of ['placeholder', 'aria-label', 'title', 'alt']) {
        const value = el.getAttribute(attr);
        if (value !== null) originals[attr] = value;
      }
      ORIGINAL_ATTR.set(el, originals);
    }
    const originals = ORIGINAL_ATTR.get(el)!;
    for (const attr of ['placeholder', 'aria-label', 'title', 'alt']) {
      const original = originals[attr];
      if (original === undefined) continue;
      const translated = dict[original];
      const nextValue = translated || original;
      if (el.getAttribute(attr) !== nextValue) el.setAttribute(attr, nextValue);
    }
  }
}

async function loadDictionary(locale: string): Promise<Record<string, string>> {
  if (locale === 'en') return {};
  try {
    const base = (window as any).__dynamic_base__ || '';
    const response = await fetch(`${base}/i18n/${locale}.json`, { cache: 'no-store' });
    if (!response.ok) {
      console.error(`[i18n] Could not load ${locale} dictionary: HTTP ${response.status}`);
      return {};
    }
    const data = await response.json();
    return data && typeof data === 'object' && !Array.isArray(data)
      ? data as Record<string, string>
      : {};
  } catch (error) {
    console.error(`[i18n] Could not load ${locale} dictionary`, error);
    return {};
  }
}

export async function initI18n(locale?: string) {
  const selected = (locale || (() => {
    try { return localStorage.getItem('handyman-language') || 'de'; }
    catch { return 'de'; }
  })()).toLowerCase().split('-')[0];
  const normalized = ['de', 'en', 'ru'].includes(selected) ? selected : 'de';
  const version = ++requestVersion;

  // Do not let an older, slower fetch replace the most recently selected locale.
  const dict = await loadDictionary(normalized);
  if (version !== requestVersion) return;

  if (observer) { observer.disconnect(); observer = null; }
  activeDictionary = dict;
  applyingTranslations = true;
  document.documentElement.setAttribute('lang', normalized === 'de' ? 'de-AT' : normalized);
  translateTree(document.documentElement, activeDictionary);
  applyingTranslations = false;

  observer = new MutationObserver(records => {
    if (applyingTranslations) return;
    applyingTranslations = true;
    for (const record of records) {
      if (record.type === 'childList') {
        record.addedNodes.forEach(added => {
          if (added.nodeType === Node.TEXT_NODE) translateTextNode(added as Text, activeDictionary);
          else if (added.nodeType === Node.ELEMENT_NODE) translateTree(added, activeDictionary);
        });
      } else if (record.type === 'characterData') {
        translateTextNode(record.target as Text, activeDictionary);
      }
    }
    applyingTranslations = false;
  });
  if (document.body) observer.observe(document.body, { childList: true, subtree: true, characterData: true });
}

if (typeof window !== 'undefined') {
  (window as any).__i18n = initI18n;
  (window as any).__switchLocale = (locale: string) => {
    const code = (locale || 'de').toLowerCase().split('-')[0];
    if (!['de', 'en', 'ru'].includes(code)) return;
    try { localStorage.setItem('handyman-language', code); } catch { /* ignore */ }
    window.dispatchEvent(new CustomEvent('handyman-language-change', { detail: code }));
    void initI18n(code);
  };
  const boot = () => { void initI18n(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
}
