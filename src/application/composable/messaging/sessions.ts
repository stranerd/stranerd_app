import { Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import { SessionFactory, SessionsUseCases } from '@modules/messaging'
import { ReviewsUseCases, UserBio } from '@modules/users'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { useSessionModal } from '@app/composable/core/modals'
import { Alert } from '@utils/dialog'

let newSessionTutorIdBio = null as null | { id: string, user: UserBio }
export const setNewSessionTutorIdBio = (data: { id: string, user: UserBio }) => {
	newSessionTutorIdBio = data
}

export const useCreateSession = () => {
	const router = useRouter()
	const factory = ref(new SessionFactory()) as Ref<SessionFactory>
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	factory.value.tutorId = newSessionTutorIdBio!.id

	const createSession = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const session = await SessionsUseCases.add(factory.value)
				useSessionModal().closeCreateSession()
				await router.push(`/chat/${session.tutor.id}`)
				factory.value.reset()
				await setMessage('Session request successful.')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return {
		factory, loading, error,
		createSession, newSessionTutorIdBio
	}
}

export const useSession = (sessionId: string) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	const cancelSession = async () => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to cancel this session',
			confirmButtonText: 'Yes, cancel',
			cancelButtonText: 'No, ignore'
		})
		if (accepted) {
			try {
				await setLoading(true)
				if (sessionId) await SessionsUseCases.cancel(sessionId)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	const endSession = async () => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to end this session',
			confirmButtonText: 'Yes, end',
			cancelButtonText: 'No, ignore'
		})
		if (accepted) {
			try {
				await setLoading(true)
				if (sessionId) await SessionsUseCases.end(sessionId)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	const acceptSession = async () => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to accept this session',
			confirmButtonText: 'Yes, accept',
			cancelButtonText: 'No, ignore'
		})
		if (accepted) {
			try {
				await setLoading(true)
				if (sessionId) await SessionsUseCases.accept(sessionId, true)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	const rejectSession = async () => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to reject this session',
			confirmButtonText: 'Yes, reject',
			cancelButtonText: 'No, ignore'
		})
		if (accepted) {
			try {
				await setLoading(true)
				if (sessionId) await SessionsUseCases.accept(sessionId, false)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, cancelSession, acceptSession, rejectSession, endSession }
}

let otherParticipantId = null as null | string
export const setOtherParticipantId = (id: string) => {
	otherParticipantId = id
}

export const useRateSession = () => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const rating = ref(0)
	const review = ref('')

	const rateSession = async () => {
		if (!otherParticipantId) return
		if (rating.value || review.value) {
			await setError('')
			await setLoading(true)
			try {
				await ReviewsUseCases.add({
					tutorId: otherParticipantId,
					rating: rating.value,
					review: review.value
				})
				useSessionModal().closeRatings()
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return {
		loading, error, rating, review,
		rateSession
	}
}
