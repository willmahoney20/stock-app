import Image from 'next/image'
import Link from 'next/link'

interface Props {
    pro_id: number, 
	pro_name: string,
	pro_qty: number,
	pro_price: number,
	pro_gender: string,
	pro_group: string,
	pro_image: string
}

export default ({ pro_id, pro_name, pro_qty, pro_price, pro_gender, pro_group, pro_image }: Props) => {
    return (
        <Link href={`/products/${pro_id}`}>
            <div className="flex flex-col p-4">
                <div className="flex justify-center items-center w-96 h-96 overflow-hidden rounded-lg">
                    <Image
                        src={pro_image}
                        alt='Trainers'
                        width={500}
                        height={625}
                    />
                </div>
                <div className="flex flex-col py-2">
                    <h4 className='font-semibold'>
                        {pro_name}
                    </h4>
                    <h4 className='font-normal opacity-70 mt-1.5'>
                        {pro_group === 'kids' ? "Kid's" : pro_gender === 'male' ? "Men's" : pro_gender === 'female' ? "Women's" : 'Unisex'} Shoes
                    </h4>
                    <h4 className='font-normal opacity-70'>
                        Stock: {pro_qty}
                    </h4>
                    <h4 className='font-semibold mt-1.5'>
                        £{pro_price}
                    </h4>
                </div>
            </div>
        </Link>
    )
}