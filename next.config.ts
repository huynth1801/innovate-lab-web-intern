import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals = config.externals || []
    config.externals.push("pino-pretty", "lokijs", "encoding")
    return config
  },
}

export default withNextIntl(nextConfig)
