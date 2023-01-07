import { computed, onMounted, onUnmounted, ref, Ref } from 'vue'
import { ClassEntity, EventEntity, EventFactory, EventsUseCases, EventType } from '@modules/classes'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { addToArray } from '@utils/commons'
import { useClassModal } from '@app/composable/core/modals'
import { Router, useRouter } from 'vue-router'
import { useAuth } from '@app/composable/auth/auth'

const store = {} as Record<string, {
	events: Ref<EventEntity[]>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useTimetable = (classId: string) => {
	const { id } = useAuth()
	if (store[classId] === undefined) {
		const listener = useListener(async () => {
			return await EventsUseCases.listenToClassTimetable(classId, {
				created: async (entity) => {
					addToArray(store[classId].events.value, entity, (e) => e.id, (e) => e.startOrder, true)
				},
				updated: async (entity) => {
					addToArray(store[classId].events.value, entity, (e) => e.id, (e) => e.startOrder, true)
				},
				deleted: async (entity) => {
					store[classId].events.value = store[classId].events.value.filter((c) => c.id !== entity.id)
				}
			})
		})
		store[classId] = {
			events: ref([]),
			fetched: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const unReadTimetable = computed(() => store[classId].events.value.filter((a) => !a.isRead(id.value)).length)

	const fetchEvents = async () => {
		await store[classId].setError('')
		try {
			await store[classId].setLoading(true)
			const events = await EventsUseCases.getClassTimetable(classId)
			events.results.forEach((g) => addToArray(store[classId].events.value, g, (e) => e.id, (e) => e.startOrder, true))
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

	return {
		error: store[classId].error,
		loading: store[classId].loading,
		events: store[classId].events,
		unReadTimetable
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
