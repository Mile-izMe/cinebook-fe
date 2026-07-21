import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ["192.168.1.3"],
};

export default withNextIntl(nextConfig);
