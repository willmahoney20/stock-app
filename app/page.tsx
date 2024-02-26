'use client'

import React, { useState, useEffect } from 'react'

interface DataProps {
	pro_id: number,
	pro_name: string,
	pro_qty: number,
	pro_price: number
}

export default () => {
	const [data, setData] = useState<DataProps[]>([])
	const [dataLoaded, setDataLoaded] = useState<boolean>(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch('/api/stock')
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
		<div className="container">
			{data.map(item => {
				return (
					<div key={item.pro_id} className="card">
						<h1>{item.pro_name}</h1>
						<h3>{item.pro_qty}</h3>
						<h3>{item.pro_price}</h3>
					</div>
				)
			})}
		</div>
	)
}