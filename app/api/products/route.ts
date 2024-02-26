import db from '@/lib/mysql'
import { NextResponse } from 'next/server'

export const GET = async () => {
    const [stock_data] = await db.query(
        `SELECT 
            p.pro_id,
            p.pro_name,
            p.pro_qty,
            p.pro_price,
            p.pro_gender,
            p.pro_group,
            i.image_url AS pro_image
        FROM 
            will_products p
        INNER JOIN 
            will_images i ON p.pro_id = i.pro_id
        WHERE
            i.image_main = true`
    )

    return NextResponse.json(stock_data)
}