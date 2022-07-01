import { onMounted, onUnmounted, ref, Ref, watch } from 'vue'
import { FileEntity, FilesUseCases } from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { addToArray } from '@utils/commons'

const global = {} as Record<string, {
	files: Ref<FileEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
	searchMode: Ref<boolean>
	searchValue: Ref<string>
	searchResults: Ref<FileEntity[]>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useUserFileList = (id: string) => {
	if (global[id] === undefined) global[id] = {
		files: ref([]),
		fetched: ref(false),
		hasMore: ref(false),
		searchMode: ref(false),
		searchResults: ref([]),
		searchValue: ref(''),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchFiles = async () => {
		await global[id].setError('')
		try {
			await global[id].setLoading(true)
			const files = await FilesUseCases.getUserFiles(id, global[id].files.value.at(-1)?.createdAt)
			global[id].hasMore.value = !!files.pages.next
			files.results.forEach((q) => addToArray(global[id].files.value, q, (e) => e.id, (e) => e.createdAt))
			global[id].fetched.value = true
		} catch (error) {
			await global[id].setError(error)
		}
		await global[id].setLoading(false)
	}

	const listener = useListener(async () => {
		return await FilesUseCases.listenToUserFiles(id, {
			created: async (entity) => {
				addToArray(global[id].files.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			updated: async (entity) => {
				addToArray(global[id].files.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			deleted: async (entity) => {
				global[id].files.value = global[id].files.value.filter((c) => c.id !== entity.id)
			}
		}, global[id].files.value.at(-1)?.createdAt)
	})

	onMounted(async () => {
		if (!global[id].fetched.value && !global[id].loading.value) await fetchFiles()
		await listener.start()
	})

	onUnmounted(async () => {
		await listener.close()
	})

	const search = async () => {
		const searchValue = global[id].searchValue.value
		if (!searchValue) return
		global[id].searchMode.value = true
		await global[id].setError('')
		try {
			await global[id].setLoading(true)
			global[id].searchResults.value = await FilesUseCases.searchUserFiles(id, searchValue)
			global[id].fetched.value = true
		} catch (error) {
			await global[id].setError(error)
		}
		await global[id].setLoading(false)
	}

	watch(global[id].searchValue, () => {
		if (!global[id].searchValue.value) global[id].searchMode.value = false
	})

	return { ...global[id], fetchOlderFiles: fetchFiles, search }
}
