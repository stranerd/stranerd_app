import { reqRef } from 'vue'
import { Notify } from '@/application/hooks/core/notifications'
import { isClient } from '@/utils/environment'
import { analytics, NetworkError, StatusCodes } from '@/modules/core'
import { capitalize } from '@/utils/commons'
import { useAuth } from '@/application/hooks/auth/auth'

export const useErrorHandler = () => {
	const errorState = reqRef('')
	const setError = async (error: any) => {
		if (error instanceof NetworkError) {
			errorState.value = error.errors
				.map(({ message, field }) => `${capitalize(field ?? 'Error')}: ${message}`)
				.join('\n')
			if ([
				StatusCodes.NotAuthenticated,
				StatusCodes.AccessTokenExpired,
				StatusCodes.RefreshTokenMisused
			].includes(error.statusCode)) await useAuth().signout()
		} else errorState.value = error.message ?? error
		if (isClient() && errorState.value) Notify({
			title: errorState.value,
			icon: 'error'
		}).then()
		if (errorState.value) analytics.logEvent('error', {
			error: errorState.value
		})
	}
	return { error: errorState, setError }
}

export const useSuccessHandler = () => {
	const successState = reqRef('')
	const setMessage = async (message: string) => {
		successState.value = message
		if (isClient() && successState.value) Notify({
			title: successState.value,
			icon: 'success'
		})
	}
	return { message: successState, setMessage }
}

export const useLoadingHandler = () => {
	const loadingState = reqRef(false)
	const setLoading = async (loading: boolean) => loadingState.value = loading
	return { loading: loadingState, setLoading }
}

export const useListener = (start: () => Promise<() => void>) => {
	let listener = null as null | (() => void)
	const isRunning = reqRef(false)
	const startListener = async () => {
		await closeListener()
		listener = await start()
		isRunning.value = true
	}
	const closeListener = async () => {
		listener?.()
		isRunning.value = false
	}
	const resetListener = async (reset: () => Promise<() => void>) => {
		start = reset
		if (isRunning.value) await startListener()
	}
	return { startListener, closeListener, resetListener, isRunning }
}
