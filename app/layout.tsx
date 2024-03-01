import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import "./global.css"
import Providers from './providers'
import AuthNavbar from '@/components/AuthNavbar'
import NoAuthNavbar from '@/components/NoAuthNavbar'
import Footer from "@/components/Footer"

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
    title: "Stock App",
    description: "An app for stock and stuff..."
}

export default async ({ children }: { children: React.ReactNode }) => {
	const session = await getServerSession(authOptions)

    return (
        <html lang="en">
            <body className={poppins.className}>
                <Providers>
                    <div className="flex flex-col justify-between min-h-screen">
                        {session ?
                        <>
                            <AuthNavbar />
                            <div style={{minHeight: 'calc(100vh - 96px)'}}>
                                {children}
                            </div>
                            <Footer />
                        </>
                        : 
                        <>
                            <NoAuthNavbar />
                            <div style={{minHeight: 'calc(100vh - 96px)'}}>
                                {children}
                            </div>
                            <Footer />
                        </>
                        }
                    </div>
                </Providers>
            </body>
        </html>
    )
}