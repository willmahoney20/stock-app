import db from '@/lib/mysql'
import { NextResponse } from 'next/server'

export const GET = async (req: any, { params }: any) => {
    const [stock_data] = await db.query(
        `SELECT 
            p.pro_id,
            p.pro_name,
            p.pro_qty,
            p.pro_price,
            p.pro_gender,
            p.pro_group,
            JSON_ARRAYAGG(i.image_url) AS image_urls
        FROM 
            will_products p
        INNER JOIN 
            will_images i ON p.pro_id = i.pro_id
        WHERE
            p.pro_id = ${params.product_id}
        GROUP BY
            p.pro_id`
    )

    return NextResponse.json(stock_data)
}