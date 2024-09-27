import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
];
const privateRoutes = ['/client', '/backoffice'];

export async function middleware(req: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  const { pathname } = req.nextUrl;

  // Evitar bucles de redirección
  if (!token && publicRoutes.some((route) => pathname.startsWith(route))) {
    // Permite el acceso a rutas públicas sin token
    return NextResponse.next();
  }

  // Si no hay token (usuario no autenticado) y está intentando acceder a una ruta privada
  if (!token && privateRoutes.some((route) => pathname.startsWith(route))) {
    if (pathname !== '/login') {
      return NextResponse.redirect(new URL('/login', req.url)); // Redirige al login si no tiene token
    }
    return NextResponse.next(); // Si ya está en login, no hacer nada
  }

  // Si hay token (usuario autenticado) y está intentando acceder a una ruta pública
  if (token && publicRoutes.some((route) => pathname.startsWith(route))) {
    if (pathname !== '/client') {
      return NextResponse.redirect(new URL('/client', req.url)); // Redirige al cliente si está logueado
    }
    return NextResponse.next(); // Si ya está en /client, no hacer nada
  }

  // Verifica el token
  if (token && privateRoutes.some((route) => pathname.startsWith(route))) {
    try {
      const response = await fetch(new URL('/api/auth/token', req.url), {
        method: 'POST',
        headers: {
          // eslint-disable-next-line @typescript-eslint/naming-convention
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        // Si el token no es válido, redirigir al login
        return NextResponse.redirect(new URL('/login', req.url));
      }

      // Si el token es válido, seguir adelante
      const { user } = await response.json();
      const res = NextResponse.next();
      // Guardar los datos del usuario en un cookie
      res.cookies.set('user', JSON.stringify(user), { httpOnly: true });

      return res;
    } catch (error) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/client/:path*',
    '/backoffice/:path*',
    '/login',
    '/register',
    '/forgot-password',
  ],
};
