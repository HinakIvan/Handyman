/**
 * Site-wide lightweight translation layer. The UI language is stored as
 * handyman-language (de/en/ru), which is also used by the navigation.
 * Exact text matching is intentional: dynamic values and user-submitted data
 * are not rewritten unless a complete matching translation exists.
 */
let activeDictionary: Record<string, string> | null = null;
let observer: MutationObserver | null = null;
const ORIGINAL_TEXT = new WeakMap<Text, string>();
const ORIGINAL_ATTR = new WeakMap<Element, Record<string, string>>();

function translateTextNode(node: Text, dict: Record<string, string>) {
  const current = node.textContent ?? '';
  if (!ORIGINAL_TEXT.has(node)) ORIGINAL_TEXT.set(node, current);
  const original = ORIGINAL_TEXT.get(node) ?? current;
  const trimmed = original.trim();
  if (!trimmed || trimmed.length < 2) return;
  const translated = dict[trimmed];
  let nextText = original;
  if (translated && translated !== trimmed) {
    const leading = original.match(/^\s*/)?.[0] ?? '';
    const trailing = original.match(/\s*$/)?.[0] ?? '';
    nextText = `${leading}${translated}${trailing}`;
  } else if (activeDictionary !== null) {
    // No matching translation: preserve the original text without rewriting it.
    return;
  }

  // Important: writing the same text still emits a MutationObserver event in
  // some browsers. Avoid re-triggering this observer indefinitely.
  if (node.textContent !== nextText) node.textContent = nextText;
}

function translateTree(root: Node, dict: Record<string, string>) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) translateTextNode(node as Text, dict);
  const element = root instanceof Element ? root : root === document ? document.documentElement : null;
  if (!element) return;
  const selector = '[placeholder], [aria-label], [title], [alt]';
  const elements = [ ...(element.matches?.(selector) ? [element] : []), ...Array.from(element.querySelectorAll(selector)) ];
  for (const el of elements) {
    if (!ORIGINAL_ATTR.has(el)) {
      const originals: Record<string, string> = {};
      for (const attr of ['placeholder', 'aria-label', 'title', 'alt']) {
        const value = el.getAttribute(attr); if (value !== null) originals[attr] = value;
      }
      ORIGINAL_ATTR.set(el, originals);
    }
    const originals = ORIGINAL_ATTR.get(el)!;
    for (const attr of ['placeholder', 'aria-label', 'title', 'alt']) {
      const original = originals[attr]; if (original === undefined) continue;
      el.setAttribute(attr, dict[original] || original);
    }
  }
}

async function loadDictionary(locale: string): Promise<Record<string, string>> {
  if (locale === 'en') return {};
  try {
    const base = (window as any).__dynamic_base__ || '';
    const response = await fetch(`${base}/i18n/${locale}.json`, { cache: 'no-cache' });
    if (!response.ok) return {};
    const data = await response.json();
    return data && typeof data === 'object' ? data as Record<string, string> : {};
  } catch { return {}; }
}

export async function initI18n(locale?: string) {
  if (observer) { observer.disconnect(); observer = null; }
  const rawSelected = (locale || localStorage.getItem('handyman-language') || 'de').toLowerCase().split('-')[0];
  const selected = ['de', 'en', 'ru'].includes(rawSelected) ? rawSelected : 'de';
  const dict = await loadDictionary(selected);
  activeDictionary = Object.keys(dict).length ? dict : null;
  document.documentElement.setAttribute('lang', selected === 'de' ? 'de-AT' : selected);
  translateTree(document.documentElement, dict);
  observer = new MutationObserver(records => {
    const current = activeDictionary || {};
    for (const record of records) {
      if (record.type === 'childList') record.addedNodes.forEach(n => {
        if (n.nodeType === Node.TEXT_NODE) translateTextNode(n as Text, current);
        else if (n.nodeType === Node.ELEMENT_NODE) translateTree(n, current);
      });
      else if (record.type === 'characterData') translateTextNode(record.target as Text, current);
    }
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
}

if (typeof window !== 'undefined') {
  (window as any).__i18n = initI18n;
  (window as any).__switchLocale = (locale: string) => {
    const code = (locale || 'de').toLowerCase().split('-')[0];
    if (!['de', 'en', 'ru'].includes(code)) return;
    try { localStorage.setItem('handyman-language', code); } catch { /* storage may be unavailable */ }
    location.reload();
  };
  const boot = () => { void initI18n(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
}
