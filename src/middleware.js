import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

const privateRoutes = ['/'];

export async function middleware(req) {
  const token = await getToken({
    req,
  });
  const { pathname } = req.nextUrl;

  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL(process.env.URL));
  }

  if (privateRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL('/login', process.env.URL));
  }
}

export const config = {
  matcher: ['/login', ...privateRoutes],
};
