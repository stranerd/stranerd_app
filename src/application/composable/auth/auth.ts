/* eslint-disable @typescript-eslint/no-empty-function */
import { computed, ref } from 'vue'
import { FindUser, ListenToUser, UpdateStreak, UserEntity } from '@modules/users'
import { AuthDetails, AuthTypes, UserLocation } from '@modules/auth/domain/entities/auth'
import { isClient } from '@utils/environment'
import { analytics } from '@modules/core'

const global = {
	auth: ref(null as AuthDetails | null),
	user: ref(null as UserEntity | null),
	location: ref(null as UserLocation | null),
	listener: null as null | (() => void)
}

export const CONVERSION_RATES = {
	USD: 1,
	NGN: 500,
	INR: 75
} as const

export const useAuth = () => {
	const id = computed({
		get: () => global.auth.value?.id ?? '', set: () => {
		}
	})
	const bio = computed({
		get: () => global.user.value?.bio, set: () => {
		}
	})

	const isLoggedIn = computed({
		get: () => !!id.value && !!global.user.value, set: () => {
		}
	})
	const isVerified = computed({
		get: () => !!global.auth.value?.isVerified, set: () => {
		}
	})
	const isAdmin = computed({
		get: () => !!global.user.value?.isAdmin, set: () => {
		}
	})
	const isTutor = computed({
		get: () => !!global.user.value?.isTutor, set: () => {
		}
	})
	const currentSessionId = computed({
		get: () => global.user.value?.currentSession ?? null,
		set: () => {
		}
	})

	const hasPassword = computed({
		get: () => !!global.auth.value?.authTypes.includes(AuthTypes.email),
		set: () => {
		}
	})

	const setUserLocation = (data: UserLocation) => {
		global.location.value = data
	}

	const setAuthUser = async (details: AuthDetails | null) => {
		if (global.listener) global.listener()
		global.auth.value = details
		if (details?.id) global.user.value = await FindUser.call(details.id)
		else global.user.value = null
	}

	const startProfileListener = async () => {
		if (global.listener) global.listener()

		const id = global.auth.value?.id
		const setUser = async (user: UserEntity) => {
			global.user.value = user
		}
		if (id) {
			global.listener = await ListenToUser.call(id, { created: setUser, updated: setUser, deleted: setUser })
			await UpdateStreak.call().catch(() => {
			})
		}
	}

	const signin = async (remembered: boolean) => {
		await startProfileListener()
		await analytics.logEvent('login', { remembered })
	}

	const signout = async () => {
		// await SessionSignout.call()
		// we would replace this with a function that clears the browser local storage
		await setAuthUser(null)
		if (isClient()) window.location.assign('/auth/signin')
	}

	const getKey = (): keyof typeof CONVERSION_RATES | null => {
		if (!global.location.value) return null
		const key = global.location.value.currencyCode as keyof typeof CONVERSION_RATES
		return CONVERSION_RATES[key] ? key : null
	}
	const getLocalCurrency = () => getKey() ?? 'USD'
	const getLocalCurrencySymbol = () => getKey() ? global.location.value?.currencySymbol ?? '$' : '$'

	const getLocalAmount = (amount: number) => parseFloat(Number(amount * CONVERSION_RATES[getLocalCurrency()]).toFixed(2))

	return {
		id, bio, user: global.user, auth: global.auth, location: global.location,
		isLoggedIn, isVerified, isAdmin, isTutor, currentSessionId, hasPassword,
		setAuthUser, setUserLocation, signin, signout,
		getLocalAmount, getLocalCurrency, getLocalCurrencySymbol
	}
}


