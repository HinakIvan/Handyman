'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Sidebar } from "@/components/layout/backend/Sidebar"
import "@/index.css"
import "./theme-style.css"
import "./theme-layout.css"
import { PageErrorBoundary } from '@/default/NextPageErrorBoundary'
import BackendAuthGuard from "@/tools/BackendAuthGuard"
import { AuthExpiredDialog } from '@/backend/auth/rpc-auth'







// 不需要侧边栏的路径白名单（模板，后续可修改）
const FULLSCREEN_PATHS = ['/adminlogin', '/adminregister']

interface RootLayoutProps {
  children: React.ReactNode
}

export default function BackendLayout({ children }: RootLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const handleGoBack = () => router.back()
  const normalizedPathname = pathname.toLowerCase()
  const isFullscreen = FULLSCREEN_PATHS.some(
    (p) => normalizedPathname === p || (p !== '/' && normalizedPathname.startsWith(`${p}/`))
  )

  return (
    <div className={`font-sans min-h-screen`}>
      <AuthExpiredDialog />
      <BackendAuthGuard>
        {isFullscreen ? (
          <div className="flex-1"> 
            <PageErrorBoundary key={pathname} onGoBack={handleGoBack}>{children}</PageErrorBoundary>
          </div>
        ) : (
          <div className="grid h-screen grid-cols-[max-content_minmax(0,1fr)]">
            <div className="h-screen [&>*:first-child]:static! [&>*:first-child]:h-full!"><Sidebar /></div>
            <div className="min-w-0 overflow-y-auto">
              <PageErrorBoundary key={pathname} onGoBack={handleGoBack}>{children}</PageErrorBoundary>
            </div>
          </div>
        )}
      </BackendAuthGuard>
    </div>
  )
}
