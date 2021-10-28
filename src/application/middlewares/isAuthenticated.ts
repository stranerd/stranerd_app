import { useAuth } from '@/application/composable/auth/auth' 
import { REDIRECT_SESSION_NAME } from '@/utils/constants'
import { serializeToCookie } from '@/utils/cookie'

export default async ( data: any) => {

	const  { to,  from, next } = data

	console.log('to',to)
	console.log('from',from)
	console.log('next',next)
	if (!useAuth().isLoggedIn.value) {
		document.cookie = serializeToCookie(REDIRECT_SESSION_NAME,  to.fullPath)
		next({ path: '/auth/signin' })
	}
}
