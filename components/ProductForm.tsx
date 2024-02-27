import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import handleFormErrors from '@/helpers/handleProductErrors'
import imageSplitter from '@/helpers/imageSplitter'
import ErrorProps from '@/types/errors'
import FormInput from './FormInput'
import FormSelect from './FormSelect'

interface DataProps {
    name: string,
    quantity: string,
    price: string,
    gender: string,
    group: string,
    images: string
}

export default ({ edit, id, data }: {
    edit: boolean,
    id: number | null,
    data: DataProps | null
}) => {
    const router = useRouter()
    const [name, setName] = useState<string>('')
    const [quantity, setQuantity] = useState<string>('')
    const [price, setPrice] = useState<string>('')
    const [gender, setGender] = useState<string>('')
    const [group, setGroup] = useState<string>('')
    const [images, setImages] = useState<string>('')
    const [errors, setErrors] = useState<Partial<ErrorProps>>({})

    useEffect(() => {
        if(edit && data){
            setName(data.name)
            setQuantity(data.quantity)
            setPrice(data.price)
            setGender(data.gender)
            setGroup(data.group)
            setImages(data.images)
        }
    }, [data])

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
            const method = edit ? 'PUT' : 'POST'
            const url = `/api/${edit ? 'edit' : 'upload'}`

            const res = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id ? id : null,
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
        <form onSubmit={handleSubmit} className='max-w-sm mx-auto mt-12 px-2'>
            <FormInput
                name='name'
                type='text'
                label='Product Name'
                value={name}
                onChange={e => setName(e.target.value)}
                error={errors.name ? true : false}
            />
            <FormInput
                name='quantity'
                type='number'
                label='Quantity'
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                error={errors.quantity ? true : false}
            />
            <FormInput
                name='price'
                type='number'
                label='Price (£)'
                value={price}
                onChange={e => setPrice(e.target.value)}
                error={errors.price ? true : false}
            />
            <div className="flex flex-row justify-between mb-6">
                <FormSelect
                    name='gender'
                    label='Gender'
                    value={gender}
                    onChange={e => setGender(e.target.value)}
                    error={errors.gender ? true : false}
                    options={[
                        { value: '', label: 'Select an option', hidden: true },
                        { value: 'male', label: 'Male', hidden: false },
                        { value: 'female', label: 'Female', hidden: false },
                        { value: 'unisex', label: 'Unisex', hidden: false }
                    ]}
                    classes='mr-1'
                />
                <FormSelect
                    name='group'
                    label='Group'
                    value={group}
                    onChange={e => setGroup(e.target.value)}
                    error={errors.group ? true : false}
                    options={[
                        { value: '', label: 'Select an option', hidden: true },
                        { value: 'adults', label: 'Adults', hidden: false },
                        { value: 'kids', label: 'Kids', hidden: false }
                    ]}
                    classes='ml-1'
                />
            </div>
            <FormInput
                name='images'
                type='text'
                label="Image URL's (Comma Separated)"
                value={images}
                onChange={e => setImages(e.target.value)}
                error={errors.images ? true : false}
            />
            <div>
                <button type='submit' className="bg-purple text-white text-sm font-semibold py-2 px-3.5 rounded shadow-md w-full">
                    {edit ? 'Edit' : 'Upload'}
                </button>
            </div>
        </form>
    )
}