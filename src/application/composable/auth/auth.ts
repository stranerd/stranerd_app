import { computed, ref } from 'vue'
import { UserEntity, UsersUseCases } from '@modules/users'
import { AuthDetails, AuthTypes } from '@modules/auth/domain/entities/auth'
import { AuthUseCases } from '@modules/auth'
import { isClient } from '@utils/environment'
import { setupPush, unregisterDeviceOnLogout } from '@utils/push'
import { WalletEntity, WalletsUseCases } from '@modules/payment'
import { useListener } from '@app/composable/core/states'
import { getSchoolState } from '@app/composable/auth/session'
import { Router } from 'vue-router'

const global = {
	auth: ref(null as AuthDetails | null),
	user: ref(null as UserEntity | null),
	wallet: ref(null as WalletEntity | null),
	listener: useListener(async () => {
		const id = global.auth.value?.id as string | undefined
		if (!id) return () => {
		}
		const setUser = async (user: UserEntity) => {
			global.user.value = user
		}
		const setWallet = async (wallet: WalletEntity) => {
			global.wallet.value = wallet
		}
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
		return async () => await Promise.all(listeners.map((l) => l()))
	})
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
		get: () => !!global.user.value?.roles.isStranerdAdmin, set: () => {
		}
	})
	const isTutor = computed({
		get: () => !!global.user.value?.roles.isStranerdTutor, set: () => {
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
		if (global.listener) await global.listener.close()
		global.auth.value = details
		if (details?.id) {
			global.user.value = await UsersUseCases.find(details.id)
			global.wallet.value = await WalletsUseCases.get()
		} else global.user.value = null
	}

	const startProfileListener = async () => {
		await global.listener.restart()
	}

	const signin = async (remembered: boolean, router: Router) => {
		await Promise.all([
			setupPush(id.value),
			startProfileListener()
		])
		if ((await getSchoolState()) !== id.value) {
			if (!global.user.value?.bio.description || !global.user.value?.bio.photo) {
				await router.push('/account/setup')
				return false
			}
			if (!global.user.value?.bio.phone) {
				await router.push('/account/setup/phone')
				return false
			}
			if (!global.user.value?.school) {
				await router.push('/account/setup/school')
				return false
			}
		}
		return true
	}

	const signout = async () => {
		await unregisterDeviceOnLogout()
		await AuthUseCases.sessionSignout()
		await setAuthUser(null)
		if (isClient()) window.location.assign('/auth/signin')
	}

	const deleteAccount = async () => {
		await unregisterDeviceOnLogout()
		await AuthUseCases.deleteAccount()
		await setAuthUser(null)
		if (isClient()) window.location.assign('/auth/signin')
	}

	return {
		id, bio, user: global.user, auth: global.auth, wallet: global.wallet,
		isLoggedIn, isEmailVerified, isAdmin, isTutor, hasPassword, isSubscribed,
		setAuthUser, signin, signout, deleteAccount
	}
}
