import { computed, onMounted, onUnmounted, ref, Ref } from 'vue'
import { EventEntity, EventsUseCases } from '@modules/classes'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { addToArray } from '@utils/commons'
import { useAuth } from '@app/composable/auth/auth'

const global = {} as Record<string, {
	events: Ref<EventEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useEventList = (classId: string) => {
	const { id } = useAuth()
	if (global[classId] === undefined) {
		const listener = useListener(async () => {
			return await EventsUseCases.listenToClassOneOffEvents(classId, {
				created: async (entity) => {
					addToArray(global[classId].events.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				updated: async (entity) => {
					addToArray(global[classId].events.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				deleted: async (entity) => {
					global[classId].events.value = global[classId].events.value.filter((c) => c.id !== entity.id)
				}
			})
		})
		global[classId] = {
			events: ref([]),
			fetched: ref(false),
			hasMore: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const unReadEvents = computed(() => global[classId].events.value.filter((a) => !a.isRead(id.value)).length)

	const fetchEvents = async () => {
		await global[classId].setError('')
		try {
			await global[classId].setLoading(true)
			const events = await EventsUseCases.getClassOneOffEvents(classId)
			events.results.forEach((a) => addToArray(global[classId].events.value, a, (e) => e.id, (e) => e.createdAt))
			global[classId].hasMore.value = !!events.pages.next
			global[classId].fetched.value = true
		} catch (error) {
			await global[classId].setError(error)
		}
		await global[classId].setLoading(false)
	}

	onMounted(async () => {
		if (!global[classId].fetched.value && !global[classId].loading.value) await fetchEvents()
		await global[classId].listener.start()
	})
	onUnmounted(async () => {
		await global[classId].listener.close()
	})

	return { ...global[classId], fetchOlderEvents: fetchEvents, unReadEvents }
}

export const useDeleteEvent = (classId: string, eventId: string) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteEvent = async () => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to delete this event?',
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
