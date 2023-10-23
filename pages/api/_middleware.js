import { NextResponse } from 'next/server';

export default async function middleware(req) {
    const { nextUrl } = req;

    if (nextUrl.pathname === '/api/auth' || nextUrl.pathname.includes('/api/validToken')) {
        return NextResponse.next();
    }

    if (req.cookies.token !== undefined) {
        const response = await fetch('/api/validToken', {
          headers: {
            Authorization: `Bearer ${req.cookies.token}`,
          },
        });

        if (response.status === 200) {
          return NextResponse.next();
        }
    }
    
    return NextResponse.redirect('/login');
}