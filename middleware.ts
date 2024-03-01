import { NextResponse } from 'next/server'
import { withAuth } from 'next-auth/middleware'

const valid_routes = [
    '/login',
    '/signup',
    '/products', 
    '/upload',
    '/edit'
]

export default withAuth(
    req => {
        const session = req.nextauth.token
        const { pathname } = req.nextUrl

        // if it's an api call, continue if authorised, else return to login
        if(pathname.startsWith('/api/')){
            if(!session){
                return NextResponse.redirect(new URL('/login', req.url))
            }
            
            return NextResponse.next()
        }

        // if the pathname is not recognised, return a 404 error
        if(pathname !== '/' && !valid_routes.some(route => pathname.startsWith(route))){
            return NextResponse.error()
        }

        // if the user is not logged in and is trying to visit a path that requires authentication
        if(!session && pathname !== '/login' && pathname !== '/signup'){
            return NextResponse.redirect(new URL('/login', req.url))
        }

        // if the user is logged in and trys to visit a path for logged out users
        if(session && (pathname === '/login' || pathname === '/signup')){
            return NextResponse.redirect(new URL('/', req.url))
        }
        
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized(){
                return true
            }
        }
    }
)