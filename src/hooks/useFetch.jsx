import { useSession } from "@clerk/clerk-react";
import { useState } from "react";

const useFetch = (cb,option = {}) => {
    const [data,setData] = useState("");
    const [error,setError] = useState("");
    const [loading,setLoading] = useState("");

    const {session,isLoaded} = useSession();

    const fn = async(...args)=>{
        setLoading(true)
        setError(null)
        try {
           const supabaseAccessToken = await session.getToken({
            template : "supabase",
           });
           if (!supabaseAccessToken) {
            throw new Error("Failed to retrieve Supabase token.");
        }
           const response = await cb(supabaseAccessToken,option,...args)
           if (response) {
            console.log(response);
            setData(response);
          } else {
            setData(null);
          }  
        } catch (error) {
            setError(error)
        }
        finally{
            setLoading(false)
            console.log(data)
        }
    }
    return {fn,data,loading,error,setData};
}

export default useFetch;