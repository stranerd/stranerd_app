import { computed, onMounted, onUnmounted, ref, Ref } from 'vue'
import { ClassEntity, ClassesUseCases } from '@modules/classes'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { addToArray } from '@utils/commons'
import { useAuth } from '@app/composable/auth/auth'

const store = {} as Record<string, {
	classes: Ref<ClassEntity[]>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useUserClassList = (id = useAuth().id.value) => {
	if (store[id] === undefined) store[id] = {
		classes: ref([]),
		fetched: ref(false),
		listener: useListener(async () => {
			return await ClassesUseCases.listenToMyClasses(id, {
				created: async (entity) => {
					addToArray(store[id].classes.value, entity, (e) => e.id, (e) => e.name, true)
				},
				updated: async (entity) => {
					addToArray(store[id].classes.value, entity, (e) => e.id, (e) => e.name, true)
				},
				deleted: async (entity) => {
					const index = store[id].classes.value.findIndex((q) => q.id === entity.id)
					if (index !== -1) store[id].classes.value.splice(index, 1)
				}
			})
		}),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchClasses = async () => {
		await store[id].setError('')
		try {
			await store[id].setLoading(true)
			const classes = await ClassesUseCases.getMyClasses(id)
			classes.results.forEach((c) => addToArray(store[id].classes.value, c, (e) => e.id, (e) => e.name, true))
			store[id].fetched.value = true
		} catch (error) {
			await store[id].setError(error)
		}
		await store[id].setLoading(false)
	}

	onMounted(async () => {
		if (!store[id].fetched.value && !store[id].loading.value) await fetchClasses()
		await store[id].listener.start()
	})

	onUnmounted(async () => {
		await store[id].listener.close()
	})

	const adminClasses = computed(() => store[id].classes.value.filter((c) => c.admins.includes(id)))

	return {
		...store[id], adminClasses,
		classes: computed(() => store[id].classes.value.filter((q) => q.users.members.includes(id) || q.requests.includes(id)))
	}
}
