import db from '@/lib/mysql'
import bcrypt from 'bcryptjs'
import { NextResponse } from 'next/server'

export const POST = async (req: any) => {
    if(req.method === 'POST'){        
        try {
            const { name, email, username, password } = await req.json()

            const hashed_password = await bcrypt.hash(password, 10)

            await db.query(
                `INSERT INTO
                    will_users (U_name, U_email, u_username, u_password)
                VALUES
                    (?, ?, ?, ?)`,
                [name, email, username, hashed_password]
            )
            
            return NextResponse.json({ success: true })
        } catch (err) {
            console.error('Error adding new user:', err)
            return NextResponse.error()
        }
    }
}