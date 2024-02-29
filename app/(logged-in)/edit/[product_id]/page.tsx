'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import ProductForm from "@/components/ProductForm"

interface DataProps {
    name: string,
    quantity: string,
    price: string,
    gender: string,
    group: string,
    images: string
}

export default () => {
	const params = useParams()
    const [id, setId] = useState<number | null>(null)
    const [data, setData] = useState<DataProps | null>(null)
    const [dataLoaded, setDataLoaded] = useState<boolean>(false)

	useEffect(() => {
        const product_id = params.product_id

		const fetchData = async () => {
			try {
				const res = await fetch(`/api/products/${product_id}`)
				const values = await res.json()

				if(values[0]){
                    setId(values[0].pro_id)
                    setData({
                        name: values[0].pro_name,
                        quantity: values[0].pro_qty.toString(),
                        price: values[0].pro_price,
                        gender: values[0].pro_gender,
                        group: values[0].pro_group,
                        images: values[0].image_urls.join(', ')
                    })
                }

				setDataLoaded(true)
			} catch (err) {
				console.error('Error fetching data:', err)

				setDataLoaded(true)
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
            <div className="flex flex-column justify-center items-start py-12">
                <ProductForm edit={true} id={id} data={data} />
            </div>
        </div>
    )
}