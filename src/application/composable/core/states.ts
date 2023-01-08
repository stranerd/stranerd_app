import { computed, ComputedRef, Ref, ref, watch } from 'vue'
import { Notify } from '@utils/dialog'
import { isClient } from '@utils/environment'
import { NetworkError, StatusCodes } from '@modules/core'
import { capitalizeText } from '@stranerd/validate'
import { useAuth } from '@app/composable/auth/auth'
import { useRoute, useRouter } from 'vue-router'

export const useErrorHandler = () => {
	const errorState = ref('')
	const setError = async (error: any, skipAlert = false) => {
		if (error instanceof NetworkError) {
			errorState.value = error.errors
				.map(({ message, field }) => `${capitalizeText(field ?? 'Error')}: ${message}`)
				.join('\n')
			if ([
				StatusCodes.NotAuthenticated,
				StatusCodes.AccessTokenExpired,
				StatusCodes.RefreshTokenMisused
			].includes(error.statusCode)) await useAuth().signout()
		} else errorState.value = error.message ?? error
		if (isClient() && errorState.value && !skipAlert) Notify({
			message: errorState.value
		}).then()
	}
	return { error: errorState, setError }
}

export const useSuccessHandler = () => {
	const successState = ref('')
	const setMessage = async (message: string, skipAlert = false) => {
		successState.value = message
		if (isClient() && successState.value && !skipAlert) Notify({
			message: successState.value
		})
	}
	return { message: successState, setMessage }
}

export const useLoadingHandler = () => {
	const loadingState = ref(false)
	const setLoading = async (loading: boolean) => loadingState.value = loading
	return { loading: loadingState, setLoading }
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
