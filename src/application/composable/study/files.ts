import { computed, onMounted, onUnmounted, Ref, ref } from 'vue'
import { FileEntity, FileFactory, FilesUseCases } from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { Router, useRouter } from 'vue-router'
import { addToArray } from '@utils/commons'

const global = {
	files: ref([] as FileEntity[]),
	fetched: ref(false),
	hasMore: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}
const listener = useListener(async () => await FilesUseCases.listen({
	created: async (entity) => {
		addToArray(global.files.value, entity, (e) => e.id, (e) => e.createdAt)
	},
	updated: async (entity) => {
		addToArray(global.files.value, entity, (e) => e.id, (e) => e.createdAt)
	},
	deleted: async (entity) => {
		const index = global.files.value.findIndex((q) => q.id === entity.id)
		if (index !== -1) global.files.value.splice(index, 1)
	}
}, global.files.value.at(-1)?.createdAt))

export const useFileList = () => {
	const fetchFiles = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			const files = await FilesUseCases.get(global.files.value.at(-1)?.createdAt)
			global.hasMore.value = !!files.pages.next
			files.results.forEach((n) => addToArray(global.files.value, n, (e) => e.id, (e) => e.createdAt))
			global.fetched.value = true
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchFiles()
		await listener.start()
	})
	onUnmounted(async () => {
		await listener.close()
	})

	return { ...global, fetchOlderFiles: fetchFiles }
}

export const useCreateFile = () => {
	const router = useRouter()
	const factory = ref(new FileFactory()) as Ref<FileFactory>
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()

	const createFile = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const file = await FilesUseCases.add(factory.value)
				await setMessage('File submitted successfully')
				await router.push(`/study/files/${file.id}`)
				factory.value.reset()
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, createFile }
}

let editingFile = null as FileEntity | null
export const getEditingFile = () => editingFile
export const openFileEditModal = async (file: FileEntity, router: Router) => {
	editingFile = file
	await router.push(`/study/files/${file.id}/edit`)
}
export const useEditFile = () => {
	const router = useRouter()
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const factory = ref(new FileFactory()) as Ref<FileFactory>
	if (editingFile) factory.value.loadEntity(editingFile)

	const editFile = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				const file = await FilesUseCases.update(editingFile!.id, factory.value)
				await setMessage('File updated successfully')
				factory.value.reset()
				await router.push(`/study/files/${file.id}`)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, editFile }
}

export const useDeleteFile = (fileId: string) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteFile = async () => {
		await setError('')
		const accepted = await Alert({
			title: 'Are you sure you want to delete this file?',
			confirmButtonText: 'Yes, delete'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await FilesUseCases.delete(fileId)
				global.files.value = global.files.value
					.filter((q) => q.id !== fileId)
				await setMessage('File deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteFile }
}

export const useFile = (fileId: string) => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const file = computed({
		get: () => global.files.value.find((q) => q.id === fileId) ?? null,
		set: (q) => {
			if (q) addToArray(global.files.value, q, (e) => e.id, (e) => e.createdAt)
		}
	})

	const fetchFile = async () => {
		await setError('')
		try {
			await setLoading(true)
			let file = global.files.value.find((q) => q.id === fileId) ?? null
			if (file) {
				await setLoading(false)
				return
			}
			file = await FilesUseCases.find(fileId)
			if (file) addToArray(global.files.value, file, (e) => e.id, (e) => e.createdAt)
		} catch (error) {
			await setError(error)
		}
		await setLoading(false)
	}
	const listener = useListener(async () => {
		return await FilesUseCases.listenToOne(fileId, {
			created: async (entity) => {
				addToArray(global.files.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			updated: async (entity) => {
				addToArray(global.files.value, entity, (e) => e.id, (e) => e.createdAt)
			},
			deleted: async (entity) => {
				const index = global.files.value.findIndex((q) => q.id === entity.id)
				if (index !== -1) global.files.value.splice(index, 1)
			}
		})
	})

	onMounted(async () => {
		await fetchFile()
		await listener.start()
	})
	onUnmounted(async () => {
		await listener.close()
	})

	return { error, loading, file }
}
