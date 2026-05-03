import type { NextConfig } from 'next'

// GitHub Actions 환경에서만 basePath 적용 (GitHub Pages 배포용)
const isGithubActions = process.env.GITHUB_ACTIONS === 'true'

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isGithubActions ? '/AndiokChurch' : '',
  trailingSlash: true,
  images: { unoptimized: true },
}

export default nextConfig
