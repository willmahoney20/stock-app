import db from '@/lib/mysql'
import { NextResponse } from 'next/server'

export const DELETE = async (req: any) => {
    if(req.method === 'DELETE'){
        try {
            const { id } = await req.json()

            // Delete from the products table
            await db.query(
                `DELETE FROM
                    will_products
                WHERE
                    pro_id = ${id}`
            )

            // Delete rows from the images table
            await db.query(
                `DELETE FROM
                    will_images
                WHERE
                    pro_id = ${id}`
            )
            
            return NextResponse.json({ success: true })
        } catch (err) {
            console.error('Error adding new product:', err)
            return NextResponse.error()
        }
    } else {
        return NextResponse.error();
    }
}