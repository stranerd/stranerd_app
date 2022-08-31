import { computed, onMounted, onUnmounted, ref, Ref } from 'vue'
import { ClassEntity, ClassesUseCases } from '@modules/classes'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { addToArray } from '@utils/commons'
import { useAuth } from '@app/composable/auth/auth'

const global = {} as Record<string, {
	classes: Ref<ClassEntity[]>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useUserClassList = (id = useAuth().id.value) => {
	if (global[id] === undefined) global[id] = {
		classes: ref([]),
		fetched: ref(false),
		listener: useListener(async () => {
			return await ClassesUseCases.listenToMyClasses(id, {
				created: async (entity) => {
					addToArray(global[id].classes.value, entity, (e) => e.id, (e) => e.name, true)
				},
				updated: async (entity) => {
					addToArray(global[id].classes.value, entity, (e) => e.id, (e) => e.name, true)
				},
				deleted: async (entity) => {
					const index = global[id].classes.value.findIndex((q) => q.id === entity.id)
					if (index !== -1) global[id].classes.value.splice(index, 1)
				}
			})
		}),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchClasses = async () => {
		await global[id].setError('')
		try {
			await global[id].setLoading(true)
			const classes = await ClassesUseCases.getMyClasses(id)
			classes.results.forEach((c) => addToArray(global[id].classes.value, c, (e) => e.id, (e) => e.name, true))
			global[id].fetched.value = true
		} catch (error) {
			await global[id].setError(error)
		}
		await global[id].setLoading(false)
	}

	onMounted(async () => {
		if (!global[id].fetched.value && !global[id].loading.value) await fetchClasses()
		await global[id].listener.start()
	})

	onUnmounted(async () => {
		await global[id].listener.close()
	})

	const adminClasses = computed(() => global[id].classes.value.filter((c) => c.admins.includes(id)))

	return {
		...global[id], adminClasses,
		classes: computed(() => global[id].classes.value.filter((q) => q.users.members.includes(id) || q.requests.includes(id)))
	}
}
