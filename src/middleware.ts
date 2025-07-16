import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  console.log("🔍 Middleware running for:", pathname);
  console.log("🔍 Token found:", !!token);

  // List of protected routes
  const isProtectedRoute =
    pathname.startsWith("/dashboard") || pathname.startsWith("/dashboard");

  if (isProtectedRoute && !token) {
    console.log("🚫 Redirecting to login - no token found");

    // Create login URL with redirect parameter
    const loginUrl = new URL("/sign-in", request.url);
    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
