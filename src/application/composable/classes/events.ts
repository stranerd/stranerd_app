import { computed, onMounted, onUnmounted, ref, Ref } from 'vue'
import { EventEntity, EventsUseCases } from '@modules/classes'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { addToArray } from '@utils/commons'
import { useAuth } from '@app/composable/auth/auth'
import { useListener } from '@app/composable/core/listener'

const store = {} as Record<string, {
	events: Ref<EventEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const eventStore = {} as Record<string, {
	event: Ref<EventEntity | null>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const markEventSeen = async (event: EventEntity, userId: string) => {
	if (!event.isRead(userId)) await EventsUseCases.markRead(event.classId, event.data.type)
}

export const useEventList = (classId: string) => {
	const { id } = useAuth()
	if (store[classId] === undefined) {
		const listener = useListener(async () => {
			return await EventsUseCases.listenToClassOneOffEvents(classId, {
				created: async (entity) => {
					addToArray(store[classId].events.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				updated: async (entity) => {
					addToArray(store[classId].events.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				deleted: async (entity) => {
					store[classId].events.value = store[classId].events.value.filter((c) => c.id !== entity.id)
				}
			})
		})
		store[classId] = {
			events: ref([]),
			fetched: ref(false),
			hasMore: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const unReadEvents = computed(() => store[classId].events.value.filter((a) => !a.isRead(id.value)).length)

	const fetchEvents = async () => {
		await store[classId].setError('')
		try {
			await store[classId].setLoading(true)
			const events = await EventsUseCases.getClassOneOffEvents(classId, store[classId].events.value.at(-1)?.createdAt)
			events.results.forEach((a) => addToArray(store[classId].events.value, a, (e) => e.id, (e) => e.createdAt))
			store[classId].hasMore.value = !!events.pages.next
			store[classId].fetched.value = true
		} catch (error) {
			await store[classId].setError(error)
		}
		await store[classId].setLoading(false)
	}

	onMounted(async () => {
		if (!store[classId].fetched.value && !store[classId].loading.value) await fetchEvents()
		await store[classId].listener.start()
	})
	onUnmounted(async () => {
		await store[classId].listener.close()
	})

	return { ...store[classId], fetchOlderEvents: fetchEvents, unReadEvents }
}

export const useEvent = (classId: string, id: string) => {
	if (eventStore[id] === undefined) {
		const listener = useListener(async () => {
			return await EventsUseCases.listenToOne(classId, id, {
				created: async (entity) => {
					eventStore[id].event.value = entity
				},
				updated: async (entity) => {
					eventStore[id].event.value = entity
				},
				deleted: async (entity) => {
					eventStore[id].event.value = entity
				}
			})
		})
		eventStore[id] = {
			event: ref(null),
			fetched: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchEvent = async () => {
		await eventStore[id].setError('')
		try {
			await eventStore[id].setLoading(true)
			eventStore[id].event.value = await EventsUseCases.find(classId, id)
			eventStore[id].fetched.value = true
		} catch (error) {
			await eventStore[id].setError(error)
		}
		await eventStore[id].setLoading(false)
	}

	onMounted(async () => {
		if (!eventStore[id].fetched.value && !eventStore[id].loading.value) await fetchEvent()
		await eventStore[id].listener.start()
	})
	onUnmounted(async () => {
		await eventStore[id].listener.close()
	})

	return { ...eventStore[id] }
}

export const useDeleteEvent = (classId: string, eventId: string) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteEvent = async () => {
		await setError('')
		const accepted = await Alert({
			message: 'Are you sure you want to delete this event?',
			confirmButtonText: 'Yes, delete'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await EventsUseCases.delete(classId, eventId)
				await setMessage('Event deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteEvent }
}
