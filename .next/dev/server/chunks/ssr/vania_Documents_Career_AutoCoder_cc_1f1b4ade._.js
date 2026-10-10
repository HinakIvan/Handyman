module.exports = [
"[project]/vania/Documents/Career/AutoCoder.cc/src/utils/serializer.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/vania/Documents/Career/AutoCoder.cc/src/tools/BackendSession.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdminSession",
    ()=>AdminSession,
    "useAdminSession",
    ()=>useAdminSession
]);
// 后台 Session Store
// 使用方法: import { useAdminSession } from '@/tools/BackendSession';
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$storeFactory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/tools/storeFactory.ts [app-ssr] (ecmascript)");
;
class AdminSession {
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
        this.role = 'ADMIN';
    }
}
const useAdminSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$storeFactory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPersistStore"])('AdminSession', {
    token: '',
    user_id: '',
    email: '',
    full_name: '',
    role: 'ADMIN'
});
}),
"[project]/vania/Documents/Career/AutoCoder.cc/src/backend/auth/rpc-auth.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$BackendSession$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/tools/BackendSession.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$15_$40$types$2b$react$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_use$2d$sync$2d$external$2d$store$40$1$2e$7$2e$0_react$40$19$2e$3$2e$0_$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/zustand@5.0.15_@types+react@19.3.0_react@19.3.0_use-sync-external-store@1.7.0_react@19.3.0_/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
// 登录路由
const LOGIN_ROUTE = '/adminlogin';
const useAuthDialog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$15_$40$types$2b$react$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_use$2d$sync$2d$external$2d$store$40$1$2e$7$2e$0_react$40$19$2e$3$2e$0_$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set)=>({
        isOpen: false,
        open: ()=>set({
                isOpen: true
            }),
        close: ()=>set({
                isOpen: false
            })
    }));
function getToken() {
    const session = __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$BackendSession$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAdminSession"].getState();
    return session.token || null;
}
function clearAuth() {
    __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$BackendSession$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAdminSession"].getState().reset();
}
function handleUnauthorized() {
    clearAuth();
    // 已经在登录页，不弹窗（用 includes 兼容 basePath 和尾部斜杠）
    if (("TURBOPACK compile-time value", "undefined") !== 'undefined' && window.location.pathname.includes(LOGIN_ROUTE)) //TURBOPACK unreachable
    ;
    useAuthDialog.getState().open();
}
function AuthExpiredDialog() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isOpen, close } = useAuthDialog();
    const handleLogin = ()=>{
        close();
        router.push(LOGIN_ROUTE);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
        open: isOpen,
        onOpenChange: close,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogContent"], {
            className: "fixed bottom-4 right-4 left-auto top-auto translate-x-0 translate-y-0 bg-card text-card-foreground border border-border shadow-elevated rounded-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                            className: "text-foreground",
                            children: "Session Expired"
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/auth/rpc-auth.tsx",
                            lineNumber: 74,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogDescription"], {
                            className: "text-muted-foreground",
                            children: "Authentication is required or your session has expired. You can sign in with a demo account to continue."
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/auth/rpc-auth.tsx",
                            lineNumber: 75,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/auth/rpc-auth.tsx",
                    lineNumber: 73,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogFooter"], {
                    className: "gap-2 sm:gap-0",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            variant: "outline",
                            onClick: close,
                            className: "border-border text-foreground hover:bg-muted",
                            children: "Maybe Later"
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/auth/rpc-auth.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                            onClick: handleLogin,
                            className: "bg-primary text-primary-foreground hover:opacity-90",
                            children: "Go to Login"
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/auth/rpc-auth.tsx",
                            lineNumber: 83,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/auth/rpc-auth.tsx",
                    lineNumber: 79,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/auth/rpc-auth.tsx",
            lineNumber: 72,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/backend/auth/rpc-auth.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
}),
"[project]/vania/Documents/Career/AutoCoder.cc/src/app/auth/rpc-auth.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$FrontendSession$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/tools/FrontendSession.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dialog$40$1$2e$2$2e$0_$40$types$2b$react$2d$dom$40$19$2e$3$2e$0_$40$types$2b$react$40$19$2e$3$2e$0_$5f40$types$2b$react$40$_c1edb718822a6de77ff35d62c5110ee0$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/@radix-ui+react-dialog@1.2.0_@types+react-dom@19.3.0_@types+react@19.3.0__@types+react@_c1edb718822a6de77ff35d62c5110ee0/node_modules/@radix-ui/react-dialog/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/lib/utils.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/dialog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/button.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$15_$40$types$2b$react$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_use$2d$sync$2d$external$2d$store$40$1$2e$7$2e$0_react$40$19$2e$3$2e$0_$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/zustand@5.0.15_@types+react@19.3.0_react@19.3.0_use-sync-external-store@1.7.0_react@19.3.0_/node_modules/zustand/esm/react.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
// 登录路由
const LOGIN_ROUTE = '/applogin';
const useAuthDialog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$zustand$40$5$2e$0$2e$15_$40$types$2b$react$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_use$2d$sync$2d$external$2d$store$40$1$2e$7$2e$0_react$40$19$2e$3$2e$0_$2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["create"])((set)=>({
        isOpen: false,
        open: ()=>set({
                isOpen: true
            }),
        close: ()=>set({
                isOpen: false
            })
    }));
function getToken() {
    const session = __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$FrontendSession$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserSession"].getState();
    return session.token || null;
}
function clearAuth() {
    __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$FrontendSession$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserSession"].getState().reset();
}
function handleUnauthorized() {
    clearAuth();
    useAuthDialog.getState().open();
}
function AuthExpiredDialog() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const { isOpen, close } = useAuthDialog();
    const handleLogin = ()=>{
        close();
        setTimeout(()=>{
            router.push(LOGIN_ROUTE);
        }, 0);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Dialog"], {
        open: isOpen,
        onOpenChange: close,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogOverlay"], {
                className: "absolute bg-black/40"
            }, void 0, false, {
                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/app/auth/rpc-auth.tsx",
                lineNumber: 66,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$dialog$40$1$2e$2$2e$0_$40$types$2b$react$2d$dom$40$19$2e$3$2e$0_$40$types$2b$react$40$19$2e$3$2e$0_$5f40$types$2b$react$40$_c1edb718822a6de77ff35d62c5110ee0$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$dialog$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
                className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("absolute bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 grid w-full max-w-[calc(100%-2rem)] gap-4 rounded-lg border z-50 p-6 shadow-lg duration-200", "bottom-4 left-1/2 -translate-x-1/2"),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogHeader"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogTitle"], {
                                children: "初始化登录账号"
                            }, void 0, false, {
                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/app/auth/rpc-auth.tsx",
                                lineNumber: 74,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogDescription"], {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$dialog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["DialogFooter"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                onClick: close,
                                children: "稍后再说"
                            }, void 0, false, {
                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/app/auth/rpc-auth.tsx",
                                lineNumber: 80,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Button"], {
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
}),
"[project]/vania/Documents/Career/AutoCoder.cc/src/tools/AppSession.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAppUserSession",
    ()=>useAppUserSession
]);
// 无需登录
// 使用方法: import { useAppUserSession } from '@/tools/AppSession';
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$storeFactory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/tools/storeFactory.ts [app-ssr] (ecmascript)");
;
const useAppUserSession = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$storeFactory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createPersistStore"])('AppUserSession', {});
}),
"[project]/vania/Documents/Career/AutoCoder.cc/src/tools/rpc-client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "rpcCall",
    ()=>rpcCall
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$utils$2f$serializer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/utils/serializer.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$8_$40$types$2b$react$40$19$2e$3$2e$0_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/sonner@2.0.8_@types+react@19.3.0_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
// 同时 import 前后台和 app 的 rpc-auth
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$frontend$2f$auth$2f$rpc$2d$auth$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/auth/rpc-auth.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$backend$2f$auth$2f$rpc$2d$auth$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/backend/auth/rpc-auth.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$app$2f$auth$2f$rpc$2d$auth$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/app/auth/rpc-auth.tsx [app-ssr] (ecmascript)");
// 导入前端和 app 的 session store 用于同步 role
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$FrontendSession$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/tools/FrontendSession.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$AppSession$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/tools/AppSession.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$BackendSession$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/tools/BackendSession.tsx [app-ssr] (ecmascript)");
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
        return __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$frontend$2f$auth$2f$rpc$2d$auth$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__;
    }
    if (actionName.includes('.backend.') || actionName.startsWith('backend.')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$backend$2f$auth$2f$rpc$2d$auth$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__;
    }
    if (actionName.includes('.app.') || actionName.startsWith('app.')) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$app$2f$auth$2f$rpc$2d$auth$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__;
    }
}
// 根据 actionName 从对应 platform 的 session store 获取当前用户角色
function getCurrentRole(actionName) {
    try {
        if (actionName.includes('.frontend.') || actionName.startsWith('frontend.')) {
            const session = __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$FrontendSession$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserSession"].getState();
            return session.role ?? undefined;
        }
        if (actionName.includes('.backend.') || actionName.startsWith('backend.')) {
            const session = __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$BackendSession$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAdminSession"].getState();
            return session.role ?? undefined;
        }
        if (actionName.includes('.app.') || actionName.startsWith('app.')) {
            const session = __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$AppSession$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppUserSession"].getState();
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
                    ...typeof process !== 'undefined' && process.env.VITEST_PIPELINE_PAGE ? {
                        'X-Pipeline-Test': '1',
                        'X-Pipeline-Page': process.env.VITEST_PIPELINE_PAGE
                    } : {}
                },
                body: JSON.stringify({
                    actionName,
                    args: __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$utils$2f$serializer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].serialize(args)
                })
            };
            let resp = await fetch(apiUrl, fetchOptions);
            // 503 服务过载：延迟 0.5 秒重试 1 次，失败就放弃
            if (resp.status === 503) {
                await new Promise((r)=>setTimeout(r, 500));
                resp = await fetch(apiUrl, fetchOptions);
                if (resp.status === 503) {
                    __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$8_$40$types$2b$react$40$19$2e$3$2e$0_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(ERROR_MESSAGES.SERVER_ERROR);
                    throw new Error(ERROR_MESSAGES.SERVER_ERROR);
                }
            }
            // 401 统一拦截
            if (resp.status === 401) {
                // 该分支会返回永不 resolve 的 Promise，HTTP 请求结束后需单独释放检测状态。
                finishRpcAction();
                rpcAuth.handleUnauthorized();
                __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$8_$40$types$2b$react$40$19$2e$3$2e$0_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error('Please login first', {
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
                __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$8_$40$types$2b$react$40$19$2e$3$2e$0_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(errorMsg);
                throw new Error(errorMsg);
            }
            // 404 资源不存在
            if (resp.status === 404) {
                throw new Error(ERROR_MESSAGES.NOT_FOUND);
            }
            if (!resp.ok) {
                const errorData = await resp.json().catch(()=>({}));
                const errorMsg = errorData.error || ERROR_MESSAGES.SERVER_ERROR;
                __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$8_$40$types$2b$react$40$19$2e$3$2e$0_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(errorMsg);
                throw new Error(errorMsg);
            }
            // 检查后端返回的最新 role，如果与前端 session 不同则自动同步
            // 这解决了角色变更（如审核通过）后前端 session 不同步的问题
            const serverRole = resp.headers.get('X-Auth-Role');
            if (serverRole) {
                const isFrontend = actionName.includes('.frontend.');
                const isApp = actionName.includes('.app.');
                if (isFrontend) {
                    const session = __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$FrontendSession$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserSession"].getState();
                    if (session.role !== undefined && String(session.role) !== serverRole) {
                        try {
                            const parsed = JSON.parse(serverRole);
                            __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$FrontendSession$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserSession"].setState({
                                role: parsed
                            });
                        } catch  {
                            __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$FrontendSession$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserSession"].setState({
                                role: serverRole
                            });
                        }
                    }
                } else if (isApp) {
                    const session = __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$AppSession$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppUserSession"].getState();
                    if (session.role !== undefined && String(session.role) !== serverRole) {
                        try {
                            const parsed = JSON.parse(serverRole);
                            __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$AppSession$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppUserSession"].setState({
                                role: parsed
                            });
                        } catch  {
                            __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$AppSession$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAppUserSession"].setState({
                                role: serverRole
                            });
                        }
                    }
                }
            }
            const rawData = await resp.json();
            // 先 serializer 反序列化
            const data = __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$utils$2f$serializer$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].deserialize(rawData);
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
}),
"[project]/vania/Documents/Career/AutoCoder.cc/lib/rpc-generated/src/frontend/actions/HomeFrontend.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createQuoteRequest",
    ()=>createQuoteRequest,
    "getHomeData",
    ()=>getHomeData
]);
/* Auto-generated */ var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$rpc$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/tools/rpc-client.ts [app-ssr] (ecmascript)");
;
const getHomeData = (...args)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$rpc$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rpcCall"])("src.frontend.actions.HomeFrontend.getHomeData", ...args);
const createQuoteRequest = (...args)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$rpc$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["rpcCall"])("src.frontend.actions.HomeFrontend.createQuoteRequest", ...args);
}),
"[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/route-params.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Frontend Route Parameters and Navigation Utilities
 * Vienna Handyman Portal Client Platform
 */ __turbopack_context__.s([
    "CustomerInquiryTracker",
    ()=>CustomerInquiryTracker,
    "CustomerLogin",
    ()=>CustomerLogin,
    "CustomerRegister",
    ()=>CustomerRegister,
    "FrontendRoutes",
    ()=>FrontendRoutes,
    "HomeFrontend",
    ()=>HomeFrontend,
    "NAVIGATION_MAP",
    ()=>NAVIGATION_MAP,
    "PAGE_ID_MAP",
    ()=>PAGE_ID_MAP,
    "PricingScope",
    ()=>PricingScope,
    "QuoteRequestForm",
    ()=>QuoteRequestForm,
    "ServiceAreas",
    ()=>ServiceAreas,
    "ServiceCategoryDetail",
    ()=>ServiceCategoryDetail,
    "ServicesCatalog",
    ()=>ServicesCatalog,
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
const HomeFrontend = {
    id: 'F01',
    path: '/',
    paramsMeta: {},
    getParams: (_sp)=>({}),
    navigateTo: (router)=>router.push(HomeFrontend.path)
};
const ServicesCatalog = {
    id: 'F02',
    path: '/servicescatalog',
    paramsMeta: {},
    getParams: (_sp)=>({}),
    navigateTo: (router)=>router.push(ServicesCatalog.path)
};
const ServiceCategoryDetail = {
    id: 'F03',
    path: '/servicecategorydetail',
    paramsMeta: {
        categoryKey: {
            source_table: 'ServiceCategory',
            source_column: 'key',
            description: '来自 ServiceCategory 表的唯一标识 key (ServiceCategoryKey)，非主键 uuid，用于分类识别'
        }
    },
    getParams: (()=>{
        const cache = new WeakMap();
        return (sp)=>{
            if (cache.has(sp)) return cache.get(sp);
            const result = {
                categoryKey: sp.get('categoryKey') || ''
            };
            cache.set(sp, result);
            return result;
        };
    })(),
    navigateTo: (router, params)=>router.push(buildUrl(ServiceCategoryDetail.path, params)),
    navigateToCategory: (router, params)=>router.push(buildUrl(ServiceCategoryDetail.path, params))
};
const PricingScope = {
    id: 'F04',
    path: '/pricingscope',
    paramsMeta: {},
    getParams: (_sp)=>({}),
    navigateTo: (router)=>router.push(PricingScope.path)
};
const ServiceAreas = {
    id: 'F05',
    path: '/serviceareas',
    paramsMeta: {},
    getParams: (_sp)=>({}),
    navigateTo: (router)=>router.push(ServiceAreas.path)
};
const QuoteRequestForm = {
    id: 'F06',
    path: '/quoterequestform',
    paramsMeta: {
        categoryKey: {
            source_table: 'ServiceCategory',
            source_column: 'key',
            description: '来自 ServiceCategory 表的唯一标识 key (ServiceCategoryKey)，非主键 uuid，用于表单预选分类'
        }
    },
    getParams: (()=>{
        const cache = new WeakMap();
        return (sp)=>{
            if (cache.has(sp)) return cache.get(sp);
            const result = {
                categoryKey: sp.get('categoryKey') || ''
            };
            cache.set(sp, result);
            return result;
        };
    })(),
    navigateTo: (router)=>router.push(QuoteRequestForm.path),
    navigateToWithCategory: (router, params)=>router.push(buildUrl(QuoteRequestForm.path, params))
};
const CustomerInquiryTracker = {
    id: 'F07',
    path: '/customerinquirytracker',
    paramsMeta: {},
    getParams: (_sp)=>({}),
    navigateTo: (router)=>router.push(CustomerInquiryTracker.path)
};
const CustomerLogin = {
    id: 'F08',
    path: '/customerlogin',
    paramsMeta: {},
    getParams: (_sp)=>({}),
    navigateTo: (router)=>router.push(CustomerLogin.path)
};
const CustomerRegister = {
    id: 'F09',
    path: '/customerregister',
    paramsMeta: {},
    getParams: (_sp)=>({}),
    navigateTo: (router)=>router.push(CustomerRegister.path)
};
const FrontendRoutes = {
    HomeFrontend,
    ServicesCatalog,
    ServiceCategoryDetail,
    PricingScope,
    ServiceAreas,
    QuoteRequestForm,
    CustomerInquiryTracker,
    CustomerLogin,
    CustomerRegister
};
const NAVIGATION_MAP = {
    F01: [
        'F02',
        'F03',
        'F06'
    ],
    F02: [
        'F03'
    ],
    F03: [
        'F06'
    ],
    F04: [],
    F05: [],
    F06: [],
    F07: [],
    F08: [
        'F01',
        'F09'
    ],
    F09: [
        'F01',
        'F08'
    ]
};
const PAGE_ID_MAP = {
    F01: 'HomeFrontend',
    F02: 'ServicesCatalog',
    F03: 'ServiceCategoryDetail',
    F04: 'PricingScope',
    F05: 'ServiceAreas',
    F06: 'QuoteRequestForm',
    F07: 'CustomerInquiryTracker',
    F08: 'CustomerLogin',
    F09: 'CustomerRegister'
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
}),
"[project]/vania/Documents/Career/AutoCoder.cc/src/tools/tools.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "upload_image_file",
    ()=>upload_image_file
]);
async function get_image_url(keywords, orientation, propKey, project_id, description, need_large_image, signal) {
    let url = "null";
    try {
        if (keywords.startsWith("data:") || keywords.startsWith("http")) {
            return keywords;
        }
        const uniqueIndex = Array.from(propKey).reduce((acc, char)=>(acc + char.charCodeAt(0)) % 10, 0);
        const response = await fetch("https://project.autocoder.cc/api/project_pz/getimage", {
            method: 'POST',
            headers: {
                'Authorization': localStorage.getItem('full_token') || '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: keywords,
                orientation: orientation,
                index: uniqueIndex,
                project_id: project_id,
                description: description,
                need_large_image: need_large_image
            }),
            signal
        });
        if (response.ok) {
            const datas = await response.json();
            url = datas["url"];
        } else {
            console.error("Failed to load config. Status:", response.status);
        }
    } catch (error) {
        console.error("An error occurred while loading config:", error);
    }
    return url;
}
async function upload_image_file(file, projectId) {
    try {
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            throw new Error('File size exceeds 5MB limit');
        }
        const project_id = "PROJ_b23df7b6_snap_20261010_124454_705";
        const formData = new FormData();
        formData.append('image', file);
        formData.append('project_id', project_id);
        const response = await fetch("https://project.autocoder.cc/api/project/image/upload/project", {
            method: 'POST',
            headers: {
                'AGC-language': 'en-US',
                'Accept': 'application/json, text/plain, */*',
                'X-Browser': 'Blink',
                'X-Language': 'en'
            },
            body: formData
        });
        if (response.ok) {
            const data = await response.json();
            if (data.code === 200 && data.data?.image_url) {
                return data.data.image_url;
            }
            return data.image_url || '';
        } else {
            console.error("Failed to upload image. Status:", response.status);
            throw new Error(`Upload failed with status: ${response.status}`);
        }
    } catch (error) {
        console.error("An error occurred while uploading image:", error);
        throw error;
    }
}
;
const __TURBOPACK__default__export__ = get_image_url;
}),
"[project]/vania/Documents/Career/AutoCoder.cc/src/@base/EditableImg.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EditableImg",
    ()=>EditableImg,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/image.js [app-ssr] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$tools$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/tools/tools.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/lib/utils.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
