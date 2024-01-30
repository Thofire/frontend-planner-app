"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react"

const SigninButton = () => {

    const { data: session } = useSession();

    if (session && session.user) {
        return (
        <div className="flex gap-4 mlm-auto">
            <button onClick={() => signOut({ callbackUrl:'/'})} className="text-orange-600">
                Sign Out
            </button>
        </div>
        )
    }

    return (
        <button onClick={() => signIn({callbackUrl:'/mainPages/NoteWriter'})} className="white">
            Sign in
        </button>

    )
}

export default SigninButton