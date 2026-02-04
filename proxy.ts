import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { UserRole } from "./types";

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const { data, error } = await userService.getSession();
    const isAuthenticated = !!data && !error;
    const role = data?.user?.role;

    // 1. If not authenticated, allow Login and Register, redirect others to Login
    if (!isAuthenticated) {
        if (pathname === '/login' || pathname === '/register') return NextResponse.next();
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // 2. If authenticated, prevent visiting Login or Register
    if (pathname === '/login' || pathname === '/register') {
        if (role === UserRole.ADMIN) return NextResponse.redirect(new URL('/admin', request.url));
        if (role === UserRole.TUTOR) return NextResponse.redirect(new URL('/tutor/dashboard', request.url));
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // 3. Admin Territory Protection
    if (pathname.startsWith('/admin') && role !== UserRole.ADMIN) {
        const target = role === UserRole.TUTOR ? '/tutor/dashboard' : '/dashboard';
        return NextResponse.redirect(new URL(target, request.url));
    }

    // 4. Tutor Territory Protection
    if (pathname.startsWith('/tutor') && role !== UserRole.TUTOR) {
        const target = role === UserRole.ADMIN ? '/admin' : '/dashboard';
        return NextResponse.redirect(new URL(target, request.url));
    }

    // 5. Student Territory Protection
    if (pathname.startsWith('/dashboard') && role !== UserRole.STUDENT) {
        const target = role === UserRole.ADMIN ? '/admin' : '/tutor/dashboard';
        return NextResponse.redirect(new URL(target, request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/admin/:path*",
        "/tutor/:path*",
        "/dashboard/:path*",
        "/login",
        "/register"
    ]
}