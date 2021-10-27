/* eslint-disable @typescript-eslint/no-empty-function */
import { computed, Ref, ref } from 'vue'
import { useRouter } from 'vue-router'
import { AddSession, BeginSession, CancelSession, EndSession, SessionFactory } from '@/modules/sessions'
import { CreateReview, UserBio } from '@/modules/users'
import { useAuth } from '@/application/composable/auth/auth'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@/application/composable/core/states'
import { Alert } from '@/application/composable/core/notifications'
import { analytics } from '@/modules/core'

let newSessionTutorIdBio = null as null | { id: string; user: UserBio }
export const setNewSessionTutorIdBio = (data: { id: string; user: UserBio }) => {
	newSessionTutorIdBio = data
}

export const useCreateSession = () => {
	const { user } = useAuth()
	const router = useRouter()
	const factory = ref(new SessionFactory()) as Ref<SessionFactory>
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	factory.value.tutorId = newSessionTutorIdBio!.id
	const hasEnoughCoins = computed({
		get: () => factory.value.price <= (user.value?.account?.coins?.gold ?? 0),
		set: () => {
		}
	})

	const createSession = async () => {
		await setError('')
		if (factory.value.valid && hasEnoughCoins.value && !loading.value) {
			try {
				await setLoading(true)
				const sessionId = await AddSession.call(factory.value)
				//useSessionModal().closeCreateSession()
				await router.push(`/sessions/${newSessionTutorIdBio?.id}`)
				factory.value.reset()
				await setMessage('Session request successful.')
				await analytics.logEvent('session_request', { sessionId })
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return {
		factory, loading, error, hasEnoughCoins,
		createSession
	}
}

export const useSession = (sessionId: string) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	const cancelSession = async () => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to cancel this session',
			text: 'This cannot be undone',
			icon: 'info',
			confirmButtonText: 'Yes, cancel',
			cancelButtonText: 'No, ignore'
		})
		if (accepted) {
			try {
				await setLoading(true)
				if (sessionId) await CancelSession.call(sessionId)
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
			text: 'This cannot be undone',
			icon: 'info',
			confirmButtonText: 'Yes, end',
			cancelButtonText: 'No, ignore'
		})
		if (accepted) {
			try {
				await setLoading(true)
				if (sessionId) await EndSession.call(sessionId)
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
			text: '',
			icon: 'info',
			confirmButtonText: 'Yes, accept',
			cancelButtonText: 'No, ignore'
		})
		if (accepted) {
			try {
				await setLoading(true)
				if (sessionId) await BeginSession.call(sessionId, true)
				await analytics.logEvent('session_accepted', { sessionId, accepted: true })
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
			text: '',
			icon: 'info',
			confirmButtonText: 'Yes, reject',
			cancelButtonText: 'No, ignore'
		})
		if (accepted) {
			try {
				await setLoading(true)
				if (sessionId) await BeginSession.call(sessionId, false)
				await analytics.logEvent('session_accepted', { sessionId, accepted: false })
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
				await CreateReview.call({
					tutorId: otherParticipantId,
					rating: rating.value,
					review: review.value
				})
				//useSessionModal().closeRatings()
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
