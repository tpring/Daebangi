import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const authToken = req.cookies.get("sb-txvvzlryxqhzxjcsncqo-auth-token");
  console.log(authToken);

  // 로그인 상태에서 접근할 수 없는 페이지는
  const restrictedPaths = ["/login", "/signup"];

  if (restrictedPaths.includes(pathname) && authToken) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  // 로그인하지 않은 상태에서 접근할 수 없는 페이지는
  const protectedPaths = ["/mypage"];
  if (protectedPaths.includes(pathname) && !authToken) {
    const url = new URL("/login", req.nextUrl);
    url.searchParams.set("message", "로그인 후 이용부탁드립니다");
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/mypage"],
};
