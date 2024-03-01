'use client'

import React, { useState } from 'react'
import ProductProps from '@/types/product'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import EditIcon from '@/public/edit'
import DeleteIcon from '@/public/delete'
import Link from 'next/link'
import DeletePopup from '@/components/DeletePopup'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

export default () => {
	const params = useParams()
	const [activeImage, setActiveImage] = useState<number>(0)
	const [deleteOpen, setDeleteOpen] = useState<boolean>(false)

	const { data, isLoading } = useSWR<ProductProps[] | null>(`/api/products/${params.product_id}`, fetcher)

	if(isLoading) return null

    if(!data || !data[0]) return (
		<div className="min-h-96 flex justify-center items-center">
			<h4 className="font-semibold">No Product Found</h4>
		</div>
	)

	return (
		<div className="container mx-auto">
			{deleteOpen &&
			<DeletePopup
				id={data[0].pro_id}
				closePopup={() => setDeleteOpen(false)}
			/>}

			<div className="flex flex-row justify-center items-start px-4 py-12">
				<div className="flex flex-col pr-12">
					{data[0].image_urls.map((item, index) => {
						return (
							<div
								key={index}
								className="flex cursor-pointer"
								style={{
									marginBottom: index !== data[0].image_urls.length - 1 ? '12.5px' : 0
								}}
								onClick={() => setActiveImage(index)}>
								<Image
									src={item}
									alt='Trainers'
									width={92}
									height={115}
								/>
							</div>
						)
					})}
				</div>
				<div className="flex justify-center items-center overflow-hidden rounded-lg">
					<Image
						src={data[0].image_urls[activeImage]}
						alt='Trainers'
						width={500}
						height={625}
					/>
				</div>
				<div className="flex flex-col justify-between pl-12" style={{height: 625}}>
					<div className="flex flex-col">
						<div className="flex flex-row justify-between items-center mb-2 min-w-80 w-80">
							<h2 className="text-black text-xl font-bold m-0">
								{data[0].pro_name}
							</h2>
							<div className='flex flex-row'>
								<Link href={`/edit/${data[0].pro_id}`}>
									<EditIcon width='1.25rem' height='1.25rem' />
								</Link>
								<button
									className='ml-2'
									onClick={() => setDeleteOpen(true)}
								>
									<DeleteIcon width='1.25rem' height='1.25rem' />
								</button>
							</div>
						</div>
						<h4 className="text-black font-normal opacity-70 mb-6">
							{data[0].pro_group === 'kids' ? "Kid's" : data[0].pro_gender === 'male' ? "Men's" : data[0].pro_gender === 'female' ? "Women's" : 'Unisex'} Shoes
						</h4>
					</div>
					<div>
						<h4 className="text-black font-normal opacity-70 mb-2">
							Stock: {data[0].pro_qty}
						</h4>
						<h2 className="text-black text-xl font-bold mb-2">
							£{data[0].pro_price}
						</h2>
					</div>
				</div>
			</div>
		</div>
	)
}