// 并发控制：最多同时 3 个图片请求
const MAX_CONCURRENT = 3;
let activeCount = 0;
const waitQueue = [];
function acquireSlot() {
    if (activeCount < MAX_CONCURRENT) {
        activeCount++;
        return Promise.resolve();
    }
    return new Promise((resolve)=>{
        waitQueue.push(()=>{
            activeCount++;
            resolve();
        });
    });
}
function releaseSlot() {
    activeCount--;
    if (waitQueue.length > 0) {
        const next = waitQueue.shift();
        next();
    }
}
// 内存缓存：避免相同 keywords 重复请求
const imageCache = new Map();
function getCacheKey(keywords, orientation, propKey) {
    return `${keywords}|${orientation}|${propKey}`;
}
// 默认外观：作为可被覆盖的 className（不是内联 style），使用方 className 里的
// aspect-*/w-*/h-*/object-* 会经 cn(tailwind-merge) 正常覆盖它。
// 内联写死会压过使用方 className（内联优先级最高），导致图片在 aspect-square/h-full 等
// 容器里溢出——所以这里改成默认 class：不给尺寸时按 16/9 占位防 CLS，给了尺寸就被覆盖。
const DEFAULT_CLASS = 'object-cover aspect-[16/9] w-full h-full';
const extractProjectId = ()=>{
    if ("TURBOPACK compile-time truthy", 1) {
        return '';
    }
    //TURBOPACK unreachable
    ;
};
// 检测字符串是否为有效的网址
const isValidUrl = (string)=>{
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:' || url.protocol === 'blob:';
    } catch (_) {
        return false;
    }
};
const EditableImg = (props)=>{
    const { src, alt = '', className, propKey, style, keywords, description, needLargeImage = false, orientation = 'landscape', ...imgProps } = props;
    // 写了 src= 绑定（即使值为空）说明这是记录字段：字段为空时只占位，不做关键词取图，
    // 避免同一记录在不同页面按各自 fallback 关键词取到不同图。
    const hasSrcBinding = 'src' in props;
    const [imageSrc, setImageSrc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(src);
    const [imageAlt, setImageAlt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(alt);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isFromKeywordSearch, setIsFromKeywordSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false); // 新增状态
    const projectId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>extractProjectId(), []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setImageSrc(src);
        setIsFromKeywordSearch(false); // 来自 src prop 时,标记为非关键词搜索
    }, [
        src
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setImageAlt(alt);
    }, [
        alt
    ]);
    // 新增：根据 keywords 获取图片（带并发控制）
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!src && keywords && !hasSrcBinding) {
            // 检查 keywords 是否为有效的网址
            if (isValidUrl(keywords)) {
                // 如果是网址，直接使用
                setImageSrc(keywords);
            } else {
                // 如果不是网址，排队获取图片
                const cacheKey = getCacheKey(keywords, orientation, propKey);
                const cached = imageCache.get(cacheKey);
                if (cached) {
                    setImageSrc(cached);
                    setIsFromKeywordSearch(true);
                    return;
                }
                const abortController = new AbortController();
                let cancelled = false;
                acquireSlot().then(()=>{
                    if (cancelled) {
                        releaseSlot();
                        return;
                    }
                    // 拿到 slot 后才显示 loading，避免大量组件同时 spin
                    setLoading(true);
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$tools$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(keywords || description || '', orientation, propKey, projectId || '', description || '', needLargeImage, abortController.signal).then((url)=>{
                        if (!cancelled) {
                            imageCache.set(cacheKey, url);
                            setImageSrc(url);
                            setLoading(false);
                            setIsFromKeywordSearch(true);
                        }
                    }).catch((err)=>{
                        if (!cancelled && err?.name !== 'AbortError') {
                            setLoading(false);
                        }
                    }).finally(()=>{
                        releaseSlot();
                    });
                });
                return ()=>{
                    cancelled = true;
                    abortController.abort();
                };
            }
        }
    }, [
        keywords,
        src,
        orientation,
        propKey,
        projectId,
        description,
        needLargeImage,
        hasSrcBinding
    ]);
    const mergedStyle = {
        ...style
    };
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                ...mergedStyle,
                pointerEvents: 'none'
            },
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(DEFAULT_CLASS, 'flex items-center justify-center', className),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                className: "animate-spin",
                style: {
                    willChange: 'transform'
                }
            }, void 0, false, {
                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/@base/EditableImg.tsx",
                lineNumber: 174,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        }, propKey, false, {
            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/@base/EditableImg.tsx",
            lineNumber: 173,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (!imageSrc) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                ...mergedStyle,
                pointerEvents: 'none'
            },
            role: "img",
            "aria-label": imageAlt ?? undefined,
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(DEFAULT_CLASS, 'flex items-center justify-center bg-muted', className),
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                className: "w-6 h-6 text-muted-foreground/60"
            }, void 0, false, {
                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/@base/EditableImg.tsx",
                lineNumber: 188,
                columnNumber: 17
            }, ("TURBOPACK compile-time value", void 0))
        }, propKey, false, {
            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/@base/EditableImg.tsx",
            lineNumber: 181,
            columnNumber: 13
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"])("img", {
        ...imgProps,
        style: mergedStyle,
        key: propKey,
        src: imageSrc ?? undefined,
        alt: imageAlt ?? undefined,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])(DEFAULT_CLASS, className),
        "data-api-exclude-tracking": isFromKeywordSearch ? "true" : undefined,
        __source: {
            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/@base/EditableImg.tsx",
            lineNumber: 194,
            columnNumber: 9
        },
        __self: ("TURBOPACK compile-time value", void 0)
    });
};
const __TURBOPACK__default__export__ = EditableImg;
;
}),
"[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Hero
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f40$base$2f$EditableImg$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/@base/EditableImg.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/phone.js [app-ssr] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-ssr] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-ssr] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
"use client";
;
;
;
const copy = {
    en: {
        title: "Wiener Handwerk mit Präzision",
        subtitle: "Reliable apartment repairs, assembly, and renovation assistance across Vienna.",
        badgeRate: "From €15/hour baseline",
        disclaimer: "Materials, VAT, and travel surcharge calculated transparently.",
        btnQuote: "Request Free Quote",
        btnServices: "Explore Services",
        btnCall: "Call Now",
        feature1: "Fully compliant Freies Handwerk trade scope",
        feature2: "Vienna 1st–23rd districts & Lower Austria"
    },
    de: {
        title: "Wiener Handwerk mit Präzision",
        subtitle: "Zuverlässige Altbausanierung, Montage & Reparaturen in ganz Wien ab €15/Std.",
        badgeRate: "Ab €15/Std. Grundtarif",
        disclaimer: "Material, MwSt. und Anfahrt transparent und fair aufgeschlüsselt.",
        btnQuote: "Kostenloses Angebot",
        btnServices: "Leistungen ansehen",
        btnCall: "Direkt anrufen",
        feature1: "Konform nach österr. Gewerbeordnung (Freies Handwerk)",
        feature2: "1.–23. Bezirk & Umland Niederösterreich"
    },
    ru: {
        title: "Wiener Handwerk mit Präzision",
        subtitle: "Надёжный ремонт квартир, сборка и отделочные работы в Вене от €15/час.",
        badgeRate: "От €15/час базовая ставка",
        disclaimer: "Материалы, НДС и выезд рассчитываются прозрачно без скрытых комиссий.",
        btnQuote: "Рассчитать смету",
        btnServices: "Все услуги",
        btnCall: "Позвонить",
        feature1: "Соответствие австрийскому регламенту Freies Handwerk",
        feature2: "1–23 районы Вены и Нижняя Австрия"
    }
};
function Hero({ lang, onSelectQuoteCta, onSelectServicesCta }) {
    const t = copy[lang];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "data-controller-name": "Hero Banner",
        className: "relative w-full overflow-hidden border-b border-border bg-card text-card-foreground",
        "data-api-unique-id": "hero-rf979cb12d570dcac-s955500324",
        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/Hero",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 z-0 h-full w-full",
                "data-api-unique-id": "hero-r98dad1e9f58769eb-s955500324",
                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/Hero",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f40$base$2f$EditableImg$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        propKey: "hero-main-bg",
                        needLargeImage: true,
                        src: "https://www.autocoder.cc/background/zaki_prod/generated/cf64aaad68cb46d0a22f8fe5d1781acd.png",
                        alt: "Vienna Altbau apartment renovation carpentry tools",
                        keywords: "vienna altbau apartment renovation carpentry craftsmanship warm limestone",
                        description: "Vienna Altbau apartment renovation with historic wooden parquet, carpentry tools, warm natural light and limestone walls",
                        className: "h-full w-full object-cover object-center",
                        "data-api-unique-id": "hero-re6c72a6d03b105ba-s955500324",
                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/Hero"
                    }, void 0, false, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute inset-0 bg-background/5",
                        "data-api-unique-id": "hero-r58e2ac33fc268a8b-s955500324",
                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/Hero"
                    }, void 0, false, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28",
                "data-api-unique-id": "hero-rfc6c96cde790fb54-s955500324",
                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/Hero",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-2xl rounded-xl border border-border bg-card text-card-foreground p-6 sm:p-8 md:p-10 shadow-elevated",
                    "data-api-unique-id": "hero-r894f92694eb44907-s955500324",
                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/Hero",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-4 inline-flex items-center gap-2 rounded-md bg-muted text-muted-foreground px-3 py-1.5 text-xs sm:text-sm font-medium",
                            "data-api-unique-id": "hero-r507c8f2ea6703e5b-s955500324",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/Hero",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-block h-2 w-2 rounded-full bg-primary",
                                    "data-api-unique-id": "hero-rb725d4028ea46c9a-s955500324",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/Hero"
                                }, void 0, false, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx",
                                    lineNumber: 66,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold text-foreground",
                                    "data-api-unique-id": "hero-rc40a5d8d7c58fce5-s955500324",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/Hero",
                                    children: t.badgeRate
                                }, void 0, false, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx",
                                    lineNumber: 67,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-border",
                                    "data-api-unique-id": "hero-r9b03e57d2a58834e-s955500324",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/Hero",
                                    children: "|"
                                }, void 0, false, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx",
                                    lineNumber: 68,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "data-api-unique-id": "hero-r6a5524286b1ba6be-s955500324",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/Hero",
                                    children: "Vienna & Surroundings"
                                }, void 0, false, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx",
                                    lineNumber: 69,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx",
                            lineNumber: 65,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-card-foreground",
                            "data-api-unique-id": "hero-rcbc524a27ba6e4f3-s955500324",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/Hero",
                            children: t.title
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx",
                            lineNumber: 73,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-3 text-base sm:text-lg text-muted-foreground leading-relaxed",
                            "data-api-unique-id": "hero-r15dbb21bb7d60383-s955500324",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/Hero",
                            children: t.subtitle
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx",
                            lineNumber: 77,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-2 text-xs sm:text-sm text-muted-foreground border-l-2 border-primary pl-3",
                            "data-api-unique-id": "hero-r3585f592a4fe23a2-s955500324",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/Hero",
                            children: t.disclaimer
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx",
                            lineNumber: 81,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3",
                            "data-api-unique-id": "hero-rca91170eb577b661-s955500324",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/Hero",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onSelectQuoteCta,
                                    className: "inline-flex items-center justify-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-primary transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                                    "data-api-unique-id": "hero-r690f06255838bd22-s955500324",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/Hero",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "data-api-unique-id": "hero-r46a805329c0a5651-s955500324",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/Hero",
                                            children: t.btnQuote
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx",
                                            lineNumber: 88,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                            className: "h-4 w-4",
                                            "data-api-unique-id": "hero-rd548a79e6b1356be-s955500324",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/Hero"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx",
                                            lineNumber: 89,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx",
                                    lineNumber: 87,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: onSelectServicesCta,
                                    className: "inline-flex items-center justify-center gap-2 rounded-md border border-border bg-secondary px-5 py-3 text-sm font-medium text-secondary-foreground transition-colors hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                                    "data-api-unique-id": "hero-r3b7708da88a4f358-s955500324",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/Hero",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        "data-api-unique-id": "hero-r2e06e1283d423e65-s955500324",
                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/Hero",
                                        children: t.btnServices
                                    }, void 0, false, {
                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx",
                                        lineNumber: 93,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx",
                                    lineNumber: 92,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "tel:+431234567890",
                                    className: "inline-flex items-center justify-center gap-2 rounded-md border border-border bg-card px-4 py-3 text-sm font-medium text-card-foreground transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                                    "data-api-unique-id": "hero-r6db51e9560e8281d-s955500324",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/Hero",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                            className: "h-4 w-4 text-primary",
                                            "data-api-unique-id": "hero-r59449f1f4c920108-s955500324",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/Hero"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx",
                                            lineNumber: 97,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "data-api-unique-id": "hero-r0c98a559958665f9-s955500324",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/Hero",
                                            children: t.btnCall
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx",
                                            lineNumber: 98,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx",
                                    lineNumber: 96,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx",
                            lineNumber: 86,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 pt-4 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground",
                            "data-api-unique-id": "hero-r38541ea076e03096-s955500324",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/Hero",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    "data-api-unique-id": "hero-r76157555465ff538-s955500324",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/Hero",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                            className: "h-4 w-4 text-primary shrink-0",
                                            "data-api-unique-id": "hero-rc4dc4498d06abc9d-s955500324",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/Hero"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx",
                                            lineNumber: 105,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "data-api-unique-id": "hero-r64b1f37e15d1628b-s955500324",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/Hero",
                                            children: t.feature1
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx",
                                            lineNumber: 106,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx",
                                    lineNumber: 104,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    "data-api-unique-id": "hero-rdc892df9afc9aa25-s955500324",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/Hero",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                            className: "h-4 w-4 text-primary shrink-0",
                                            "data-api-unique-id": "hero-rf1e87b91a643f44e-s955500324",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/Hero"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx",
                                            lineNumber: 109,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "data-api-unique-id": "hero-rf617c750deb5cced-s955500324",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/Hero",
                                            children: t.feature2
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx",
                                            lineNumber: 110,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx",
                                    lineNumber: 108,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx",
                    lineNumber: 63,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx",
                lineNumber: 62,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx",
        lineNumber: 53,
        columnNumber: 10
    }, this);
}
}),
"[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>PricingTransparency
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$euro$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Euro$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/euro.js [app-ssr] (ecmascript) <export default as Euro>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/truck.js [app-ssr] (ecmascript) <export default as Truck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/file-text.js [app-ssr] (ecmascript) <export default as FileText>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
"use client";
;
;
const pricingCopy = {
    en: {
        sectionTitle: "Pricing & Cost Transparency",
        sectionSubtitle: "Honest benchmark rates with zero hidden fees under Austrian trade standards.",
        col1Title: "Baseline Rate",
        col1Value: "From €15 / hr",
        col1Desc: "Starting baseline for general assembly, assistance, and standard handyman tasks.",
        col2Title: "Materials & Supplies",
        col2Value: "Transparent Invoicing",
        col2Desc: "You can supply materials yourself or we source at actual receipt cost + handling.",
        col3Title: "Travel & Anfahrt",
        col3Value: "District Tier Flat Rate",
        col3Desc: "Tiered flat travel allowance across Vienna 1st–23rd districts (€15–€25 flat).",
        col4Title: "Austrian Invoicing",
        col4Value: "Official Business Invoice",
        col4Desc: "Proper invoice issued with legal tax breakdown suitable for landlord or insurance records.",
        guaranteeText: "Binding estimates provided before work commences. No surprise final bills."
    },
    de: {
        sectionTitle: "Preistransparenz & Kostenstruktur",
        sectionSubtitle: "Verbindliche Richtwerte ohne versteckte Kosten nach österreichischem Handwerksstandard.",
        col1Title: "Grundtarif",
        col1Value: "Ab €15 / Std.",
        col1Desc: "Einstiegs-Stundensatz für Montage-, Vorbereitungs- und allgemeine Hilfsarbeiten.",
        col2Title: "Materialien & Baubedarf",
        col2Value: "Transparente Abrechnung",
        col2Desc: "Eigenes Material stellen oder transparente Weiterberechnung mit Originalbeleg.",
        col3Title: "Anfahrtspauschale",
        col3Value: "Bezirksstaffel",
        col3Desc: "Faire Anfahrtspauschalen für alle 23 Wiener Bezirke (€15 bis €25 pauschal).",
        col4Title: "Rechnungswesen",
        col4Value: "Ordnungsgemäße Rechnung",
        col4Desc: "Offizielle Rechnung mit MwSt.-Ausweis für Hausverwaltung, Vermieter oder Versicherung.",
        guaranteeText: "Verbindliche Kostenschätzung vor Beginn. Keine überraschenden Nachforderungen."
    },
    ru: {
        sectionTitle: "Прозрачность цен и тарифы",
        sectionSubtitle: "Честные ориентировочные ставки без скрытых переплат по австрийским стандартам.",
        col1Title: "Базовый тариф",
        col1Value: "От €15 / час",
        col1Desc: "Начальная ставка на базовую сборку мебели, мелкий ремонт и вспомогательные работы.",
        col2Title: "Материалы",
        col2Value: "По чекам без наценки",
        col2Desc: "Вы можете предоставить свои материалы или мы закупим всё по магазинным чекам.",
        col3Title: "Выезд мастера",
        col3Value: "Фиксированная ставка",
        col3Desc: "Фиксированная стоимость выезда по 1–23 районам Вены (€15–€25).",
        col4Title: "Австрийский счёт",
        col4Value: "Официальный инвойс",
        col4Desc: "Официальная фактура с НДС для арендодателя, управляющей компании или страховой.",
        guaranteeText: "Окончательная смета утверждается до начала работ. Никаких непредвиденных доплат."
    }
};
function PricingTransparency({ lang }) {
    const t = pricingCopy[lang] || pricingCopy.en;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "data-controller-name": "Pricing Transparency",
        className: "w-full border-b border-border bg-card text-card-foreground py-14 sm:py-16",
        "data-api-unique-id": "pricingtransparency-rf9b4be8d5ebd0537-s3425617876",
        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4 sm:px-6 lg:px-8",
            "data-api-unique-id": "pricingtransparency-ra2ba9580c18f24f2-s3425617876",
            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-8",
                    "data-api-unique-id": "pricingtransparency-r7d61fd3dfe2c0c60-s3425617876",
                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-display text-2xl sm:text-3xl font-bold tracking-tight text-card-foreground",
                            "data-api-unique-id": "pricingtransparency-r5ebc8c67ce97fbfd-s3425617876",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                            children: t.sectionTitle
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-sm sm:text-base text-muted-foreground",
                            "data-api-unique-id": "pricingtransparency-rdda633638fd13e9d-s3425617876",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                            children: t.sectionSubtitle
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
                    "data-api-unique-id": "pricingtransparency-r8c9578edafa72521-s3425617876",
                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-lg border border-border bg-background text-foreground p-5 flex flex-col justify-between",
                            "data-api-unique-id": "pricingtransparency-r7ea30a5d1c252f42-s3425617876",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "data-api-unique-id": "pricingtransparency-rcb04e02b251958d1-s3425617876",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 text-primary mb-3",
                                            "data-api-unique-id": "pricingtransparency-r0c6f7928079d1b77-s3425617876",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$euro$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Euro$3e$__["Euro"], {
                                                    className: "h-5 w-5",
                                                    "data-api-unique-id": "pricingtransparency-r31241cc97eb75ad8-s3425617876",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency"
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                                    lineNumber: 83,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                                                    "data-api-unique-id": "pricingtransparency-r1b6d92295e35786c-s3425617876",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                                                    children: t.col1Title
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                                    lineNumber: 84,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                            lineNumber: 82,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-display text-2xl font-bold text-foreground",
                                            "data-api-unique-id": "pricingtransparency-r0d14ee6266c5b768-s3425617876",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                                            children: t.col1Value
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                            lineNumber: 88,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed",
                                            "data-api-unique-id": "pricingtransparency-rffa6348f9a0c208c-s3425617876",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                                            children: t.col1Desc
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                            lineNumber: 91,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                    lineNumber: 81,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 pt-3 border-t border-border flex items-center gap-1.5 text-xs text-muted-foreground",
                                    "data-api-unique-id": "pricingtransparency-r9d19bf7c6f106ba0-s3425617876",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                            className: "h-3.5 w-3.5 text-success",
                                            "data-api-unique-id": "pricingtransparency-rd087ee6374ab7eae-s3425617876",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                            lineNumber: 96,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "data-api-unique-id": "pricingtransparency-rff5d6bbee94d0e4c-s3425617876",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                                            children: "Standard tool set included"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                            lineNumber: 97,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                    lineNumber: 95,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-lg border border-border bg-background text-foreground p-5 flex flex-col justify-between",
                            "data-api-unique-id": "pricingtransparency-r0436afd16e6d1de2-s3425617876",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "data-api-unique-id": "pricingtransparency-r21fba434518c1835-s3425617876",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 text-primary mb-3",
                                            "data-api-unique-id": "pricingtransparency-r9650d18c2b08c5bc-s3425617876",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                    className: "h-5 w-5",
                                                    "data-api-unique-id": "pricingtransparency-r9d92b21b44130a9b-s3425617876",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency"
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                                    lineNumber: 105,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                                                    "data-api-unique-id": "pricingtransparency-r84662db33779d251-s3425617876",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                                                    children: t.col2Title
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                                    lineNumber: 106,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                            lineNumber: 104,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-display text-xl font-bold text-foreground",
                                            "data-api-unique-id": "pricingtransparency-r7ced2dec495109a7-s3425617876",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                                            children: t.col2Value
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                            lineNumber: 110,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed",
                                            "data-api-unique-id": "pricingtransparency-r0c4bf41af35df182-s3425617876",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                                            children: t.col2Desc
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                            lineNumber: 113,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                    lineNumber: 103,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 pt-3 border-t border-border flex items-center gap-1.5 text-xs text-muted-foreground",
                                    "data-api-unique-id": "pricingtransparency-r6d70a2e68a28de31-s3425617876",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                            className: "h-3.5 w-3.5 text-success",
                                            "data-api-unique-id": "pricingtransparency-r64958a89c79c80be-s3425617876",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                            lineNumber: 118,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "data-api-unique-id": "pricingtransparency-r5bdc76c704e00d44-s3425617876",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                                            children: "Obi / Hornbach original receipts"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                            lineNumber: 119,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                    lineNumber: 117,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-lg border border-border bg-background text-foreground p-5 flex flex-col justify-between",
                            "data-api-unique-id": "pricingtransparency-r3d5e24e69da02f0c-s3425617876",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "data-api-unique-id": "pricingtransparency-r84e4785e0a7662bf-s3425617876",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 text-primary mb-3",
                                            "data-api-unique-id": "pricingtransparency-r9fa7a202ba09d809-s3425617876",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$truck$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Truck$3e$__["Truck"], {
                                                    className: "h-5 w-5",
                                                    "data-api-unique-id": "pricingtransparency-r6e124d837ba4e91a-s3425617876",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency"
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                                    lineNumber: 127,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                                                    "data-api-unique-id": "pricingtransparency-r1153604dc810e3fb-s3425617876",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                                                    children: t.col3Title
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                                    lineNumber: 128,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                            lineNumber: 126,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-display text-xl font-bold text-foreground",
                                            "data-api-unique-id": "pricingtransparency-reb9f04fa00ddea2e-s3425617876",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                                            children: t.col3Value
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                            lineNumber: 132,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed",
                                            "data-api-unique-id": "pricingtransparency-re8e0db4e42b7af63-s3425617876",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                                            children: t.col3Desc
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                            lineNumber: 135,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                    lineNumber: 125,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 pt-3 border-t border-border flex items-center gap-1.5 text-xs text-muted-foreground",
                                    "data-api-unique-id": "pricingtransparency-r57a81a05041b2c63-s3425617876",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                            className: "h-3.5 w-3.5 text-success",
                                            "data-api-unique-id": "pricingtransparency-r40ed3740d73a0384-s3425617876",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                            lineNumber: 140,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "data-api-unique-id": "pricingtransparency-r3d7b617095c74b70-s3425617876",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                                            children: "No charge if cancelled 24h prior"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                            lineNumber: 141,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                    lineNumber: 139,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                            lineNumber: 124,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-lg border border-border bg-background text-foreground p-5 flex flex-col justify-between",
                            "data-api-unique-id": "pricingtransparency-r2e83107e0c674b3a-s3425617876",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "data-api-unique-id": "pricingtransparency-r509361a31418c674-s3425617876",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 text-primary mb-3",
                                            "data-api-unique-id": "pricingtransparency-r9acee159b217f6ce-s3425617876",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                    className: "h-5 w-5",
                                                    "data-api-unique-id": "pricingtransparency-r6b451c5394269687-s3425617876",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency"
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                                    lineNumber: 149,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                                                    "data-api-unique-id": "pricingtransparency-rd3649f2020c33842-s3425617876",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                                                    children: t.col4Title
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                                    lineNumber: 150,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                            lineNumber: 148,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "font-display text-xl font-bold text-foreground",
                                            "data-api-unique-id": "pricingtransparency-r1f90f4b2995a6bd9-s3425617876",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                                            children: t.col4Value
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                            lineNumber: 154,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed",
                                            "data-api-unique-id": "pricingtransparency-r6f2c1b984c318637-s3425617876",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                                            children: t.col4Desc
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                            lineNumber: 157,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                    lineNumber: 147,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 pt-3 border-t border-border flex items-center gap-1.5 text-xs text-muted-foreground",
                                    "data-api-unique-id": "pricingtransparency-r1883ede9b2d870ed-s3425617876",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                            className: "h-3.5 w-3.5 text-success",
                                            "data-api-unique-id": "pricingtransparency-rdc8496b1872ce59e-s3425617876",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                            lineNumber: 162,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "data-api-unique-id": "pricingtransparency-r3906e5c621c624ef-s3425617876",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                                            children: "UST & GewO compliant"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                            lineNumber: 163,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                    lineNumber: 161,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 rounded-md bg-muted text-muted-foreground p-4 text-xs sm:text-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border border-border",
                    "data-api-unique-id": "pricingtransparency-r69bd605ec576c278-s3425617876",
                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            "data-api-unique-id": "pricingtransparency-r919df3dcd2bdacd1-s3425617876",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "h-2 w-2 rounded-full bg-success shrink-0",
                                    "data-api-unique-id": "pricingtransparency-red999381ab9f1d27-s3425617876",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency"
                                }, void 0, false, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                    lineNumber: 171,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-medium text-foreground",
                                    "data-api-unique-id": "pricingtransparency-r7a5d3545d7b5a00d-s3425617876",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                                    children: t.guaranteeText
                                }, void 0, false, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                                    lineNumber: 172,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                            lineNumber: 170,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-xs text-muted-foreground",
                            "data-api-unique-id": "pricingtransparency-ra08bfbe47969fb9c-s3425617876",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/PricingTransparency",
                            children: "Vienna Handelsgericht & WKO registered"
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                            lineNumber: 174,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
                    lineNumber: 169,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
            lineNumber: 67,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx",
        lineNumber: 66,
        columnNumber: 10
    }, this);
}
}),
"[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ServicesGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f40$base$2f$EditableImg$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/@base/EditableImg.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-ssr] (ecmascript) <export default as ArrowUpRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hammer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Hammer$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/hammer.js [app-ssr] (ecmascript) <export default as Hammer>");
"use client";
;
;
;
;
const INTERIOR_KEYS = new Set([
    "ASSEMBLY",
    "FLOORING",
    "PAINTING",
    "BATHROOM_KITCHEN",
    "PLUMBING_MINOR",
    "service-assembly",
    "service-flooring",
    "service-painting",
    "service-bathroom-kitchen"
]);
const STRUCTURAL_KEYS = new Set([
    "DRYWALL",
    "DEMOLITION",
    "DOORS_WINDOWS",
    "COMMERCIAL",
    "service-drywall",
    "service-demolition",
    "service-doors-windows",
    "service-commercial"
]);
const ASSISTANCE_KEYS = new Set([
    "OUTDOOR",
    "MOVING",
    "service-outdoor",
    "service-moving"
]);
function getLocalizedTitle(item, lang) {
    if (lang === "de") return item.titleDe || item.titleEn;
    if (lang === "ru") return item.titleRu || item.titleEn;
    return item.titleEn || item.titleDe;
}
function getLocalizedDescription(item, lang) {
    if (lang === "de") return item.descriptionDe || item.descriptionEn || "";
    if (lang === "ru") return item.descriptionRu || item.descriptionEn || "";
    return item.descriptionEn || item.descriptionDe || "";
}
function getLocalizedCraftBadge(classification, lang) {
    if (classification === "MEISTER_KOOPERATION") {
        if (lang === "de") return "Meisterbetrieb";
        if (lang === "ru") return "Мастерская лицензия";
        return "Master Trade";
    }
    if (lang === "de") return "Freies Handwerk";
    if (lang === "ru") return "Свободное ремесло";
    return "Freies Handwerk";
}
function ServicesGrid({ lang, services = [], onSelectServiceForQuote, onInspectServiceDetail }) {
    const [activeFilter, setActiveFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("all");
    const filteredServices = services.filter((s)=>{
        if (activeFilter === "all") return true;
        if (activeFilter === "interior") return INTERIOR_KEYS.has(s.key) || INTERIOR_KEYS.has(s.id);
        if (activeFilter === "structural") return STRUCTURAL_KEYS.has(s.key) || STRUCTURAL_KEYS.has(s.id);
        if (activeFilter === "assistance") return ASSISTANCE_KEYS.has(s.key) || ASSISTANCE_KEYS.has(s.id);
        return true;
    });
    const featured = activeFilter === "all" ? filteredServices.filter((s)=>s.isFeatured) : [];
    const others = activeFilter === "all" ? filteredServices.filter((s)=>!s.isFeatured) : filteredServices;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "data-controller-name": "Service Categories Matrix",
        className: "w-full border-b border-border bg-background text-foreground py-14 sm:py-16",
        "data-api-unique-id": "servicesgrid-r2a358220eefb2468-s1370428328",
        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4 sm:px-6 lg:px-8",
            "data-api-unique-id": "servicesgrid-r39eb3d5e0be88a1a-s1370428328",
            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8",
                    "data-api-unique-id": "servicesgrid-r1393078b90f59b55-s1370428328",
                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            "data-api-unique-id": "servicesgrid-r05db5576169dee03-s1370428328",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground",
                                    "data-api-unique-id": "servicesgrid-rdcfbad085535e971-s1370428328",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                    children: lang === "de" ? "Leistungsübersicht Handwerk Wien" : lang === "ru" ? "Каталог услуг мастеров в Вене" : "Comprehensive Handyman Services"
                                }, void 0, false, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                    lineNumber: 58,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-sm sm:text-base text-muted-foreground",
                                    "data-api-unique-id": "servicesgrid-rbecf83c12987b808-s1370428328",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                    children: lang === "de" ? "Alle Gewerbezweige für Wohnung, Haus und Gewerbe im Überblick." : lang === "ru" ? "Все категории работ для квартир, домов и коммерческих помещений." : "All professional trade categories for homes, apartments, and businesses."
                                }, void 0, false, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                    lineNumber: 61,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                            lineNumber: 57,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap items-center gap-2",
                            "data-api-unique-id": "servicesgrid-rab3d5d6b3b74b615-s1370428328",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                            children: [
                                {
                                    id: "all",
                                    label: {
                                        en: `All (${services.length})`,
                                        de: `Alle (${services.length})`,
                                        ru: `Все (${services.length})`
                                    }
                                },
                                {
                                    id: "interior",
                                    label: {
                                        en: "Interior",
                                        de: "Innenausbau",
                                        ru: "Интерьер"
                                    }
                                },
                                {
                                    id: "structural",
                                    label: {
                                        en: "Structure",
                                        de: "Bau & Montage",
                                        ru: "Монтаж"
                                    }
                                },
                                {
                                    id: "assistance",
                                    label: {
                                        en: "Assistance",
                                        de: "Hilfe & Garten",
                                        ru: "Помощь"
                                    }
                                }
                            ].map((filter, index)=>{
                                const isSelected = activeFilter === filter.id;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setActiveFilter(filter.id),
                                    className: `rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${isSelected ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`,
                                    "data-api-unique-id": "servicesgrid-r2738706d7b26497b-s1370428328",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                    "data-api-in-loop": "1",
                                    "data-api-bind-info": `list-${index}-label.lang`,
                                    "data-api-map-var-name": "filter",
                                    children: filter.label[lang]
                                }, filter.id, false, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                    lineNumber: 98,
                                    columnNumber: 20
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                            lineNumber: 67,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this),
                activeFilter === "all" && featured.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8",
                    "data-api-unique-id": "servicesgrid-r81d67ebf7564ac6b-s1370428328",
                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                    children: featured.map((item, index)=>{
                        const title = getLocalizedTitle(item, lang);
                        const desc = getLocalizedDescription(item, lang);
                        const badge = getLocalizedCraftBadge(item.craftClassification, lang);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-6 rounded-xl border border-border bg-card text-card-foreground overflow-hidden flex flex-col shadow-soft transition-all hover:border-primary/50 cursor-pointer",
                            onClick: ()=>{
                                if (onInspectServiceDetail) {
                                    onInspectServiceDetail(item.id);
                                } else {
                                    onSelectServiceForQuote(item.id);
                                }
                            },
                            "data-api-unique-id": "servicesgrid-rcf81514176e269ab-s1370428328",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                            "data-api-in-loop": "1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative aspect-[16/10] w-full overflow-hidden bg-muted",
                                    "data-api-unique-id": "servicesgrid-r847a04e181569708-s1370428328",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                    "data-api-in-loop": "1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f40$base$2f$EditableImg$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                            propKey: `service-featured-${item.id}`,
                                            src: item.imageUrl || undefined,
                                            alt: title,
                                            className: "h-full w-full object-cover",
                                            "data-api-unique-id": "servicesgrid-r13efc065aaf62234-s1370428328",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                            "data-api-in-loop": "1"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                            lineNumber: 119,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "absolute top-3 left-3 flex flex-wrap gap-2",
                                            "data-api-unique-id": "servicesgrid-rd1b0316d667ee654-s1370428328",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                            "data-api-in-loop": "1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex shrink-0 whitespace-nowrap rounded-sm bg-accent text-accent-foreground px-2 py-0.5 text-xs font-semibold",
                                                    "data-api-unique-id": "servicesgrid-r72e1d9f3d0f10e48-s1370428328",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                                    "data-api-in-loop": "1",
                                                    children: badge
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                                    lineNumber: 121,
                                                    columnNumber: 23
                                                }, this),
                                                item.typicalRangeEur && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex shrink-0 whitespace-nowrap rounded-sm bg-muted text-muted-foreground px-2 py-0.5 text-xs font-medium border border-border",
                                                    "data-api-unique-id": "servicesgrid-r27319bcd43891d1c-s1370428328",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                                    "data-api-in-loop": "1",
                                                    "data-api-bind-info": `featured-${index}-typicalRangeEur`,
                                                    "data-api-map-var-name": "item",
                                                    children: item.typicalRangeEur
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                                    lineNumber: 124,
                                                    columnNumber: 48
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                            lineNumber: 120,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                    lineNumber: 118,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-6 flex flex-col flex-1 justify-between",
                                    "data-api-unique-id": "servicesgrid-r5290ef02c68a47e3-s1370428328",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                    "data-api-in-loop": "1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            "data-api-unique-id": "servicesgrid-r5a155fba253da64f-s1370428328",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                            "data-api-in-loop": "1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between gap-2",
                                                    "data-api-unique-id": "servicesgrid-r929d9c5f16bd895c-s1370428328",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                                    "data-api-in-loop": "1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-display text-xl font-bold text-card-foreground",
                                                            "data-api-unique-id": "servicesgrid-rf32c5f81f1c9c626-s1370428328",
                                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                                            "data-api-in-loop": "1",
                                                            children: title
                                                        }, void 0, false, {
                                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                                            lineNumber: 133,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col items-end",
                                                            "data-api-unique-id": "servicesgrid-r77be30ab6f15bd29-s1370428328",
                                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                                            "data-api-in-loop": "1",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-display font-semibold text-primary text-base whitespace-nowrap",
                                                                "data-api-unique-id": "servicesgrid-r027af5b6c7a606c5-s1370428328",
                                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                                                "data-api-in-loop": "1",
                                                                children: lang === "de" ? `Ab €${item.baselineHourlyRate}/Std.` : lang === "ru" ? `От €${item.baselineHourlyRate}/ч.` : `From €${item.baselineHourlyRate}/hr`
                                                            }, void 0, false, {
                                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                                                lineNumber: 137,
                                                                columnNumber: 27
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                                            lineNumber: 136,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                                    lineNumber: 132,
                                                    columnNumber: 23
                                                }, this),
                                                desc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-2 text-sm text-muted-foreground leading-relaxed",
                                                    "data-api-unique-id": "servicesgrid-r283cc2198b77600a-s1370428328",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                                    "data-api-in-loop": "1",
                                                    children: desc
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                                    lineNumber: 143,
                                                    columnNumber: 32
                                                }, this),
                                                item.leadArtisan && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-3 flex flex-wrap gap-1.5",
                                                    "data-api-unique-id": "servicesgrid-rea0b6b3bd9c0587f-s1370428328",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                                    "data-api-in-loop": "1",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "inline-flex items-center rounded-sm bg-muted text-muted-foreground px-2 py-0.5 text-[11px] border border-border",
                                                        "data-api-unique-id": "servicesgrid-ra3f05791e8313427-s1370428328",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                                        "data-api-in-loop": "1",
                                                        "data-api-bind-info": `featured-${index}-leadArtisan`,
                                                        "data-api-map-var-name": "item",
                                                        children: [
                                                            lang === "de" ? "Fachkraft: " : lang === "ru" ? "Мастер: " : "Artisan: ",
                                                            item.leadArtisan
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                                        lineNumber: 148,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                                    lineNumber: 147,
                                                    columnNumber: 44
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                            lineNumber: 131,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-5 pt-4 border-t border-border flex items-center justify-between",
                                            "data-api-unique-id": "servicesgrid-ra2f15e988c3cfb80-s1370428328",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                            "data-api-in-loop": "1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-muted-foreground flex items-center gap-1",
                                                    "data-api-unique-id": "servicesgrid-r73897b34592d203c-s1370428328",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                                    "data-api-in-loop": "1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                            className: "h-3.5 w-3.5 text-success",
                                                            "data-api-unique-id": "servicesgrid-r5b5212fd202f9b8a-s1370428328",
                                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                                            "data-api-in-loop": "1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                                            lineNumber: 157,
                                                            columnNumber: 25
                                                        }, this),
                                                        "Professional tools on-site"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                                    lineNumber: 156,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "button",
                                                    onClick: (e)=>{
                                                        e.stopPropagation();
                                                        onSelectServiceForQuote(item.id);
                                                    },
                                                    className: "inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                                    "data-api-unique-id": "servicesgrid-r375b24e115c3afdf-s1370428328",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                                    "data-api-in-loop": "1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            "data-api-unique-id": "servicesgrid-r3858a3063571954b-s1370428328",
                                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                                            "data-api-in-loop": "1",
                                                            children: lang === "de" ? "Angebot anfragen" : lang === "ru" ? "Запросить смету" : "Book This Service"
                                                        }, void 0, false, {
                                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                                            lineNumber: 164,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                                            className: "h-3.5 w-3.5",
                                                            "data-api-unique-id": "servicesgrid-r9771b54a9cdafbe7-s1370428328",
                                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                                            "data-api-in-loop": "1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                                            lineNumber: 167,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                                    lineNumber: 160,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                            lineNumber: 155,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                    lineNumber: 130,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, item.id, true, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                            lineNumber: 111,
                            columnNumber: 18
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                    lineNumber: 106,
                    columnNumber: 59
                }, this),
                filteredServices.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center py-12 text-muted-foreground text-sm",
                    "data-api-unique-id": "servicesgrid-ree071d77a8b7b32a-s1370428328",
                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                    children: lang === "de" ? "Keine Dienstleistungen in dieser Kategorie vorhanden." : lang === "ru" ? "В этой категории пока нет услуг." : "No services found in this category."
                }, void 0, false, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                    lineNumber: 176,
                    columnNumber: 42
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4",
                    "data-api-unique-id": "servicesgrid-rdc6a2139c36dd6f3-s1370428328",
                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                    children: others.map((item, index)=>{
                        const title = getLocalizedTitle(item, lang);
                        const desc = getLocalizedDescription(item, lang);
                        const badge = getLocalizedCraftBadge(item.craftClassification, lang);
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-lg border border-border bg-card text-card-foreground overflow-hidden flex flex-col justify-between shadow-soft transition-all hover:border-primary/40 hover:-translate-y-[1px] cursor-pointer",
                            onClick: ()=>{
                                if (onInspectServiceDetail) {
                                    onInspectServiceDetail(item.id);
                                } else {
                                    onSelectServiceForQuote(item.id);
                                }
                            },
                            "data-api-unique-id": "servicesgrid-re63b84c7406b2efe-s1370428328",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                            "data-api-in-loop": "1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "data-api-unique-id": "servicesgrid-r3f61ffa0ef0db837-s1370428328",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                    "data-api-in-loop": "1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative aspect-[4/3] w-full overflow-hidden bg-muted",
                                            "data-api-unique-id": "servicesgrid-r0eb7609427df7ab6-s1370428328",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                            "data-api-in-loop": "1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f40$base$2f$EditableImg$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                    propKey: `service-grid-${item.id}`,
                                                    src: item.imageUrl || undefined,
                                                    alt: title,
                                                    className: "h-full w-full object-cover",
                                                    "data-api-unique-id": "servicesgrid-ra5984249c5a7e9dd-s1370428328",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                                    "data-api-in-loop": "1"
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                                    lineNumber: 192,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute top-2 left-2 flex flex-wrap gap-1",
                                                    "data-api-unique-id": "servicesgrid-r37bedcfe3e0f745e-s1370428328",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                                    "data-api-in-loop": "1",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "rounded-sm bg-accent text-accent-foreground px-1.5 py-0.5 text-[10px] font-semibold",
                                                        "data-api-unique-id": "servicesgrid-r2cc053dd8052644b-s1370428328",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                                        "data-api-in-loop": "1",
                                                        children: badge
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                                        lineNumber: 194,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                                    lineNumber: 193,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                            lineNumber: 191,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-4",
                                            "data-api-unique-id": "servicesgrid-r840f481de5619003-s1370428328",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                            "data-api-in-loop": "1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start justify-between gap-1",
                                                    "data-api-unique-id": "servicesgrid-rfa0992da0b66af72-s1370428328",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                                    "data-api-in-loop": "1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-display text-base font-bold text-card-foreground",
                                                            "data-api-unique-id": "servicesgrid-ra32b297817ad0eb3-s1370428328",
                                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                                            "data-api-in-loop": "1",
                                                            children: title
                                                        }, void 0, false, {
                                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                                            lineNumber: 202,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex flex-col items-end shrink-0",
                                                            "data-api-unique-id": "servicesgrid-r817a6c8d4739bd81-s1370428328",
                                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                                            "data-api-in-loop": "1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs font-bold text-primary whitespace-nowrap",
                                                                    "data-api-unique-id": "servicesgrid-r1ff2a7051022bfc8-s1370428328",
                                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                                                    "data-api-in-loop": "1",
                                                                    "data-api-bind-info": `others-${index}-baselineHourlyRate`,
                                                                    "data-api-map-var-name": "item",
                                                                    children: [
                                                                        "€",
                                                                        item.baselineHourlyRate,
                                                                        "/h"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                                                    lineNumber: 206,
                                                                    columnNumber: 27
                                                                }, this),
                                                                item.typicalRangeEur && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] text-muted-foreground whitespace-nowrap",
                                                                    "data-api-unique-id": "servicesgrid-r97daeb3415523893-s1370428328",
                                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                                                    "data-api-in-loop": "1",
                                                                    "data-api-bind-info": `others-${index}-typicalRangeEur`,
                                                                    "data-api-map-var-name": "item",
                                                                    children: item.typicalRangeEur
                                                                }, void 0, false, {
                                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                                                    lineNumber: 209,
                                                                    columnNumber: 52
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                                            lineNumber: 205,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                                    lineNumber: 201,
                                                    columnNumber: 23
                                                }, this),
                                                desc && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "mt-1.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed",
                                                    "data-api-unique-id": "servicesgrid-r815057b846c3cfd0-s1370428328",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                                    "data-api-in-loop": "1",
                                                    children: desc
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                                    lineNumber: 215,
                                                    columnNumber: 32
                                                }, this),
                                                item.leadArtisan && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mt-2.5 flex flex-wrap gap-1",
                                                    "data-api-unique-id": "servicesgrid-rc931cb7b1f92108f-s1370428328",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                                    "data-api-in-loop": "1",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "rounded-sm bg-muted text-muted-foreground px-1.5 py-0.5 text-[10px] border border-border",
                                                        "data-api-unique-id": "servicesgrid-r5637b265dbf4f9bd-s1370428328",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                                        "data-api-in-loop": "1",
                                                        "data-api-bind-info": `others-${index}-leadArtisan`,
                                                        "data-api-map-var-name": "item",
                                                        children: item.leadArtisan
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                                        lineNumber: 220,
                                                        columnNumber: 27
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                                    lineNumber: 219,
                                                    columnNumber: 44
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                            lineNumber: 200,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                    lineNumber: 190,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-4 pt-0",
                                    "data-api-unique-id": "servicesgrid-r58823a56cd945a2f-s1370428328",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                    "data-api-in-loop": "1",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: (e)=>{
                                            e.stopPropagation();
                                            onSelectServiceForQuote(item.id);
                                        },
                                        className: "w-full inline-flex items-center justify-center gap-1.5 rounded-md border border-border bg-secondary py-2 text-xs font-medium text-secondary-foreground transition-colors hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                        "data-api-unique-id": "servicesgrid-rc48183f35308c85c-s1370428328",
                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                        "data-api-in-loop": "1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$hammer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Hammer$3e$__["Hammer"], {
                                                className: "h-3 w-3 text-primary",
                                                "data-api-unique-id": "servicesgrid-r3824f84d48627a90-s1370428328",
                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                                "data-api-in-loop": "1"
                                            }, void 0, false, {
                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                                lineNumber: 232,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                "data-api-unique-id": "servicesgrid-r27dc993e3c2283bf-s1370428328",
                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServicesGrid",
                                                "data-api-in-loop": "1",
                                                children: lang === "de" ? "Auswählen & kalkulieren" : lang === "ru" ? "Выбрать и рассчитать" : "Select & Estimate"
                                            }, void 0, false, {
                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                                lineNumber: 233,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                        lineNumber: 228,
                                        columnNumber: 21
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                                    lineNumber: 227,
                                    columnNumber: 19
                                }, this)
                            ]
                        }, item.id, true, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                            lineNumber: 183,
                            columnNumber: 18
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
                    lineNumber: 178,
                    columnNumber: 20
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
            lineNumber: 54,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx",
        lineNumber: 53,
        columnNumber: 10
    }, this);
}
}),
"[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LegalTradeScope
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-ssr] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as AlertTriangle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-ssr] (ecmascript) <export default as XCircle>");
"use client";
;
;
const legalCopy = {
    en: {
        title: "Legal Trade Scope & Austrian GewO Compliance",
        subtitle: "Strict distinction between permitted handyman tasks and specialized work requiring licensed Meister trades.",
        leftColTitle: "Permitted Handyman Tasks (Freies Handwerk)",
        leftColDesc: "Covered legally by standard Austrian trade registration without special concession restrictions.",
        rightColTitle: "Specialized Works Requiring Licensed Meister",
        rightColDesc: "Austrian law mandates licensed Elektrotechniker or Gas-/Wasser-Installateur trade cards. We can coordinate with certified partners.",
        permitted: [
            "Assembly of flat-pack furniture (IKEA, Mömax, XXXLutz) & kitchen units",
            "Floating floor installation (laminate, vinyl, click parquet) & baseboards",
            "Interior painting, ceiling coatings, minor drywall partition repairs",
            "Mounting curtain rods, mirrors, shelves, wall brackets, and fixtures",
            "Sanitary assistance: silicone renewal, shower curtain mounting, mixer tap replacement without pipe alterations",
            "Light non-structural demolition, tile stripping, and proper rubble removal"
        ],
        restricted: [
            "Main fuse box wiring, new electrical circuit laying (Elektrotechniker duty)",
            "Gas connection alterations or gas boiler servicing (Installateur Meisterpflicht)",
            "Under-floor central plumbing restructuring or main water shut-off rebuilds",
            "Structural load-bearing wall removals or building envelope masonry",
            "Chimney or roof alterations requiring municipal building notices"
        ],
        note: "All tasks performed adhere to the Austrian Gewerbeordnung (GewO 1994). If your project requires a licensed Meister, we provide verified Austrian partner coordination."
    },
    de: {
        title: "Rechtliche Gewerbegrenzen & GewO-Konformität",
        subtitle: "Eindeutige Abgrenzung zwischen freiem Handwerk und konzessionspflichtigen Meisterbetrieben in Österreich.",
        leftColTitle: "Zulässige Leistungen (Freies Handwerk)",
        leftColDesc: "Vollständig gedeckt durch den Gewerbeschein für freie Gewerbe nach österreichischer Gewerbeordnung.",
        rightColTitle: "Konzessionspflichtige Arbeiten (Meisterbetrieb)",
        rightColDesc: "Vorbehalten für behördlich konzessionierte Elektrotechniker & Gas-/Wasser-Installateure.",
        permitted: [
            "Aufbau von Fertigmöbeln (IKEA, XXXLutz etc.) und Hängeschränken",
            "Verlegung von Klick-Laminat, Vinylböden und Sockelleisten",
            "Malerarbeiten im Innenbereich, Ausspachteln von Bohrlöchern und Rissen",
            "Wandmontagen: Bilder, Spiegel, Gardinenleisten, TV-Halterungen",
            "Silikonfugen-Erneuerung, Duschabtrennungen, Armaturentausch ohne Leitungseingriff",
            "Leichte Abbrucharbeiten, Teppichentfernung & Abtransport zum Mistplatz (MA48)"
        ],
        restricted: [
            "Elektroinstallationen am Hauptverteiler & Neuverlegung von Stromkreisen",
            "Eingriffe in Gasleitungen und Thermenwartung (strikte Meisterpflicht)",
            "Umbau der Hauptwasserleitungen vor dem Absperrventil",
            "Eingriffe in tragende Mauern oder statische Bauteile",
            "Dach- und Kaminarbeiten mit baubehördlicher Anzeigepflicht"
        ],
        note: "Wir arbeiten streng nach der österreichischen Gewerbeordnung (GewO 1994). Für meisterpflichtige Teilbereiche vermitteln wir gerne geprüfte Wiener Partnerbetriebe."
    },
    ru: {
        title: "Правовые границы и австрийский регламент GewO",
        subtitle: "Чёткое разделение между разрешёнными работами мастера и лицензируемыми профессиями (Meisterbetrieb).",
        leftColTitle: "Разрешённые работы (Freies Handwerk)",
        leftColDesc: "Полностью покрываются стандартным австрийским патентом на ремонтные услуги без лицензии Meister.",
        rightColTitle: "Специализированные работы (Только Meister)",
        rightColDesc: "По австрийскому закону требуют лицензии электрика (Elektrotechniker) или сантехника (Installateur).",
        permitted: [
            "Сборка корпусной мебели (IKEA, Lutz), кухонных шкафов и полок",
            "Укладка замкового ламината, винила и плинтусов",
            "Покраска стен и потолков, шпаклевка отверстий и трещин",
            "Монтаж карнизов, зеркал, полок и настенных ТВ-кронштейнов",
            "Замена силикона в ванной, монтаж шторок, замена смесителей без врезки в трубы",
            "Демонтаж плитки, старых покрытий и вывоз мусора в пункты MA48"
        ],
        restricted: [
            "Работы в электрощите и прокладка новых силовых линий",
            "Любые работы с газовыми трубами и котлами (строгий Meister)",
            "Перенос центральных стояков водоснабжения",
            "Снос несущих стен и изменения в несущих конструкциях",
            "Кровельные и фасадные работы, требующие разрешения магистрата"
        ],
        note: "Мы строго соблюдаем законодательство Австрии (GewO 1994). При необходимости мы координируем работы с сертифицированными мастерами Вены."
    }
};
function LegalTradeScope({ lang }) {
    const t = legalCopy[lang];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "data-controller-name": "Legal Trade Scope Notice",
        className: "w-full border-b border-border bg-card text-card-foreground py-14 sm:py-16",
        "data-api-unique-id": "legaltradescope-rdad0a6f00fe59c82-s2900554314",
        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4 sm:px-6 lg:px-8",
            "data-api-unique-id": "legaltradescope-r6550e0f038af48ef-s2900554314",
            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-3xl mb-8",
                    "data-api-unique-id": "legaltradescope-rbf7378d4d9a01bbf-s2900554314",
                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "inline-flex items-center gap-1.5 rounded-sm bg-muted text-muted-foreground px-2.5 py-1 text-xs font-semibold border border-border mb-2",
                            "data-api-unique-id": "legaltradescope-r25d0617d4b063565-s2900554314",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                    className: "h-4 w-4 text-primary",
                                    "data-api-unique-id": "legaltradescope-r791a49d45c6ad628-s2900554314",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope"
                                }, void 0, false, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                                    lineNumber: 52,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "data-api-unique-id": "legaltradescope-r2f076be1a2db02ba-s2900554314",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                                    children: "WKO & GewO 1994 Compliance"
                                }, void 0, false, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                                    lineNumber: 53,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-display text-2xl sm:text-3xl font-bold tracking-tight text-card-foreground",
                            "data-api-unique-id": "legaltradescope-r1929e1815f273355-s2900554314",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                            children: t.title
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-sm sm:text-base text-muted-foreground",
                            "data-api-unique-id": "legaltradescope-r197b21c153dcc514-s2900554314",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                            children: t.subtitle
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                            lineNumber: 58,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                    "data-api-unique-id": "legaltradescope-r9b5c4be76216cd34-s2900554314",
                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl border border-border bg-background text-foreground p-6 flex flex-col justify-between",
                            "data-api-unique-id": "legaltradescope-rf486cb897fc831bc-s2900554314",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "data-api-unique-id": "legaltradescope-r489f5edd1fc969d4-s2900554314",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mb-2",
                                            "data-api-unique-id": "legaltradescope-ra093568a7e36daf2-s2900554314",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex h-7 w-7 items-center justify-center rounded-full bg-success text-success-foreground",
                                                    "data-api-unique-id": "legaltradescope-rada0e89d0ab1c8a5-s2900554314",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                        className: "h-4 w-4",
                                                        "data-api-unique-id": "legaltradescope-r28057b8ff9b7423f-s2900554314",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope"
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                                                        lineNumber: 70,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                                                    lineNumber: 69,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-display text-lg font-bold text-foreground",
                                                    "data-api-unique-id": "legaltradescope-rc111a3eecdaf7e9e-s2900554314",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                                                    children: t.leftColTitle
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                                                    lineNumber: 72,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                                            lineNumber: 68,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs sm:text-sm text-muted-foreground mb-4",
                                            "data-api-unique-id": "legaltradescope-rf7466b3ff07c97b2-s2900554314",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                                            children: t.leftColDesc
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                                            lineNumber: 76,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "space-y-2.5 text-xs sm:text-sm text-foreground",
                                            "data-api-unique-id": "legaltradescope-rc8815609541e6399-s2900554314",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                                            children: t.permitted.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "flex items-start gap-2.5",
                                                    "data-api-unique-id": "legaltradescope-ref5e6d3364ce1414-s2900554314",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                                                    "data-api-in-loop": "1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "mt-1 h-1.5 w-1.5 rounded-full bg-success shrink-0",
                                                            "data-api-unique-id": "legaltradescope-r284b0dead9065689-s2900554314",
                                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                                                            "data-api-in-loop": "1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                                                            lineNumber: 82,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            "data-api-unique-id": "legaltradescope-r3263d53cbae0c51e-s2900554314",
                                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                                                            "data-api-in-loop": "1",
                                                            "data-api-bind-info": `t.permitted-${index}-$item`,
                                                            "data-api-map-var-name": "item",
                                                            children: item
                                                        }, void 0, false, {
                                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                                                            lineNumber: 83,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, index, true, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                                                    lineNumber: 81,
                                                    columnNumber: 51
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                                            lineNumber: 80,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                                    lineNumber: 67,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground",
                                    "data-api-unique-id": "legaltradescope-r11630d5855ef7ab1-s2900554314",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "data-api-unique-id": "legaltradescope-rc718c6d2e64d2929-s2900554314",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                                            children: "Status: Freies Gewerbe"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                                            lineNumber: 88,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-success font-medium",
                                            "data-api-unique-id": "legaltradescope-re72c33cc7385d1a6-s2900554314",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                                            children: "100% In-House Direct"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                                            lineNumber: 89,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                                    lineNumber: 87,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-xl border border-border bg-background text-foreground p-6 flex flex-col justify-between",
                            "data-api-unique-id": "legaltradescope-rda22514224f00158-s2900554314",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "data-api-unique-id": "legaltradescope-rd932a46cfb85d390-s2900554314",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2 mb-2",
                                            "data-api-unique-id": "legaltradescope-r672daef2ead336d2-s2900554314",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex h-7 w-7 items-center justify-center rounded-full bg-warning text-warning-foreground",
                                                    "data-api-unique-id": "legaltradescope-rd4d095b4d09a0393-s2900554314",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__AlertTriangle$3e$__["AlertTriangle"], {
                                                        className: "h-4 w-4",
                                                        "data-api-unique-id": "legaltradescope-rb10b07b809bd6c87-s2900554314",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope"
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                                                        lineNumber: 98,
                                                        columnNumber: 19
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                                                    lineNumber: 97,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "font-display text-lg font-bold text-foreground",
                                                    "data-api-unique-id": "legaltradescope-rcdf965fd05d3466f-s2900554314",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                                                    children: t.rightColTitle
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                                                    lineNumber: 100,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                                            lineNumber: 96,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs sm:text-sm text-muted-foreground mb-4",
                                            "data-api-unique-id": "legaltradescope-r8cf9d86be457108a-s2900554314",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                                            children: t.rightColDesc
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                                            lineNumber: 104,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "space-y-2.5 text-xs sm:text-sm text-muted-foreground",
                                            "data-api-unique-id": "legaltradescope-re52044a43a2f1bec-s2900554314",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                                            children: t.restricted.map((item, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    className: "flex items-start gap-2.5",
                                                    "data-api-unique-id": "legaltradescope-r35bdfde17d524015-s2900554314",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                                                    "data-api-in-loop": "1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                            className: "mt-0.5 h-3.5 w-3.5 text-destructive shrink-0",
                                                            "data-api-unique-id": "legaltradescope-r5976f7a2600535ff-s2900554314",
                                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                                                            "data-api-in-loop": "1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                                                            lineNumber: 110,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            "data-api-unique-id": "legaltradescope-re30936184f1c8a79-s2900554314",
                                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                                                            "data-api-in-loop": "1",
                                                            "data-api-bind-info": `t.restricted-${index}-$item`,
                                                            "data-api-map-var-name": "item",
                                                            children: item
                                                        }, void 0, false, {
                                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                                                            lineNumber: 111,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, index, true, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                                                    lineNumber: 109,
                                                    columnNumber: 52
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                                            lineNumber: 108,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                                    lineNumber: 95,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-6 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground",
                                    "data-api-unique-id": "legaltradescope-r127b113b91a9aaba-s2900554314",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "data-api-unique-id": "legaltradescope-ra9d49b36c879eeaf-s2900554314",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                                            children: "Status: Reglementiertes Gewerbe"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                                            lineNumber: 116,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-warning font-medium",
                                            "data-api-unique-id": "legaltradescope-r1b2216224e4653c3-s2900554314",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                                            children: "Partner Coordination"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                                            lineNumber: 117,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                                    lineNumber: 115,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                            lineNumber: 94,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                    lineNumber: 64,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-6 rounded-lg bg-muted text-muted-foreground p-4 text-xs border border-border",
                    "data-api-unique-id": "legaltradescope-r071def7cc2f438b2-s2900554314",
                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "leading-relaxed",
                        "data-api-unique-id": "legaltradescope-r872cbba306b5ce36-s2900554314",
                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/LegalTradeScope",
                        children: t.note
                    }, void 0, false, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                        lineNumber: 124,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
                    lineNumber: 123,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
            lineNumber: 49,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx",
        lineNumber: 48,
        columnNumber: 10
    }, this);
}
}),
"[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/HowItWorks.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HowItWorks
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/camera.js [app-ssr] (ecmascript) <export default as Camera>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/calculator.js [app-ssr] (ecmascript) <export default as Calculator>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarCheck$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/calendar-check.js [app-ssr] (ecmascript) <export default as CalendarCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
"use client";
;
;
const stepsData = [
    {
        stepNumber: "01",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"],
        title: {
            en: "Initial Inquiry",
            de: "Kostenlose Anfrage",
            ru: "Заявка и описание"
        },
        desc: {
            en: "Submit tasks via form, phone, or WhatsApp with your Vienna district postal code.",
            de: "Aufgaben per Formular, Anruf oder WhatsApp mit Angabe Ihres Wiener Bezirks übermitteln.",
            ru: "Отправьте заявку через форму, по телефону или в WhatsApp с указанием района Вены."
        }
    },
    {
        stepNumber: "02",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$camera$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Camera$3e$__["Camera"],
        title: {
            en: "Photos & Dimensions",
            de: "Fotos & Maße",
            ru: "Фото и замеры"
        },
        desc: {
            en: "Upload photos of the room, furniture, or damage for an accurate time and tool estimate.",
            de: "Fotos der Möbel, Wände oder Mängel senden für eine exakte Werkzeug- und Zeiteinschätzung.",
            ru: "Пришлите фото помещения или мебели для точной оценки времени и необходимого инструмента."
        }
    },
    {
        stepNumber: "03",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calculator$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Calculator$3e$__["Calculator"],
        title: {
            en: "Transparent Quote",
            de: "Transparenter Kostenvoranschlag",
            ru: "Расчёт сметы"
        },
        desc: {
            en: "Receive an itemized estimate (€15/hr baseline + flat travel + materials if requested).",
            de: "Sie erhalten ein faires Angebot mit transparenter Stundenaufschlüsselung und Anfahrt.",
            ru: "Получите прозрачную смету с разбивкой по часам, выезду и материалам."
        }
    },
    {
        stepNumber: "04",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CalendarCheck$3e$__["CalendarCheck"],
        title: {
            en: "Scheduled Execution",
            de: "Pünktliche Ausführung",
            ru: "Выезд и выполнение"
        },
        desc: {
            en: "Craftsman arrives on time equipped with professional Makita/Bosch tools and supplies.",
            de: "Pünktliches Eintreffen mit professionellem Profi-Werkzeug und Verbrauchsmaterialien.",
            ru: "Мастер приезжает вовремя с профессиональным инструментом и расходниками."
        }
    },
    {
        stepNumber: "05",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"],
        title: {
            en: "Acceptance & Invoice",
            de: "Abnahme & Rechnung",
            ru: "Приёмка и счёт"
        },
        desc: {
            en: "Inspect completed work together, approve results, and receive a compliant tax invoice.",
            de: "Gemeinsame Qualitätsabnahme und Erhalt einer ordnungsgemäßen Rechnung mit MwSt.",
            ru: "Совместная проверка качества и получение официального счета с НДС."
        }
    }
];
function HowItWorks({ lang }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "data-controller-name": "How It Works Timeline",
        className: "w-full border-b border-border bg-background text-foreground py-14 sm:py-16",
        "data-api-unique-id": "howitworks-r0d4679e9e7485d94-s2664622954",
        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/HowItWorks",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4 sm:px-6 lg:px-8",
            "data-api-unique-id": "howitworks-r7d3cd806f0b6a990-s2664622954",
            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/HowItWorks",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mb-10 text-center max-w-2xl mx-auto",
                    "data-api-unique-id": "howitworks-r58605e73df3840aa-s2664622954",
                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/HowItWorks",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground",
                            "data-api-unique-id": "howitworks-r29d5e9bb0faf1d8e-s2664622954",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/HowItWorks",
                            children: lang === "de" ? "In 5 Schritten zur fertigen Arbeit" : lang === "ru" ? "5 простых шагов от заявки до результата" : "How It Works: 5-Step Clear Process"
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/HowItWorks.tsx",
                            lineNumber: 81,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-sm sm:text-base text-muted-foreground",
                            "data-api-unique-id": "howitworks-r3850cd27c6338e72-s2664622954",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/HowItWorks",
                            children: lang === "de" ? "Präzise, termintreu und ohne bürokratischen Mehraufwand." : lang === "ru" ? "Пунктуально, надёжно и без лишней бюрократии." : "Predictable, punctual, and free of bureaucratic friction."
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/HowItWorks.tsx",
                            lineNumber: 84,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/HowItWorks.tsx",
                    lineNumber: 80,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4",
                    "data-api-unique-id": "howitworks-r1e4ec39c8bd854f4-s2664622954",
                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/HowItWorks",
                    children: stepsData.map((s, index)=>{
                        const Icon = s.icon;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "relative rounded-lg border border-border bg-card text-card-foreground p-5 flex flex-col justify-between shadow-soft",
                            "data-api-unique-id": "howitworks-r07424c0af3938ade-s2664622954",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/HowItWorks",
                            "data-api-in-loop": "1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "data-api-unique-id": "howitworks-rce8e4ad0e3e8f034-s2664622954",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/HowItWorks",
                                    "data-api-in-loop": "1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between mb-4",
                                            "data-api-unique-id": "howitworks-rd6c82463ac3e7f54-s2664622954",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/HowItWorks",
                                            "data-api-in-loop": "1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-display text-xl font-bold text-primary",
                                                    "data-api-unique-id": "howitworks-r0fd71d875795eec8-s2664622954",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/HowItWorks",
                                                    "data-api-in-loop": "1",
                                                    "data-api-bind-info": `stepsData-${index}-stepNumber`,
                                                    "data-api-map-var-name": "s",
                                                    children: s.stepNumber
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/HowItWorks.tsx",
                                                    lineNumber: 96,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex h-8 w-8 items-center justify-center rounded-md bg-muted text-foreground border border-border",
                                                    "data-api-unique-id": "howitworks-r13f7925ffa96e219-s2664622954",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/HowItWorks",
                                                    "data-api-in-loop": "1",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                                        className: "h-4 w-4",
                                                        "data-api-bind-info": `stepsData-${index}-icon`,
                                                        "data-api-map-var-name": "s",
                                                        "data-api-unique-id": "howitworks-rfb46120d4e63eab0-s2664622954",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/HowItWorks",
                                                        "data-api-in-loop": "1"
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/HowItWorks.tsx",
                                                        lineNumber: 100,
                                                        columnNumber: 23
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/HowItWorks.tsx",
                                                    lineNumber: 99,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/HowItWorks.tsx",
                                            lineNumber: 95,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-display text-base font-bold text-card-foreground",
                                            "data-api-unique-id": "howitworks-r9a7b3f62028fd9c9-s2664622954",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/HowItWorks",
                                            "data-api-in-loop": "1",
                                            "data-api-bind-info": `stepsData-${index}-title.lang`,
                                            "data-api-map-var-name": "s",
                                            children: s.title[lang]
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/HowItWorks.tsx",
                                            lineNumber: 104,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-2 text-xs text-muted-foreground leading-relaxed",
                                            "data-api-unique-id": "howitworks-r51040f22ac1b7065-s2664622954",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/HowItWorks",
                                            "data-api-in-loop": "1",
                                            "data-api-bind-info": `stepsData-${index}-desc.lang`,
                                            "data-api-map-var-name": "s",
                                            children: s.desc[lang]
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/HowItWorks.tsx",
                                            lineNumber: 107,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/HowItWorks.tsx",
                                    lineNumber: 94,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-4 pt-3 border-t border-border flex items-center gap-1 text-[11px] text-muted-foreground",
                                    "data-api-unique-id": "howitworks-r6047e499d8dbef25-s2664622954",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/HowItWorks",
                                    "data-api-in-loop": "1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "h-1.5 w-1.5 rounded-full bg-primary",
                                            "data-api-unique-id": "howitworks-r404952c11defc81e-s2664622954",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/HowItWorks",
                                            "data-api-in-loop": "1"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/HowItWorks.tsx",
                                            lineNumber: 113,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "data-api-unique-id": "howitworks-r763840915552cf0d-s2664622954",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/HowItWorks",
                                            "data-api-in-loop": "1",
                                            children: "Verified Step"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/HowItWorks.tsx",
                                            lineNumber: 114,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/HowItWorks.tsx",
                                    lineNumber: 112,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, s.stepNumber, true, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/HowItWorks.tsx",
                            lineNumber: 93,
                            columnNumber: 18
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/HowItWorks.tsx",
                    lineNumber: 90,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/HowItWorks.tsx",
            lineNumber: 79,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/HowItWorks.tsx",
        lineNumber: 78,
        columnNumber: 10
    }, this);
}
}),
"[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/select.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Select",
    ()=>Select,
    "SelectContent",
    ()=>SelectContent,
    "SelectGroup",
    ()=>SelectGroup,
    "SelectItem",
    ()=>SelectItem,
    "SelectLabel",
    ()=>SelectLabel,
    "SelectScrollDownButton",
    ()=>SelectScrollDownButton,
    "SelectScrollUpButton",
    ()=>SelectScrollUpButton,
    "SelectSeparator",
    ()=>SelectSeparator,
    "SelectTrigger",
    ()=>SelectTrigger,
    "SelectValue",
    ()=>SelectValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$select$40$2$2e$3$2e$8_$40$types$2b$react$2d$dom$40$19$2e$3$2e$0_$40$types$2b$react$40$19$2e$3$2e$0_$5f40$types$2b$react$40$_34ec1de1099e5f0bf822b110d5b01f4b$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/@radix-ui+react-select@2.3.8_@types+react-dom@19.3.0_@types+react@19.3.0__@types+react@_34ec1de1099e5f0bf822b110d5b01f4b/node_modules/@radix-ui/react-select/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-ssr] (ecmascript) <export default as ChevronUpIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/lib/utils.ts [app-ssr] (ecmascript)");
