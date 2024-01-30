"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react"

const SigninButton = () => {

    const { data: session } = useSession();

    if (session && session.user) {
        return (
        <div className="flex gap-4 mlm-auto">
            <p className="white">{session.user.email}</p>
            <button onClick={() => signOut()} className="text-orange-600">
                Sign Out
            </button>
        </div>
        )
    }

    return (
        <button onClick={() => signIn()} className="white">
            Sign in
        </button>

    )
}

export default SigninButton