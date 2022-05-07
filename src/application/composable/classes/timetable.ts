import { onMounted, onUnmounted, ref, Ref } from 'vue'
import { ClassEntity, EventEntity, EventFactory, EventsUseCases, EventType } from '@modules/classes'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { useClassModal } from '@app/composable/core/modals'
import { addToArray } from '@utils/commons'

const global = {} as Record<string, {
	events: Ref<EventEntity[]>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useTimetable = (classId: string) => {
	if (global[classId] === undefined) {
		const listener = useListener(async () => {
			return await EventsUseCases.listenToClassTimetable(classId, {
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
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchEvents = async () => {
		await global[classId].setError('')
		try {
			await global[classId].setLoading(true)
			const events = await EventsUseCases.getClassTimetable(classId)
			events.results.forEach((g) => addToArray(global[classId].events.value, g, (e) => e.id, (e) => e.createdAt))
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

	return {
		error: global[classId].error,
		loading: global[classId].loading,
		events: global[classId].events
	}
}

let eventClass = null as ClassEntity | null
export const getEventClass = () => eventClass
export const openEventModal = async (classInst: ClassEntity) => {
	eventClass = classInst
	useClassModal().openCreateTimetable()
}

export const useCreateEvent = (eventClass: ClassEntity) => {
	const factory = ref(new EventFactory()) as Ref<EventFactory>
	factory.value.type = EventType.timetable
	factory.value.classId = eventClass.id
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const createEvent = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				await EventsUseCases.add(factory.value)
				await setMessage('Event created successfully.')
				factory.value.reset()
				useClassModal().closeCreateTimetable()
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return {
		factory, error, loading, createEvent
	}
}

let editingEvent = null as EventEntity | null
export const getEditingEvent = () => editingEvent
export const openEventEditModal = async (event: EventEntity) => {
	editingEvent = event
	useClassModal().openEditTimetable()
}
export const useEditEvent = () => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const factory = ref(new EventFactory()) as Ref<EventFactory>
	factory.value.type = EventType.timetable

	if (editingEvent) factory.value.loadEntity(editingEvent)
	else useClassModal().closeEditTimetable()

	const editEvent = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				await EventsUseCases.update(editingEvent!.id, factory.value)
				await setMessage('Event updated successfully')
				factory.value.reset()
				useClassModal().closeEditTimetable()
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, editEvent }
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
