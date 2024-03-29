'use client'

import Link from "next/link"

export default () => {
    return (
        <header className="bg-light-grey h-16">
            <div className="container flex justify-between items-center mx-auto px-4 h-full">
                <div>
                    <h1 className="text-black font-bold m-0">NextJS</h1>
                </div>
                <div>
                    <Link href='/login'>
                        <button className="bg-purple text-white text-sm font-semibold py-2 px-3.5 rounded shadow-md">
                            Login
                        </button>
                    </Link>
                </div>
            </div>
        </header>
    )
}