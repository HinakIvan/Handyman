'use client';

import React, { Suspense, useEffect } from 'react';
import '@/lib/i18n-runtime';
import { toast } from 'sonner';

export function Providers({
  children
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    window.alert = toast.info;
  }, []);

  return <Suspense fallback={null}>{children}</Suspense>;
}
