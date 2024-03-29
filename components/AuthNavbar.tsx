'use client'

import { signOut } from "next-auth/react"
import Link from "next/link"

export default () => {
    return (
        <header className="bg-light-grey h-16">
            <div className="container flex justify-between items-center mx-auto px-4 h-full">
                <div>
                    <Link href='/'>
                        <h1 className="text-black font-bold m-0">NextJS</h1>
                    </Link>
                </div>
                <div>
                    <Link href='/upload'>
                        <button className="bg-transparent text-purple text-sm font-semibold py-2 px-3.5 mr-2">
                            Upload
                        </button>
                    </Link>
                    <button
                        className="bg-purple text-white text-sm font-semibold py-2 px-3.5 rounded shadow-md"
                        onClick={() => signOut()}
                    >
                        Logout
                    </button>
                </div>
            </div>
        </header>
    )
}