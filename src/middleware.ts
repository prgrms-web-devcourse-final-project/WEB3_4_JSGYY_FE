import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { parseAccessToken } from "@/lib/auth/token";

import client from "./lib/backend/client";

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const { isLogin, isAccessTokenExpired } = parseAccessToken(accessToken);

  if (isLogin && isAccessTokenExpired) await refreshTokens(cookieStore);

  if (requiresLogin(req.nextUrl.pathname) && !isLogin)
    return createUnauthorizedResponse("로그인 후 이용해주세요.");

  return NextResponse.next({
    headers: {
      cookie: cookieStore.toString(),
    },
  });
}

async function refreshTokens(cookieStore: ReadonlyRequestCookies) {
  const meResponse = await client.get("/api/v1/members/me", {
    headers: {
      cookie: cookieStore.toString(),
    },
  });

  const setCookieHeaders = meResponse.headers["set-cookie"];

  if (setCookieHeaders) {
    for (const cookieStr of setCookieHeaders) {
      const cookieData = parseCookie(cookieStr);

      if (cookieData) {
        const { name, value, options } = cookieData;
        if (name !== "accessToken" && name !== "apiKey") return null;

        cookieStore.set(name, value, options);
      }
    }
  }
}

function parseCookie(cookieStr: string) {
  const parts = cookieStr.split(";").map((p) => p.trim());
  const [name, value] = parts[0].split("=");

  const options: Partial<ResponseCookie> = {};
  for (const part of parts.slice(1)) {
    if (part.toLowerCase() === "httponly") options.httpOnly = true;
    else if (part.toLowerCase() === "secure") options.secure = true;
    else {
      const [key, val] = part.split("=");
      const keyLower = key.toLowerCase();
      if (keyLower === "domain") options.domain = val;
      else if (keyLower === "path") options.path = val;
      else if (keyLower === "max-age") options.maxAge = parseInt(val);
      else if (keyLower === "expires")
        options.expires = new Date(val).getTime();
      else if (keyLower === "samesite")
        options.sameSite = val.toLowerCase() as "lax" | "strict" | "none";
    }
  }

  return { name, value, options };
}

// 현재는 사용하지 않음
// 이유 : 클라이언트 컴포넌트에서 이미 페이지별 접근권한을 체크하고 있음
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function requiresLogin(pathname: string): boolean {
  return false;

  // return (
  //   pathname.startsWith("/post/write") ||
  //   pathname.startsWith("/post/mine") ||
  //   pathname.match(/^\/post\/\d+\/edit$/) !== null ||
  //   pathname.startsWith("/member/me")
  // );
}

function createUnauthorizedResponse(msg: string): NextResponse {
  return new NextResponse(msg, {
    status: 401,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
    },
  });
}

export const config = {
  // 아래 2가지 경우에는 middleware를 실행하지 않도록 세팅
  // api 로 시작하거나 하는 요청 : /api/~~~
  // 정적 파일 요청 : /~~~.jpg, /~~~.png, /~~~.css, /~~~.js
  // PS. 여기서 말하는 api 로 시작하는 요청은 백엔드 API 서버로의 요청이 아니라 Next.js 고유의 API 서버로의 요청이다.
  // PS. 우리는 현재 이 기능을 사용하고 있지 않다.
  matcher: "/((?!.*\\.|api\\/).*)",
};
