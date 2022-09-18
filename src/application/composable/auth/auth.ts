import { computed, ref } from 'vue'
import { UserEntity, UsersUseCases } from '@modules/users'
import { AuthDetails, AuthTypes } from '@modules/auth/domain/entities/auth'
import { AuthUseCases } from '@modules/auth'
import { isClient } from '@utils/environment'
import { setupPush } from '@utils/push'
import { storage } from '@utils/storage'
import { WalletEntity, WalletsUseCases } from '@modules/payment'
import { router } from '@app/router'

const global = {
	auth: ref(null as AuthDetails | null),
	user: ref(null as UserEntity | null),
	wallet: ref(null as WalletEntity | null),
	listener: null as null | (() => void)
}

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
	const isSubscribed = computed({
		get: () => !!global.wallet.value?.subscription.active, set: () => {
		}
	})
	const hasPassword = computed({
		get: () => !!global.auth.value?.authTypes.includes(AuthTypes.email),
		set: () => {
		}
	})

	const setAuthUser = async (details: AuthDetails | null) => {
		if (global.listener) global.listener()
		global.auth.value = details
		if (details?.id) {
			global.user.value = await UsersUseCases.find(details.id)
			global.wallet.value = await WalletsUseCases.get()
			if (global.auth.value?.isVerified && !global.user.value?.school) {
				if ((await getSchoolState()) !== id.value) await router.push('/account/setup')
			}
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

	return {
		id, bio, user: global.user, auth: global.auth, wallet: global.wallet,
		isLoggedIn, isEmailVerified, isAdmin, isTutor, hasPassword, isSubscribed,
		setAuthUser, signin, signout
	}
}

const SCHOOL_STATE_KEY = 'onboarding_school_show_key'
const getSchoolState = async () => storage.get(SCHOOL_STATE_KEY)
export const saveSchoolState = async () => storage.set(SCHOOL_STATE_KEY, useAuth().id.value)
