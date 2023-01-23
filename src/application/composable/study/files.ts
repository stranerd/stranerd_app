import { computed, onMounted, onUnmounted, Ref, ref, watch } from 'vue'
import { FileEntity, FileFactory, FilesUseCases } from '@modules/study'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { useRouter } from 'vue-router'
import { addToArray } from '@utils/commons'
import { useAuth } from '@app/composable/auth/auth'
import { useListener } from '@app/composable/core/listener'

type Filters = 'images' | 'videos' | 'docs' | string

const store = {} as Record<string, {
	files: Ref<FileEntity[]>
	type: Ref<Filters>
	fetched: Ref<boolean>
	hasMore: Ref<boolean>
	listener: ReturnType<typeof useListener>
	searchMode: Ref<boolean>
	searchValue: Ref<string>
	searchResults: Ref<FileEntity[]>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useFileList = (userId = useAuth().id.value) => {
	if (store[userId] === undefined) {
		const listener = useListener(async () => {
			return FilesUseCases.listenToUserFiles(userId, store[userId].type.value, {
				created: async (entity) => {
					addToArray(store[userId].files.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				updated: async (entity) => {
					addToArray(store[userId].files.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				deleted: async (entity) => {
					const index = store[userId].files.value.findIndex((c) => c.id === entity.id)
					if (index !== -1) store[userId].files.value.splice(index, 1)
				}
			}, store[userId].files.value.at(0)?.createdAt)
		})
		store[userId] = {
			files: ref([]),
			type: ref('images'),
			fetched: ref(false),
			hasMore: ref(false),
			listener,
			searchMode: ref(false),
			searchResults: ref([]),
			searchValue: ref(''),
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchFiles = async () => {
		await store[userId].setError('')
		try {
			await store[userId].setLoading(true)
			const files = await FilesUseCases.getUserFiles(userId, store[userId].type.value, store[userId].files.value.at(-1)?.createdAt)
			files.results.map((d) => addToArray(store[userId].files.value, d, (e) => e.id, (e) => e.createdAt))
			store[userId].hasMore.value = !!files.pages.next
			store[userId].fetched.value = true
		} catch (e) {
			await store[userId].setError(e)
		}
		await store[userId].setLoading(false)
	}

	const search = async () => {
		const searchValue = store[userId].searchValue.value
		if (!searchValue) return
		store[userId].searchMode.value = true
		await store[userId].setError('')
		try {
			await store[userId].setLoading(true)
			store[userId].searchResults.value = await FilesUseCases.searchUserFiles(userId, store[userId].type.value, searchValue)
			store[userId].fetched.value = true
		} catch (error) {
			await store[userId].setError(error)
		}
		await store[userId].setLoading(false)
	}

	watch(store[userId].searchValue, () => {
		if (!store[userId].searchValue.value) store[userId].searchMode.value = false
	})

	watch([store[userId].type], async () => {
		store[userId].files.value = []
		await fetchFiles()
		await store[userId].listener.restart()
	})
	onMounted(async () => {
		if (!store[userId].fetched.value && !store[userId].loading.value) await fetchFiles()
		await store[userId].listener.start()
	})
	onUnmounted(async () => {
		await store[userId].listener.close()
	})

	const files = computed(() => store[userId].searchMode.value ? store[userId].searchResults.value : store[userId].files.value)

	return { ...store[userId], files, fetchOlderFiles: fetchFiles, search }
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
				await router.push('/account/files/')
				factory.value.reset()
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { error, loading, factory, createFile }
}

export const useDeleteFile = (file: FileEntity) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteFile = async () => {
		await setError('')
		const accepted = await Alert({
			message: 'Are you sure you want to delete this file?',
			confirmButtonText: 'Yes, delete'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await FilesUseCases.delete(file.id)
				if (store[file.user.id]) store[file.user.id].files.value = store[file.user.id].files.value
					.filter((q) => q.id !== file.id)
				await setMessage('File deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteFile }
}
