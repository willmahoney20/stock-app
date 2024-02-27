import db from '@/lib/mysql'
import { NextResponse } from 'next/server'

export const PUT = async (req: any) => {
    if(req.method === 'PUT'){    
        try {
            const { id, name, quantity, price, gender, group, images } = await req.json()

            // Update fields in the products table
            await db.query(
                `UPDATE
                    will_products
                SET
                    pro_name = ?, pro_qty = ?, pro_price = ?, pro_gender = ?, pro_group = ?
                WHERE
                    pro_id = ?`,
                [name, quantity, price, gender, group, id]
            )

            // Delete rows from the images table
            await db.query(
                `DELETE FROM
                    will_images
                WHERE
                    pro_id = ${id}`
            )
            
            // Insert images into the database
            for(let i = 0; i < images.length; i++){
                await db.query(
                    `INSERT INTO
                        will_images
                        (pro_id, image_url, image_main)
                    VALUES
                        (?, ?, ?)`,
                    [id, images[i], i === 0 ? 1 : 0]
                )
            }
            
            return NextResponse.json({ success: true })
        } catch (err) {
            console.error('Error adding new product:', err)
            return NextResponse.error()
        }
    } else {
        return NextResponse.error();
    }
}