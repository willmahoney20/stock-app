'use client'

import React, { useState, useEffect } from 'react'
import ProductProps from '@/types/product'
import { useParams } from 'next/navigation'
import Image from 'next/image'

export default () => {
	const params = useParams()
	const [data, setData] = useState<ProductProps | null>(null)
	const [dataLoaded, setDataLoaded] = useState<boolean>(false)

	useEffect(() => {
        const product_id = params.product_id

		const fetchData = async () => {
			try {
				const res = await fetch(`/api/products/${product_id}`)
				const values = await res.json()

				if(values[0]) setData(values[0])

				setDataLoaded(true)
			} catch (err) {
				console.error('Error fetching data:', err)
			}
		}

		fetchData()
	}, [])

	if(!dataLoaded) return null

    if(!data) return (
		<div className="min-h-96 flex justify-center items-center">
			<h4 className="font-semibold">No Product Found</h4>
		</div>
	)

	return (
		<div className="container mx-auto">
			<div className="flex flex-row justify-center items-start px-4 py-12">
				<div className="flex justify-center items-center overflow-hidden rounded-lg">
					<Image
						src={data.image_urls[0]}
						alt='Trainers'
						width={500}
						height={625}
					/>
				</div>
				<div className="flex flex-col justify-between pl-12" style={{height: 625}}>
					<div className="flex flex-col">
						<div className="flex flex-row justify-between items-center mb-2">
							<h2 className="text-black text-xl font-bold m-0">
								{data.pro_name}
							</h2>
						</div>
						<h4 className="text-black font-normal opacity-70 mb-6">
							{data.pro_group === 'kids' ? "Kid's" : data.pro_gender === 'male' ? "Men's" : data.pro_gender === 'female' ? "Women's" : 'Unisex'} Shoes
						</h4>
					</div>
					<div>
						<h2 className="text-black text-xl font-bold mb-2">
							£{data.pro_price}
						</h2>
					</div>
				</div>
			</div>
		</div>
	)
}