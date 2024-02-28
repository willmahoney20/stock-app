import db from '@/lib/mysql'
import { NextResponse } from 'next/server'

export const POST = async (req: any) => {
    if(req.method === 'POST'){
        try {
            const { name, quantity, price, gender, group, images } = await req.json()

            const product_res: any = await db.query(
                `INSERT INTO
                    will_products (pro_name, pro_qty, pro_price, pro_gender, pro_group)
                VALUES
                    (?, ?, ?, ?, ?)`,
                [name, quantity, price, gender, group]
            )
    
            const pro_id = product_res[0].insertId
            
            // Insert images into the database
            for(let i = 0; i < images.length; i++){
                await db.query(
                    `INSERT INTO
                        will_images
                        (pro_id, image_url, image_main)
                    VALUES
                        (?, ?, ?)`,
                    [pro_id, images[i], i === 0 ? 1 : 0]
                )
            }
            
            return NextResponse.json({ success: true })
        } catch (err) {
            console.error('Error adding new product:', err)
            return NextResponse.error()
        }
    }
}