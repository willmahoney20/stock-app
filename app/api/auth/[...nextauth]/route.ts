import db from '@/lib/mysql'
import bcrypt from 'bcryptjs'

import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
	providers: [
		CredentialsProvider({
            credentials: {},
			name: 'Credentials',
			async authorize(credentials: any) {
				const { username, password } = credentials

				const [user]: any = await db.query(
					`SELECT
                        u_id,
                        u_email,
                        u_password
					FROM
                        will_users
					WHERE
                        u_email = ? OR u_username = ?`,
					[username, username]
				)

				if(!user) return null
				
                const is_match = await bcrypt.compare(password, user[0].u_password)

				if(!is_match) return null

				return {
                    id: user[0].u_id,
                    email: user[0].u_email
                }
			}
		})
	],
	callbacks: {
		async session({ token }: any) {
			const [user]: any = await db.query(
				`SELECT
					u_role,
					u_name,
					u_username
				FROM
					will_users
				WHERE
					u_email = ?`,
				[token.email]
			)

			token = {
				...token,
				role: user[0].u_role,
				name: user[0].u_name,
				username: user[0].u_username
			}

			return token
		}
	}
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }