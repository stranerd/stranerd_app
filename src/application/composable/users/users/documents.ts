import { onMounted, onUnmounted, ref, Ref, watch } from 'vue'
import { DocumentEntity, DocumentsUseCases } from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { addToArray } from '@utils/commons'

const global = {} as Record<string, {
	documents: Ref<DocumentEntity[]>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
	searchMode: Ref<boolean>
	searchValue: Ref<string>
	searchResults: Ref<DocumentEntity[]>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useUserDocumentList = (id: string) => {
	if (global[id] === undefined) global[id] = {
		documents: ref([]),
		fetched: ref(false),
		hasMore: ref(false),
		searchMode: ref(false),
		searchResults: ref([]),
		searchValue: ref(''),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchDocuments = async () => {
		await global[id].setError('')
		try {
			await global[id].setLoading(true)
			const documents = await DocumentsUseCases.getUserDocuments(id, global[id].documents.value.at(-1)?.createdAt)
			global[id].hasMore.value = !!documents.pages.next
			documents.results.forEach((q) => addToArray(global[id].documents.value, q, (e) => e.id, (e) => e.createdAt))
			global[id].fetched.value = true
		} catch (error) {
			await global[id].setError(error)
		}
		await global[id].setLoading(false)
	}

	const listener = useListener(async () => {
		return await DocumentsUseCases.listenToUserDocuments(id, {
			created: async (entity) => {
				addToArray(global[id].documents.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			updated: async (entity) => {
				addToArray(global[id].documents.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			deleted: async (entity) => {
				global[id].documents.value = global[id].documents.value.filter((c) => c.id !== entity.id)
			}
		}, global[id].documents.value.at(-1)?.createdAt)
	})

	onMounted(async () => {
		if (!global[id].fetched.value && !global[id].loading.value) await fetchDocuments()
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
			global[id].searchResults.value = await DocumentsUseCases.searchUserDocuments(id, searchValue)
			global[id].fetched.value = true
		} catch (error) {
			await global[id].setError(error)
		}
		await global[id].setLoading(false)
	}

	watch(() => global[id].searchValue.value, () => {
		if (!global[id].searchValue.value) global[id].searchMode.value = false
	})

	return { ...global[id], fetchOlderDocuments: fetchDocuments, search }
}
