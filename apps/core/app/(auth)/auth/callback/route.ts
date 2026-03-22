import { NextResponse } from "next/server"
import { createClient } from "@core/libs/supabase/server"
import { RestfulMethod } from "@core/types/api";

export const GET = async (req:Request)=>{

    const requestUrl = new URL(req.url);
    const code = requestUrl.searchParams.get("code");
    const next = requestUrl.searchParams.get("next")??"/dashboard" // 리다이렉션 할 페이지


    const error = requestUrl.searchParams.get("error");
    if(error || !code){
        console.error("Auth callback error: ", error);

        // authcode확인 불가능 할 때, 로그인 위치로 redirect
        return NextResponse.redirect(new URL('/login?error=auth_failed', req.url)); // 저 경로는 뭐지?

    }

    const supabase = await createClient();
    try{
        // 아래의 세션 교환 함수 성공 시, supabase client가 자동으로 httponly 쿠키를 브라우저에 세팅.
        const {data,error:exchangeError} = await supabase.auth.exchangeCodeForSession(code);

        if(exchangeError){
            throw exchangeError;
        }

        // 백엔드로 google token 전달하기 (드라이브 권한 위해)
        const session = data.session;
        if(session && session.provider_token && session.provider_refresh_token){
            await fetch(`${process.env.INTERNAL_API_URL}/api/v1/credentials/google`, {
                method:'POST' as RestfulMethod,
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${session.access_token}`,
                },
                body:JSON.stringify({
                    provider_token:session.provider_token,
                    provider_refresh_token:session.provider_refresh_token,
                })
            })
        }




        // 정상 redirect
        return NextResponse.redirect(new URL(next, req.url));
    }catch(e){
        console.error("Session exchange failed: ",e);

        // 세션 교환 실패 -> 로그인 위치로 redirect
        return NextResponse.redirect(new URL('login?error=session_failed', req.url));
    }


}