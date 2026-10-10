import React, { CSSProperties, useState, useEffect, useMemo } from 'react';
import { Loader2, Image as ImageIcon } from 'lucide-react';
import get_image_url from '../../src/tools/tools';
import { cn } from '../lib/utils';

// 并发控制：最多同时 3 个图片请求
const MAX_CONCURRENT = 3;
let activeCount = 0;
const waitQueue: Array<() => void> = [];

function acquireSlot(): Promise<void> {
    if (activeCount < MAX_CONCURRENT) {
        activeCount++;
        return Promise.resolve();
    }
    return new Promise<void>((resolve) => {
        waitQueue.push(() => {
            activeCount++;
            resolve();
        });
    });
}

function releaseSlot(): void {
    activeCount--;
    if (waitQueue.length > 0) {
        const next = waitQueue.shift()!;
        next();
    }
}

// 内存缓存：避免相同 keywords 重复请求
const imageCache = new Map<string, string>();

function getCacheKey(keywords: string, orientation: string, propKey: string): string {
    return `${keywords}|${orientation}|${propKey}`;
}

interface EditableImgProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
    propKey: string;             // 必须传入的唯一标识符
    src?: string | null;         // 图片源，支持 null
    alt?: string | null;         // 图片描述，支持 null
    keywords?: string | null;    // 用于关键词获取图片
    description?: string | null; // 图片详细描述
    needLargeImage?: boolean;    // 是否需要大图
    orientation?: 'landscape' | 'portrait' | 'square'; // 图片方向
}

// 默认外观：作为可被覆盖的 className（不是内联 style），使用方 className 里的
// aspect-*/w-*/h-*/object-* 会经 cn(tailwind-merge) 正常覆盖它。
// 内联写死会压过使用方 className（内联优先级最高），导致图片在 aspect-square/h-full 等
// 容器里溢出——所以这里改成默认 class：不给尺寸时按 16/9 占位防 CLS，给了尺寸就被覆盖。
const DEFAULT_CLASS = 'object-cover aspect-[16/9] w-full h-full';

const extractProjectId = (): string => {
    if (typeof window === 'undefined') {
        return '';
    }
    try {
        const currentUrl = new URL(window.location.href);
        const queryProjectId =
            currentUrl.searchParams.get('PROJECTID') ||
            currentUrl.searchParams.get('project_id') ||
            currentUrl.searchParams.get('projectId');
        if (queryProjectId) {
            return decodeURIComponent(queryProjectId);
        }
        const pathMatch = currentUrl.pathname.match(/PROJ_[0-9a-zA-Z]+/);
        return pathMatch ? pathMatch[0] : '';
    } catch {
        return '';
    }
};

// 检测字符串是否为有效的网址
const isValidUrl = (string: string): boolean => {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:' || url.protocol === 'blob:';
    } catch (_) {
        return false;
    }
};

const EditableImg = (props: EditableImgProps) => {
    const {
        src,
        alt = '',
        className,
        propKey,
        style,
        keywords,
        description,
        needLargeImage = false,
        orientation = 'landscape',
        ...imgProps
    } = props;
    // 写了 src= 绑定（即使值为空）说明这是记录字段：字段为空时只占位，不做关键词取图，
    // 避免同一记录在不同页面按各自 fallback 关键词取到不同图。
    const hasSrcBinding = 'src' in props;
    const [imageSrc, setImageSrc] = useState<string | null | undefined>(src);
    const [imageAlt, setImageAlt] = useState<string | null | undefined>(alt);
    const [loading, setLoading] = useState<boolean>(false);
    const [isFromKeywordSearch, setIsFromKeywordSearch] = useState<boolean>(false); // 新增状态
    const projectId = useMemo(() => extractProjectId(), []);

    useEffect(() => {
        setImageSrc(src);
        setIsFromKeywordSearch(false); // 来自 src prop 时,标记为非关键词搜索
    }, [src]);

    useEffect(() => {
        setImageAlt(alt);
    }, [alt]);

    // 新增：根据 keywords 获取图片（带并发控制）
    useEffect(() => {
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

                acquireSlot().then(() => {
                    if (cancelled) {
                        releaseSlot();
                        return;
                    }
                    // 拿到 slot 后才显示 loading，避免大量组件同时 spin
                    setLoading(true);
                    return get_image_url(keywords || description || '', orientation, propKey, projectId || '', description || '', needLargeImage, abortController.signal).then(url => {
                        if (!cancelled) {
                            imageCache.set(cacheKey, url);
                            setImageSrc(url);
                            setLoading(false);
                            setIsFromKeywordSearch(true);
                        }
                    }).catch((err) => {
                        if (!cancelled && err?.name !== 'AbortError') {
                            setLoading(false);
                        }
                    }).finally(() => {
                        releaseSlot();
                    });
                });

                return () => {
                    cancelled = true;
                    abortController.abort();
                };
            }
        }
    }, [keywords, src, orientation, propKey, projectId, description, needLargeImage, hasSrcBinding]);

    const mergedStyle: CSSProperties = {
        ...style,
    };

    if (loading) {
        return (
            <div style={{...mergedStyle, pointerEvents: 'none'}} key={propKey} className={cn(DEFAULT_CLASS, 'flex items-center justify-center', className)}>
                <Loader2 className="animate-spin" style={{ willChange: 'transform' }} />
            </div>
        );
    }

    if (!imageSrc) {
        return (
            <div
                style={{...mergedStyle, pointerEvents: 'none'}}
                key={propKey}
                role="img"
                aria-label={imageAlt ?? undefined}
                className={cn(DEFAULT_CLASS, 'flex items-center justify-center bg-muted', className)}
            >
                <ImageIcon className="w-6 h-6 text-muted-foreground/60" />
            </div>
        );
    }

    return (
        <img
            {...imgProps}
            style={mergedStyle}
            key={propKey}
            src={imageSrc ?? undefined}
            alt={imageAlt ?? undefined}
            className={cn(DEFAULT_CLASS, className)}
            data-api-exclude-tracking={isFromKeywordSearch ? "true" : undefined}
        />
    );
};

export default EditableImg;
export { EditableImg };
