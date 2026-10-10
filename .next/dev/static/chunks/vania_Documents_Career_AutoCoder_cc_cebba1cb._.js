(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/vania/Documents/Career/AutoCoder.cc/src/utils/serializer.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "deserialize",
    ()=>deserialize,
    "serialize",
    ()=>serialize
]);
/**
 * 自定义序列化/反序列化工具
 * 替代 superjson，支持 Date、BigInt、Set、Map、undefined、NaN、Infinity、RegExp 等特殊类型
 */ // 特殊类型的标记
const TYPE_MARKERS = {
    DATE: '__DATE__',
    BIGINT: '__BIGINT__',
    SET: '__SET__',
    MAP: '__MAP__',
    UNDEFINED: '__UNDEFINED__',
    NAN: '__NAN__',
    INFINITY: '__INFINITY__',
    NEGATIVE_INFINITY: '__NEGATIVE_INFINITY__',
    REGEXP: '__REGEXP__'
};
/**
 * 序列化值，将特殊类型转换为 JSON 兼容格式
 */ function serializeValue(value, path = '', meta = {}) {
    // 处理 null
    if (value === null) {
        return null;
    }
    // 处理 undefined
    if (value === undefined) {
        const metaKey = path || 'root';
        meta[metaKey] = TYPE_MARKERS.UNDEFINED;
        return null;
    }
    // 处理 Date
    if (value instanceof Date) {
        const metaKey = path || 'root';
        meta[metaKey] = TYPE_MARKERS.DATE;
        return value.toISOString();
    }
    // 处理 BigInt
    if (typeof value === 'bigint') {
        const metaKey = path || 'root';
        meta[metaKey] = TYPE_MARKERS.BIGINT;
        return value.toString();
    }
    // 处理 NaN
    if (Number.isNaN(value)) {
        const metaKey = path || 'root';
        meta[metaKey] = TYPE_MARKERS.NAN;
        return null;
    }
    // 处理 Infinity
    if (value === Infinity) {
        const metaKey = path || 'root';
        meta[metaKey] = TYPE_MARKERS.INFINITY;
        return null;
    }
    // 处理 -Infinity
    if (value === -Infinity) {
        const metaKey = path || 'root';
        meta[metaKey] = TYPE_MARKERS.NEGATIVE_INFINITY;
        return null;
    }
    // 处理 RegExp
    if (value instanceof RegExp) {
        const metaKey = path || 'root';
        meta[metaKey] = TYPE_MARKERS.REGEXP;
        return {
            source: value.source,
            flags: value.flags
        };
    }
    // 处理 Set
    if (value instanceof Set) {
        const metaKey = path || 'root';
        meta[metaKey] = TYPE_MARKERS.SET;
        const items = [];
        let index = 0;
        value.forEach((item)=>{
            const itemPath = path ? `${path}.${index}` : String(index);
            items.push(serializeValue(item, itemPath, meta));
            index++;
        });
        return items;
    }
    // 处理 Map
    if (value instanceof Map) {
        const metaKey = path || 'root';
        meta[metaKey] = TYPE_MARKERS.MAP;
        const entries = [];
        let index = 0;
        value.forEach((val, key)=>{
            const keyPath = path ? `${path}.k${index}` : `k${index}`;
            const valPath = path ? `${path}.v${index}` : `v${index}`;
            entries.push([
                serializeValue(key, keyPath, meta),
                serializeValue(val, valPath, meta)
            ]);
            index++;
        });
        return entries;
    }
    // 处理数组
    if (Array.isArray(value)) {
        return value.map((item, index)=>{
            const itemPath = path ? `${path}.${index}` : String(index);
            return serializeValue(item, itemPath, meta);
        });
    }
    // 处理对象
    if (typeof value === 'object') {
        const result = {};
        for(const key in value){
            if (Object.prototype.hasOwnProperty.call(value, key)) {
                const propPath = path ? `${path}.${key}` : key;
                result[key] = serializeValue(value[key], propPath, meta);
            }
        }
        return result;
    }
    // 基本类型直接返回
    return value;
}
/**
 * 反序列化值，将 JSON 格式恢复为特殊类型
 */ function deserializeValue(value, path = '', meta = {}) {
    const metaKey = path || 'root';
    const typeMarker = meta[metaKey];
    // 根据类型标记恢复特殊类型
    if (typeMarker === TYPE_MARKERS.DATE) {
        return new Date(value);
    }
    if (typeMarker === TYPE_MARKERS.BIGINT) {
        return BigInt(value);
    }
    if (typeMarker === TYPE_MARKERS.UNDEFINED) {
        return undefined;
    }
    if (typeMarker === TYPE_MARKERS.NAN) {
        return NaN;
    }
    if (typeMarker === TYPE_MARKERS.INFINITY) {
        return Infinity;
    }
    if (typeMarker === TYPE_MARKERS.NEGATIVE_INFINITY) {
        return -Infinity;
    }
    if (typeMarker === TYPE_MARKERS.REGEXP) {
        return new RegExp(value.source, value.flags);
    }
    if (typeMarker === TYPE_MARKERS.SET) {
        if (!Array.isArray(value)) {
            return new Set();
        }
        const set = new Set();
        value.forEach((item, index)=>{
            const itemPath = path ? `${path}.${index}` : String(index);
            set.add(deserializeValue(item, itemPath, meta));
        });
        return set;
    }
    if (typeMarker === TYPE_MARKERS.MAP) {
        if (!Array.isArray(value)) {
            return new Map();
        }
        const map = new Map();
        value.forEach((entry, index)=>{
            const keyPath = path ? `${path}.k${index}` : `k${index}`;
            const valPath = path ? `${path}.v${index}` : `v${index}`;
            const key = deserializeValue(entry[0], keyPath, meta);
            const val = deserializeValue(entry[1], valPath, meta);
            map.set(key, val);
        });
        return map;
    }
    // 处理数组
    if (Array.isArray(value)) {
        return value.map((item, index)=>{
            const itemPath = path ? `${path}.${index}` : String(index);
            return deserializeValue(item, itemPath, meta);
        });
    }
    // 处理对象
    if (value !== null && typeof value === 'object') {
        const result = {};
        for(const key in value){
            if (Object.prototype.hasOwnProperty.call(value, key)) {
                const propPath = path ? `${path}.${key}` : key;
                result[key] = deserializeValue(value[key], propPath, meta);
            }
        }
        return result;
    }
    // 基本类型直接返回
    return value;
}
function serialize(value) {
    const meta = {};
    const json = serializeValue(value, '', meta);
    return {
        json,
        meta: Object.keys(meta).length > 0 ? {
            values: meta
        } : undefined
    };
}
function deserialize(serialized) {
    // 处理 null、undefined 或基本类型
    if (serialized === null || serialized === undefined || typeof serialized !== 'object') {
        return serialized;
    }
    // 如果已经是序列化后的格式（有 json 字段）
    if ('json' in serialized) {
        const { json, meta } = serialized;
        const metaValues = meta?.values || {};
        return deserializeValue(json, '', metaValues);
    }
    // 如果传入的是普通对象（可能是数组或其他对象），尝试递归反序列化
    // 这种情况可能是从 JSON.parse 得到的，但没有包装成 { json, meta } 格式
    // 为了兼容性，我们尝试递归处理
    return deserializeValue(serialized, '', {});
}
/**
 * 默认导出，提供与 superjson 兼容的 API
 */ const serializer = {
    serialize,
    deserialize
};
const __TURBOPACK__default__export__ = serializer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/vania/Documents/Career/AutoCoder.cc/src/tools/FrontendSession.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserSession",
    ()=>UserSession,
    "useUserSession",
    ()=>useUserSession
]);
// 前台 Session Store
// 使用方法: import { useUserSession } from '@/tools/FrontendSession';
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$storeFactory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/tools/storeFactory.ts [app-client] (ecmascript)");
;
class UserSession {
    token;
    user_id;
    email;
    full_name;
    role;
    constructor(){
        this.token = '';
        this.user_id = '';
        this.email = '';
        this.full_name = '';
        this.role = 'CUSTOMER';
    }
}
const useUserSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$storeFactory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPersistStore"])('UserSession', {
    token: '',
    user_id: '',
    email: '',
    full_name: '',
    role: 'CUSTOMER'
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/auth/rpc-auth.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthExpiredDialog",
    ()=>AuthExpiredDialog,
    "clearAuth",
    ()=>clearAuth,
    "getToken",
    ()=>getToken,
    "handleUnauthorized",
    ()=>handleUnauthorized,
    "useAuthDialog",
    ()=>useAuthDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$FrontendSession$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/tools/FrontendSession.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$15_$40$types$2b$react$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_use$2d$sync$2d$external$2d$store$40$1$2e$7$2e$0_react$40$19$2e$3$2e$0_$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/zustand@5.0.15_@types+react@19.3.0_react@19.3.0_use-sync-external-store@1.7.0_react@19.3.0_/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
