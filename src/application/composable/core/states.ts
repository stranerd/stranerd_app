import { ref } from 'vue'
import { Notify } from '@app/composable/core/notifications'
import { isClient } from '@utils/environment'
import { analytics, NetworkError, StatusCodes } from '@modules/core'
import { capitalize } from '@utils/commons'
import { useAuth } from '@app/composable/auth/auth'
import { isPlatform } from '@ionic/vue'

export const useErrorHandler = () => {
	const errorState = ref('')
	const setError = async (error: any, skipAlert = false) => {
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
		if (isClient() && errorState.value && !skipAlert) Notify({
			title: errorState.value
		}).then()
		if (errorState.value) await analytics.logEvent('error', {
			error: errorState.value
		})
	}
	return { error: errorState, setError }
}

export const useSuccessHandler = () => {
	const successState = ref('')
	const setMessage = async (message: string) => {
		successState.value = message
		if (isClient() && successState.value) Notify({
			title: successState.value
		})
	}
	return { message: successState, setMessage }
}

export const useLoadingHandler = () => {
	const loadingState = ref(false)
	const setLoading = async (loading: boolean) => loadingState.value = loading
	return { loading: loadingState, setLoading }
}

export const useListener = (start: () => Promise<() => void>) => {
	let listener = null as null | (() => void)
	const isRunning = ref(false)
	const watchers = ref(0)

	const closeListener = async () => {
		watchers.value--
		if (watchers.value > 0) return
		listener?.()
		isRunning.value = false
	}

	const startListener = async () => {
		watchers.value++
		if (watchers.value > 1) return
		listener = await start()
		isRunning.value = true
	}

	const resetListener = async (reset: () => Promise<() => void>) => {
		start = reset
		if (isRunning.value) {
			await closeListener()
			await startListener()
		}
	}
	return { startListener, closeListener, resetListener, isRunning }
}

export const usePlatform = () => {
	const isWeb = isPlatform('desktop') || isPlatform('mobileweb')
	const isIos = !isWeb && isPlatform('ios')
	const isAndroid = !isWeb && isPlatform('android')
	return { isIos, isAndroid, isWeb }
}
