import db from '@/lib/mysql'
import { NextResponse } from 'next/server'

export const GET = async () => {
    const [stock_data] = await db.query(`SELECT * FROM will_stock`)

    return NextResponse.json(stock_data)
}