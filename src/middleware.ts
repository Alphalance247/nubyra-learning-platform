import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;

  // Add this for debugging
  console.log("Middleware - pathname:", pathname);
  console.log("Middleware - token exists:", !!token);

  // List of protected routes
  const isProtectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/learning/enroll") ||
    pathname.startsWith("/project/submit") ||
    pathname.startsWith("/learning/premium-subscription");

  if (isProtectedRoute && !token) {
    // Create login URL with redirect parameter
    const loginUrl = new URL("/sign-in", request.url);
    loginUrl.searchParams.set("redirect", pathname);

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/checkout",
    "/learning/enroll",
    "/learning/premium-subscription",
    "/project/submit",
  ],
};
