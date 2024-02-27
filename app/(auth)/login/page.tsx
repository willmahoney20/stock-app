'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import handleFormErrors from '@/helpers/handleLoginErrors'
import imageSplitter from '@/helpers/imageSplitter'
import FormInput from '@/components/FormInput'

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
                    <FormInput
                        name='username'
                        type='text'
                        label='Username'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        error={errors.username ? true : false}
                    />
                    <FormInput
                        name='password'
                        type='password'
                        label='Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        error={errors.password ? true : false}
                    />
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