'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Navigation } from '@/components/layout/frontend/Navigation'
import { Footer } from '@/components/layout/frontend/Footer'
import FrontendAuthGuard from '@/tools/FrontendAuthGuard'
import { PageErrorBoundary } from '@/default/NextPageErrorBoundary'

import '@/index.css'
import './theme-style.css'
import './theme-layout.css'
import { AuthExpiredDialog } from '@/frontend/auth/rpc-auth'



// 不需要导航栏和页脚的路径白名单（模板，后续可修改）
const FULLSCREEN_PATHS = ['/customerlogin', '/customerregister']

interface RootLayoutProps {
  children: React.ReactNode
}

export default function FrontendLayout({ children }: RootLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const handleGoBack = () => router.back()
  const normalizedPathname = pathname.toLowerCase()
  const isFullscreen = FULLSCREEN_PATHS.some(
    (p) => normalizedPathname === p || (p !== '/' && normalizedPathname.startsWith(`${p}/`))
  )

  return (
    <FrontendAuthGuard>
      <div
        className={`font-sans min-h-screen`}
      >
        <AuthExpiredDialog />
        {isFullscreen ? (
          <div className="flex-1">
            <PageErrorBoundary key={pathname} onGoBack={handleGoBack}>{children}</PageErrorBoundary>
          </div>
        ) : (
          <>
            <div className="[&:has(>.fixed)]:sticky [&:has(>.fixed)]:top-0 [&:has(>.fixed)]:z-50 [&>.fixed]:static! [&:has(>.sticky)]:sticky [&:has(>.sticky)]:top-0 [&:has(>.sticky)]:z-50 [&>.sticky]:static!">
              <Navigation />
            </div>
            <PageErrorBoundary key={pathname} onGoBack={handleGoBack}>{children}</PageErrorBoundary>
            <Footer />
          </>
        )}
      </div>
    </FrontendAuthGuard>
  )
}
