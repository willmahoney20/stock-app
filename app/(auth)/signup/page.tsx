'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import handleFormErrors from '@/helpers/handleSignupErrors'
import FormInput from '@/components/FormInput'

interface ErrorProps {
    name: string,
    email: string,
    username: string,
    password: string
}

export default () => {
    const router = useRouter()
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [errors, setErrors] = useState<Partial<ErrorProps>>({})

    const handleSignup = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        const error_res = await handleFormErrors({ name, email, username, password })

        if(error_res){
            setErrors(error_res)

            return
        }

        setErrors({})

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    username,
                    password
                })
            })

            if(!res.ok){
                throw new Error('Failed to upload new product')
            }
            
            router.push('/')
        } catch (err){
            console.error('Error adding new product:', err)
        }
    }

    return (
        <div className="container mx-auto">
            <div className="flex flex-column justify-center items-start py-12">
                <form onSubmit={handleSignup} className='max-w-sm mx-auto mt-12 px-2'>
                    <h1 className="text-black text-2xl text-center font-bold mb-10">
                        JOIN
                    </h1>
                    <FormInput
                        name='name'
                        type='text'
                        label='Name'
                        value={name}
                        onChange={e => setName(e.target.value)}
                        error={errors.name ? true : false}
                    />
                    <FormInput
                        name='email'
                        type='text'
                        label='Email'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        error={errors.email ? true : false}
                    />
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
                            Create an Account
                        </button>
                    </div>
                    <p className="text-black text-sm font-light text-center mt-3">Already have an account? Login <a href='/login' className='text-purple font-semibold'>here</a>.</p>
                </form>
            </div>
        </div>
    )
}