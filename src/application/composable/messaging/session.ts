import { computed, onMounted, onUnmounted, ref, Ref, watch } from 'vue'
import { Router, useRouter } from 'vue-router'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { SessionEntity, SessionsUseCases } from '@modules/messaging'
import { useAuth } from '@app/composable/auth/auth'
import { Alert } from '@utils/dialog'
import { setOtherParticipantId } from '@app/composable/messaging/sessions'
import { useSessionModal } from '@app/composable/core/modals'
import { addToArray } from '@utils/commons'

const currentGlobal = {
	previousSession: ref(null as SessionEntity | null),
	currentSession: ref(null as SessionEntity | null),
	listener: useListener(async () => () => {
	})
}

const global = {} as Record<SessionKey, {
	sessions: Ref<SessionEntity[]>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useCurrentSession = () => {
	const { currentSessionId, id } = useAuth()
	const router = useRouter()

	const fetchSession = async (userId: string, id: string | null) => {
		if (id && currentGlobal.currentSession.value?.id !== id) {
			const session = await SessionsUseCases.find(id)
			currentGlobal.currentSession.value = session
			if (session) {
				const id = userId === session.tutor.id ? session.student.id : session.tutor.id
				await router.push(`/sessions/${id}`)
			}
			const listenerCallback = async (entity: SessionEntity) => {
				const oldDone = currentGlobal.currentSession.value?.done ?? false
				if (!oldDone && entity?.done) {
					const id = userId === entity.tutor.id ? entity.student.id : entity.tutor.id
					setOtherParticipantId(id)
					useSessionModal().openRatings()
				}
				currentGlobal.previousSession.value = currentGlobal.currentSession.value
				if (entity) currentGlobal.currentSession.value = entity
			}
			await currentGlobal.listener.reset(
				async () => id
					? SessionsUseCases.listenToOne(id, {
						created: listenerCallback,
						updated: listenerCallback,
						deleted: async () => {
						}
					})
					: () => () => {
					}
			)
		}
	}

	watch(() => currentSessionId.value, async () => {
		await fetchSession(id.value, currentSessionId.value)
	})

	onMounted(async () => {
		await fetchSession(id.value, currentSessionId.value)
	})

	const endDate = computed({
		get: () => currentGlobal.currentSession.value?.endedAt ?? Date.now(),
		set: () => {
		}
	})

	const otherParticipantId = computed({
		get: () => {
			const session = currentGlobal.currentSession.value
			if (!session) return null
			return session.student.id === id.value ? session.tutor.id : session.student.id
		},
		set: () => {
		}
	})

	return { ...currentGlobal, otherParticipantId, endDate }
}

const useSession = (key: SessionKey, router: Router, callback: (key: SessionKey, sessions: SessionEntity[], id: string, router: Router) => void) => {
	const { user, id } = useAuth()

	if (global[key] === undefined) global[key] = {
		sessions: ref([]),
		fetched: ref(false),
		...useErrorHandler(),
		...useLoadingHandler(),
		listener: useListener(async () => {
			const sessionIds = user.value?.session?.[key] ?? []
			if (sessionIds.length === 0) {
				global[key].sessions.value = []
				return () => {
				}
			}
			return SessionsUseCases.listenInList(sessionIds, {
				created: async (entity) => {
					addToArray(global[key].sessions.value, entity, (e) => e.id, (e) => e.createdAt)
					callback(key, global[key].sessions.value, id.value!, router)
				},
				updated: async (entity) => {
					addToArray(global[key].sessions.value, entity, (e) => e.id, (e) => e.createdAt)
					callback(key, global[key].sessions.value, id.value!, router)
				},
				deleted: async (entity) => {
					global[key].sessions.value = global[key].sessions.value.filter((e) => e.id !== entity.id)
					callback(key, global[key].sessions.value, id.value!, router)
				}
			})
		})
	}

	const fetchSessions = async () => {
		await global[key].setError('')
		const sessionIds = user.value?.session?.[key] ?? []
		if (sessionIds.length === 0) return global[key].sessions.value = []
		try {
			await global[key].setLoading(true)
			const sessions = await SessionsUseCases.getInList(sessionIds)
			callback(key, sessions.results, id.value!, router)
			global[key].sessions.value = sessions.results
			global[key].fetched.value = true
		} catch (error) {
			await global[key].setError(error)
		}
		await global[key].setLoading(false)
	}

	onMounted(async () => {
		if (!global[key].fetched.value && !global[key].loading.value) await fetchSessions()
		await global[key].listener.start()
	})
	onUnmounted(async () => {
		await global[key].listener.close()
	})

	watch(() => user.value?.session[key], async () => {
		if (user.value) await global[key].listener.restart()
	})

	return { ...global[key] }
}

const callback = (key: SessionKey, sessions: SessionEntity[], userId: string, router: Router) => {
	sessions
		.filter((session) => {
			const index = global[key].sessions.value.findIndex((s) => s.id === session.id)
			return index === -1
		}) // * check if the session has been fetched before
		.filter((session) => session.tutor.id === userId)
		.forEach(async (session) => {
			const route = `/sessions/${session.student.id}`
			if (!router || router.currentRoute.value.path === route) return
			const res = await Alert({
				title: 'New session request',
				cancelButtonText: 'Ignore',
				confirmButtonText: 'Continue'
			})
			if (res) await router.push(route)
		})
	// TODO: Create modal to allow tutor navigate to said page
	// If using modal though, remember that only one instance of the modal can be open at once
}

export const useRequestSessions = (router: Router) => useSession('requests', router, callback)
export const useLobbySessions = (router: Router) => useSession('lobby', router, callback)

type SessionKey = 'requests' | 'lobby'

export const isRequestingSessionWith = (userId: string) => computed({
	get: () => global.requests?.sessions?.value?.find((s) => s.tutor.id === userId) ?? null,
	set: () => {
	}
})

export const hasRequestedSessionWith = (userId: string) => computed({
	get: () => global.lobby?.sessions?.value?.find((s) => s.student.id === userId) ?? null,
	set: () => {
	}
})
