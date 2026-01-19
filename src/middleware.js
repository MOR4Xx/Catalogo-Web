import { NextResponse } from "next/server";

export function middleware(request) {
    const authCookie = request.cookies.get("auth");

    const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

    if (isAdminRoute && !authCookie) {
        return NextResponse.redirect(new URL("/auth/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
