import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

const PROTECTED_PATHS = ["/bookings-history", "/profile"];

export function middleware(request: NextRequest) {
  // Run next-intl's routing logic first (locale detection/redirect)
  const intlResponse = intlMiddleware(request);
  const { pathname } = request.nextUrl;
  const pathWithoutLocale = pathname.replace(/^\/(vi|en)/, "") || "/";

  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isProtected = PROTECTED_PATHS.some((p) =>
    pathWithoutLocale.startsWith(p),
  );

  if (isProtected && !accessToken && !refreshToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return intlResponse;
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
