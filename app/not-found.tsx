import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import Link from 'next/link'

export default async () => {
    const session = await getServerSession(authOptions)
    
    return (
        <div className="flex justify-center items-center" style={{minHeight: 'calc(100vh - 96px)'}}>
            <div className="flex flex-col items-center p-4 pb-40">
                <h1 className="text-9xl text-purple font-bold mb-4">404</h1>
                <p className="text-black font-normal opacity-70 mb-4">Sorry, we couldn't find this page...</p>
                    <Link href={session ? '/' : '/login'}>
                        <button className="bg-purple text-white text-sm font-semibold py-2 px-3 5 rounded shadow-md">
                            {session ? 'Return to Home' : 'Login'}
                        </button>
                    </Link>
            </div>
        </div>
    )
}