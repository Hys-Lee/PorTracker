import { createClient } from "@core/libs/supabase/server";
import { redirect } from "next/navigation";

const DashboardPage = async ()=>{

    const supabase = await createClient();
    const {data:{user}} = await supabase.auth.getUser();

    // if(!user){
    //     redirect('/login');
    // }

    return <>dashboard</>
}

export default DashboardPage;