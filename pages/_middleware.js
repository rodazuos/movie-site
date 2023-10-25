import { NextResponse } from "next/server";

export default async function middleware(req) {
  const { nextUrl } = req;

  if (
    nextUrl.pathname.includes("/api/") ||
    nextUrl.pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  if (req.cookies.token !== undefined) {
    const response = await fetch("/api/validToken", {
      headers: {
        Authorization: `Bearer ${req.cookies.token}`,
      },
    });

    if (response.status === 200) {
      if (nextUrl.pathname === "/login") {
        return NextResponse.redirect("/home");
      }
      return NextResponse.next();
    }
  }

  return nextUrl.pathname === "/login"
    ? NextResponse.next()
    : NextResponse.redirect("/login");
}
