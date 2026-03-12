'use client';

import { handleLogin } from "@core/libs/supabase/loginHandler";

const TmpLoginButton = ()=>{
    
    return <><button
        onClick={()=>{
            console.log("누름")
            handleLogin()
        }}
    >로그인 버튼</button></>
}

export default TmpLoginButton;