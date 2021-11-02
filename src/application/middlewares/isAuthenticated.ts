import { useAuth } from '@/application/composable/auth/auth' 
import { REDIRECT_SESSION_NAME } from '@/utils/constants'
import { serializeToCookie } from '@/utils/cookie'

export default async ( data: any) => {

	const  { to,  next } = data

	if (!useAuth().isLoggedIn.value) {
		document.cookie = serializeToCookie(REDIRECT_SESSION_NAME,  to.fullPath)
		next({ path: '/auth/signin' })
	}
}
