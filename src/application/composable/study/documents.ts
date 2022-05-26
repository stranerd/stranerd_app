import { computed, onMounted, onUnmounted, Ref, ref } from 'vue'
import { DocumentEntity, DocumentFactory, DocumentsUseCases } from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { Router, useRouter } from 'vue-router'
import { addToArray } from '@utils/commons'

const global = {
	documents: ref([] as DocumentEntity[]),
	fetched: ref(false),
	hasMore: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}
const listener = useListener(async () => {
	const lastDate = global.documents.value[global.documents.value.length - 1]?.createdAt
	return await DocumentsUseCases.listen({
		created: async (entity) => {
			addToArray(global.documents.value, entity, (e) => e.id, (e) => e.createdAt)
		},
		updated: async (entity) => {
			addToArray(global.documents.value, entity, (e) => e.id, (e) => e.createdAt)
		},
		deleted: async (entity) => {
			const index = global.documents.value.findIndex((q) => q.id === entity.id)
			if (index !== -1) global.documents.value.splice(index, 1)
		}
	}, lastDate)
})

export const useDocumentList = () => {
	const fetchDocuments = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			const lastDate = global.documents.value[global.documents.value.length - 1]?.createdAt
			const documents = await DocumentsUseCases.get(lastDate)
			global.hasMore.value = !!documents.pages.next
			documents.results.forEach((n) => addToArray(global.documents.value, n, (e) => e.id, (e) => e.createdAt))
			global.fetched.value = true
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchDocuments()
		await listener.start()
	})
	onUnmounted(async () => {
		await listener.close()
	})

	return { ...global, fetchOlderDocuments: fetchDocuments }
}

export const useCreateDocument = () => {
	const router = useRouter()
	const factory = ref(new DocumentFactory()) as Ref<DocumentFactory>
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()

	const createDocument = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const document = await DocumentsUseCases.add(factory.value)
				await setMessage('Document submitted successfully')
				await router.push(`/study/documents/${document.id}`)
				factory.value.reset()
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, createDocument }
}

let editingDocument = null as DocumentEntity | null
export const getEditingDocument = () => editingDocument
export const openDocumentEditModal = async (document: DocumentEntity, router: Router) => {
	editingDocument = document
	await router.push(`/study/documents/${document.id}/edit`)
}
export const useEditDocument = () => {
	const router = useRouter()
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const factory = ref(new DocumentFactory()) as Ref<DocumentFactory>
	if (editingDocument) factory.value.loadEntity(editingDocument)

	const editDocument = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const document = await DocumentsUseCases.update(editingDocument!.id, factory.value)
				await setMessage('Document updated successfully')
				factory.value.reset()
				await router.push(`/study/documents/${document.id}`)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, editDocument }
}

export const useDeleteDocument = (documentId: string) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteDocument = async () => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to delete this document?',
			confirmButtonText: 'Yes, delete'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await DocumentsUseCases.delete(documentId)
				global.documents.value = global.documents.value
					.filter((q) => q.id !== documentId)
				await setMessage('Document deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteDocument }
}

export const useDocument = (documentId: string) => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const document = computed({
		get: () => global.documents.value.find((q) => q.id === documentId) ?? null,
		set: (q) => {
			if (q) addToArray(global.documents.value, q, (e) => e.id, (e) => e.createdAt)
		}
	})

	const fetchDocument = async () => {
		await setError('')
		try {
			await setLoading(true)
			let document = global.documents.value.find((q) => q.id === documentId) ?? null
			if (document) {
				await setLoading(false)
				return
			}
			document = await DocumentsUseCases.find(documentId)
			if (document) addToArray(global.documents.value, document, (e) => e.id, (e) => e.createdAt)
		} catch (error) {
			await setError(error)
		}
		await setLoading(false)
	}
	const listener = useListener(async () => {
		return await DocumentsUseCases.listenToOne(documentId, {
			created: async (entity) => {
				addToArray(global.documents.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			updated: async (entity) => {
				addToArray(global.documents.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			deleted: async (entity) => {
				const index = global.documents.value.findIndex((q) => q.id === entity.id)
				if (index !== -1) global.documents.value.splice(index, 1)
			}
		})
	})

	onMounted(async () => {
		await fetchDocument()
		await listener.start()
	})
	onUnmounted(async () => {
		await listener.close()
	})

	return { error, loading, document }
}
