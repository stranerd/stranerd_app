import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
import { isServer } from '@utils/environment'
import { REDIRECT_SESSION_NAME } from '@utils/constants'
import { useAuth } from '@app/hooks/auth/auth'
import { serializeToCookie } from '@utils/cookie'

export default defineNuxtMiddleware(({ res, route, redirect }) => {
	if (!useAuth().isLoggedIn.value) {
		if (isServer()) res.setHeader('Set-Cookie', serializeToCookie(REDIRECT_SESSION_NAME, route.fullPath))
		else document.cookie = serializeToCookie(REDIRECT_SESSION_NAME, route.fullPath)
		redirect('/auth/signin')
	}
})
