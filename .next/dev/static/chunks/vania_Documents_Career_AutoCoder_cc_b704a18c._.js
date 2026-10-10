(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/vania/Documents/Career/AutoCoder.cc/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "closeExternalLinkPopup",
    ()=>closeExternalLinkPopup,
    "cn",
    ()=>cn,
    "isExternalLinkPopup",
    ()=>isExternalLinkPopup,
    "onExternalLinkMessage",
    ()=>onExternalLinkMessage,
    "openExternalLink",
    ()=>openExternalLink,
    "openExternalLinkAsync",
    ()=>openExternalLinkAsync
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$3$2e$7$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/tailwind-merge@3.7.0/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
// 扩展 tailwind-merge，让自定义 fontSize 类不和颜色类冲突
const twMerge = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$tailwind$2d$merge$40$3$2e$7$2e$0$2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["extendTailwindMerge"])({
    extend: {
        classGroups: {
            // 把自定义字号类归到 'font-size' 组，和颜色类 'text-color' 分开
            'font-size': [
                'text-display',
                'text-h1',
                'text-h2',
                'text-h3',
                'text-h4',
                'text-base',
                'text-sm-body',
                'text-caption'
            ]
        }
    }
});
function cn(...inputs) {
    return twMerge((0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$clsx$40$2$2e$1$2e$1$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
// ─── External Link Helpers (Popup Mode) ──────────────────────────────
//
// Opens external URLs (OAuth, payment) in a centered popup window.
// The popup keeps window.opener, so the callback page can use
// postMessage to notify the original page and window.close() to
// close itself.
//
// Fallback: if popup is blocked (e.g., sandboxed iframe without
// allow-popups), navigates the top-level window or current page.
// ─────────────────────────────────────────────────────────────────────
const POPUP_MESSAGE_SOURCE = 'external-link-popup';
/** Calculate centered popup position. */ function getPopupFeatures() {
    const w = Math.round(screen.width / 3);
    const h = Math.round(screen.height * 0.75);
    const left = Math.round((screen.width - w) / 2);
    const top = Math.round((screen.height - h) / 2);
    return `width=${w},height=${h},left=${left},top=${top},scrollbars=yes,resizable=yes`;
}
/** Navigate away as a last resort (tries top-level first, then current page). */ function navigateAway(url) {
    try {
        if (window.top && window.top !== window) {
            window.top.location.href = url;
            return;
        }
    } catch  {}
    window.location.href = url;
}
function openExternalLink(url) {
    if (!url) return null;
    const w = window.open(url, 'external-link', getPopupFeatures());
    if (!w) {
        navigateAway(url);
        return null;
    }
    return w;
}
function openExternalLinkAsync(getUrl, options = {}) {
    // Open popup immediately in the user-gesture call stack
    const w = window.open('about:blank', 'external-link', getPopupFeatures());
    if (!w) {
        // Popup blocked — fallback: navigate away after async resolves
        getUrl().then((url)=>{
            options.onNavigate?.(url);
            navigateAway(url);
        }).catch((error)=>{
            options.onError?.(error);
        });
        return null;
    }
    // Show a loading state in the popup
    try {
        w.document.title = 'Redirecting...';
        w.document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:system-ui,sans-serif;color:#666;">' + '<p>Redirecting...</p></div>';
    } catch  {}
    getUrl().then((url)=>{
        options.onNavigate?.(url);
        w.location.href = url;
    }).catch((error)=>{
        try {
            w.close();
        } catch  {}
        options.onError?.(error);
    });
    return w;
}
function isExternalLinkPopup() {
    try {
        return !!window.opener;
    } catch  {
        return false;
    }
}
function closeExternalLinkPopup(data) {
    try {
        if (window.opener && data) {
            window.opener.postMessage({
                source: POPUP_MESSAGE_SOURCE,
                ...data
            }, '*');
        }
    } catch  {}
    // Small delay to ensure postMessage is delivered before closing
    setTimeout(()=>{
        try {
            window.close();
        } catch  {}
    }, 300);
}
function onExternalLinkMessage(callback) {
    const handler = (event)=>{
        if (!event.data || event.data.source !== POPUP_MESSAGE_SOURCE) return;
        callback(event.data);
    };
    window.addEventListener('message', handler);
    return ()=>window.removeEventListener('message', handler);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$slot$40$1$2e$4$2e$0_$40$types$2b$react$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/@radix-ui+react-slot@1.4.0_@types+react@19.3.0_react@19.3.0/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$class$2d$variance$2d$authority$40$0$2e$7$2e$1$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/class-variance-authority@0.7.1/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/lib/utils.ts [app-client] (ecmascript)");
'use client';
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$class$2d$variance$2d$authority$40$0$2e$7$2e$1$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0", {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90',
            destructive: 'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
            outline: 'border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground',
            secondary: 'bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80',
            ghost: 'hover:bg-accent hover:text-accent-foreground',
            link: 'text-primary underline-offset-4 hover:underline'
        },
        size: {
            default: 'h-9 px-4 py-2',
            sm: 'h-8 rounded-md px-3 text-xs',
            lg: 'h-10 rounded-md px-8',
            icon: 'h-9 w-9'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, variant, size, asChild = false, ...props }, ref)=>{
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$slot$40$1$2e$4$2e$0_$40$types$2b$react$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : 'button';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/button.tsx",
        lineNumber: 45,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Button;
Button.displayName = 'Button';
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button$React.forwardRef");
__turbopack_context__.k.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/vania/Documents/Career/AutoCoder.cc/src/assets/GRoud404SVG.svg (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/GRoud404SVG.0a97865a.svg");}),
"[project]/vania/Documents/Career/AutoCoder.cc/src/assets/GRoud404SVG.svg.mjs { IMAGE => \"[project]/vania/Documents/Career/AutoCoder.cc/src/assets/GRoud404SVG.svg (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$assets$2f$GRoud404SVG$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/assets/GRoud404SVG.svg (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$assets$2f$GRoud404SVG$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 319,
    height: 250,
    blurWidth: 0,
    blurHeight: 0
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/vania/Documents/Career/AutoCoder.cc/app/not-found.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RootNotFound
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$assets$2f$GRoud404SVG$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$assets$2f$GRoud404SVG$2e$svg__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/vania/Documents/Career/AutoCoder.cc/src/assets/GRoud404SVG.svg.mjs { IMAGE => "[project]/vania/Documents/Career/AutoCoder.cc/src/assets/GRoud404SVG.svg (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function RootNotFound() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const timer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleTargetHome = ()=>{
        router.replace('/apphome');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-screen h-screen flex items-center justify-center relative bg-white",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-2 items-center left-2/4 top-2/4 justify-center w-screen h-screen  absolute rootNotFound transition-opacity duration-300 opacity-0",
            style: {
                transform: 'translate(-50%, -50%)'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-full max-w-[600px] h-[400px] md:h-[500px] lg:h-[600px]",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$assets$2f$GRoud404SVG$2e$svg$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$assets$2f$GRoud404SVG$2e$svg__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"],
                        alt: "404 illustration",
                        fill: true,
                        className: "object-contain",
                        sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 600px",
                        onLoad: ()=>{
                            if ("TURBOPACK compile-time truthy", 1) {
                                const target = document.querySelector('.rootNotFound');
                                if (target) {
                                    target.style.opacity = '1';
                                }
                                timer.current = setTimeout(()=>{
                                    handleTargetHome();
                                    if (timer.current) {
                                        clearTimeout(timer.current);
                                    }
                                }, 5000);
                            }
                        }
                    }, void 0, false, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/not-found.tsx",
                        lineNumber: 22,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/not-found.tsx",
                    lineNumber: 21,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[56px] font-bold",
                    children: "404"
                }, void 0, false, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/not-found.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-[14px]",
                    children: "The page you're looking for doesn't exist"
                }, void 0, false, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/not-found.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                    className: "cursor-pointer pointer-events-auto mt-4 text-[#fff] !border-[#02160F] !bg-[#02160F] hover:!border-[#02160F] hover:!text-[#fff] focus:!outline-none focus:!border-[#02160F] hover:opacity-85",
                    onClick: handleTargetHome,
                    children: "Back to Homepage"
                }, void 0, false, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/not-found.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/not-found.tsx",
            lineNumber: 17,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/not-found.tsx",
        lineNumber: 16,
        columnNumber: 5
    }, this);
}
_s(RootNotFound, "eqJhDsymzOy8O7+Hc0u3y2cPDac=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = RootNotFound;
var _c;
__turbopack_context__.k.register(_c, "RootNotFound");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=vania_Documents_Career_AutoCoder_cc_b704a18c._.js.map