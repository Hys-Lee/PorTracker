'use server';

import { headers } from "next/headers";
import { createClient } from "./server";
import { redirect } from "next/navigation";

const handleLogin = async ()=>{
    const headerList = await headers();
    const origin = headerList.get('origin')
    const supabase =await createClient();

    const {data,error} = await supabase.auth.signInWithOAuth({
        provider:'google',
        options:{
            redirectTo:`${origin}/auth/callback`,
            scopes:"https://www.googleapis.com/auth/drive.file",
            queryParams:{
                access_type:"offline",
                prompt:'consent',

     }
        }
    })
    // 실패 시
    if(error) return redirect('/login?error=auth_failed');

    // 성공 시
    if(data.url) return redirect(data.url);
}


export {handleLogin}