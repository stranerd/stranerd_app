import { computed, ref } from 'vue'
import { UserEntity, UsersUseCases } from '@modules/users'
import { AuthDetails, AuthTypes, UserLocation } from '@modules/auth/domain/entities/auth'
import { AuthUseCases } from '@modules/auth'
import { isClient } from '@utils/environment'
import { setupPush } from '@utils/push'
import { useUserModal } from '@app/composable/core/modals'
import { storage } from '@utils/storage'
import { WalletEntity, WalletsUseCases } from '@modules/payment'

const global = {
	auth: ref(null as AuthDetails | null),
	user: ref(null as UserEntity | null),
	wallet: ref(null as WalletEntity | null),
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
	const isEmailVerified = computed({
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
		if (details?.id) {
			global.user.value = await UsersUseCases.find(details.id)
			global.wallet.value = await WalletsUseCases.get()
			if (global.auth.value?.isVerified && !global.user.value?.school) setTimeout(async () => {
				if ((await getSchoolState()) !== id.value) useUserModal().openSettings()
			}, 5000)
		} else global.user.value = null
	}

	const startProfileListener = async () => {
		if (global.listener) global.listener()

		const id = global.auth.value?.id
		const setUser = async (user: UserEntity) => {
			global.user.value = user
		}
		const setWallet = async (wallet: WalletEntity) => {
			global.wallet.value = wallet
		}
		if (id) global.listener = async () => {
			const listeners = [
				await UsersUseCases.listenToOne(id, {
					created: setUser,
					updated: setUser,
					deleted: setUser
				}),
				await WalletsUseCases.listen({
					created: setWallet,
					updated: setWallet,
					deleted: setWallet
				})
			]
			return async () => await Promise.all(listeners.map((fn) => fn()))
		}
	}

	const signin = async (remembered: boolean) => {
		await Promise.all([
			setupPush(id.value),
			startProfileListener()
		])
	}

	const signout = async () => {
		await AuthUseCases.sessionSignout()
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
		id, bio, user: global.user, auth: global.auth, location: global.location, wallet: global.wallet,
		isLoggedIn, isEmailVerified, isAdmin, isTutor, currentSessionId, hasPassword,
		setAuthUser, setUserLocation, signin, signout,
		getLocalAmount, getLocalCurrency, getLocalCurrencySymbol
	}
}

const SCHOOL_STATE_KEY = 'onboarding_school_show_key'
const getSchoolState = async () => storage.get(SCHOOL_STATE_KEY)
export const saveSchoolState = async () => storage.set(SCHOOL_STATE_KEY, useAuth().id.value)
