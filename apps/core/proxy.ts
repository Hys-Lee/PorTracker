import { NextResponse, type NextRequest } from "next/server"
import { updateSession } from "@core/libs/supabase/proxy"
import { createClient } from "./libs/supabase/server";

export async function proxy(request: NextRequest) {
    // supabase 세션 업데이트 (supabase token refresh automatically)
  const response =  await updateSession(request)

    // 리다이렉션 라우팅 접근 제어
    const pathname= request.nextUrl.pathname;
    const isAuthRoute = pathname.startsWith("/dashboard")||pathname.startsWith('login');

    // const hasSession = request.cookies.has('쿠키 이름.. 이걸 직접 테스트해서 체크해야만 함?');
    const supabase = await createClient();
    const {data:{user}} = await supabase.auth.getUser();

    // 이 부분은 왜 필요한가? auth router로 가기 전에 미리 걸러주는역할인가?
    if(isAuthRoute && !user){
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return response;


}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}