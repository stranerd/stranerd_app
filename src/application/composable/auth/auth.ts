import { computed, ref } from 'vue'
import { UserEntity, UsersUseCases } from '@modules/users'
import { AuthDetails, AuthTypes } from '@modules/auth/domain/entities/auth'
import { AuthUseCases } from '@modules/auth'
import { isClient } from '@utils/environment'
import { setupPush, unregisterDeviceOnLogout } from '@utils/push'
import { WalletEntity, WalletsUseCases } from '@modules/payment'
import { useListener } from '@app/composable/core/listener'
import { getSchoolState } from '@app/composable/auth/session'
import { Router } from 'vue-router'

const store = {
	auth: ref(null as AuthDetails | null),
	user: ref(null as UserEntity | null),
	wallet: ref(null as WalletEntity | null),
	listener: useListener(async () => {
		const id = store.auth.value?.id as string | undefined
		if (!id) return () => {
		}
		const setUser = async (user: UserEntity) => {
			store.user.value = user
		}
		const setWallet = async (wallet: WalletEntity) => {
			store.wallet.value = wallet
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
		get: () => store.auth.value?.id ?? '', set: () => {
		}
	})
	const bio = computed({
		get: () => store.user.value?.bio, set: () => {
		}
	})

	const isLoggedIn = computed({
		get: () => !!id.value && !!store.user.value, set: () => {
		}
	})
	const isEmailVerified = computed({
		get: () => !!store.auth.value?.isVerified, set: () => {
		}
	})
	const isAdmin = computed({
		get: () => !!store.user.value?.roles.isStranerdAdmin, set: () => {
		}
	})
	const isTutor = computed({
		get: () => !!store.user.value?.roles.isStranerdTutor, set: () => {
		}
	})
	const isSubscribed = computed({
		get: () => !!store.wallet.value?.subscription.active, set: () => {
		}
	})
	const hasPassword = computed({
		get: () => !!store.auth.value?.authTypes.includes(AuthTypes.email),
		set: () => {
		}
	})

	const setAuthUser = async (details: AuthDetails | null) => {
		if (store.listener) await store.listener.close()
		store.auth.value = details
		if (details?.id) {
			store.user.value = await UsersUseCases.find(details.id)
			store.wallet.value = await WalletsUseCases.get()
		} else store.user.value = null
	}

	const startProfileListener = async () => {
		await store.listener.restart()
	}

	const signin = async (remembered: boolean, router: Router) => {
		await Promise.all([
			setupPush(id.value),
			startProfileListener()
		])
		if ((await getSchoolState()) !== id.value) {
			if (!store.user.value?.bio.photo) {
				await router.push('/account/setup')
				return false
			}
			if (!store.user.value?.bio.phone) {
				await router.push('/account/setup/phone')
				return false
			}
			if (!store.user.value?.school) {
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
		id, bio, user: store.user, auth: store.auth, wallet: store.wallet,
		isLoggedIn, isEmailVerified, isAdmin, isTutor, hasPassword, isSubscribed,
		setAuthUser, signin, signout, deleteAccount
	}
}
