import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from '@/components/Navbar'
import Footer from "@/components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "Stock App",
    description: "An app for stock and stuff..."
}

export default ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className="site-container">
                    <Navbar />
                    <div className="content-container">
                        {children}
                    </div>
                    <Footer />
                </div>
            </body>
        </html>
    )
}