import { defineNuxtMiddleware } from '@nuxtjs/composition-api'
import { useAuth } from '@app/hooks/auth/auth'

export default defineNuxtMiddleware(({ redirect }) => {
	if (useAuth().isLoggedIn.value) redirect('/dashboard')
})
