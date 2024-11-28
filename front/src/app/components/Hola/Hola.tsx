import React, { useContext } from 'react'
import { AuthContext } from "@/app/contexts/authContext";
import { useRouter } from "next/navigation";



export default function Hola() {
const { user } = useContext(AuthContext);
const  router  = useRouter();
    
if(!user){
    router.push("/login");
}

  return (
    <div>
    <p>Hola</p>
    </div>
  )
}
