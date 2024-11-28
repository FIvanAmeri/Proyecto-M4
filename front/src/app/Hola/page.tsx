"use client"
import React, { useContext, useEffect } from 'react'
import { AuthContext } from "@/app/contexts/authContext";
import { useRouter } from "next/navigation";



export default function Hola() {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    useEffect(
        () => {
            if (!user) {
                router.push("/login");
            }
        }, [user]
    )

    return (
        <div>
            <p>Hola</p>
        </div>
    )
}