// 登录路由
const LOGIN_ROUTE = '/customerlogin';
const useAuthDialog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$15_$40$types$2b$react$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_use$2d$sync$2d$external$2d$store$40$1$2e$7$2e$0_react$40$19$2e$3$2e$0_$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set)=>({
        isOpen: false,
        open: ()=>set({
                isOpen: true
            }),
        close: ()=>set({
                isOpen: false
            })
    }));
function getToken() {
    const session = __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$FrontendSession$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserSession"].getState();
    return session.token || null;
}
function clearAuth() {
    __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$FrontendSession$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserSession"].getState().reset();
}
function handleUnauthorized() {
    clearAuth();
    // 已经在登录页，不弹窗（用 includes 兼容 basePath 和尾部斜杠）
    if (("TURBOPACK compile-time value", "object") !== 'undefined' && window.location.pathname.includes(LOGIN_ROUTE)) {
        return;
    }
    useAuthDialog.getState().open();
}
function AuthExpiredDialog() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isOpen, close } = useAuthDialog();
    const handleLogin = ()=>{
        close();
        router.push(LOGIN_ROUTE);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: isOpen,
        onOpenChange: close,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "fixed bottom-4 right-4 left-auto top-auto translate-x-0 translate-y-0 bg-card text-card-foreground border border-border shadow-elevated rounded-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            className: "text-foreground",
                            children: "Session Expired"
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/auth/rpc-auth.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                            className: "text-muted-foreground",
                            children: "Authentication is required or your session has expired. You can sign in with a demo account to continue."
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/auth/rpc-auth.tsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/auth/rpc-auth.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                    className: "gap-2 sm:gap-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            onClick: close,
                            className: "border-border text-foreground hover:bg-muted",
                            children: "Maybe Later"
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/auth/rpc-auth.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: handleLogin,
                            className: "bg-primary text-primary-foreground hover:opacity-90",
                            children: "Go to Login"
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/auth/rpc-auth.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/auth/rpc-auth.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/auth/rpc-auth.tsx",
            lineNumber: 72,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/auth/rpc-auth.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
_s(AuthExpiredDialog, "W1piogVTI5m3VL8VA/XJqc1ifYA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        useAuthDialog
    ];
});
_c = AuthExpiredDialog;
var _c;
__turbopack_context__.k.register(_c, "AuthExpiredDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/vania/Documents/Career/AutoCoder.cc/src/app/auth/rpc-auth.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthExpiredDialog",
    ()=>AuthExpiredDialog,
    "clearAuth",
    ()=>clearAuth,
    "getToken",
    ()=>getToken,
    "handleUnauthorized",
    ()=>handleUnauthorized,
    "useAuthDialog",
    ()=>useAuthDialog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$FrontendSession$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/tools/FrontendSession.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dialog$40$1$2e$2$2e$0_$40$types$2b$react$2d$dom$40$19$2e$3$2e$0_$40$types$2b$react$40$19$2e$3$2e$0_$5f40$types$2b$react$40$_c1edb718822a6de77ff35d62c5110ee0$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/@radix-ui+react-dialog@1.2.0_@types+react-dom@19.3.0_@types+react@19.3.0__@types+react@_c1edb718822a6de77ff35d62c5110ee0/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/lib/utils.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/dialog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$15_$40$types$2b$react$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_use$2d$sync$2d$external$2d$store$40$1$2e$7$2e$0_react$40$19$2e$3$2e$0_$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/zustand@5.0.15_@types+react@19.3.0_react@19.3.0_use-sync-external-store@1.7.0_react@19.3.0_/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
// 登录路由
const LOGIN_ROUTE = '/applogin';
const useAuthDialog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$15_$40$types$2b$react$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_use$2d$sync$2d$external$2d$store$40$1$2e$7$2e$0_react$40$19$2e$3$2e$0_$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set)=>({
        isOpen: false,
        open: ()=>set({
                isOpen: true
            }),
        close: ()=>set({
                isOpen: false
            })
    }));
