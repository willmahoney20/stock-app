'use client'

import ProductProps from '@/types/product'
import ProductCard from '@/components/ProductCard'
import useSWR from 'swr'
import fetcher from '@/lib/fetcher'

export default () => {
	const { data, isLoading } = useSWR<ProductProps[]>('/api/products', fetcher)

	if(isLoading) return null

	return (
		<div className="container mx-auto">
			<div className="flex flex-wrap justify-center p-4 py-6">
				{data?.map(item => {
					return <ProductCard
						key={item.pro_id}
						pro_id={item.pro_id}
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