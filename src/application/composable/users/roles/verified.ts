import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { UserEntity } from '@modules/users'
import { Alert } from '@utils/dialog'
import { AuthUseCases } from '@modules/auth'

export const useVerifiedRoles = () => {
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()

	const verifyUser = async (user: UserEntity, verified: boolean) => {
		await setError('')
		const accepted = await Alert({
			title: `Are you sure you want to ${verified ? 'verify' : 'un-verify'} this user?`,
			confirmButtonText: 'Yes, continue'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await AuthUseCases.updateRole(user.id, 'isVerified', verified)
				user.isVerified = verified
				await setMessage(`Successfully ${verified ? 'verified' : 'unverified'}`)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { error, loading, verifyUser }
}
