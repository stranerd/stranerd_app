import { useErrorHandler, useLoadingHandler } from '@app/composable/core/states'
import { AfterAuthUser } from '@modules/auth/domain/entities/auth'
import { useAuth } from '@app/composable/auth/auth'
import { useRouter  } from 'vue-router'

export const createStorage = async (afterAuth: AfterAuthUser) => {
	const router = useRouter()

	if (!afterAuth.user.isVerified) {
		await useAuth().setAuthUser(afterAuth.user)
		return await router.push('/auth/verify')
	}

	const { setAuthUser, signin } = useAuth()
	await setAuthUser(afterAuth.user)
	await signin(false)

	localStorage.setItem('accessToken', afterAuth.accessToken)
	localStorage.setItem('refreshToken', afterAuth.refreshToken)
	localStorage.setItem('authUser', JSON.stringify(afterAuth.user))
}

export const useStorageSignout = () => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const signout = async () => {
		await setError('')
	}

	return { loading, error, signout }
}
