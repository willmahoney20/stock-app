'use client'

import ProductForm from "@/components/ProductForm"

export default () => {
    return (
        <div className="container mx-auto">
            <div className="flex flex-column justify-center items-start py-12">
                <ProductForm edit={false} id={null} data={null} />
            </div>
        </div>
    )
}