import { defineNuxtMiddleware } from 'vue'
import { useAuth } from '@app/hooks/auth/auth'

export default defineNuxtMiddleware(({ redirect }) => {
	if (useAuth().isLoggedIn.value) redirect('/dashboard')
})
