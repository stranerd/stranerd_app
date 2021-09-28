import { defineNuxtPlugin, onGlobalSetup } from 'vue'
import { useAuth } from '@/application/hooks/auth/auth'
import { useCurrentSession, useLobbySessions, useRequestSessions } from '@app/hooks/sessions/session'

export default defineNuxtPlugin(async ({ app }) => {
	await useAuth().setTokens(useAuth().getTokens())

	const { isLoggedIn, isVerified, signin } = useAuth()
	if (isLoggedIn.value && isVerified.value) await signin(true)

	onGlobalSetup(() => {
		useCurrentSession().listener.startListener()
		useRequestSessions(app.router!).listener.startListener()
		useLobbySessions(app.router!).listener.startListener()
	})
})
