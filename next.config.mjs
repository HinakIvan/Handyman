import path from 'node:path'
import { fileURLToPath } from 'node:url'

/** 这里是 ESM 环境，自己算 __dirname */
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// monorepo 根：对齐 pnpm-lock.yaml 所在层级
const monoRoot = path.resolve(__dirname, '../../../../')

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production must run as a Next.js server because the app also needs the Express RPC backend.
  // Keep API rewrites enabled in production; static export cannot proxy these requests.
  async rewrites() {
    return [
      {
        source: '/rpc/:path*',
        destination: `http://127.0.0.1:${process.env.RPC_PORT || '3100'}/rpc/:path*`,
      },
      {
        source: '/flow-engine/Career/v2/run_flow',
        destination: 'https://pztest.koudingvip.com/flow-engine/Career/v2/run_flow',
      },
      {
        source: '/api/project_pz/getimage',
        destination: 'https://project.autocoder.cc/api/project_pz/getimage',
      },
    ]
  },

  experimental: {
    externalDir: true,
    cpus: 4
  },

  transpilePackages: ['components'],

  // turbopack 配置保留备用，切回时加 --turbopack 并注释掉 webpack
  // turbopack: {
  //   root: monoRoot,
  //   resolveAlias: {
  //     '@/frontend/actions': path.resolve(__dirname, './lib/rpc-generated/src/frontend/actions'),
  //     '@/backend/actions': path.resolve(__dirname, './lib/rpc-generated/src/backend/actions'),
  //     '@/app/actions': path.resolve(__dirname, './lib/rpc-generated/src/app/actions'),
  //     '@': path.resolve(__dirname, './src'),
  //     '@/server': path.resolve(__dirname, './server')
  //   },
  //   rules: { ... }
  // },

  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',

  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp']
  },

  productionBrowserSourceMaps: false,
  compress: true,

  env: {
    NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID || 'PROJ_b23df7b6_snap_20261010_124454_705',
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH || '',
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
    NEXT_PUBLIC_RUNTIME_API: process.env.NEXT_PUBLIC_RUNTIME_API || '/api/v1/proxy',
    NEXT_PUBLIC_SITE_TITLE:
      process.env.NEXT_PUBLIC_SITE_TITLE || "Vienna Handyman & Renovation Services Website"
  },

  typescript: {
    ignoreBuildErrors: true
  },

  webpack: (config) => {
    // resolve aliases（与 turbopack.resolveAlias 对齐）
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@/frontend/actions': path.resolve(__dirname, './lib/rpc-generated/src/frontend/actions'),
      '@/backend/actions': path.resolve(__dirname, './lib/rpc-generated/src/backend/actions'),
      '@/app/actions': path.resolve(__dirname, './lib/rpc-generated/src/app/actions'),
    }

    config.module.rules.push(
      // declare-function-rewrite: types 中的 declare function → actions re-export
      {
        test: /\/src\/(frontend|backend|app)\/types\/\w+\.ts$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [{
          loader: path.resolve(__dirname, './src/default/declare-function-rewrite-loader.cjs'),
          options: { projectRoot: __dirname }
        }]
      },
      // source-attributes-loader
      {
        test: /\.(tsx|jsx)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [{ loader: path.resolve(__dirname, './src/default/source-attributes-loader.js') }]
      },
    )
    return config
  },
}

export default nextConfig
