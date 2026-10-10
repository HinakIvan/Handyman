'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAdminSession } from '@/tools/BackendSession';

export default function BackendAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const session = useAdminSession();
  const need_auth = ['/adminoperationsdashboard','/adminquotedetail','/admincategoriesrates','/admincompliancechecklist'];
  const normalizePath = (path: string) => {
    if (!path || path === '/') return '/';
    return path.endsWith('/') ? path.slice(0, -1) : path;
  };
  const matchesAuthPath = (needAuthPath: string) => {
    const current = normalizePath(pathname || '/');
    const target = normalizePath(needAuthPath || '/');
    if (target === '/') return current === '/';
    return current === target || current.startsWith(`${target}/`);
  };
  const isLoginPath = matchesAuthPath('/adminlogin');

  useEffect(() => {
    if (!session._hasHydrated) return;
    if (!session?.token) {
      let has_need_auth = false;
      for (const need_auth_path of need_auth) {
        if (matchesAuthPath(need_auth_path)) {
          has_need_auth = true;
          break;
        }
      }
      if(!has_need_auth) return;
      const redirect = encodeURIComponent((pathname || '/') + (window.location.search || ''));
      if (isLoginPath) {
          router.replace(`/adminlogin`);
          return;
      }
      router.replace(`/adminlogin?redirect=${redirect}`);
    }
  }, [pathname, router, session]);

  return children;
}