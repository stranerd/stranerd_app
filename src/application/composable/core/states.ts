import { computed, ComputedRef, Ref, ref, watch } from 'vue'
import { Notify } from '@utils/dialog'
import { isClient } from '@utils/environment'
import { NetworkError, StatusCodes } from '@modules/core'
import { capitalize } from '@utils/commons'
import { useAuth } from '@app/composable/auth/auth'
import { useRoute, useRouter } from 'vue-router'

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
	}
	return { error: errorState, setError }
}

export const useSuccessHandler = () => {
	const successState = ref('')
	const setMessage = async (message: string, skipAlert = false) => {
		successState.value = message
		if (isClient() && successState.value && !skipAlert) Notify({
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

export const useListener = (startFn: () => Promise<() => void>) => {
	let listener = null as null | (() => void)
	const isRunning = ref(false)
	const watchers = ref(0)

	const close = async () => {
		watchers.value--
		if (watchers.value > 0) return
		listener?.()
		isRunning.value = false
	}

	const start = async () => {
		watchers.value++
		if (watchers.value > 1) return
		listener = await startFn()
		isRunning.value = true
	}

	const reset = async (reset: () => Promise<() => void>) => {
		startFn = reset
		await restart()
	}

	const restart = async () => {
		if (isRunning.value) listener = await startFn()
		else await start()
	}

	return { start, close, reset, restart, isRunning }
}

type Meta = {
	routeName: string
	back: boolean
}
type MetaObj = Partial<Omit<Meta, 'routeName'>>

export const useRouteMeta = (routeName: string | ComputedRef<string>, metaObj: MetaObj = {}) => {
	const name = typeof routeName === 'string' ? computed(() => routeName) : routeName

	const route = useRoute()
	const router = useRouter()
	const setMeta = (data: Partial<Meta>) => {
		const listRoute = router.options.routes.find((r) => r.name === route.name)
		Object.entries(data).forEach(([key, value]) => {
			route.meta[key] = value
			if (listRoute) {
				listRoute.meta ||= {}
				listRoute.meta[key] = value
			}
		})
	}

	setMeta({ ...metaObj, routeName: name.value })
	const meta = computed({
		get: () => (route.meta ?? {}) as Meta,
		set: setMeta
	})

	watch(name, () => {
		setMeta({ routeName: name.value })
	})
	return { meta }
}

type Computable<T> = ComputedRef<T> | Ref<T>
export const andComputed = <T> (refs: Computable<T>[]) => computed(() => refs.map((r) => r.value).reduce((acc, cur) => acc && cur))
export const orComputed = <T> (refs: Computable<T>[]) => computed(() => refs.map((r) => r.value).reduce((acc, cur) => acc || cur))
