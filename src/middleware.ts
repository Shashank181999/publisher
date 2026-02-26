import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SESSION_COOKIE_NAME = 'admin_session';

// Simple base64 decode
function base64Decode(str: string): string {
  try {
    return Buffer.from(str, 'base64url').toString('utf-8');
  } catch {
    return '';
  }
}

// Verify token structure and expiration (signature verification happens in API routes)
function isTokenValid(token: string): boolean {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    const payload = JSON.parse(base64Decode(parts[1]));

    // Check if token has required fields and is not expired
    if (!payload.isAuthenticated || !payload.expiresAt) return false;
    if (payload.expiresAt < Date.now()) return false;

    return true;
  } catch {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  console.log('[Middleware] Path:', pathname);

  // Only protect admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  // Allow access to login page
  if (pathname === '/admin/login') {
    // If already authenticated, redirect to dashboard
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (token && isTokenValid(token)) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next();
  }

  // Allow API routes to handle their own auth
  if (pathname.startsWith('/admin/api') || pathname.startsWith('/api/admin')) {
    return NextResponse.next();
  }

  // Check for valid session token
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;

  console.log('[Middleware] Token exists:', !!token);
  console.log('[Middleware] Token valid:', token ? isTokenValid(token) : false);

  if (!token || !isTokenValid(token)) {
    // Redirect to login page
    console.log('[Middleware] Redirecting to login');
    const loginUrl = new URL('/admin/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
