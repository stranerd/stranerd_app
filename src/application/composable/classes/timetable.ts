import { onMounted, onUnmounted, ref, Ref } from 'vue'
import { ClassEntity, EventEntity, EventFactory, EventsUseCases, EventType } from '@modules/classes'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { addToArray } from '@utils/commons'
import { useClassModal } from '@app/composable/core/modals'
import { Router, useRouter } from 'vue-router'

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
					addToArray(global[classId].events.value, entity, (e) => e.id, (e) => e.startOrder, true)
				},
				updated: async (entity) => {
					addToArray(global[classId].events.value, entity, (e) => e.id, (e) => e.startOrder, true)
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
			events.results.forEach((g) => addToArray(global[classId].events.value, g, (e) => e.id, (e) => e.startOrder, true))
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
export const getCreateEventClass = () => eventClass
export const openCreateTimetableModal = async (classInst: ClassEntity, router: Router) => {
	eventClass = classInst
	await router.push(`/classes/${classInst.id}/timetable/create`)
}

export const useCreateEvent = () => {
	const router = useRouter()
	const factory = ref(new EventFactory()) as Ref<EventFactory>
	factory.value.type = EventType.timetable
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	if (!eventClass) useClassModal().closeCreateTimetable()
	else factory.value.classId = eventClass.id

	const createEvent = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const event = await EventsUseCases.add(factory.value)
				await setMessage('Event created successfully.')
				useClassModal().closeCreateTimetable()
				factory.value.reset()
				const day = event.data.type === EventType.timetable ? event.data.start.day : 1
				await router.push(`/classes/${event.classId}/timetable?day=${day}`)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { factory, error, loading, createEvent, eventClass: eventClass! }
}

let editingEvent = null as { classInst: ClassEntity, event: EventEntity } | null
export const getEditEvent = () => editingEvent
export const openEditTimetableModal = async (editEventInfo: { classInst: ClassEntity, event: EventEntity }, router: Router) => {
	editingEvent = editEventInfo
	await router.push(`/classes/${editEventInfo.event.classId}/timetable/${editEventInfo.event.id}/edit`)
}

export const useEditEvent = () => {
	const router = useRouter()
	const factory = ref(new EventFactory()) as Ref<EventFactory>
	factory.value.type = EventType.timetable
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()

	if (editingEvent) factory.value.loadEntity(editingEvent.event)
	else useClassModal().closeEditTimetable()

	const editEvent = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const event = await EventsUseCases.update(editingEvent!.event.id, factory.value)
				await setMessage('Event updated successfully')
				useClassModal().closeEditTimetable()
				factory.value.reset()
				const day = event.data.type === EventType.timetable ? event.data.start.day : 1
				await router.push(`/classes/${event.classId}/timetable?day=${day}`)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, editEvent, eventClass: editingEvent!.classInst }
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
