'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import handleFormErrors from '@/helpers/handleLoginErrors'
import imageSplitter from '@/helpers/imageSplitter'

interface ErrorProps {
    username: string,
    password: string
}

export default () => {
    const router = useRouter()
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errors, setErrors] = useState<Partial<ErrorProps>>({})

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        const error_res = await handleFormErrors({ username, password })

        if(error_res){
            setErrors(error_res)

            return
        }

        setErrors({})

        try {
            // handle login
        } catch (err){
            console.error('Error adding new product:', err)
        }
    }

    return (
        <div className="container mx-auto">
            <div className="flex flex-column justify-center items-start py-12">
                <form onSubmit={handleSubmit} className='max-w-sm mx-auto mt-12 px-2'>
                    <h1 className="text-black text-2xl text-center font-bold mb-10">
                        LOGIN
                    </h1>
                    <div className="relative mb-6">
                        <label
                            htmlFor="username"
                            className="absolute bottom-6 left-2 bg-white text-black text-sm font-semibold px-1 pb-0.5 m-0"
                            style={{
                                color: errors.username ? 'red' : 'inherit'
                            }}
                        >
                            Username
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="bg-transparent w-full h-9 px-3 py-2 border border-gray-500 rounded-md"
                            style={{
                                borderColor: errors.username ? 'red' : '#6b7280'
                            }}
                        />
                    </div>
                    <div className="relative mb-6">
                        <label
                            htmlFor="password"
                            className="absolute bottom-6 left-2 bg-white text-black text-sm font-semibold px-1 pb-0.5 m-0"
                            style={{
                                color: errors.password ? 'red' : 'inherit'
                            }}
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="bg-transparent w-full h-9 px-3 py-2 border border-gray-500 rounded-md"
                            step="1"
                            style={{
                                borderColor: errors.password ? 'red' : '#6b7280'
                            }}
                        />
                    </div>
                    <div>
                        <button type='submit' className="bg-purple text-white text-sm font-semibold py-2 px-3.5 rounded shadow-md w-full">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}