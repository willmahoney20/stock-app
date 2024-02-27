'use client'

import React, { useState } from 'react'

export default () => {
    const [name, setName] = useState<string>('')
    const [quantity, setQuantity] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [gender, setGender] = useState<string>('')
    const [group, setGroup] = useState<string>('')
    const [images, setImages] = useState<string>('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault()

        console.log(1, name, parseInt(quantity), price, gender, group)
        console.log(2, images.split(',').map(x => x.trim()))
    }

    return (
        <div className="container mx-auto">
            <div className="flex flex-column justify-center items-start py-12">
                <form onSubmit={handleSubmit} className='max-w-sm mx-auto mt-12 px-2'>
                    <div className="relative mb-6">
                        <label htmlFor="name" className="absolute bottom-6 left-2 bg-white text-black text-sm font-semibold px-1 pb-0.5 m-0">
                            Product Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="bg-transparent w-full h-9 px-3 py-2 border border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="relative mb-6">
                        <label htmlFor="quantity" className="absolute bottom-6 left-2 bg-white text-black text-sm font-semibold px-1 pb-0.5 m-0">
                            Quantity
                        </label>
                        <input
                            type="number"
                            name="quantity"
                            value={quantity}
                            onChange={e => setQuantity(e.target.value)}
                            className="bg-transparent w-full h-9 px-3 py-2 border border-gray-500 rounded-md"
                            step="1"
                        />
                    </div>
                    <div className="relative mb-6">
                        <label htmlFor="price" className="absolute bottom-6 left-2 bg-white text-black text-sm font-semibold px-1 pb-0.5 m-0">
                            Price (£)
                        </label>
                        <input
                            type="number"
                            name="price"
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                            className="bg-transparent w-full h-9 px-3 py-2 border border-gray-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-row justify-between mb-6">
                        <div className="relative mr-1">
                            <label htmlFor="gender" className="absolute bottom-6 left-2 bg-white text-black text-sm font-semibold px-1 pb-0.5 m-0">
                                Gender
                            </label>
                            <select
                                name="gender"
                                value={gender}
                                onChange={e => setGender(e.target.value)}
                                className="bg-transparent w-full h-9 px-2 py-1 border border-gray-500 rounded-md"
                            >
                                <option value="">Select an option</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="unisex">Unisex</option>
                            </select>
                        </div>
                        <div className="relative ml-1">
                            <label htmlFor="group" className="absolute bottom-6 left-2 bg-white text-black text-sm font-semibold px-1 pb-0.5 m-0">
                                Group
                            </label>
                            <select
                                name="group"
                                value={group}
                                onChange={e => setGroup(e.target.value)}
                                className="bg-transparent w-full h-9 px-2 py-1 border border-gray-500 rounded-md"
                            >
                                <option value="">Select an option</option>
                                <option value="adults">Adults</option>
                                <option value="kids">Kids</option>
                            </select>
                        </div>
                    </div>
                    <div className="relative mb-6">
                        <label htmlFor="images" className="absolute bottom-6 left-2 bg-white text-black text-sm font-semibold px-1 pb-0.5 m-0">
                            Image URL's (Comma Separated)
                        </label>
                        <input
                            type="text"
                            name="images"
                            value={images}
                            onChange={e => setImages(e.target.value)}
                            className="bg-transparent w-full h-9 px-3 py-2 border border-gray-500 rounded-md"
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