function getToken() {
    const session = __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$FrontendSession$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserSession"].getState();
    return session.token || null;
}
function clearAuth() {
    __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$FrontendSession$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserSession"].getState().reset();
}
function handleUnauthorized() {
    clearAuth();
    useAuthDialog.getState().open();
}
function AuthExpiredDialog() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isOpen, close } = useAuthDialog();
    const handleLogin = ()=>{
        close();
        setTimeout(()=>{
            router.push(LOGIN_ROUTE);
        }, 0);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dialog"], {
        open: isOpen,
        onOpenChange: close,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogOverlay"], {
                className: "absolute bg-black/40"
            }, void 0, false, {
                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/app/auth/rpc-auth.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dialog$40$1$2e$2$2e$0_$40$types$2b$react$2d$dom$40$19$2e$3$2e$0_$40$types$2b$react$40$19$2e$3$2e$0_$5f40$types$2b$react$40$_c1edb718822a6de77ff35d62c5110ee0$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("absolute bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-lg border z-50 p-6 shadow-lg duration-200", "bottom-4 left-1/2 -translate-x-1/2"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogHeader"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                children: "初始化登录账号"
                            }, void 0, false, {
                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/app/auth/rpc-auth.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogDescription"], {
                                children: "您可以先登录测试账号进行功能体验。"
                            }, void 0, false, {
                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/app/auth/rpc-auth.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/app/auth/rpc-auth.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DialogFooter"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                onClick: close,
                                children: "稍后再说"
                            }, void 0, false, {
                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/app/auth/rpc-auth.tsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                onClick: handleLogin,
                                children: "去登录"
                            }, void 0, false, {
                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/app/auth/rpc-auth.tsx",
                                lineNumber: 83,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/app/auth/rpc-auth.tsx",
                        lineNumber: 79,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/app/auth/rpc-auth.tsx",
                lineNumber: 67,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/app/auth/rpc-auth.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
_s(AuthExpiredDialog, "W1piogVTI5m3VL8VA/XJqc1ifYA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        useAuthDialog
    ];
});
_c = AuthExpiredDialog;
var _c;
__turbopack_context__.k.register(_c, "AuthExpiredDialog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/vania/Documents/Career/AutoCoder.cc/src/tools/AppSession.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAppUserSession",
    ()=>useAppUserSession
]);
// 无需登录
// 使用方法: import { useAppUserSession } from '@/tools/AppSession';
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$storeFactory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/tools/storeFactory.ts [app-client] (ecmascript)");
;
const useAppUserSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$storeFactory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createPersistStore"])('AppUserSession', {});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/vania/Documents/Career/AutoCoder.cc/src/tools/rpc-client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rpcCall",
    ()=>rpcCall
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$utils$2f$serializer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/utils/serializer.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$8_$40$types$2b$react$40$19$2e$3$2e$0_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/sonner@2.0.8_@types+react@19.3.0_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
// 同时 import 前后台和 app 的 rpc-auth
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$frontend$2f$auth$2f$rpc$2d$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/auth/rpc-auth.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$backend$2f$auth$2f$rpc$2d$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/backend/auth/rpc-auth.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$app$2f$auth$2f$rpc$2d$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/app/auth/rpc-auth.tsx [app-client] (ecmascript)");
// 导入前端和 app 的 session store 用于同步 role
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$FrontendSession$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/tools/FrontendSession.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$AppSession$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/tools/AppSession.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$BackendSession$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/tools/BackendSession.tsx [app-client] (ecmascript)");
;
;
;
;
;
;
;
;
// 动态获取 PROJECT_ID 和 API_URL
// 优先从 window.__dynamic_base__ 获取（生产环境），否则用环境变量
const getApiUrl = ()=>{
    return `http://localhost:3100/rpc/PROJ_b23df7b6_snap_20261010_124454_705`;
};
// 请求去重：相同 actionName+args 的并发请求共享同一个 Promise
const pendingRequests = new Map();
// 连续短间隔请求检测：只按 actionName 统计，不把参数变化当成新接口
const FAST_GAP_MS = 200;
const FAST_GAP_LIMIT = 5;
const CIRCUIT_BREAK_MS = 60_000;
const RPC_CIRCUIT_OPEN_MESSAGE = 'RPC action temporarily blocked after repeated rapid requests';
const rpcActionStates = new Map();
function getRpcActionState(actionName) {
    let state = rpcActionStates.get(actionName);
    if (!state) {
        state = {
            inFlight: 0,
            lastFinishedAt: null,
            fastGapCount: 0,
            blockedUntil: 0
        };
        rpcActionStates.set(actionName, state);
    }
    return state;
}
function beginRpcAction(actionName) {
    const state = getRpcActionState(actionName);
    const now = Date.now();
    if (state.blockedUntil > now) {
        throw new Error(RPC_CIRCUIT_OPEN_MESSAGE);
    }
    if (state.blockedUntil > 0) {
        state.blockedUntil = 0;
        state.lastFinishedAt = null;
        state.fastGapCount = 0;
    }
    // 并发请求不属于“结束后立刻再发”的串行模式，打断当前连续计数。
    if (state.inFlight > 0) {
        state.fastGapCount = 0;
    } else if (state.lastFinishedAt !== null) {
        const gap = now - state.lastFinishedAt;
        state.fastGapCount = gap < FAST_GAP_MS ? state.fastGapCount + 1 : 0;
        if (state.fastGapCount >= FAST_GAP_LIMIT) {
            // 第 5 个短间隔命中时，当前调用直接熔断，不发送网络请求。
            state.blockedUntil = now + CIRCUIT_BREAK_MS;
            throw new Error(RPC_CIRCUIT_OPEN_MESSAGE);
        }
    }
    state.inFlight += 1;
    let released = false;
    return ()=>{
        if (released) return;
        released = true;
        state.inFlight -= 1;
        if (state.inFlight === 0) {
            state.lastFinishedAt = Date.now();
        }
    };
}
// Common error messages
const ERROR_MESSAGES = {
    UNAUTHORIZED: 'Please login',
    FORBIDDEN: 'Permission denied',
    NOT_FOUND: 'Resource not found',
    SERVER_ERROR: 'Server is taking a break, please try again later',
    OPERATION_FAILED: 'Operation failed'
};
// 根据 actionName 判断使用哪个 rpc-auth（和 bundled-entry.ts 逻辑一致）
function getRpcAuthModule(actionName) {
    // actionName 格式: "src.frontend.actions.xxx" 或 "src.backend.actions.xxx" 或 "src.app.actions.xxx"
    // 注意：app/(backend)/ 目录下的 action 生成的 actionName 格式为 "app.backend.xxx"，
    // 必须优先匹配 .backend.，否则会被 startsWith('app.') 错误路由到 appRpcAuth
    if (actionName.includes('.frontend.') || actionName.startsWith('frontend.')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$frontend$2f$auth$2f$rpc$2d$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__;
    }
    if (actionName.includes('.backend.') || actionName.startsWith('backend.')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$backend$2f$auth$2f$rpc$2d$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__;
    }
    if (actionName.includes('.app.') || actionName.startsWith('app.')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$app$2f$auth$2f$rpc$2d$auth$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__;
    }
}
// 根据 actionName 从对应 platform 的 session store 获取当前用户角色
function getCurrentRole(actionName) {
    try {
        if (actionName.includes('.frontend.') || actionName.startsWith('frontend.')) {
            const session = __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$FrontendSession$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserSession"].getState();
            return session.role ?? undefined;
        }
        if (actionName.includes('.backend.') || actionName.startsWith('backend.')) {
            const session = __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$BackendSession$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdminSession"].getState();
            return session.role ?? undefined;
        }
        if (actionName.includes('.app.') || actionName.startsWith('app.')) {
            const session = __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$AppSession$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppUserSession"].getState();
            return session.role ?? undefined;
        }
    } catch  {}
    return undefined;
}
async function rpcCall(actionName, ...args) {
    const rpcAuth = getRpcAuthModule(actionName);
    const token = rpcAuth.getToken();
    // 请求去重：相同请求并发时复用同一个 Promise
    const dedupeKey = `${actionName}:${JSON.stringify(args)}`;
    if (pendingRequests.has(dedupeKey)) {
        return pendingRequests.get(dedupeKey);
    }
    const finishRpcAction = beginRpcAction(actionName);
    const request = (async ()=>{
        try {
            const apiUrl = getApiUrl();
            const fetchOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Timezone-Offset': String(new Date().getTimezoneOffset()),
                    ...token ? {
                        'Authorization': `Bearer ${token}`
                    } : {},
                    // 把当前用户 ID 明文传给后端，供 Agent 诊断时使用（从 JWT payload 解析）
                    ...token ? (()=>{
                        try {
                            const payload = JSON.parse(atob(token.split('.')[1]));
                            return payload.userId ? {
                                'X-User-Id': String(payload.userId)
                            } : {};
                        } catch  {
                            return {};
                        }
                    })() : {},
                    // 把当前用户角色传给后端，供 Agent 诊断时使用（从 session store 读取）
                    ...(()=>{
                        const role = getCurrentRole(actionName);
                        return role ? {
                            'X-User-Role': String(role)
                        } : {};
                    })(),
                    // Pipeline test 数据库隔离：vitest 运行时注入 VITEST_PIPELINE_PAGE 环境变量
                    ...typeof __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"] !== 'undefined' && __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.VITEST_PIPELINE_PAGE ? {
                        'X-Pipeline-Test': '1',
                        'X-Pipeline-Page': __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.VITEST_PIPELINE_PAGE
                    } : {}
                },
                body: JSON.stringify({
                    actionName,
                    args: __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$utils$2f$serializer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].serialize(args)
                })
            };
            let resp = await fetch(apiUrl, fetchOptions);
            // 503 服务过载：延迟 0.5 秒重试 1 次，失败就放弃
            if (resp.status === 503) {
                await new Promise((r)=>setTimeout(r, 500));
                resp = await fetch(apiUrl, fetchOptions);
                if (resp.status === 503) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$8_$40$types$2b$react$40$19$2e$3$2e$0_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(ERROR_MESSAGES.SERVER_ERROR);
                    throw new Error(ERROR_MESSAGES.SERVER_ERROR);
                }
            }
            // 401 统一拦截
            if (resp.status === 401) {
                // 该分支会返回永不 resolve 的 Promise，HTTP 请求结束后需单独释放检测状态。
                finishRpcAction();
                rpcAuth.handleUnauthorized();
                __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$8_$40$types$2b$react$40$19$2e$3$2e$0_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error('Please login first', {
                    id: 'auth-401'
                });
                // 不 throw，返回一个永远不 resolve 的 Promise
                // 这样上层 catch 不会触发，避免重复 toast
                return new Promise(()=>{});
            }
            // 403 权限不足
            if (resp.status === 403) {
                const data = await resp.json();
                const errorMsg = data.error ?? ERROR_MESSAGES.FORBIDDEN;
                __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$8_$40$types$2b$react$40$19$2e$3$2e$0_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(errorMsg);
                throw new Error(errorMsg);
            }
            // 404 资源不存在
            if (resp.status === 404) {
                throw new Error(ERROR_MESSAGES.NOT_FOUND);
            }
            if (!resp.ok) {
                const errorData = await resp.json().catch(()=>({}));
                const errorMsg = errorData.error || ERROR_MESSAGES.SERVER_ERROR;
                __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$8_$40$types$2b$react$40$19$2e$3$2e$0_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(errorMsg);
                throw new Error(errorMsg);
            }
            // 检查后端返回的最新 role，如果与前端 session 不同则自动同步
            // 这解决了角色变更（如审核通过）后前端 session 不同步的问题
            const serverRole = resp.headers.get('X-Auth-Role');
            if (serverRole) {
                const isFrontend = actionName.includes('.frontend.');
                const isApp = actionName.includes('.app.');
                if (isFrontend) {
                    const session = __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$FrontendSession$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserSession"].getState();
                    if (session.role !== undefined && String(session.role) !== serverRole) {
                        try {
                            const parsed = JSON.parse(serverRole);
                            __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$FrontendSession$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserSession"].setState({
                                role: parsed
                            });
                        } catch  {
                            __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$FrontendSession$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useUserSession"].setState({
                                role: serverRole
                            });
                        }
                    }
                } else if (isApp) {
                    const session = __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$AppSession$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppUserSession"].getState();
                    if (session.role !== undefined && String(session.role) !== serverRole) {
                        try {
                            const parsed = JSON.parse(serverRole);
                            __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$AppSession$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppUserSession"].setState({
                                role: parsed
                            });
                        } catch  {
                            __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$AppSession$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppUserSession"].setState({
                                role: serverRole
                            });
                        }
                    }
                }
            }
            const rawData = await resp.json();
            // 先 serializer 反序列化
            const data = __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$utils$2f$serializer$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deserialize(rawData);
            // 直接返回反序列化后的数据
            // 注意：withResult 没有包装成 { success, data } 格式，直接返回业务数据
            return data;
        } finally{
            finishRpcAction();
            pendingRequests.delete(dedupeKey);
        }
    })();
    pendingRequests.set(dedupeKey, request);
    return request;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/vania/Documents/Career/AutoCoder.cc/lib/rpc-generated/src/backend/actions/AdminLogin.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getAuditTelemetry",
    ()=>getAuditTelemetry,
    "loginAdmin",
    ()=>loginAdmin
]);
/* Auto-generated */ var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$rpc$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/tools/rpc-client.ts [app-client] (ecmascript)");
;
const loginAdmin = (...args)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$rpc$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rpcCall"])("src.backend.actions.AdminLogin.loginAdmin", ...args);
const getAuditTelemetry = (...args)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$rpc$2d$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["rpcCall"])("src.backend.actions.AdminLogin.getAuditTelemetry", ...args);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminHeader.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminHeader
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/building-2.js [app-client] (ecmascript) <export default as Building2>");
"use client";
;
;
function AdminHeader() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center text-center gap-3",
        "data-api-unique-id": "adminheader-r9f1da8698273243d-s205640045",
        "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminHeader",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative flex items-center justify-center w-14 h-14 rounded-xl bg-accent text-accent-foreground shadow-soft",
                "data-api-unique-id": "adminheader-rec5b2387d190b2e1-s205640045",
                "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminHeader",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"], {
                        className: "w-7 h-7 text-accent-foreground",
                        "data-api-unique-id": "adminheader-rdb222996f0772d81-s205640045",
                        "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminHeader"
                    }, void 0, false, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminHeader.tsx",
                        lineNumber: 9,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground border-2 border-card",
                        "data-api-unique-id": "adminheader-r13a65f4081f4c5a1-s205640045",
                        "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminHeader",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                            className: "w-3 h-3",
                            "data-api-unique-id": "adminheader-r2025b66826a7a8cc-s205640045",
                            "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminHeader"
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminHeader.tsx",
                            lineNumber: 11,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminHeader.tsx",
                        lineNumber: 10,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminHeader.tsx",
                lineNumber: 8,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-1",
                "data-api-unique-id": "adminheader-rbbf2d30fec2203f7-s205640045",
                "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminHeader",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground border border-border",
                        "data-api-unique-id": "adminheader-r05d8209eda235204-s205640045",
                        "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminHeader",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                className: "w-3 h-3 text-primary",
                                "data-api-unique-id": "adminheader-r2767e76eb0e75215-s205640045",
                                "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminHeader"
                            }, void 0, false, {
                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminHeader.tsx",
                                lineNumber: 17,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "data-api-unique-id": "adminheader-rd0174590752b1eaa-s205640045",
                                "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminHeader",
                                children: "Vienna Handwerk Leitstelle"
                            }, void 0, false, {
                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminHeader.tsx",
                                lineNumber: 18,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "w-1 h-1 rounded-full bg-border",
                                "data-api-unique-id": "adminheader-rf54b7842276fc624-s205640045",
                                "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminHeader"
                            }, void 0, false, {
                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminHeader.tsx",
                                lineNumber: 19,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-primary font-semibold",
                                "data-api-unique-id": "adminheader-r13776a9d3007c10b-s205640045",
                                "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminHeader",
                                children: "1010 Wien"
                            }, void 0, false, {
                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminHeader.tsx",
                                lineNumber: 20,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminHeader.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-2xl font-bold font-display tracking-tight text-card-foreground",
                        "data-api-unique-id": "adminheader-r8bb8767bf8c4e44a-s205640045",
                        "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminHeader",
                        children: "Betriebsportal Anmeldung"
                    }, void 0, false, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminHeader.tsx",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-xs text-muted-foreground font-body max-w-[340px]",
                        "data-api-unique-id": "adminheader-rf3feaa97c13f1308-s205640045",
                        "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminHeader",
                        children: "Operations Portal Access & Dispatch Control Center. Restricted for authenticated administrative staff."
                    }, void 0, false, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminHeader.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminHeader.tsx",
                lineNumber: 15,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminHeader.tsx",
        lineNumber: 6,
        columnNumber: 10
    }, this);
}
_c = AdminHeader;
var _c;
__turbopack_context__.k.register(_c, "AdminHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
const Input = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = ({ className, type, ...props }, ref)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        ref: ref,
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/input.tsx",
        lineNumber: 10,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Input;
Input.displayName = "Input";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Input$React.forwardRef");
__turbopack_context__.k.register(_c1, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/vania/Documents/Career/AutoCoder.cc/src/backend/route-params.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Backend Route Parameters and Navigation Utilities
 * Handyman Portal Administrative Operations Platform
 */ __turbopack_context__.s([
    "AdminCategoriesRates",
    ()=>AdminCategoriesRates,
    "AdminComplianceChecklist",
    ()=>AdminComplianceChecklist,
    "AdminLogin",
    ()=>AdminLogin,
    "AdminOperationsDashboard",
    ()=>AdminOperationsDashboard,
    "AdminQuoteDetail",
    ()=>AdminQuoteDetail,
    "AdminRegister",
    ()=>AdminRegister,
    "BackendRoutes",
    ()=>BackendRoutes,
    "NAVIGATION_MAP",
    ()=>NAVIGATION_MAP,
    "PAGE_ID_MAP",
    ()=>PAGE_ID_MAP,
    "getRouteContextText",
    ()=>getRouteContextText
]);
function buildUrl(path, params) {
    const sp = new URLSearchParams();
    Object.entries(params).forEach(([k, v])=>{
        if (v) sp.set(k, v);
    });
    const query = sp.toString();
    return query ? `${path}?${query}` : path;
}
const AdminOperationsDashboard = {
    id: 'B01',
    path: '/adminoperationsdashboard',
    paramsMeta: {},
    getParams: (_sp)=>({}),
    navigateTo: (router)=>router.push(AdminOperationsDashboard.path)
};
const AdminQuoteDetail = {
    id: 'B02',
    path: '/adminquotedetail',
    paramsMeta: {
        quoteRequestId: {
            source_table: 'QuoteRequest',
            source_column: 'id',
            description: '来自 QuoteRequest 表的主键 id，非 trackingCode 或 customerId'
        }
    },
    getParams: (()=>{
        const cache = new WeakMap();
        return (sp)=>{
            if (cache.has(sp)) return cache.get(sp);
            const result = {
                quoteRequestId: sp.get('quoteRequestId') || ''
            };
            cache.set(sp, result);
            return result;
        };
    })(),
    navigateTo: (router, params)=>router.push(buildUrl(AdminQuoteDetail.path, params)),
    navigateToDetail: (router, params)=>router.push(buildUrl(AdminQuoteDetail.path, params))
};
const AdminCategoriesRates = {
    id: 'B03',
    path: '/admincategoriesrates',
    paramsMeta: {},
    getParams: (_sp)=>({}),
    navigateTo: (router)=>router.push(AdminCategoriesRates.path)
};
const AdminComplianceChecklist = {
    id: 'B04',
    path: '/admincompliancechecklist',
    paramsMeta: {},
    getParams: (_sp)=>({}),
    navigateTo: (router)=>router.push(AdminComplianceChecklist.path)
};
const AdminLogin = {
    id: 'B05',
    path: '/adminlogin',
    paramsMeta: {},
    getParams: (_sp)=>({}),
    navigateTo: (router)=>router.push(AdminLogin.path)
};
const AdminRegister = {
    id: 'B06',
    path: '/adminregister',
    paramsMeta: {},
    getParams: (_sp)=>({}),
    navigateTo: (router)=>router.push(AdminRegister.path)
};
const BackendRoutes = {
    AdminOperationsDashboard,
    AdminQuoteDetail,
    AdminCategoriesRates,
    AdminComplianceChecklist,
    AdminLogin,
    AdminRegister
};
const NAVIGATION_MAP = {
    B01: [
        'B02'
    ],
    B02: [],
    B03: [
        'B01'
    ],
    B04: [
        'B01'
    ],
    B05: [
        'B01',
        'B06'
    ],
    B06: [
        'B01',
        'B05'
    ]
};
const PAGE_ID_MAP = {
    B01: 'AdminOperationsDashboard',
    B02: 'AdminQuoteDetail',
    B03: 'AdminCategoriesRates',
    B04: 'AdminComplianceChecklist',
    B05: 'AdminLogin',
    B06: 'AdminRegister'
};
function getRouteContextText(pageIdOrName, fileContent) {
    let pageId = pageIdOrName;
    let currentName = PAGE_ID_MAP[pageId];
    if (!currentName) {
        const lowerInput = pageIdOrName.toLowerCase();
        const entry = Object.entries(PAGE_ID_MAP).find(([, name])=>name.toLowerCase() === lowerInput);
        if (entry) {
            pageId = entry[0];
            currentName = entry[1];
        }
    }
    if (!currentName) return `// 错误：未找到页面 ${pageIdOrName}`;
    const targetIds = NAVIGATION_MAP[pageId] || [];
    const targetNames = targetIds.map((id)=>PAGE_ID_MAP[id]).filter(Boolean);
    const lines = fileContent.split('\n');
    const blocks = {};
    let currentBlock = [];
    let currentBlockName = '';
    for (const line of lines){
        if (line.startsWith('// ====')) {
            if (currentBlockName && currentBlock.length > 0) {
                blocks[currentBlockName] = currentBlock.join('\n').trim();
            }
            currentBlock = [
                line
            ];
            currentBlockName = '';
            continue;
        }
        const exportMatch = line.match(/^export const (\w+)\s*=/);
        if (exportMatch && !currentBlockName) {
            currentBlockName = exportMatch[1];
        }
        currentBlock.push(line);
    }
    if (currentBlockName && currentBlock.length > 0) {
        blocks[currentBlockName] = currentBlock.join('\n').trim();
    }
    function getBlock(name) {
        return blocks[name] || `// 未找到 ${name} 的定义`;
    }
    const parts = [];
    parts.push('// ★★★ 当前页面 ★★★');
    parts.push(getBlock(currentName));
    if (targetNames.length > 0) {
        parts.push('// ★★★ 跳转目标页面（当前页面会 navigateTo 以下页面）★★★');
        for (const name of targetNames){
            parts.push(getBlock(name));
        }
    }
    return parts.join('\n\n');
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminLoginForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/mail.js [app-client] (ecmascript) <export default as Mail>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-client] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/shield-alert.js [app-client] (ecmascript) <export default as ShieldAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__KeyRound$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/key-round.js [app-client] (ecmascript) <export default as KeyRound>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$lib$2f$rpc$2d$generated$2f$src$2f$backend$2f$actions$2f$AdminLogin$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/lib/rpc-generated/src/backend/actions/AdminLogin.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$BackendSession$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/tools/BackendSession.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$backend$2f$route$2d$params$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/backend/route-params.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function AdminLoginForm({ onSubmit, isLoading = false, onNavigateToRegister } = {}) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const { set } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$BackendSession$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdminSession"])();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [errors, setErrors] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const effectiveLoading = isLoading || isSubmitting;
    const validate = ()=>{
        const nextErrors = {};
        if (!email.trim()) {
            nextErrors.email = "Administrator email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            nextErrors.email = "Please enter a valid administrative email address.";
        }
        if (!password) {
            nextErrors.password = "Authentication password is required.";
        } else if (password.length < 6) {
            nextErrors.password = "Password must be at least 6 characters.";
        }
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!validate() || effectiveLoading) return;
        setIsSubmitting(true);
        setErrors((prev)=>({
                ...prev,
                general: undefined
            }));
        try {
            const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$lib$2f$rpc$2d$generated$2f$src$2f$backend$2f$actions$2f$AdminLogin$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginAdmin"])({
                email: email.trim(),
                password
            });
            set({
                token: res.token,
                user_id: res.userId,
                email: res.email,
                full_name: res.fullName,
                role: res.role
            });
            if (onSubmit) {
                try {
                    await onSubmit({
                        email: email.trim(),
                        password
                    });
                } catch  {
                // Parent callback error does not impede redirect upon successful verification
                }
            }
            const redirect = searchParams?.get("redirect");
            if (redirect && /^\/(?![\/\\])/.test(redirect)) {
                router.replace(redirect);
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$backend$2f$route$2d$params$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdminOperationsDashboard"].navigateTo(router);
            }
        } catch (err) {
            setErrors((prev)=>({
                    ...prev,
                    general: err instanceof Error ? err.message : "Invalid administrator credentials."
                }));
        } finally{
            setIsSubmitting(false);
        }
    };
    const handleRegisterNavigation = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$backend$2f$route$2d$params$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdminRegister"].navigateTo(router);
        if (onNavigateToRegister) {
            onNavigateToRegister();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
        onSubmit: handleSubmit,
        className: "space-y-4 w-full",
        "data-api-unique-id": "adminloginform-r3377c52508254ada-s2001826434",
        "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm",
        children: [
            errors.general && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-3 rounded-md bg-destructive/10 border border-destructive/20 flex items-center gap-2 text-xs text-destructive font-medium",
                "data-api-unique-id": "adminloginform-r20d7f3c181367427-s2001826434",
                "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                        className: "w-4 h-4 shrink-0",
                        "data-api-unique-id": "adminloginform-r98499195737363dc-s2001826434",
                        "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm"
                    }, void 0, false, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                        lineNumber: 101,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        "data-api-unique-id": "adminloginform-rc498a4ee8d422e3a-s2001826434",
                        "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm",
                        children: errors.general
                    }, void 0, false, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                        lineNumber: 102,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                lineNumber: 100,
                columnNumber: 26
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-1.5",
                "data-api-unique-id": "adminloginform-r7d7794b0842e1e17-s2001826434",
                "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "admin-email",
                        className: "flex items-center justify-between text-xs font-semibold text-card-foreground tracking-wide",
                        "data-api-unique-id": "adminloginform-rdf1c0d95f359e8fa-s2001826434",
                        "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-1.5",
                                "data-api-unique-id": "adminloginform-rc1ce1e157e279dae-s2001826434",
                                "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mail$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Mail$3e$__["Mail"], {
                                        className: "w-3.5 h-3.5 text-muted-foreground",
                                        "data-api-unique-id": "adminloginform-r2b9c3e143b4ad24f-s2001826434",
                                        "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm"
                                    }, void 0, false, {
                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                                        lineNumber: 109,
                                        columnNumber: 13
                                    }, this),
                                    "Operations Email Address"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                                lineNumber: 108,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] font-mono text-muted-foreground",
                                "data-api-unique-id": "adminloginform-r49744fa2ee2f364a-s2001826434",
                                "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm",
                                children: "ADMIN ID"
                            }, void 0, false, {
                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        "data-api-unique-id": "adminloginform-r16a2dc56a8ccf5eb-s2001826434",
                        "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                            id: "admin-email",
                            type: "email",
                            value: email,
                            onChange: (e)=>{
                                setEmail(e.target.value);
                                if (errors.email || errors.general) {
                                    setErrors((prev)=>({
                                            ...prev,
                                            email: undefined,
                                            general: undefined
                                        }));
                                }
                            },
                            placeholder: "Enter administrative email",
                            "data-auto": "account",
                            disabled: effectiveLoading,
                            className: "w-full bg-background border-border text-foreground placeholder:text-muted-foreground h-10 px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary font-body",
                            "data-api-unique-id": "adminloginform-rda948d0458b08149-s2001826434",
                            "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm"
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                            lineNumber: 115,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    errors.email && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] text-destructive flex items-center gap-1 font-medium pt-0.5",
                        "data-api-unique-id": "adminloginform-r4400ffc2f66b4c95-s2001826434",
                        "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                                className: "w-3 h-3 shrink-0",
                                "data-api-unique-id": "adminloginform-r9f25af53a3b39f31-s2001826434",
                                "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm"
                            }, void 0, false, {
                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                                lineNumber: 127,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "data-api-unique-id": "adminloginform-ra00b9c48076c5acd-s2001826434",
                                "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm",
                                children: errors.email
                            }, void 0, false, {
                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                                lineNumber: 128,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                        lineNumber: 126,
                        columnNumber: 26
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                lineNumber: 106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-1.5",
                "data-api-unique-id": "adminloginform-r185923f881903a1f-s2001826434",
                "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between text-xs font-semibold text-card-foreground tracking-wide",
                        "data-api-unique-id": "adminloginform-rf49e48a4428afd95-s2001826434",
                        "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "admin-password",
                                className: "flex items-center gap-1.5",
                                "data-api-unique-id": "adminloginform-r61275aca83f95862-s2001826434",
                                "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                        className: "w-3.5 h-3.5 text-muted-foreground",
                                        "data-api-unique-id": "adminloginform-rd8f65339fd2a1440-s2001826434",
                                        "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm"
                                    }, void 0, false, {
                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                                        lineNumber: 136,
                                        columnNumber: 13
                                    }, this),
                                    "Security Credential (Password)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                                lineNumber: 135,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-[11px] font-mono text-muted-foreground",
                                "data-api-unique-id": "adminloginform-r7be3e48d93ff43fe-s2001826434",
                                "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm",
                                children: "HASH V4"
                            }, void 0, false, {
                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                                lineNumber: 139,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                        lineNumber: 134,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative",
                        "data-api-unique-id": "adminloginform-rf4e6643bcb2e5b57-s2001826434",
                        "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                            id: "admin-password",
                            type: "password",
                            value: password,
                            onChange: (e)=>{
                                setPassword(e.target.value);
                                if (errors.password || errors.general) {
                                    setErrors((prev)=>({
                                            ...prev,
                                            password: undefined,
                                            general: undefined
                                        }));
                                }
                            },
                            placeholder: "Enter password",
                            "data-auto": "password",
                            disabled: effectiveLoading,
                            className: "w-full bg-background border-border text-foreground placeholder:text-muted-foreground h-10 px-3 text-sm focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-primary font-body",
                            "data-api-unique-id": "adminloginform-r26332d6cab27d957-s2001826434",
                            "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm"
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                            lineNumber: 142,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                        lineNumber: 141,
                        columnNumber: 9
                    }, this),
                    errors.password && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-[11px] text-destructive flex items-center gap-1 font-medium pt-0.5",
                        "data-api-unique-id": "adminloginform-r21c12d7baa8294df-s2001826434",
                        "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                                className: "w-3 h-3 shrink-0",
                                "data-api-unique-id": "adminloginform-r31a577889dab2e82-s2001826434",
                                "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm"
                            }, void 0, false, {
                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                                lineNumber: 154,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "data-api-unique-id": "adminloginform-r4acae433c2135ddf-s2001826434",
                                "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm",
                                children: errors.password
                            }, void 0, false, {
                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                                lineNumber: 155,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                        lineNumber: 153,
                        columnNumber: 29
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                lineNumber: 133,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-3 py-2 rounded-md bg-muted/60 border border-border flex items-center justify-between text-xs text-muted-foreground",
                "data-api-unique-id": "adminloginform-re8a43c671145f266-s2001826434",
                "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        "data-api-unique-id": "adminloginform-r82d7bdc0b06bca58-s2001826434",
                        "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$key$2d$round$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__KeyRound$3e$__["KeyRound"], {
                                className: "w-3.5 h-3.5 text-primary shrink-0",
                                "data-api-unique-id": "adminloginform-r85f83f682457f20e-s2001826434",
                                "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm"
                            }, void 0, false, {
                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                                lineNumber: 162,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                "data-api-unique-id": "adminloginform-r38d5ed8579202304-s2001826434",
                                "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm",
                                children: "Access Tier:"
                            }, void 0, false, {
                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                                lineNumber: 163,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                        lineNumber: 161,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-accent text-accent-foreground",
                        "data-api-unique-id": "adminloginform-r4f41f7932f113fa4-s2001826434",
                        "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm",
                        children: "Operations Administrator (ADMIN)"
                    }, void 0, false, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                        lineNumber: 165,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                type: "submit",
                "data-auto": "submit",
                disabled: effectiveLoading,
                className: "w-full h-11 bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 font-semibold tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 mt-2",
                "data-api-unique-id": "adminloginform-r97a41202d1006bf8-s2001826434",
                "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm",
                children: effectiveLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                            className: "w-4 h-4 animate-spin shrink-0",
                            "data-api-unique-id": "adminloginform-r0aef74d5f6f373e7-s2001826434",
                            "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm"
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                            lineNumber: 173,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            "data-api-unique-id": "adminloginform-r8ec07f3b564a26d0-s2001826434",
                            "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm",
                            children: "Verifying Credentials..."
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                            lineNumber: 174,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            "data-api-unique-id": "adminloginform-r9224434f5cb8d7e6-s2001826434",
                            "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm",
                            children: "Anmelden / Sign In"
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                            lineNumber: 176,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                            className: "w-4 h-4 shrink-0",
                            "data-api-unique-id": "adminloginform-r26c7a68e73c8dc0c-s2001826434",
                            "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm"
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                            lineNumber: 177,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                lineNumber: 171,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "pt-2 text-center border-t border-border/80",
                "data-api-unique-id": "adminloginform-r9468f4e2bd0d70aa-s2001826434",
                "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-xs text-muted-foreground",
                    "data-api-unique-id": "adminloginform-rcf2ae46fe1a6b632-s2001826434",
                    "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm",
                    children: [
                        "First-time administrator onboarding?",
                        " ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: handleRegisterNavigation,
                            className: "font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded px-1",
                            "data-api-unique-id": "adminloginform-r0dab52889a268cdf-s2001826434",
                            "data-api-unique-page-name": "src/backend/components/AdminLogin/AdminLoginForm",
                            children: "Register Administrator Account →"
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                            lineNumber: 185,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                    lineNumber: 183,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
                lineNumber: 182,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx",
        lineNumber: 98,
        columnNumber: 10
    }, this);
}
_s(AdminLoginForm, "pICQiRJkn7YDb3+9CePBj3erWPo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$BackendSession$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAdminSession"]
    ];
});
_c = AdminLoginForm;
var _c;
__turbopack_context__.k.register(_c, "AdminLoginForm");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/ComplianceNotice.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ComplianceNotice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function ComplianceNotice({ telemetry }) {
    _s();
    const formattedTimestamp = __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].useMemo({
        "ComplianceNotice.useMemo[formattedTimestamp]": ()=>{
            if (!telemetry.timestamp) return "";
            const date = new Date(telemetry.timestamp);
            if (isNaN(date.getTime())) return telemetry.timestamp;
            return date.toISOString().replace("T", " ").replace("Z", " UTC").slice(0, 23);
        }
    }["ComplianceNotice.useMemo[formattedTimestamp]"], [
        telemetry.timestamp
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full pt-4 border-t border-border flex flex-col gap-2.5 text-xs text-muted-foreground",
        "data-api-unique-id": "compliancenotice-rf31c0d702e00a98c-s2898989610",
        "data-api-unique-page-name": "src/backend/components/AdminLogin/ComplianceNotice",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md bg-secondary text-secondary-foreground border border-border",
                "data-api-unique-id": "compliancenotice-rb1ceaaea4ee8c24a-s2898989610",
                "data-api-unique-page-name": "src/backend/components/AdminLogin/ComplianceNotice",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5 font-medium text-[11px] truncate",
                        "data-api-unique-id": "compliancenotice-rb5e950838a4c8b15-s2898989610",
                        "data-api-unique-page-name": "src/backend/components/AdminLogin/ComplianceNotice",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                className: "w-3.5 h-3.5 text-success shrink-0",
                                "data-api-unique-id": "compliancenotice-re4723dc0b1f8c58e-s2898989610",
                                "data-api-unique-page-name": "src/backend/components/AdminLogin/ComplianceNotice"
                            }, void 0, false, {
                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/ComplianceNotice.tsx",
                                lineNumber: 22,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "truncate",
                                "data-api-unique-id": "compliancenotice-r55624d630fe7ce07-s2898989610",
                                "data-api-unique-page-name": "src/backend/components/AdminLogin/ComplianceNotice",
                                children: [
                                    "WKO Gewerberecht · ",
                                    telemetry.jurisdiction
                                ]
                            }, void 0, true, {
                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/ComplianceNotice.tsx",
                                lineNumber: 23,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/ComplianceNotice.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-muted text-muted-foreground border border-border shrink-0",
                        "data-api-unique-id": "compliancenotice-r30f39be19141c0ad-s2898989610",
                        "data-api-unique-page-name": "src/backend/components/AdminLogin/ComplianceNotice",
                        children: telemetry.wkoRegistration
                    }, void 0, false, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/ComplianceNotice.tsx",
                        lineNumber: 25,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/ComplianceNotice.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-1.5 px-1 text-[11px] leading-relaxed",
                "data-api-unique-id": "compliancenotice-r987d8d6f4da3153d-s2898989610",
                "data-api-unique-page-name": "src/backend/components/AdminLogin/ComplianceNotice",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-start gap-1.5",
                        "data-api-unique-id": "compliancenotice-r7545c194d16aae90-s2898989610",
                        "data-api-unique-page-name": "src/backend/components/AdminLogin/ComplianceNotice",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                className: "w-3.5 h-3.5 text-muted-foreground shrink-0 mt-0.5",
                                "data-api-unique-id": "compliancenotice-r45da7dc782acd58b-s2898989610",
                                "data-api-unique-page-name": "src/backend/components/AdminLogin/ComplianceNotice"
                            }, void 0, false, {
                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/ComplianceNotice.tsx",
                                lineNumber: 33,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                "data-api-unique-id": "compliancenotice-r7c657d9e186f88dc-s2898989610",
                                "data-api-unique-page-name": "src/backend/components/AdminLogin/ComplianceNotice",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        className: "text-card-foreground",
                                        "data-api-unique-id": "compliancenotice-r3afdcf4db7dbeff7-s2898989610",
                                        "data-api-unique-page-name": "src/backend/components/AdminLogin/ComplianceNotice",
                                        children: "Austrian DSGVO & GewO Compliance:"
                                    }, void 0, false, {
                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/ComplianceNotice.tsx",
                                        lineNumber: 35,
                                        columnNumber: 13
                                    }, this),
                                    " Access to this management portal is strictly reserved for authorized Vienna Handwerk personnel. In accordance with Austrian Data Protection laws (",
                                    telemetry.dsgvoArticle,
                                    ") and Gewerbeordnung trade standards, operational state changes and authentication attempts are logged with forensic integrity."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/ComplianceNotice.tsx",
                                lineNumber: 34,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/ComplianceNotice.tsx",
                        lineNumber: 32,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between pt-1 border-t border-border/50 text-[10px] font-mono text-muted-foreground",
                        "data-api-unique-id": "compliancenotice-rb90a15938efc13b7-s2898989610",
                        "data-api-unique-page-name": "src/backend/components/AdminLogin/ComplianceNotice",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-1",
                                "data-api-unique-id": "compliancenotice-r03c0a97ab705bbe6-s2898989610",
                                "data-api-unique-page-name": "src/backend/components/AdminLogin/ComplianceNotice",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        className: "w-3 h-3 text-success shrink-0",
                                        "data-api-unique-id": "compliancenotice-r6d1759a23b28b862-s2898989610",
                                        "data-api-unique-page-name": "src/backend/components/AdminLogin/ComplianceNotice"
                                    }, void 0, false, {
                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/ComplianceNotice.tsx",
                                        lineNumber: 41,
                                        columnNumber: 13
                                    }, this),
                                    "Audit Protocol: ",
                                    telemetry.auditStatus
                                ]
                            }, void 0, true, {
                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/ComplianceNotice.tsx",
                                lineNumber: 40,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "truncate max-w-[170px]",
                                title: telemetry.sessionNode,
                                "data-api-unique-id": "compliancenotice-r1c7b441aec0e5d2c-s2898989610",
                                "data-api-unique-page-name": "src/backend/components/AdminLogin/ComplianceNotice",
                                children: [
                                    "Node: ",
                                    telemetry.sessionNode
                                ]
                            }, void 0, true, {
                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/ComplianceNotice.tsx",
                                lineNumber: 44,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/ComplianceNotice.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this),
                    formattedTimestamp && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-[10px] font-mono text-muted-foreground/75 text-right",
                        "data-api-unique-id": "compliancenotice-rc161980570258b07-s2898989610",
                        "data-api-unique-page-name": "src/backend/components/AdminLogin/ComplianceNotice",
                        children: [
                            "Verified: ",
                            formattedTimestamp
                        ]
                    }, void 0, true, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/ComplianceNotice.tsx",
                        lineNumber: 49,
                        columnNumber: 32
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/ComplianceNotice.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/ComplianceNotice.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
_s(ComplianceNotice, "T/2fotpqc5hhzgI5y1YEIc13QeA=");
_c = ComplianceNotice;
var _c;
__turbopack_context__.k.register(_c, "ComplianceNotice");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/vania/Documents/Career/AutoCoder.cc/app/(backend)/adminlogin/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminLoginPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$lib$2f$rpc$2d$generated$2f$src$2f$backend$2f$actions$2f$AdminLogin$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/lib/rpc-generated/src/backend/actions/AdminLogin.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$backend$2f$components$2f$AdminLogin$2f$AdminHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$backend$2f$components$2f$AdminLogin$2f$AdminLoginForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/AdminLoginForm.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$backend$2f$components$2f$AdminLogin$2f$ComplianceNotice$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/backend/components/AdminLogin/ComplianceNotice.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function AdminLoginPage() {
    _s();
    const [auditTelemetry, setAuditTelemetry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminLoginPage.useEffect": ()=>{
            let mounted = true;
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$lib$2f$rpc$2d$generated$2f$src$2f$backend$2f$actions$2f$AdminLogin$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getAuditTelemetry"])().then({
                "AdminLoginPage.useEffect": (data)=>{
                    if (mounted) {
                        setAuditTelemetry(data);
                        setIsLoading(false);
                    }
                }
            }["AdminLoginPage.useEffect"]).catch({
                "AdminLoginPage.useEffect": ()=>{
                    if (mounted) {
                        setAuditTelemetry(null);
                        setIsLoading(false);
                    }
                }
            }["AdminLoginPage.useEffect"]);
            return ({
                "AdminLoginPage.useEffect": ()=>{
                    mounted = false;
                }
            })["AdminLoginPage.useEffect"];
        }
    }["AdminLoginPage.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full min-h-screen bg-background text-foreground flex flex-col justify-center items-center p-4 lg:p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                "data-controller-name": "Admin Authentication Vault",
                className: "w-full max-w-[420px] bg-card text-card-foreground border border-border rounded-xl shadow-soft p-6 sm:p-7 flex flex-col gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$backend$2f$components$2f$AdminLogin$2f$AdminHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(backend)/adminlogin/page.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$backend$2f$components$2f$AdminLogin$2f$AdminLoginForm$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(backend)/adminlogin/page.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this),
                    auditTelemetry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$backend$2f$components$2f$AdminLogin$2f$ComplianceNotice$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        telemetry: auditTelemetry
                    }, void 0, false, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(backend)/adminlogin/page.tsx",
                        lineNumber: 39,
                        columnNumber: 28
                    }, this),
                    isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center text-xs text-muted-foreground py-2",
                        children: "Loading compliance telemetry..."
                    }, void 0, false, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(backend)/adminlogin/page.tsx",
                        lineNumber: 40,
                        columnNumber: 23
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(backend)/adminlogin/page.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "mt-6 text-center text-xs text-muted-foreground font-mono",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: [
                        "© ",
                        new Date().getFullYear(),
                        " Vienna Handwerk Betriebsführung · 1010 Wien, Stephansplatz 4"
                    ]
                }, void 0, true, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(backend)/adminlogin/page.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(backend)/adminlogin/page.tsx",
                lineNumber: 46,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(backend)/adminlogin/page.tsx",
        lineNumber: 29,
        columnNumber: 10
    }, this);
}
_s(AdminLoginPage, "MoD+9WNr7tvnJVDG6d54Qiq3NYo=");
_c = AdminLoginPage;
var _c;
__turbopack_context__.k.register(_c, "AdminLoginPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=vania_Documents_Career_AutoCoder_cc_cebba1cb._.js.map