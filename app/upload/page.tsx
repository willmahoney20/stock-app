'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import handleFormErrors from '@/helpers/handleFormErrors'
import imageSplitter from '@/helpers/imageSplitter'
import ErrorProps from '@/types/errors'

export default () => {
    const router = useRouter()
    const [name, setName] = useState<string>('')
    const [quantity, setQuantity] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [gender, setGender] = useState<string>('')
    const [group, setGroup] = useState<string>('')
    const [images, setImages] = useState<string>('')
    const [errors, setErrors] = useState<Partial<ErrorProps>>({})

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        const error_res = await handleFormErrors({
            name,
            quantity: parseInt(quantity),
            price,
            gender,
            group,
            images: imageSplitter(images)
        })

        if(error_res){
            setErrors(error_res)

            return
        }

        setErrors({})

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    quantity: parseInt(quantity),
                    price: parseFloat(price),
                    gender,
                    group,
                    images: imageSplitter(images)
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
                <form onSubmit={handleSubmit} className='max-w-sm mx-auto mt-12 px-2'>
                    <div className="relative mb-6">
                        <label
                            htmlFor="name"
                            className="absolute bottom-6 left-2 bg-white text-black text-sm font-semibold px-1 pb-0.5 m-0"
                            style={{
                                color: errors.name ? 'red' : 'inherit'
                            }}
                        >
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="bg-transparent w-full h-9 px-3 py-2 border border-gray-500 rounded-md"
                            style={{
                                borderColor: errors.name ? 'red' : '#6b7280'
                            }}
                        />
                    </div>
                    <div className="relative mb-6">
                        <label
                            htmlFor="quantity"
                            className="absolute bottom-6 left-2 bg-white text-black text-sm font-semibold px-1 pb-0.5 m-0"
                            style={{
                                color: errors.quantity ? 'red' : 'inherit'
                            }}
                        >
                            Quantity
                        </label>
                        <input
                            type="number"
                            name="quantity"
                            value={quantity}
                            onChange={e => setQuantity(e.target.value)}
                            className="bg-transparent w-full h-9 px-3 py-2 border border-gray-500 rounded-md"
                            step="1"
                            style={{
                                borderColor: errors.quantity ? 'red' : '#6b7280'
                            }}
                        />
                    </div>
                    <div className="relative mb-6">
                        <label
                            htmlFor="price"
                            className="absolute bottom-6 left-2 bg-white text-black text-sm font-semibold px-1 pb-0.5 m-0"
                            style={{
                                color: errors.price ? 'red' : 'inherit'
                            }}
                        >
                            Price (£)
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            className="bg-transparent w-full h-9 px-3 py-2 border border-gray-500 rounded-md"
                            style={{
                                borderColor: errors.price ? 'red' : '#6b7280'
                            }}
                        />
                    </div>
                    <div className="flex flex-row justify-between mb-6">
                        <div className="relative mr-1">
                            <label
                                htmlFor="gender"
                                className="absolute bottom-6 left-2 bg-white text-black text-sm font-semibold px-1 pb-0.5 m-0"
                                style={{
                                    color: errors.gender ? 'red' : 'inherit'
                                }}
                            >
                                Gender
                            </label>
                            <select
                                name="gender"
                                value={gender}
                                onChange={e => setGender(e.target.value)}
                                className="bg-transparent w-full h-9 px-2 py-1 border border-gray-500 rounded-md"
                                style={{
                                    borderColor: errors.gender ? 'red' : '#6b7280'
                                }}
                            >
                                <option value="" disabled hidden>Select an option</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="unisex">Unisex</option>
                            </select>
                        </div>
                        <div className="relative ml-1">
                            <label
                                htmlFor="group"
                                className="absolute bottom-6 left-2 bg-white text-black text-sm font-semibold px-1 pb-0.5 m-0"
                                style={{
                                    color: errors.group ? 'red' : 'inherit'
                                }}
                            >
                                Group
                            </label>
                            <select
                                name="group"
                                value={group}
                                onChange={e => setGroup(e.target.value)}
                                className="bg-transparent w-full h-9 px-2 py-1 border border-gray-500 rounded-md"
                                style={{
                                    borderColor: errors.group ? 'red' : '#6b7280'
                                }}
                            >
                                <option value="" disabled hidden>Select an option</option>
                                <option value="adults">Adults</option>
                                <option value="kids">Kids</option>
                            </select>
                        </div>
                    </div>
                    <div className="relative mb-6">
                        <label
                            htmlFor="images"
                            className="absolute bottom-6 left-2 bg-white text-black text-sm font-semibold px-1 pb-0.5 m-0"
                            style={{
                                color: errors.images ? 'red' : 'inherit'
                            }}
                        >
                            Image URL's (Comma Separated)
                        </label>
                        <input
                            type="text"
                            name="images"
                            value={images}
                            onChange={e => setImages(e.target.value)}
                            className="bg-transparent w-full h-9 px-3 py-2 border border-gray-500 rounded-md"
                            style={{
                                borderColor: errors.images ? 'red' : '#6b7280'
                            }}
                        />
                    </div>
                    <div>
                        <button className="bg-purple text-white text-sm font-semibold py-2 px-3.5 rounded shadow-md">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}