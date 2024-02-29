'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default ({ children }: any) => {
    const router = useRouter()
    const pathname = usePathname()
    const [pathVerified, setPathVerified] = useState(false)

    useEffect(() => {
        if(pathname === '/login' || pathname === '/signup'){
            router.push('/')
        }

        setPathVerified(true)
    }, [pathname])

    if(!pathVerified) return null

    return children
}