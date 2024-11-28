"use client";

import { AuthContext } from "@/app/contexts/authContext";
import Link from "next/link";
import { useContext } from "react";

const UserWidget = () => {
    const manImageUrl = 'https://images.vexels.com/content/220668/preview/yellow-rubber-duck-illustration-rubber-duck-1ee348.png';
    const { user, logout } = useContext(AuthContext)
    return (
        <div>
            {!user?.login ? (
                <Link href="/login"> Sign In </Link>
            ) : (
                <div className="flex gap-3">
                    <Link href="/dashboard" className="flex items-center group">
                        <span>
                            {user.user.name}
                        </span>
                        <img
                            src={manImageUrl}
                            alt="Hombrecito"
                            width={40}
                            height={40}
                            className="mr-2"
                        />
                    </Link>

                    <button onClick={logout}>Sing Out</button>
                </div>
            )}
        </div>
    )
}

export default UserWidget;