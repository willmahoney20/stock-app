'use client'

import { useParams } from 'next/navigation'
import ProductForm from "@/components/ProductForm"
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

interface DataProps {
    pro_id: number,
    pro_name: string,
    pro_qty: number,
    pro_price: string,
    pro_gender: string,
    pro_group: string,
    image_urls: string[]
}

export default () => {
	const params = useParams()

	const { data, isLoading } = useSWR<DataProps[] | null>(`/api/products/${params.product_id}`, fetcher)

	if(isLoading) return null

    if(!data || !data[0]) return (
		<div className="min-h-96 flex justify-center items-center">
			<h4 className="font-semibold">No Product Found</h4>
		</div>
	)

    return (
        <div className="container mx-auto">
            <div className="flex flex-column justify-center items-start py-12">
                <ProductForm
                    edit={true}
                    id={data[0].pro_id}
                    data={{
                        name: data[0].pro_name,
                        quantity: data[0].pro_qty.toString(),
                        price: data[0].pro_price,
                        gender: data[0].pro_gender,
                        group: data[0].pro_group,
                        images: data[0].image_urls.join(', ')
                    }}
                />
            </div>
        </div>
    )
}