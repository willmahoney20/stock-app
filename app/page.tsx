'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import ProductProps from '@/types/product'

export default () => {
	const [data, setData] = useState<ProductProps[]>([])
	const [dataLoaded, setDataLoaded] = useState<boolean>(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch('/api/products')
				const values = await res.json()

				setData(values)
				setDataLoaded(true)
			} catch (err) {
				console.error('Error fetching data:', err)
			}
		}

		fetchData()
	}, [])

	if(!dataLoaded) return null

	return (
		<div className="container mx-auto">
			<div className="flex flex-row justify-center items-start p-4">
				{data.map(item => {
					return (
						<div key={item.pro_id} className="flex flex-col p-4">
							<div className="flex justify-center items-center w-96 h-96 overflow-hidden rounded-lg">
								<Image
									src={item.pro_image}
									alt='Trainers'
									width={500}
									height={625}
								/>
							</div>
							<div className="flex flex-col py-2">
								<h4 className='font-semibold'>
									{item.pro_name}
								</h4>
								<h5 className='font-normal opacity-70 mt-1.5'>
									{item.pro_group === 'kids' ? "Kid's" : item.pro_gender === 'male' ? "Men's" : item.pro_gender === 'female' ? "Women's" : 'Unisex'} Shoes
								</h5>
								<h5 className='font-normal opacity-70'>
									Stock: {item.pro_qty}
								</h5>
								<h4 className='font-semibold mt-1.5'>
									£{item.pro_price}
								</h4>
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}