'use client';
;
;
;
;
function Select({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        "data-slot": "select",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$select$40$2$2e$3$2e$8_$40$types$2b$react$2d$dom$40$19$2e$3$2e$0_$40$types$2b$react$40$19$2e$3$2e$0_$5f40$types$2b$react$40$_34ec1de1099e5f0bf822b110d5b01f4b$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Root"], {
            ...props,
            children: children
        }, void 0, false, {
            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/select.tsx",
            lineNumber: 13,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/select.tsx",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
function SelectGroup({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$select$40$2$2e$3$2e$8_$40$types$2b$react$2d$dom$40$19$2e$3$2e$0_$40$types$2b$react$40$19$2e$3$2e$0_$5f40$types$2b$react$40$_34ec1de1099e5f0bf822b110d5b01f4b$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Group"], {
        "data-slot": "select-group",
        ...props
    }, void 0, false, {
        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/select.tsx",
        lineNumber: 22,
        columnNumber: 10
    }, this);
}
function SelectValue({ ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$select$40$2$2e$3$2e$8_$40$types$2b$react$2d$dom$40$19$2e$3$2e$0_$40$types$2b$react$40$19$2e$3$2e$0_$5f40$types$2b$react$40$_34ec1de1099e5f0bf822b110d5b01f4b$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Value"], {
        "data-slot": "select-value",
        translate: "no",
        ...props
    }, void 0, false, {
        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/select.tsx",
        lineNumber: 27,
        columnNumber: 10
    }, this);
}
function SelectTrigger({ className, size = 'default', children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$select$40$2$2e$3$2e$8_$40$types$2b$react$2d$dom$40$19$2e$3$2e$0_$40$types$2b$react$40$19$2e$3$2e$0_$5f40$types$2b$react$40$_34ec1de1099e5f0bf822b110d5b01f4b$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Trigger"], {
        "data-slot": "select-trigger",
        "data-size": size,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 box-border flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent py-2 text-sm leading-none whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", "px-3", size === 'sm' ? 'h-8' : 'h-9', className),
        ...props,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$select$40$2$2e$3$2e$8_$40$types$2b$react$2d$dom$40$19$2e$3$2e$0_$40$types$2b$react$40$19$2e$3$2e$0_$5f40$types$2b$react$40$_34ec1de1099e5f0bf822b110d5b01f4b$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Icon"], {
                asChild: true,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                    className: "size-4 opacity-50"
                }, void 0, false, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/select.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/select.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/select.tsx",
        lineNumber: 38,
        columnNumber: 5
    }, this);
}
function SelectContent({ className, children, position = 'popper', ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$select$40$2$2e$3$2e$8_$40$types$2b$react$2d$dom$40$19$2e$3$2e$0_$40$types$2b$react$40$19$2e$3$2e$0_$5f40$types$2b$react$40$_34ec1de1099e5f0bf822b110d5b01f4b$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Portal"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$select$40$2$2e$3$2e$8_$40$types$2b$react$2d$dom$40$19$2e$3$2e$0_$40$types$2b$react$40$19$2e$3$2e$0_$5f40$types$2b$react$40$_34ec1de1099e5f0bf822b110d5b01f4b$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Content"], {
            "data-slot": "select-content",
            translate: "no",
            className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md', position === 'popper' && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1', className),
            position: position,
            ...props,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollUpButton, {}, void 0, false, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/select.tsx",
                    lineNumber: 75,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$select$40$2$2e$3$2e$8_$40$types$2b$react$2d$dom$40$19$2e$3$2e$0_$40$types$2b$react$40$19$2e$3$2e$0_$5f40$types$2b$react$40$_34ec1de1099e5f0bf822b110d5b01f4b$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Viewport"], {
                    className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('p-1', position === 'popper' && 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1'),
                    children: children
                }, void 0, false, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/select.tsx",
                    lineNumber: 76,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollDownButton, {}, void 0, false, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/select.tsx",
                    lineNumber: 85,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/select.tsx",
            lineNumber: 64,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/select.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
function SelectLabel({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$select$40$2$2e$3$2e$8_$40$types$2b$react$2d$dom$40$19$2e$3$2e$0_$40$types$2b$react$40$19$2e$3$2e$0_$5f40$types$2b$react$40$_34ec1de1099e5f0bf822b110d5b01f4b$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Label"], {
        "data-slot": "select-label",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('text-muted-foreground px-2 py-1.5 text-xs', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/select.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
function SelectItem({ className, children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$select$40$2$2e$3$2e$8_$40$types$2b$react$2d$dom$40$19$2e$3$2e$0_$40$types$2b$react$40$19$2e$3$2e$0_$5f40$types$2b$react$40$_34ec1de1099e5f0bf822b110d5b01f4b$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Item"], {
        "data-slot": "select-item",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className),
        ...props,
        value: props.value === '' ? 'all' : props.value,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute right-2 flex size-3.5 items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$select$40$2$2e$3$2e$8_$40$types$2b$react$2d$dom$40$19$2e$3$2e$0_$40$types$2b$react$40$19$2e$3$2e$0_$5f40$types$2b$react$40$_34ec1de1099e5f0bf822b110d5b01f4b$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                        className: "size-4"
                    }, void 0, false, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/select.tsx",
                        lineNumber: 119,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/select.tsx",
                    lineNumber: 118,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/select.tsx",
                lineNumber: 117,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$select$40$2$2e$3$2e$8_$40$types$2b$react$2d$dom$40$19$2e$3$2e$0_$40$types$2b$react$40$19$2e$3$2e$0_$5f40$types$2b$react$40$_34ec1de1099e5f0bf822b110d5b01f4b$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ItemText"], {
                children: children
            }, void 0, false, {
                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/select.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/select.tsx",
        lineNumber: 108,
        columnNumber: 5
    }, this);
}
function SelectSeparator({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$select$40$2$2e$3$2e$8_$40$types$2b$react$2d$dom$40$19$2e$3$2e$0_$40$types$2b$react$40$19$2e$3$2e$0_$5f40$types$2b$react$40$_34ec1de1099e5f0bf822b110d5b01f4b$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Separator"], {
        "data-slot": "select-separator",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('bg-border pointer-events-none -mx-1 my-1 h-px', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/select.tsx",
        lineNumber: 131,
        columnNumber: 5
    }, this);
}
function SelectScrollUpButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$select$40$2$2e$3$2e$8_$40$types$2b$react$2d$dom$40$19$2e$3$2e$0_$40$types$2b$react$40$19$2e$3$2e$0_$5f40$types$2b$react$40$_34ec1de1099e5f0bf822b110d5b01f4b$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollUpButton"], {
        "data-slot": "select-scroll-up-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex cursor-default items-center justify-center py-1', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__["ChevronUpIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/select.tsx",
            lineNumber: 151,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/select.tsx",
        lineNumber: 143,
        columnNumber: 5
    }, this);
}
function SelectScrollDownButton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f40$radix$2d$ui$2b$react$2d$select$40$2$2e$3$2e$8_$40$types$2b$react$2d$dom$40$19$2e$3$2e$0_$40$types$2b$react$40$19$2e$3$2e$0_$5f40$types$2b$react$40$_34ec1de1099e5f0bf822b110d5b01f4b$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ScrollDownButton"], {
        "data-slot": "select-scroll-down-button",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])('flex cursor-default items-center justify-center py-1', className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/select.tsx",
            lineNumber: 168,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/select.tsx",
        lineNumber: 160,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>QuoteRequestForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$lib$2f$rpc$2d$generated$2f$src$2f$frontend$2f$actions$2f$HomeFrontend$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/lib/rpc-generated/src/frontend/actions/HomeFrontend.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$FrontendSession$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/tools/FrontendSession.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/components/ui/select.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/send.js [app-ssr] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/phone.js [app-ssr] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/message-circle.js [app-ssr] (ecmascript) <export default as MessageCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/shield-alert.js [app-ssr] (ecmascript) <export default as ShieldAlert>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paperclip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paperclip$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/paperclip.js [app-ssr] (ecmascript) <export default as Paperclip>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/flame.js [app-ssr] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$8_$40$types$2b$react$40$19$2e$3$2e$0_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/sonner@2.0.8_@types+react@19.3.0_react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function serviceIdToKey(serviceId) {
    if (!serviceId) return "ASSEMBLY";
    const map = {
        "service-assembly": "ASSEMBLY",
        "service-demolition": "DEMOLITION",
        "service-flooring": "FLOORING",
        "service-painting": "PAINTING",
        "service-drywall": "DRYWALL",
        "service-bathroom-kitchen": "BATHROOM_KITCHEN",
        "service-doors-windows": "DOORS_WINDOWS",
        "service-outdoor": "OUTDOOR",
        "service-moving": "MOVING",
        "service-commercial": "COMMERCIAL"
    };
    if (map[serviceId]) return map[serviceId];
    const cleaned = serviceId.replace(/^service-/, "").toUpperCase().replace(/-/g, "_");
    const validKeys = [
        "ASSEMBLY",
        "DEMOLITION",
        "FLOORING",
        "PAINTING",
        "DRYWALL",
        "PLUMBING_MINOR",
        "BATHROOM_KITCHEN",
        "DOORS_WINDOWS",
        "OUTDOOR",
        "MOVING",
        "COMMERCIAL"
    ];
    if (validKeys.includes(cleaned)) {
        return cleaned;
    }
    return "ASSEMBLY";
}
function getServiceTitle(service, lang) {
    if (lang === "de") return service.titleDe;
    if (lang === "ru") return service.titleRu;
    return service.titleEn;
}
function QuoteRequestForm({ lang, preselectedServiceId = "", onResetServiceSelection }) {
    const session = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$tools$2f$FrontendSession$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useUserSession"])();
    const [services, setServices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [districts, setDistricts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [dataLoading, setDataLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [selectedCategoryKey, setSelectedCategoryKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(serviceIdToKey(preselectedServiceId));
    const [districtCode, setDistrictCode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("1010");
    const [taskTitle, setTaskTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [taskDescription, setTaskDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [addressSnippet, setAddressSnippet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [estimatedHours, setEstimatedHours] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(3);
    const [preferredDate, setPreferredDate] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(()=>{
        const d = new Date();
        d.setDate(d.getDate() + 2);
        return d.toISOString().split("T")[0];
    });
    const [preferredTimeSlot, setPreferredTimeSlot] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("MORNING");
    const [clientName, setClientName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [clientPhone, setClientPhone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [clientEmail, setClientEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [hasMaterials, setHasMaterials] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isUrgent, setIsUrgent] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [agreedToTerms, setAgreedToTerms] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isSubmitting, setIsSubmitting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [submissionResult, setSubmissionResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [attachedFileName, setAttachedFileName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // Fetch catalog services and districts on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let active = true;
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$lib$2f$rpc$2d$generated$2f$src$2f$frontend$2f$actions$2f$HomeFrontend$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getHomeData"])().then((data)=>{
            if (!active) return;
            setServices(data.services || []);
            setDistricts(data.districts || []);
            if (data.districts?.length && !districtCode) {
                setDistrictCode(data.districts[0].districtCode);
            }
        }).catch((err)=>{
            console.error("Failed to load catalog data", err);
        }).finally(()=>{
            if (active) setDataLoading(false);
        });
        return ()=>{
            active = false;
        };
    }, []);
    // Pre-fill user contact from active session
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (session.full_name) {
            setClientName((prev)=>prev || session.full_name);
        }
        if (session.email) {
            setClientEmail((prev)=>prev || session.email);
        }
    }, [
        session.full_name,
        session.email
    ]);
    // Sync when preselectedServiceId prop changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (preselectedServiceId) {
            setSelectedCategoryKey(serviceIdToKey(preselectedServiceId));
        }
    }, [
        preselectedServiceId
    ]);
    const selectedService = services.find((s)=>s.key === selectedCategoryKey) || services[0] || null;
    const currentDistrict = districts.find((d)=>d.districtCode === districtCode) || districts[0] || null;
    const ratePerHour = selectedService?.baselineHourlyRate ?? 15;
    const travelFee = 20;
    const urgencyFee = isUrgent ? 35 : 0;
    const estimatedTotalEur = ratePerHour * estimatedHours + travelFee + urgencyFee;
    const timeSlotLabels = {
        MORNING: lang === "de" ? "Vormittag (08:00–12:00)" : lang === "ru" ? "Утро (08:00–12:00)" : "Morning (08:00–12:00)",
        AFTERNOON: lang === "de" ? "Nachmittag (12:00–17:00)" : lang === "ru" ? "День (12:00–17:00)" : "Afternoon (12:00–17:00)",
        FLEXIBLE: lang === "de" ? "Ganztags flexibel" : lang === "ru" ? "Гибкое время" : "Flexible all day"
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!agreedToTerms) {
            __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$8_$40$types$2b$react$40$19$2e$3$2e$0_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(lang === "de" ? "Bitte stimmen Sie den AGB zu." : lang === "ru" ? "Пожалуйста, подтвердите согласие с условиями." : "Please agree to terms before submitting.");
            return;
        }
        if (!clientName.trim() || !clientPhone.trim() || !taskTitle.trim()) {
            __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$8_$40$types$2b$react$40$19$2e$3$2e$0_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(lang === "de" ? "Bitte füllen Sie alle Pflichtfelder aus." : lang === "ru" ? "Пожалуйста, заполните обязательные поля." : "Please fill in all required fields.");
            return;
        }
        setIsSubmitting(true);
        try {
            const submissionLang = lang === "de" ? "DE" : lang === "ru" ? "RU" : "EN";
            const targetDistrictCode = districtCode || (districts[0]?.districtCode ?? "1010");
            const targetCategoryKey = selectedCategoryKey || (services[0]?.key ?? "ASSEMBLY");
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$lib$2f$rpc$2d$generated$2f$src$2f$frontend$2f$actions$2f$HomeFrontend$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createQuoteRequest"])({
                serviceCategoryKey: targetCategoryKey,
                districtCode: targetDistrictCode,
                clientName: clientName.trim(),
                clientPhone: clientPhone.trim(),
                clientEmail: clientEmail.trim(),
                addressSnippet: addressSnippet.trim(),
                taskTitle: taskTitle.trim(),
                taskDescription: taskDescription.trim(),
                estimatedHours,
                preferredDate,
                preferredTimeSlot,
                hasMaterials,
                isUrgent,
                agreedToTerms,
                submissionLang
            });
            setSubmissionResult(result);
            __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$8_$40$types$2b$react$40$19$2e$3$2e$0_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].success(lang === "de" ? `Anfrage übermittelt! Code: ${result.trackingCode}` : lang === "ru" ? `Заявка принята! Код: ${result.trackingCode}` : `Quote request submitted! Tracking: ${result.trackingCode}`);
        } catch (err) {
            console.error("Failed to submit quote request", err);
            __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$8_$40$types$2b$react$40$19$2e$3$2e$0_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(lang === "de" ? "Fehler beim Absenden der Anfrage. Bitte überprüfen Sie Ihre Eingaben." : lang === "ru" ? "Ошибка при отправке заявки. Пожалуйста, попробуйте еще раз." : "Failed to submit quote request. Please try again.");
        } finally{
            setIsSubmitting(false);
        }
    };
    const handleReset = ()=>{
        setSubmissionResult(null);
        setTaskTitle("");
        setTaskDescription("");
        setAddressSnippet("");
        setAttachedFileName(null);
        if (onResetServiceSelection) {
            onResetServiceSelection();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        id: "quote-section",
        "data-controller-name": "Quote & Service Request Form",
        className: "w-full border-b border-border bg-card text-card-foreground py-14 sm:py-16",
        "data-api-unique-id": "quoterequestform-racda832f3d1f3bd6-s472664262",
        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4 sm:px-6 lg:px-8",
            "data-api-unique-id": "quoterequestform-r6e32c05c03b671e8-s472664262",
            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-3xl mb-8",
                    "data-api-unique-id": "quoterequestform-r47a46bf198c83917-s472664262",
                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-display text-2xl sm:text-3xl font-bold tracking-tight text-card-foreground",
                            "data-api-unique-id": "quoterequestform-rdb19e7b25170654c-s472664262",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                            children: lang === "de" ? "Kostenloses Angebot & Termin anfragen" : lang === "ru" ? "Запрос сметы и бронирование мастера" : "Request Free Quote & Schedule Work"
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                            lineNumber: 174,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-sm sm:text-base text-muted-foreground",
                            "data-api-unique-id": "quoterequestform-r1d65de696b041e09-s472664262",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                            children: lang === "de" ? "Direkte Antwort innerhalb von 60 Minuten. Unverbindlich & transparent." : lang === "ru" ? "Быстрый ответ в течение 60 минут. Без скрытых условий и обязательств." : "Direct response within 60 minutes. Non-binding estimate."
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                            lineNumber: 177,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                    lineNumber: 173,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",
                    "data-api-unique-id": "quoterequestform-ra4df2a099c0cda69-s472664262",
                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-8 rounded-xl border border-border bg-background text-foreground p-6 sm:p-8 shadow-soft",
                            "data-api-unique-id": "quoterequestform-r0ca5355a32ccc4fa-s472664262",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                            children: submissionResult ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "py-8 text-center space-y-4",
                                "data-api-unique-id": "quoterequestform-r9aad6dd4df0d6c2a-s472664262",
                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "inline-flex h-16 w-16 items-center justify-center rounded-full bg-success text-success-foreground mx-auto",
                                        "data-api-unique-id": "quoterequestform-r8ef1b6018cc0b9ff-s472664262",
                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                            className: "h-8 w-8",
                                            "data-api-unique-id": "quoterequestform-r228b326c2e4dc007-s472664262",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                            lineNumber: 187,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                        lineNumber: 186,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "font-display text-2xl font-bold text-foreground",
                                        "data-api-unique-id": "quoterequestform-r3a178363a2849cfe-s472664262",
                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                        children: lang === "de" ? "Anfrage erfolgreich übermittelt!" : lang === "ru" ? "Заявка успешно отправлена!" : "Quote Request Sent Successfully!"
                                    }, void 0, false, {
                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                        lineNumber: 189,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-muted-foreground max-w-md mx-auto leading-relaxed",
                                        "data-api-unique-id": "quoterequestform-r3692219c98b99465-s472664262",
                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                        children: lang === "de" ? `Vielen Dank, ${submissionResult.clientName}. Wir prüfen Ihre Angaben für Bezirk ${submissionResult.districtCode} und melden uns umgehend unter ${submissionResult.clientPhone}.` : lang === "ru" ? `Спасибо, ${submissionResult.clientName}. Мы проверили детали для района ${submissionResult.districtCode} и свяжемся с вами по номеру ${submissionResult.clientPhone}.` : `Thank you, ${submissionResult.clientName}. We are reviewing your task details for district ${submissionResult.districtCode} and will reach you at ${submissionResult.clientPhone}.`
                                    }, void 0, false, {
                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                        lineNumber: 192,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pt-4 max-w-sm mx-auto border-t border-border flex flex-col gap-2",
                                        "data-api-unique-id": "quoterequestform-rebd437b6d33a9059-s472664262",
                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-xs text-muted-foreground",
                                                "data-api-unique-id": "quoterequestform-r3d34dbf0513d97d1-s472664262",
                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        "data-api-unique-id": "quoterequestform-rec2a215b08095afd-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                        children: "Tracking Code:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 198,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono font-bold text-primary",
                                                        "data-api-unique-id": "quoterequestform-r1a8329ad7c0681f9-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                        children: submissionResult.trackingCode
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 199,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                lineNumber: 197,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-xs text-muted-foreground",
                                                "data-api-unique-id": "quoterequestform-r454108e0614e41f4-s472664262",
                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        "data-api-unique-id": "quoterequestform-r2c0a6aafeb46b7c1-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                        children: "Selected Trade:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 204,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold text-foreground",
                                                        "data-api-unique-id": "quoterequestform-r4381976dfcf36748-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                        children: selectedService ? getServiceTitle(selectedService, lang) : submissionResult.serviceTitle
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 205,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                lineNumber: 203,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex justify-between text-xs text-muted-foreground",
                                                "data-api-unique-id": "quoterequestform-rbf7b6796bf9ff40e-s472664262",
                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        "data-api-unique-id": "quoterequestform-r635d233a2e426cc9-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                        children: "Est. Calculation:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 210,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-semibold text-primary",
                                                        "data-api-unique-id": "quoterequestform-r35ba609117a96a80-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                        children: [
                                                            "~ €",
                                                            submissionResult.estimatedBudgetEur,
                                                            " (incl. €20 travel flat",
                                                            isUrgent ? " + €35 express" : "",
                                                            ")"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 211,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                lineNumber: 209,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                        lineNumber: 196,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: handleReset,
                                        className: "mt-6 inline-flex items-center justify-center rounded-md bg-secondary px-5 py-2.5 text-xs font-semibold text-secondary-foreground hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                        "data-api-unique-id": "quoterequestform-rc1fe4f9406b51b5b-s472664262",
                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                        children: lang === "de" ? "Weitere Anfrage erstellen" : lang === "ru" ? "Создать ещё одну заявку" : "Submit Another Request"
                                    }, void 0, false, {
                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                        lineNumber: 218,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                lineNumber: 185,
                                columnNumber: 33
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handleSubmit,
                                className: "space-y-5",
                                "data-api-unique-id": "quoterequestform-r3bf0d59bca105b75-s472664262",
                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                                        "data-api-unique-id": "quoterequestform-r5dc6ba254022649b-s472664262",
                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                "data-api-unique-id": "quoterequestform-r5c0cae570ec13bdd-s472664262",
                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs font-semibold text-foreground mb-1.5",
                                                        "data-api-unique-id": "quoterequestform-rf0b9ba75a26fd84b-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                        children: lang === "de" ? "Gewerbebereich / Leistung *" : lang === "ru" ? "Категория работ *" : "Service Category *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 225,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                        value: selectedCategoryKey,
                                                        onValueChange: (val)=>setSelectedCategoryKey(val),
                                                        disabled: dataLoading || services.length === 0,
                                                        "data-api-unique-id": "quoterequestform-rda48b5754499cc12-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                className: "w-full bg-card text-card-foreground",
                                                                "data-api-unique-id": "quoterequestform-ra308cc0f75141888-s472664262",
                                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                    placeholder: "Select category",
                                                                    "data-api-unique-id": "quoterequestform-rfbeb2360c62dd4ec-s472664262",
                                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                                    children: selectedService ? `${getServiceTitle(selectedService, lang)} (ab €${selectedService.baselineHourlyRate}/h)` : undefined
                                                                }, void 0, false, {
                                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                                    lineNumber: 230,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                                lineNumber: 229,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                "data-api-unique-id": "quoterequestform-r45f87012af37ef2e-s472664262",
                                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                                children: services.map((s, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                        value: s.key,
                                                                        "data-api-unique-id": "quoterequestform-rcce5c1ff49db64aa-s472664262",
                                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                                        "data-api-in-loop": "1",
                                                                        "data-api-bind-info": `services-${index}-baselineHourlyRate`,
                                                                        "data-api-map-var-name": "s",
                                                                        children: [
                                                                            getServiceTitle(s, lang),
                                                                            " (ab €",
                                                                            s.baselineHourlyRate,
                                                                            "/h)"
                                                                        ]
                                                                    }, s.id || s.key, true, {
                                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                                        lineNumber: 235,
                                                                        columnNumber: 53
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                                lineNumber: 234,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 228,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                lineNumber: 224,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                "data-api-unique-id": "quoterequestform-r4b5abbe35e96ae5b-s472664262",
                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs font-semibold text-foreground mb-1.5",
                                                        "data-api-unique-id": "quoterequestform-rf867624d112b3dde-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                        children: lang === "de" ? "Wiener Bezirk / Postleitzahl *" : lang === "ru" ? "Район Вены / Индекс *" : "Vienna District / Postcode *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 243,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                        value: districtCode,
                                                        onValueChange: (val)=>setDistrictCode(val),
                                                        disabled: dataLoading || districts.length === 0,
                                                        "data-api-unique-id": "quoterequestform-rd9ae094bc491b5b1-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                className: "w-full bg-card text-card-foreground",
                                                                "data-api-unique-id": "quoterequestform-r274d988bedd15f8a-s472664262",
                                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                    placeholder: "Select district",
                                                                    "data-api-unique-id": "quoterequestform-r15b41cfe6dfaa682-s472664262",
                                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                                    children: currentDistrict ? `${currentDistrict.districtCode} — ${currentDistrict.districtName}` : undefined
                                                                }, void 0, false, {
                                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                                    lineNumber: 248,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                                lineNumber: 247,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                className: "max-h-60 overflow-y-auto",
                                                                "data-api-unique-id": "quoterequestform-r4ef2c945103ca49b-s472664262",
                                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                                children: districts.map((d, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                        value: d.districtCode,
                                                                        "data-api-unique-id": "quoterequestform-r010a85d6efbe26dc-s472664262",
                                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                                        "data-api-in-loop": "1",
                                                                        "data-api-bind-info": `districts-${index}-districtCode`,
                                                                        "data-api-map-var-name": "d",
                                                                        children: [
                                                                            d.districtCode,
                                                                            " — ",
                                                                            d.districtName
                                                                        ]
                                                                    }, d.id || d.districtCode, true, {
                                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                                        lineNumber: 253,
                                                                        columnNumber: 54
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                                lineNumber: 252,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 246,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                lineNumber: 242,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                        lineNumber: 223,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
                                        "data-api-unique-id": "quoterequestform-r5116a51155b45156-s472664262",
                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "sm:col-span-2",
                                                "data-api-unique-id": "quoterequestform-rc04334f00b7fc8e2-s472664262",
                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs font-semibold text-foreground mb-1.5",
                                                        "data-api-unique-id": "quoterequestform-r2fe48b44830e2b55-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                        children: lang === "de" ? "Kurze Aufgabenbeschreibung *" : lang === "ru" ? "Краткое описание задачи *" : "Task Headline / Brief Summary *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 264,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        required: true,
                                                        value: taskTitle,
                                                        onChange: (e)=>setTaskTitle(e.target.value),
                                                        placeholder: lang === "de" ? "z.B. IKEA PAX 3-türig aufbauen und TV an Wand montieren" : lang === "ru" ? "напр., Собрать 3-дверный шкаф ПАКС и повесить ТВ на стену" : "e.g., Assemble 3-door IKEA PAX wardrobe and mount 55' TV",
                                                        className: "w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-card-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                                        "data-api-unique-id": "quoterequestform-rcaa4e73e4fb6bb54-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm"
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 267,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                lineNumber: 263,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                "data-api-unique-id": "quoterequestform-rb6579360a305649c-s472664262",
                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs font-semibold text-foreground mb-1.5",
                                                        "data-api-unique-id": "quoterequestform-rb1b9aa23149cee79-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                        children: lang === "de" ? "Adresse / Straße" : lang === "ru" ? "Улица / Адрес" : "Address Snippet"
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 270,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: addressSnippet,
                                                        onChange: (e)=>setAddressSnippet(e.target.value),
                                                        placeholder: "e.g. Herrengasse 14",
                                                        className: "w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-card-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                                        "data-api-unique-id": "quoterequestform-rd2ee59b31d9c7256-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm"
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 273,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                lineNumber: 269,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                        lineNumber: 262,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        "data-api-unique-id": "quoterequestform-r6fc6407757e1d14b-s472664262",
                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "block text-xs font-semibold text-foreground mb-1.5",
                                                "data-api-unique-id": "quoterequestform-r7d51c1da523ce468-s472664262",
                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                children: lang === "de" ? "Detailangaben & Besonderheiten (Altbau, Deckenhöhe etc.)" : lang === "ru" ? "Подробности (высота потолков, тип стен и т.д.)" : "Detailed Notes (Altbau walls, ceiling height, special fixtures)"
                                            }, void 0, false, {
                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                lineNumber: 279,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                rows: 3,
                                                value: taskDescription,
                                                onChange: (e)=>setTaskDescription(e.target.value),
                                                placeholder: lang === "de" ? "Altbau-Ziegelwand vorhanden, 3. Stock ohne Lift, Parkett bereits verlegt..." : lang === "ru" ? "Кирпичные стены в старом фонде, 3 этаж без лифта, паркет..." : "Solid brick Altbau wall, 3rd floor without elevator, please bring Fischer Altbau dowels...",
                                                className: "w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-card-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                                "data-api-unique-id": "quoterequestform-r52c8a7e33da5b60e-s472664262",
                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm"
                                            }, void 0, false, {
                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                lineNumber: 282,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                        lineNumber: 278,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 sm:grid-cols-3 gap-4 items-center pt-1",
                                        "data-api-unique-id": "quoterequestform-r17ec386ce0b8cf15-s472664262",
                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                "data-api-unique-id": "quoterequestform-re8c8c5e1cd918345-s472664262",
                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs font-semibold text-foreground mb-1.5",
                                                        "data-api-unique-id": "quoterequestform-r5238fca7ae1f838e-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                        children: lang === "de" ? "Fotos / Skizzen anhängen" : lang === "ru" ? "Прикрепить фото / схему" : "Attach Photos / Room Layout (Optional)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 288,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        "data-api-unique-id": "quoterequestform-r4e7e1daa06025c30-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                className: "cursor-pointer inline-flex items-center gap-1.5 rounded-md border border-border bg-muted px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-secondary-foreground transition-colors",
                                                                "data-api-unique-id": "quoterequestform-r1ef8fc63f6228740-s472664262",
                                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$paperclip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Paperclip$3e$__["Paperclip"], {
                                                                        className: "h-3.5 w-3.5",
                                                                        "data-api-unique-id": "quoterequestform-r55855cca32e5a8e9-s472664262",
                                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                                        lineNumber: 293,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        "data-api-unique-id": "quoterequestform-r3c8685797d0d9254-s472664262",
                                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                                        children: attachedFileName ? "Change file" : "Select image/PDF"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                                        lineNumber: 294,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                        type: "file",
                                                                        className: "hidden",
                                                                        onChange: (e)=>{
                                                                            const file = e.target.files?.[0];
                                                                            if (file) {
                                                                                setAttachedFileName(file.name);
                                                                                __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$sonner$40$2$2e$0$2e$8_$40$types$2b$react$40$19$2e$3$2e$0_react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].info(`Attached: ${file.name}`);
                                                                            }
                                                                        },
                                                                        "data-api-unique-id": "quoterequestform-r9d14c940c97942ee-s472664262",
                                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                                        lineNumber: 295,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                                lineNumber: 292,
                                                                columnNumber: 23
                                                            }, this),
                                                            attachedFileName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs text-foreground truncate max-w-[120px]",
                                                                "data-api-unique-id": "quoterequestform-r17b51cb223e2bb11-s472664262",
                                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                                children: attachedFileName
                                                            }, void 0, false, {
                                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                                lineNumber: 303,
                                                                columnNumber: 44
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 291,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                lineNumber: 287,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 pt-2 sm:pt-4",
                                                "data-api-unique-id": "quoterequestform-r92d59ec1bf8c55af-s472664262",
                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        id: "materialsCheckbox",
                                                        checked: hasMaterials,
                                                        onChange: (e)=>setHasMaterials(e.target.checked),
                                                        className: "h-4 w-4 rounded border-input text-primary focus:ring-ring",
                                                        "data-api-unique-id": "quoterequestform-r8ed91265cf5d5217-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm"
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 310,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        htmlFor: "materialsCheckbox",
                                                        className: "text-xs text-muted-foreground cursor-pointer",
                                                        "data-api-unique-id": "quoterequestform-rbbdc859cfd7401ab-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                        children: lang === "de" ? "Ich stelle alle Baustoffe selbst" : lang === "ru" ? "Материалы имеются в наличии" : "I will provide all parts & materials"
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 311,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                lineNumber: 309,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 pt-2 sm:pt-4",
                                                "data-api-unique-id": "quoterequestform-r0a023a3151b417d2-s472664262",
                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        id: "urgentCheckbox",
                                                        checked: isUrgent,
                                                        onChange: (e)=>setIsUrgent(e.target.checked),
                                                        className: "h-4 w-4 rounded border-input text-primary focus:ring-ring",
                                                        "data-api-unique-id": "quoterequestform-r37db45dcd996a408-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm"
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 317,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        htmlFor: "urgentCheckbox",
                                                        className: "text-xs font-medium text-warning flex items-center gap-1 cursor-pointer",
                                                        "data-api-unique-id": "quoterequestform-r7d257f31e4e18bc9-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                                                className: "h-3.5 w-3.5",
                                                                "data-api-unique-id": "quoterequestform-r293aeeb625631978-s472664262",
                                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm"
                                                            }, void 0, false, {
                                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                                lineNumber: 319,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                "data-api-unique-id": "quoterequestform-r2d162ed972b02742-s472664262",
                                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                                children: lang === "de" ? "Express-Termin (+€35)" : lang === "ru" ? "Срочный выезд (+€35)" : "Urgent Express Slot (+€35)"
                                                            }, void 0, false, {
                                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                                lineNumber: 320,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 318,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                lineNumber: 316,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                        lineNumber: 286,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-border",
                                        "data-api-unique-id": "quoterequestform-r6c6036b2e0baeac6-s472664262",
                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                "data-api-unique-id": "quoterequestform-r24061db2401dd81b-s472664262",
                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs font-semibold text-foreground mb-1.5",
                                                        "data-api-unique-id": "quoterequestform-r461269adb275d772-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                        children: lang === "de" ? "Wunschdatum" : lang === "ru" ? "Желаемая дата" : "Preferred Date"
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 330,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "date",
                                                        value: preferredDate,
                                                        onChange: (e)=>setPreferredDate(e.target.value),
                                                        className: "w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-card-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                                        "data-api-unique-id": "quoterequestform-r521acfbaf9349cf7-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm"
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 333,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                lineNumber: 329,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                "data-api-unique-id": "quoterequestform-r2fcf631222e01f8d-s472664262",
                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs font-semibold text-foreground mb-1.5",
                                                        "data-api-unique-id": "quoterequestform-r89d6882629ac4812-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                        children: lang === "de" ? "Tageszeit" : lang === "ru" ? "Время суток" : "Time Window"
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 337,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Select"], {
                                                        value: preferredTimeSlot,
                                                        onValueChange: (val)=>setPreferredTimeSlot(val),
                                                        "data-api-unique-id": "quoterequestform-rb63e467b3d286708-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                                className: "w-full bg-card text-card-foreground",
                                                                "data-api-unique-id": "quoterequestform-r303fa296d52d6e91-s472664262",
                                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                                    placeholder: "Select time slot",
                                                                    "data-api-unique-id": "quoterequestform-r057a207019d3065f-s472664262",
                                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                                    children: timeSlotLabels[preferredTimeSlot]
                                                                }, void 0, false, {
                                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                                    lineNumber: 342,
                                                                    columnNumber: 25
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                                lineNumber: 341,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                                "data-api-unique-id": "quoterequestform-r15acf4a8247b5387-s472664262",
                                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                        value: "MORNING",
                                                                        "data-api-unique-id": "quoterequestform-rd44c2761d941c836-s472664262",
                                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                                        children: timeSlotLabels.MORNING
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                                        lineNumber: 347,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                        value: "AFTERNOON",
                                                                        "data-api-unique-id": "quoterequestform-re9097f76864f6958-s472664262",
                                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                                        children: timeSlotLabels.AFTERNOON
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                                        lineNumber: 348,
                                                                        columnNumber: 25
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                                        value: "FLEXIBLE",
                                                                        "data-api-unique-id": "quoterequestform-r52993b5229b92f0d-s472664262",
                                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                                        children: timeSlotLabels.FLEXIBLE
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                                        lineNumber: 349,
                                                                        columnNumber: 25
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                                lineNumber: 346,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 340,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                lineNumber: 336,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                "data-api-unique-id": "quoterequestform-rb9e0a95ae26c47a1-s472664262",
                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs font-semibold text-foreground mb-1.5",
                                                        "data-api-unique-id": "quoterequestform-r3b9d138d8e1bde31-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                        children: lang === "de" ? "Geschätzte Stunden" : lang === "ru" ? "Оценка часов" : "Estimated Hours"
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 355,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2",
                                                        "data-api-unique-id": "quoterequestform-r546899043273b885-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                type: "range",
                                                                min: "1",
                                                                max: "8",
                                                                value: estimatedHours,
                                                                onChange: (e)=>setEstimatedHours(parseInt(e.target.value, 10)),
                                                                className: "flex-1 accent-primary",
                                                                "data-api-unique-id": "quoterequestform-r9ddfc1fba95aa9b5-s472664262",
                                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm"
                                                            }, void 0, false, {
                                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                                lineNumber: 359,
                                                                columnNumber: 23
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "font-display font-bold text-sm text-foreground w-10 text-right",
                                                                "data-api-unique-id": "quoterequestform-rd01da56d3813f8f6-s472664262",
                                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                                children: [
                                                                    estimatedHours,
                                                                    " h"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                                lineNumber: 360,
                                                                columnNumber: 23
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 358,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                lineNumber: 354,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                        lineNumber: 328,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-border",
                                        "data-api-unique-id": "quoterequestform-r1cc143c6fcb6cd30-s472664262",
                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                "data-api-unique-id": "quoterequestform-r727b76d69f3b2a51-s472664262",
                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs font-semibold text-foreground mb-1.5",
                                                        "data-api-unique-id": "quoterequestform-ra316990816ff0fc7-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                        children: lang === "de" ? "Ihr Name *" : "Your Name *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 370,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        required: true,
                                                        value: clientName,
                                                        onChange: (e)=>setClientName(e.target.value),
                                                        placeholder: "e.g. Thomas Bauer",
                                                        className: "w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-card-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                                        "data-api-unique-id": "quoterequestform-r00623db172b1c8eb-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm"
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 373,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                lineNumber: 369,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                "data-api-unique-id": "quoterequestform-rfba2c40c8e4f37f3-s472664262",
                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs font-semibold text-foreground mb-1.5",
                                                        "data-api-unique-id": "quoterequestform-r7154b904bc02cf43-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                        children: lang === "de" ? "Telefonnummer *" : "Phone Number *"
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 377,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "tel",
                                                        required: true,
                                                        value: clientPhone,
                                                        onChange: (e)=>setClientPhone(e.target.value),
                                                        placeholder: "+43 676 1234567",
                                                        className: "w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-card-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                                        "data-api-unique-id": "quoterequestform-r256766c4a8025ae0-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm"
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 380,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                lineNumber: 376,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                "data-api-unique-id": "quoterequestform-r9d61394def80f310-s472664262",
                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "block text-xs font-semibold text-foreground mb-1.5",
                                                        "data-api-unique-id": "quoterequestform-r1dc1884b2220e5d9-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                        children: lang === "de" ? "E-Mail (optional)" : "Email (Optional)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 384,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "email",
                                                        value: clientEmail,
                                                        onChange: (e)=>setClientEmail(e.target.value),
                                                        placeholder: "bauer@example.at",
                                                        className: "w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-card-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                                        "data-api-unique-id": "quoterequestform-r5691513750ae163e-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm"
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 387,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                lineNumber: 383,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                        lineNumber: 368,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pt-4 flex flex-col sm:flex-row items-center justify-between gap-4",
                                        "data-api-unique-id": "quoterequestform-r23db6801799fc3ab-s472664262",
                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2",
                                                "data-api-unique-id": "quoterequestform-rc5f1c46ab1bbcb06-s472664262",
                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "checkbox",
                                                        id: "agreedToTerms",
                                                        checked: agreedToTerms,
                                                        onChange: (e)=>setAgreedToTerms(e.target.checked),
                                                        className: "h-4 w-4 rounded border-input text-primary focus:ring-ring",
                                                        "data-api-unique-id": "quoterequestform-r7fe8121f3888aab1-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm"
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 394,
                                                        columnNumber: 21
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        htmlFor: "agreedToTerms",
                                                        className: "text-[11px] text-muted-foreground cursor-pointer leading-snug",
                                                        "data-api-unique-id": "quoterequestform-r3e87b87714f42272-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                        children: lang === "de" ? "Mit dem Absenden stimmen Sie der Kontaktaufnahme zur Angebotserstellung gemäß DSGVO zu." : lang === "ru" ? "Нажимая кнопку, вы соглашаетесь на обработку данных для составления сметы согласно DSGVO." : "By submitting, you agree to contact for quote preparation in accordance with GDPR."
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 395,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                lineNumber: 393,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                disabled: isSubmitting,
                                                className: "w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-primary transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shrink-0 disabled:opacity-70 disabled:cursor-not-allowed",
                                                "data-api-unique-id": "quoterequestform-rcbe754647478b2c9-s472664262",
                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                children: [
                                                    isSubmitting ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                                                        className: "h-4 w-4 animate-spin",
                                                        "data-api-unique-id": "quoterequestform-r3781e2979e83383f-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm"
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 401,
                                                        columnNumber: 37
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                                        className: "h-4 w-4",
                                                        "data-api-unique-id": "quoterequestform-r9981396babe89efc-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm"
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 401,
                                                        columnNumber: 233
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        "data-api-unique-id": "quoterequestform-r0aa93d6d9ff4a6c1-s472664262",
                                                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                        children: isSubmitting ? lang === "de" ? "Wird übermittelt..." : lang === "ru" ? "Отправка..." : "Submitting..." : lang === "de" ? "Unverbindlich anfragen" : lang === "ru" ? "Отправить заявку" : "Submit Quote Request"
                                                    }, void 0, false, {
                                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                        lineNumber: 402,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                lineNumber: 400,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                        lineNumber: 392,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                lineNumber: 221,
                                columnNumber: 24
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                            lineNumber: 184,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "lg:col-span-4 space-y-4",
                            "data-api-unique-id": "quoterequestform-r533ce898b257ba1c-s472664262",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl border border-border bg-background text-foreground p-5 shadow-soft",
                                    "data-api-unique-id": "quoterequestform-rb67f07f893108edf-s472664262",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between border-b border-border pb-3 mb-3",
                                            "data-api-unique-id": "quoterequestform-rbcdd676da3cca4f3-s472664262",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
                                                    "data-api-unique-id": "quoterequestform-rddae4a97f5e99626-s472664262",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                    children: "Live Estimate Preview"
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                    lineNumber: 415,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "inline-flex items-center rounded-sm bg-muted text-muted-foreground px-1.5 py-0.5 text-[10px] border border-border",
                                                    "data-api-unique-id": "quoterequestform-rb311d9ae138fa601-s472664262",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                    children: "Vienna 1.–23."
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                    lineNumber: 418,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                            lineNumber: 414,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2 text-xs",
                                            "data-api-unique-id": "quoterequestform-r6abd7bf54ec34698-s472664262",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between text-muted-foreground",
                                                    "data-api-unique-id": "quoterequestform-r2195942f772286f2-s472664262",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            "data-api-unique-id": "quoterequestform-r6947d1efdccb504d-s472664262",
                                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                            children: "Selected Category:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                            lineNumber: 425,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium text-foreground truncate max-w-[140px]",
                                                            "data-api-unique-id": "quoterequestform-r9b0e656fb1103255-s472664262",
                                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                            children: selectedService ? getServiceTitle(selectedService, lang) : "—"
                                                        }, void 0, false, {
                                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                            lineNumber: 426,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                    lineNumber: 424,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between text-muted-foreground",
                                                    "data-api-unique-id": "quoterequestform-rbdd0c2dcbfbac49b-s472664262",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            "data-api-unique-id": "quoterequestform-r93ddeeb66935610e-s472664262",
                                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                            children: "Base Rate:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                            lineNumber: 431,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium text-foreground",
                                                            "data-api-unique-id": "quoterequestform-r94fca93c6ea83ade-s472664262",
                                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                            children: [
                                                                "€",
                                                                ratePerHour,
                                                                " / hour"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                            lineNumber: 432,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                    lineNumber: 430,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between text-muted-foreground",
                                                    "data-api-unique-id": "quoterequestform-r34599852fb4ac54e-s472664262",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            "data-api-unique-id": "quoterequestform-r26ec6d04957cb56d-s472664262",
                                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                            children: "Hours Planned:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                            lineNumber: 437,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium text-foreground",
                                                            "data-api-unique-id": "quoterequestform-ree30728550980862-s472664262",
                                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                            children: [
                                                                estimatedHours,
                                                                " hrs"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                            lineNumber: 438,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                    lineNumber: 436,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between text-muted-foreground",
                                                    "data-api-unique-id": "quoterequestform-rcbf083dc7794d037-s472664262",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            "data-api-unique-id": "quoterequestform-rd0e90902c5f6168e-s472664262",
                                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                            children: "Travel Flat Allowance:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                            lineNumber: 443,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-medium text-foreground",
                                                            "data-api-unique-id": "quoterequestform-rd56e0800e3f17f7f-s472664262",
                                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                            children: "€20.00"
                                                        }, void 0, false, {
                                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                            lineNumber: 444,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                    lineNumber: 442,
                                                    columnNumber: 17
                                                }, this),
                                                isUrgent && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex justify-between text-warning font-medium",
                                                    "data-api-unique-id": "quoterequestform-r4a9be1f30a761709-s472664262",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            "data-api-unique-id": "quoterequestform-rf232d250aed78159-s472664262",
                                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                            children: "Express Dispatch Surcharge:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                            lineNumber: 447,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            "data-api-unique-id": "quoterequestform-rd4560399246aa425-s472664262",
                                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                            children: "€35.00"
                                                        }, void 0, false, {
                                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                            lineNumber: 448,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                    lineNumber: 446,
                                                    columnNumber: 30
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "pt-3 border-t border-border flex justify-between items-baseline",
                                                    "data-api-unique-id": "quoterequestform-r91320a992e99c27c-s472664262",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-display font-semibold text-foreground text-sm",
                                                            "data-api-unique-id": "quoterequestform-r8eb3dc6f8fa73571-s472664262",
                                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                            children: "Est. Labor Total:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                            lineNumber: 452,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "font-display text-xl font-bold text-primary",
                                                            "data-api-unique-id": "quoterequestform-r645088a6980ecdec-s472664262",
                                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                            children: [
                                                                "~ €",
                                                                estimatedTotalEur
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                            lineNumber: 455,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                    lineNumber: 451,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                            lineNumber: 423,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mt-4 rounded bg-muted text-muted-foreground p-2.5 text-[11px] border border-border flex items-start gap-2",
                                            "data-api-unique-id": "quoterequestform-r44b8314216fbdc02-s472664262",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldAlert$3e$__["ShieldAlert"], {
                                                    className: "h-3.5 w-3.5 text-warning shrink-0 mt-0.5",
                                                    "data-api-unique-id": "quoterequestform-r34537e87fbb03f06-s472664262",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm"
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                    lineNumber: 462,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    "data-api-unique-id": "quoterequestform-r1dfb1cd8053fa27c-s472664262",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                    children: "Final quote verified on-site before commencing work. No advance payment required."
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                    lineNumber: 463,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                            lineNumber: 461,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                    lineNumber: 413,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "rounded-xl border border-border bg-background text-foreground p-5 shadow-soft space-y-3",
                                    "data-api-unique-id": "quoterequestform-r942fc5bf39d09899-s472664262",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground block",
                                            "data-api-unique-id": "quoterequestform-r88b4d1896e559dc3-s472664262",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                            children: "Direct Contact Channels"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                            lineNumber: 471,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "tel:+431234567890",
                                            className: "flex items-center justify-between rounded-md border border-border bg-card text-card-foreground p-3 transition-colors hover:bg-muted",
                                            "data-api-unique-id": "quoterequestform-r0b3a759585c28e5e-s472664262",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3",
                                                    "data-api-unique-id": "quoterequestform-r6bc45277d31efbf6-s472664262",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "inline-flex h-8 w-8 items-center justify-center rounded-md bg-muted text-primary",
                                                            "data-api-unique-id": "quoterequestform-rc687f2284ed522fa-s472664262",
                                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                                className: "h-4 w-4",
                                                                "data-api-unique-id": "quoterequestform-ra241ea18d4826293-s472664262",
                                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm"
                                                            }, void 0, false, {
                                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                                lineNumber: 478,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                            lineNumber: 477,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            "data-api-unique-id": "quoterequestform-rb11887ff97bfa873-s472664262",
                                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs font-semibold text-foreground",
                                                                    "data-api-unique-id": "quoterequestform-r34a1544451dc2f8d-s472664262",
                                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                                    children: "Direct Hotline"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                                    lineNumber: 481,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs text-muted-foreground",
                                                                    "data-api-unique-id": "quoterequestform-r64713e19986094cb-s472664262",
                                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                                    children: "+43 1 234 567 890"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                                    lineNumber: 484,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                            lineNumber: 480,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                    lineNumber: 476,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[11px] font-medium text-primary",
                                                    "data-api-unique-id": "quoterequestform-ree9fb9e0a17b8449-s472664262",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                    children: "Call"
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                    lineNumber: 489,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                            lineNumber: 475,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "https://wa.me/431234567890",
                                            target: "_blank",
                                            rel: "noreferrer",
                                            className: "flex items-center justify-between rounded-md border border-border bg-card text-card-foreground p-3 transition-colors hover:bg-muted",
                                            "data-api-unique-id": "quoterequestform-r67196df79ab0de9b-s472664262",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-3",
                                                    "data-api-unique-id": "quoterequestform-r7071c0f8d7a7cc1d-s472664262",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "inline-flex h-8 w-8 items-center justify-center rounded-md bg-muted text-success",
                                                            "data-api-unique-id": "quoterequestform-r38a3dd8ffac61f63-s472664262",
                                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageCircle$3e$__["MessageCircle"], {
                                                                className: "h-4 w-4",
                                                                "data-api-unique-id": "quoterequestform-r7debaa8665ecaa52-s472664262",
                                                                "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm"
                                                            }, void 0, false, {
                                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                                lineNumber: 495,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                            lineNumber: 494,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            "data-api-unique-id": "quoterequestform-r529956c0217d60e7-s472664262",
                                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs font-semibold text-foreground",
                                                                    "data-api-unique-id": "quoterequestform-r465b09f6edf084fd-s472664262",
                                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                                    children: "WhatsApp Quick Chat"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                                    lineNumber: 498,
                                                                    columnNumber: 21
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-xs text-muted-foreground",
                                                                    "data-api-unique-id": "quoterequestform-r88578bfec2dfe1f5-s472664262",
                                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                                    children: "Send photos directly"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                                    lineNumber: 501,
                                                                    columnNumber: 21
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                            lineNumber: 497,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                    lineNumber: 493,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[11px] font-medium text-success",
                                                    "data-api-unique-id": "quoterequestform-ra6493dc3fe64bbde-s472664262",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/QuoteRequestForm",
                                                    children: "Chat"
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                                    lineNumber: 506,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                            lineNumber: 492,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                                    lineNumber: 470,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                            lineNumber: 411,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
                    lineNumber: 182,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
            lineNumber: 172,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx",
        lineNumber: 171,
        columnNumber: 10
    }, this);
}
}),
"[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ServiceAreaSummary
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-ssr] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
"use client";
;
;
;
const zoneLabels = {
    INNER_CITY: {
        en: "Inner City Zone",
        de: "Innere Bezirke",
        ru: "Центральные районы"
    },
    CENTRAL: {
        en: "Central Urban Zone",
        de: "Erweiterte Bezirke",
        ru: "Городские районы"
    },
    OUTER_RING: {
        en: "Outer Ring Zone",
        de: "Äußere Bezirke",
        ru: "Внешнее кольцо"
    },
    GREATER_SUBURB: {
        en: "Greater Suburb & Lower Austria",
        de: "Randbezirke & Umland",
        ru: "Пригороды и Нижняя Австрия"
    }
};
function ServiceAreaSummary({ lang, districts = [] }) {
    const [selectedDistrict, setSelectedDistrict] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("1010");
    const currentDist = districts.find((d)=>d.districtCode === selectedDistrict) || districts[0];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "data-controller-name": "Service Area & Location Summary",
        className: "w-full border-b border-border bg-background text-foreground py-14 sm:py-16",
        "data-api-unique-id": "serviceareasummary-rfaa768f7967345c3-s1437568007",
        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServiceAreaSummary",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4 sm:px-6 lg:px-8",
            "data-api-unique-id": "serviceareasummary-r9eb726db94686dbf-s1437568007",
            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServiceAreaSummary",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8",
                    "data-api-unique-id": "serviceareasummary-r3853df85cf5bab27-s1437568007",
                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServiceAreaSummary",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            "data-api-unique-id": "serviceareasummary-r1520af6ae07f5c0c-s1437568007",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServiceAreaSummary",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "inline-flex items-center gap-1.5 rounded-sm bg-muted text-muted-foreground px-2.5 py-1 text-xs font-semibold border border-border mb-2",
                                    "data-api-unique-id": "serviceareasummary-r2bc5dba1352df319-s1437568007",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServiceAreaSummary",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                            className: "h-3.5 w-3.5 text-primary",
                                            "data-api-unique-id": "serviceareasummary-re4fb279f8f51dd49-s1437568007",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServiceAreaSummary"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx",
                                            lineNumber: 43,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "data-api-unique-id": "serviceareasummary-r5b34be46434c8574-s1437568007",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServiceAreaSummary",
                                            children: "Vienna 1010–1230 & Lower Austria"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx",
                                            lineNumber: 44,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx",
                                    lineNumber: 42,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground",
                                    "data-api-unique-id": "serviceareasummary-raaeabe11d6ce752c-s1437568007",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServiceAreaSummary",
                                    children: lang === "de" ? "Einsatzgebiete in Wien & Umland" : lang === "ru" ? "Зона обслуживания: 1–23 районы Вены" : "Coverage Area: Vienna Districts 1–23"
                                }, void 0, false, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx",
                                    lineNumber: 46,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-1 text-sm sm:text-base text-muted-foreground",
                                    "data-api-unique-id": "serviceareasummary-r25899865f6d0c3d3-s1437568007",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServiceAreaSummary",
                                    children: lang === "de" ? "Kurze Anfahrtswege und garantierte Termintreue in allen Wiener Gemeindebezirken." : lang === "ru" ? "Быстрый выезд и пунктуальность во всех районах Вены и пригородах." : "Fast dispatch, low flat travel allowances, and punctual appointments."
                                }, void 0, false, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx",
                                    lineNumber: 49,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2 text-xs text-muted-foreground bg-muted p-2 rounded-md border border-border",
                            "data-api-unique-id": "serviceareasummary-r55708f3e53264a6c-s1437568007",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServiceAreaSummary",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                    className: "h-4 w-4 text-primary",
                                    "data-api-unique-id": "serviceareasummary-r0a6cf3b782db79f2-s1437568007",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServiceAreaSummary"
                                }, void 0, false, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx",
                                    lineNumber: 55,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "data-api-unique-id": "serviceareasummary-r86530d1687abc3df-s1437568007",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServiceAreaSummary",
                                    children: "Standard arrival window: 24–48 hours"
                                }, void 0, false, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx",
                                    lineNumber: 56,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "rounded-xl border border-border bg-card text-card-foreground p-6 shadow-soft",
                    "data-api-unique-id": "serviceareasummary-rce238f8dd2755147-s1437568007",
                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServiceAreaSummary",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3",
                            "data-api-unique-id": "serviceareasummary-r67fd311a27c95646-s1437568007",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServiceAreaSummary",
                            children: "Click district to view response details:"
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx",
                            lineNumber: 62,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap gap-2",
                            "data-api-unique-id": "serviceareasummary-rba2b41d4db5a9e68-s1437568007",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServiceAreaSummary",
                            children: districts.map((dist, index)=>{
                                const isSelected = (currentDist?.districtCode || selectedDistrict) === dist.districtCode;
                                const displayName = dist.districtName.includes(" ") ? dist.districtName.split(" ").slice(1).join(" ") : dist.districtName;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>setSelectedDistrict(dist.districtCode),
                                    className: `rounded-md px-2.5 py-1.5 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isSelected ? "bg-primary text-primary-foreground shadow-sm scale-105" : "bg-background text-foreground border border-border hover:bg-muted"}`,
                                    "data-api-unique-id": "serviceareasummary-r755bba3345cfe30b-s1437568007",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServiceAreaSummary",
                                    "data-api-in-loop": "1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-bold mr-1",
                                            "data-api-unique-id": "serviceareasummary-re74f82f311d317a3-s1437568007",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServiceAreaSummary",
                                            "data-api-in-loop": "1",
                                            "data-api-bind-info": `districts-${index}-districtCode`,
                                            "data-api-map-var-name": "dist",
                                            children: dist.districtCode
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx",
                                            lineNumber: 71,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "opacity-90",
                                            "data-api-unique-id": "serviceareasummary-r71c65fc148354591-s1437568007",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServiceAreaSummary",
                                            "data-api-in-loop": "1",
                                            children: displayName || dist.districtName
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx",
                                            lineNumber: 72,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, dist.id || dist.districtCode, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx",
                                    lineNumber: 70,
                                    columnNumber: 20
                                }, this);
                            })
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx",
                            lineNumber: 66,
                            columnNumber: 11
                        }, this),
                        currentDist && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-6 pt-4 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-background text-foreground p-4 rounded-lg border border-border",
                            "data-api-unique-id": "serviceareasummary-rdb513417ecd558c0-s1437568007",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServiceAreaSummary",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    "data-api-unique-id": "serviceareasummary-rde808dcb06b4b1c3-s1437568007",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServiceAreaSummary",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            "data-api-unique-id": "serviceareasummary-r807ea5429d4ab420-s1437568007",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServiceAreaSummary",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "h-2 w-2 rounded-full bg-success",
                                                    "data-api-unique-id": "serviceareasummary-r3ebb42df4994aab5-s1437568007",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServiceAreaSummary"
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx",
                                                    lineNumber: 81,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "font-display font-bold text-sm text-foreground",
                                                    "data-api-unique-id": "serviceareasummary-r7d5b46dac0b07a50-s1437568007",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServiceAreaSummary",
                                                    children: [
                                                        currentDist.districtCode,
                                                        " — ",
                                                        currentDist.districtName
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx",
                                                    lineNumber: 82,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "rounded-sm bg-accent text-accent-foreground px-2 py-0.5 text-[10px] font-semibold",
                                                    "data-api-unique-id": "serviceareasummary-rb6369e8f4377f1d6-s1437568007",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServiceAreaSummary",
                                                    children: zoneLabels[currentDist.zone]?.[lang] || currentDist.zone
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx",
                                                    lineNumber: 85,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx",
                                            lineNumber: 80,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "mt-1 text-xs text-muted-foreground",
                                            "data-api-unique-id": "serviceareasummary-rfc9210ab7dbefce9-s1437568007",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServiceAreaSummary",
                                            children: [
                                                "Standard dispatch: ~",
                                                currentDist.leadTimeHours,
                                                "h window | Flat travel allowance: €15.00 – €25.00 | Same-day express slot possible upon capacity."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx",
                                            lineNumber: 89,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx",
                                    lineNumber: 79,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4 text-xs",
                                    "data-api-unique-id": "serviceareasummary-rad29789cf9aa1a4f-s1437568007",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServiceAreaSummary",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-1 text-success",
                                            "data-api-unique-id": "serviceareasummary-r58e28689a1dddd73-s1437568007",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServiceAreaSummary",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                    className: "h-4 w-4",
                                                    "data-api-unique-id": "serviceareasummary-rdf20f0e3bbf4238a-s1437568007",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServiceAreaSummary"
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx",
                                                    lineNumber: 96,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    "data-api-unique-id": "serviceareasummary-rf5932569b49aa648-s1437568007",
                                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServiceAreaSummary",
                                                    children: "Full Coverage"
                                                }, void 0, false, {
                                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx",
                                                    lineNumber: 97,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx",
                                            lineNumber: 95,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                            href: "#quote-section",
                                            className: "rounded-md bg-secondary px-3 py-1.5 font-medium text-secondary-foreground hover:brightness-95 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                            "data-api-unique-id": "serviceareasummary-r49edc74b9d467817-s1437568007",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/ServiceAreaSummary",
                                            children: "Select in Form"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx",
                                            lineNumber: 99,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx",
                                    lineNumber: 94,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx",
                            lineNumber: 78,
                            columnNumber: 27
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx",
                    lineNumber: 61,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx",
            lineNumber: 39,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx",
        lineNumber: 38,
        columnNumber: 10
    }, this);
}
}),
"[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/FaqSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FaqSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-ssr] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/circle-question-mark.js [app-ssr] (ecmascript) <export default as HelpCircle>");
"use client";
;
;
;
function FaqSection({ lang, faqs = [] }) {
    const [openId, setOpenId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedCategory, setSelectedCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("ALL");
    const toggle = (id)=>{
        setOpenId((prev)=>prev === id ? null : id);
    };
    const getQuestion = (item, l)=>{
        if (l === "de") return item.questionDe;
        if (l === "ru") return item.questionRu;
        return item.questionEn;
    };
    const getAnswer = (item, l)=>{
        if (l === "de") return item.answerDe;
        if (l === "ru") return item.answerRu;
        return item.answerEn;
    };
    const sortedFaqs = [
        ...faqs
    ].sort((a, b)=>(a.displayOrder ?? 0) - (b.displayOrder ?? 0));
    const filteredFaqs = sortedFaqs.filter((item)=>selectedCategory === "ALL" || item.category === selectedCategory);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        "data-controller-name": "Frequently Asked Questions",
        className: "w-full border-b border-border bg-card text-card-foreground py-14 sm:py-16",
        "data-api-unique-id": "faqsection-r22c5978ab70df289-s847762619",
        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/FaqSection",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4 sm:px-6 lg:px-8",
            "data-api-unique-id": "faqsection-rd7cbc991228d741e-s847762619",
            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/FaqSection",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-2xl mx-auto text-center mb-8",
                    "data-api-unique-id": "faqsection-rae02d9c3e1c10786-s847762619",
                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/FaqSection",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "inline-flex items-center gap-1.5 rounded-sm bg-muted text-muted-foreground px-2.5 py-1 text-xs font-semibold border border-border mb-2",
                            "data-api-unique-id": "faqsection-rf6d3a61f9fb12247-s847762619",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/FaqSection",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"], {
                                    className: "h-3.5 w-3.5 text-primary",
                                    "data-api-unique-id": "faqsection-rca428871dd49e372-s847762619",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/FaqSection"
                                }, void 0, false, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/FaqSection.tsx",
                                    lineNumber: 35,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    "data-api-unique-id": "faqsection-rd7a633025e71ec95-s847762619",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/FaqSection",
                                    children: "Clear Answers"
                                }, void 0, false, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/FaqSection.tsx",
                                    lineNumber: 36,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/FaqSection.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "font-display text-2xl sm:text-3xl font-bold tracking-tight text-card-foreground",
                            "data-api-unique-id": "faqsection-r1aadf0d6bec2c917-s847762619",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/FaqSection",
                            children: lang === "de" ? "Häufig gestellte Fragen (FAQ)" : lang === "ru" ? "Часто задаваемые вопросы (FAQ)" : "Frequently Asked Questions (FAQ)"
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/FaqSection.tsx",
                            lineNumber: 38,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-sm sm:text-base text-muted-foreground",
                            "data-api-unique-id": "faqsection-r133e33797312f3c3-s847762619",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/FaqSection",
                            children: lang === "de" ? "Wissenswertes zu Tarifen, Werkzeugen, Versicherung und rechtlichen Rahmenbedingungen." : lang === "ru" ? "Всё о тарифах, инструменте, страховке и юридических гарантиях." : "Essential details regarding pricing, materials, insurance, and compliance."
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/FaqSection.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/FaqSection.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-wrap justify-center items-center gap-2 mb-8",
                    "data-api-unique-id": "faqsection-raad4774b14b82ada-s847762619",
                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/FaqSection",
                    children: [
                        {
                            id: "ALL",
                            label: {
                                en: "All Topics",
                                de: "Alle Themen",
                                ru: "Все темы"
                            }
                        },
                        {
                            id: "PRICING",
                            label: {
                                en: "Pricing & Invoicing",
                                de: "Preise & Rechnung",
                                ru: "Цены и оплата"
                            }
                        },
                        {
                            id: "SCOPE",
                            label: {
                                en: "Trade Scope & Legal",
                                de: "Gewerberecht & Umfang",
                                ru: "Правовые границы"
                            }
                        },
                        {
                            id: "MATERIALS",
                            label: {
                                en: "Materials & Tools",
                                de: "Materialien & Werkzeug",
                                ru: "Материалы"
                            }
                        },
                        {
                            id: "SCHEDULING",
                            label: {
                                en: "Scheduling & Arrival",
                                de: "Termine & Anfahrt",
                                ru: "Сроки и выезд"
                            }
                        }
                    ].map((cat, index)=>{
                        const isSelected = selectedCategory === cat.id;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            type: "button",
                            onClick: ()=>setSelectedCategory(cat.id),
                            className: `rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${isSelected ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted text-muted-foreground hover:bg-secondary hover:text-secondary-foreground"}`,
                            "data-api-unique-id": "faqsection-re0cacc346ea07ff2-s847762619",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/FaqSection",
                            "data-api-in-loop": "1",
                            "data-api-bind-info": `list-${index}-label.lang`,
                            "data-api-map-var-name": "cat",
                            children: cat.label[lang]
                        }, cat.id, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/FaqSection.tsx",
                            lineNumber: 85,
                            columnNumber: 18
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/FaqSection.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-3xl mx-auto space-y-3",
                    "data-api-unique-id": "faqsection-re64e14c37ceff589-s847762619",
                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/FaqSection",
                    children: filteredFaqs.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-8 text-sm text-muted-foreground",
                        "data-api-unique-id": "faqsection-r2c9fddecf625b489-s847762619",
                        "data-api-unique-page-name": "src/frontend/components/HomeFrontend/FaqSection",
                        children: lang === "de" ? "Keine Fragen in dieser Kategorie vorhanden." : lang === "ru" ? "В этой категории нет вопросов." : "No questions available in this category."
                    }, void 0, false, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/FaqSection.tsx",
                        lineNumber: 93,
                        columnNumber: 40
                    }, this) : filteredFaqs.map((item, index)=>{
                        const isOpen = openId === item.id;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-lg border border-border bg-background text-foreground transition-colors overflow-hidden",
                            "data-api-unique-id": "faqsection-r6dcfac4d6ca1a464-s847762619",
                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/FaqSection",
                            "data-api-in-loop": "1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>toggle(item.id),
                                    className: "w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-semibold text-foreground hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                    "data-api-unique-id": "faqsection-rf868380e3fb9b5a9-s847762619",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/FaqSection",
                                    "data-api-in-loop": "1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "pr-4",
                                            "data-api-unique-id": "faqsection-ra247ba5c1b9f832b-s847762619",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/FaqSection",
                                            "data-api-in-loop": "1",
                                            children: getQuestion(item, lang)
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/FaqSection.tsx",
                                            lineNumber: 99,
                                            columnNumber: 21
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {
                                            className: `h-4 w-4 text-muted-foreground shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-primary" : ""}`,
                                            "data-api-unique-id": "faqsection-r7c847e04087889ff-s847762619",
                                            "data-api-unique-page-name": "src/frontend/components/HomeFrontend/FaqSection",
                                            "data-api-in-loop": "1"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/FaqSection.tsx",
                                            lineNumber: 100,
                                            columnNumber: 21
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/FaqSection.tsx",
                                    lineNumber: 98,
                                    columnNumber: 19
                                }, this),
                                isOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "px-4 pb-5 sm:px-5 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border pt-3",
                                    "data-api-unique-id": "faqsection-r98e86cef716dd5b0-s847762619",
                                    "data-api-unique-page-name": "src/frontend/components/HomeFrontend/FaqSection",
                                    "data-api-in-loop": "1",
                                    children: getAnswer(item, lang)
                                }, void 0, false, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/FaqSection.tsx",
                                    lineNumber: 103,
                                    columnNumber: 30
                                }, this)
                            ]
                        }, item.id, true, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/FaqSection.tsx",
                            lineNumber: 97,
                            columnNumber: 18
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/FaqSection.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/FaqSection.tsx",
            lineNumber: 32,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/FaqSection.tsx",
        lineNumber: 31,
        columnNumber: 10
    }, this);
}
}),
"[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>HomeFrontendPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/next@16.1.1_@babel+core@7.29.7_supports-color@8.1.1__react-dom@19.3.0_react@19.3.0__react@19.3.0/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$lib$2f$rpc$2d$generated$2f$src$2f$frontend$2f$actions$2f$HomeFrontend$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/lib/rpc-generated/src/frontend/actions/HomeFrontend.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$frontend$2f$route$2d$params$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/route-params.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$frontend$2f$components$2f$HomeFrontend$2f$Hero$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/Hero.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$frontend$2f$components$2f$HomeFrontend$2f$PricingTransparency$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/PricingTransparency.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$frontend$2f$components$2f$HomeFrontend$2f$ServicesGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServicesGrid.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$frontend$2f$components$2f$HomeFrontend$2f$LegalTradeScope$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/LegalTradeScope.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$frontend$2f$components$2f$HomeFrontend$2f$HowItWorks$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/HowItWorks.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$frontend$2f$components$2f$HomeFrontend$2f$QuoteRequestForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/QuoteRequestForm.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$frontend$2f$components$2f$HomeFrontend$2f$ServiceAreaSummary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/ServiceAreaSummary.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$frontend$2f$components$2f$HomeFrontend$2f$FaqSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/src/frontend/components/HomeFrontend/FaqSection.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/globe.js [app-ssr] (ecmascript) <export default as Globe>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/phone.js [app-ssr] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/message-square.js [app-ssr] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-ssr] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/vania/Documents/Career/AutoCoder.cc/node_modules/.pnpm/lucide-react@0.546.0_react@19.3.0/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-ssr] (ecmascript) <export default as ArrowRight>");
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const SERVICE_ID_TO_KEY = {
    "service-assembly": "ASSEMBLY",
    "service-demolition": "DEMOLITION",
    "service-flooring": "FLOORING",
    "service-painting": "PAINTING",
    "service-drywall": "DRYWALL",
    "service-bathroom-kitchen": "BATHROOM_KITCHEN",
    "service-doors-windows": "DOORS_WINDOWS",
    "service-outdoor": "OUTDOOR",
    "service-moving": "MOVING",
    "service-commercial": "COMMERCIAL",
    "service-plumbing-minor": "PLUMBING_MINOR",
    ASSEMBLY: "ASSEMBLY",
    DEMOLITION: "DEMOLITION",
    FLOORING: "FLOORING",
    PAINTING: "PAINTING",
    DRYWALL: "DRYWALL",
    PLUMBING_MINOR: "PLUMBING_MINOR",
    BATHROOM_KITCHEN: "BATHROOM_KITCHEN",
    DOORS_WINDOWS: "DOORS_WINDOWS",
    OUTDOOR: "OUTDOOR",
    MOVING: "MOVING",
    COMMERCIAL: "COMMERCIAL"
};
function HomeFrontendPage() {
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [lang, setLang] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("en");
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const valid = (value)=>value === "de" || value === "en" || value === "ru";
        try {
            const saved = window.localStorage.getItem("handyman-language");
            if (valid(saved)) setLang(saved);
        } catch  {}
        const onLanguageChange = (event)=>{
            const value = event.detail;
            if (valid(value)) setLang(value);
        };
        window.addEventListener("handyman-language-change", onLanguageChange);
        return ()=>window.removeEventListener("handyman-language-change", onLanguageChange);
    }, []);
    const changeLanguage = (value)=>{
        setLang(value);
        try {
            window.localStorage.setItem("handyman-language", value);
        } catch  {}
        window.dispatchEvent(new CustomEvent("handyman-language-change", {
            detail: value
        }));
    };
    const [preselectedService, setPreselectedService] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [_serviceCategoryKey, setServiceCategoryKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [services, setServices] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [districts, setDistricts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [faqs, setFaqs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [_isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let isMounted = true;
        setIsLoading(true);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$lib$2f$rpc$2d$generated$2f$src$2f$frontend$2f$actions$2f$HomeFrontend$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["getHomeData"])().then((data)=>{
            if (isMounted && data) {
                setServices(data.services ?? []);
                setDistricts(data.districts ?? []);
                setFaqs(data.faqs ?? []);
            }
        }).catch((err)=>{
            console.error("Failed to load home data:", err);
        }).finally(()=>{
            if (isMounted) {
                setIsLoading(false);
            }
        });
        return ()=>{
            isMounted = false;
        };
    }, []);
    const resolveCategoryKey = (serviceId)=>{
        if (!serviceId) return undefined;
        if (SERVICE_ID_TO_KEY[serviceId]) return SERVICE_ID_TO_KEY[serviceId];
        const match = services.find((s)=>s.id === serviceId || s.key === serviceId);
        if (match) return match.key;
        const cleaned = serviceId.replace(/^service-/, "").toUpperCase().replace(/-/g, "_");
        if (SERVICE_ID_TO_KEY[cleaned]) return SERVICE_ID_TO_KEY[cleaned];
        return undefined;
    };
    const scrollToQuote = (serviceId)=>{
        if (serviceId) {
            const mappedKey = resolveCategoryKey(serviceId);
            setPreselectedService(mappedKey || serviceId);
            if (mappedKey) {
                setServiceCategoryKey(mappedKey);
            }
        }
        const target = document.getElementById("quote-section");
        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        } else {
            const categoryKey = serviceId ? resolveCategoryKey(serviceId) || "" : "";
            if (categoryKey) {
                __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$frontend$2f$route$2d$params$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QuoteRequestForm"].navigateToWithCategory(router, {
                    categoryKey
                });
            } else {
                __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$frontend$2f$route$2d$params$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QuoteRequestForm"].navigateTo(router);
            }
        }
    };
    const scrollToServices = ()=>{
        const target = document.getElementById("services-section");
        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        } else {
            __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$frontend$2f$route$2d$params$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ServicesCatalog"].navigateTo(router);
        }
    };
    const handleInspectServiceDetail = (serviceId)=>{
        const categoryKey = resolveCategoryKey(serviceId);
        if (categoryKey) {
            __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$frontend$2f$route$2d$params$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ServiceCategoryDetail"].navigateToCategory(router, {
                categoryKey
            });
        } else {
            scrollToQuote(serviceId);
        }
    };
    const handleResetServiceSelection = ()=>{
        setPreselectedService("");
        setServiceCategoryKey("");
    };
    const baselineRate = services.length > 0 ? Math.min(...services.map((s, index)=>s.baselineHourlyRate)) : 15;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full min-h-screen bg-background text-foreground flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "sticky top-16 z-30 border-b border-border bg-card text-card-foreground",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-flex items-center gap-1.5 font-medium text-foreground",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                            className: "h-3.5 w-3.5 text-primary"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                                            lineNumber: 152,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Vienna Handyman Services (Gewerbeordnung konform)"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                                            lineNumber: 153,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                                    lineNumber: 151,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "hidden md:inline text-muted-foreground border-l border-border pl-3",
                                    children: [
                                        "Baseline Rate: €",
                                        baselineRate,
                                        "/h | Vienna 1st–23rd Districts"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                                    lineNumber: 155,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                            lineNumber: 150,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-3 ml-auto sm:ml-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "tel:+431234567890",
                                    className: "hidden sm:inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                            className: "h-3 w-3 text-primary"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                                            lineNumber: 163,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "+43 1 234 567 890"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                                            lineNumber: 164,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                                    lineNumber: 162,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "https://wa.me/431234567890",
                                    target: "_blank",
                                    rel: "noreferrer",
                                    className: "inline-flex items-center gap-1 rounded bg-muted text-success px-2 py-1 hover:bg-secondary transition-colors",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                            className: "h-3 w-3"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                                            lineNumber: 168,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "WhatsApp"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                                            lineNumber: 169,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                                    lineNumber: 167,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-1 border-l border-border pl-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$globe$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Globe$3e$__["Globe"], {
                                            className: "h-3.5 w-3.5 text-muted-foreground"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                                            lineNumber: 174,
                                            columnNumber: 15
                                        }, this),
                                        [
                                            "de",
                                            "en",
                                            "ru"
                                        ].map((l, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>changeLanguage(l),
                                                className: `rounded px-1.5 py-0.5 text-xs font-semibold uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`,
                                                children: l
                                            }, l, false, {
                                                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                                                lineNumber: 175,
                                                columnNumber: 69
                                            }, this))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                                    lineNumber: 173,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                            lineNumber: 160,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                    lineNumber: 149,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                lineNumber: 148,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 w-full",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$frontend$2f$components$2f$HomeFrontend$2f$Hero$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        lang: lang,
                        onSelectQuoteCta: ()=>scrollToQuote(),
                        onSelectServicesCta: scrollToServices
                    }, void 0, false, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                        lineNumber: 186,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$frontend$2f$components$2f$HomeFrontend$2f$PricingTransparency$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        lang: lang
                    }, void 0, false, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        id: "services-section",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$frontend$2f$components$2f$HomeFrontend$2f$ServicesGrid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            lang: lang,
                            services: services,
                            onSelectServiceForQuote: (id)=>{
                                scrollToQuote(id);
                            },
                            onInspectServiceDetail: (id)=>{
                                handleInspectServiceDetail(id);
                            }
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                            lineNumber: 193,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                        lineNumber: 192,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full bg-card text-card-foreground border-b border-border py-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "font-display font-bold text-base text-card-foreground",
                                            children: lang === "de" ? "Suchen Sie einen speziellen Service oder Großauftrag?" : lang === "ru" ? "Ищете нестандартные работы или комплексный ремонт?" : "Looking for a specialized project or full catalog?"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                                            lineNumber: 204,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-xs text-muted-foreground",
                                            children: lang === "de" ? "Entdecken Sie unseren vollständigen Katalog mit detaillierten Stundensätzen." : lang === "ru" ? "Ознакомьтесь с полным списком услуг и расценками мастеров." : "Explore our complete trade catalog with comprehensive scope guides."
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                                            lineNumber: 207,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                                    lineNumber: 203,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    onClick: ()=>{
                                        __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$frontend$2f$route$2d$params$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ServicesCatalog"].navigateTo(router);
                                    },
                                    className: "inline-flex items-center gap-1.5 rounded-md bg-secondary text-secondary-foreground px-4 py-2.5 text-xs font-semibold hover:brightness-95 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: lang === "de" ? "Gesamten Handwerkskatalog ansehen" : lang === "ru" ? "Смотреть весь каталог услуг" : "View All Handyman Services"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                                            lineNumber: 214,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$lucide$2d$react$40$0$2e$546$2e$0_react$40$19$2e$3$2e$0$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                            className: "h-3.5 w-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                                            lineNumber: 217,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                                    lineNumber: 211,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                            lineNumber: 202,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                        lineNumber: 201,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$frontend$2f$components$2f$HomeFrontend$2f$LegalTradeScope$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        lang: lang
                    }, void 0, false, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                        lineNumber: 223,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$frontend$2f$components$2f$HomeFrontend$2f$HowItWorks$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        lang: lang
                    }, void 0, false, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                        lineNumber: 226,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        id: "quote-section",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$frontend$2f$components$2f$HomeFrontend$2f$QuoteRequestForm$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            lang: lang,
                            preselectedServiceId: preselectedService,
                            onResetServiceSelection: handleResetServiceSelection
                        }, void 0, false, {
                            fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                            lineNumber: 230,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                        lineNumber: 229,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$frontend$2f$components$2f$HomeFrontend$2f$ServiceAreaSummary$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        lang: lang,
                        districts: districts
                    }, void 0, false, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                        lineNumber: 234,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$29$2e$7_supports$2d$color$40$8$2e$1$2e$1_$5f$react$2d$dom$40$19$2e$3$2e$0_react$40$19$2e$3$2e$0_$5f$react$40$19$2e$3$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$vania$2f$Documents$2f$Career$2f$AutoCoder$2e$cc$2f$src$2f$frontend$2f$components$2f$HomeFrontend$2f$FaqSection$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                        lang: lang,
                        faqs: faqs
                    }, void 0, false, {
                        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                        lineNumber: 237,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/vania/Documents/Career/AutoCoder.cc/app/(frontend)/page.tsx",
        lineNumber: 146,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=vania_Documents_Career_AutoCoder_cc_1f1b4ade._.js.map