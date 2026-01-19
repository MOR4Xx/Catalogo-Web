import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export async function middleware(req) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
    });

    const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

    if (isAdminRoute && !token) {
        return NextResponse.redirect(
            new URL("/auth/login", req.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
