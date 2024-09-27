import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ message: 'Logout successful' });

  // Eliminar el token de autenticación y la información del usuario
  res.cookies.set('token', '', { httpOnly: true, maxAge: -1, path: '/' });
  res.cookies.set('user', '', { httpOnly: true, maxAge: -1, path: '/' });

  return res;
}
