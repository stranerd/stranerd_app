import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { UserEntity } from '@modules/users'
import { Alert } from '@utils/dialog'
import { AuthUseCases } from '@modules/auth'

export const useVerifiedRoles = () => {
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()

	const verifyUser = async (user: UserEntity) => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to make this user verified?',
			confirmButtonText: 'Yes, continue'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await AuthUseCases.updateRole(user.id, 'isVerified', true)
				user.isVerified = true
				await setMessage('Successfully upgraded to verified')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	const deVerifyUser = async (user: UserEntity) => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to un-verify this user?',
			confirmButtonText: 'Yes, continue'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await AuthUseCases.updateRole(user.id, 'isVerified', false)
				await setMessage('Successfully downgraded from verified')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return {
		error, loading,
		verifyUser, deVerifyUser
	}
}
