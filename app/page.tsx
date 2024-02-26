'use client'

import React, { useState, useEffect } from 'react'
import ProductProps from '@/types/product'
import ProductCard from '@/components/ProductCard'

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
					return <ProductCard
						key={item.pro_id}
						pro_name={item.pro_name}
						pro_qty={item.pro_qty}
						pro_price={item.pro_price}
						pro_gender={item.pro_gender}
						pro_group={item.pro_group}
						pro_image={item.pro_image}
					/>
				})}
			</div>
		</div>
	)
}