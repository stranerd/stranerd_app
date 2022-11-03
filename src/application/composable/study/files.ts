import { computed, onMounted, onUnmounted, Ref, ref, watch } from 'vue'
import { FileEntity, FileFactory, FilesUseCases } from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { useRouter } from 'vue-router'
import { addToArray } from '@utils/commons'
import { useAuth } from '@app/composable/auth/auth'

type Filters = 'images' | 'videos' | 'docs'

const global = {} as Record<string, {
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
	if (global[userId] === undefined) {
		const listener = useListener(async () => {
			return FilesUseCases.listenToUserFiles(userId, global[userId].type.value, {
				created: async (entity) => {
					addToArray(global[userId].files.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				updated: async (entity) => {
					addToArray(global[userId].files.value, entity, (e) => e.id, (e) => e.createdAt)
				},
				deleted: async (entity) => {
					const index = global[userId].files.value.findIndex((c) => c.id === entity.id)
					if (index !== -1) global[userId].files.value.splice(index, 1)
				}
			}, global[userId].files.value.at(0)?.createdAt)
		})
		global[userId] = {
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
		await global[userId].setError('')
		try {
			await global[userId].setLoading(true)
			const files = await FilesUseCases.getUserFiles(userId, global[userId].type.value, global[userId].files.value.at(-1)?.createdAt)
			files.results.map((d) => addToArray(global[userId].files.value, d, (e) => e.id, (e) => e.createdAt))
			global[userId].hasMore.value = !!files.pages.next
			global[userId].fetched.value = true
		} catch (e) {
			await global[userId].setError(e)
		}
		await global[userId].setLoading(false)
	}

	const search = async () => {
		const searchValue = global[userId].searchValue.value
		if (!searchValue) return
		global[userId].searchMode.value = true
		await global[userId].setError('')
		try {
			await global[userId].setLoading(true)
			global[userId].searchResults.value = await FilesUseCases.searchUserFiles(userId, global[userId].type.value, searchValue)
			global[userId].fetched.value = true
		} catch (error) {
			await global[userId].setError(error)
		}
		await global[userId].setLoading(false)
	}

	watch(global[userId].searchValue, () => {
		if (!global[userId].searchValue.value) global[userId].searchMode.value = false
	})

	watch([global[userId].type], async () => {
		global[userId].files.value = []
		await fetchFiles()
		await global[userId].listener.restart()
	})
	onMounted(async () => {
		if (!global[userId].fetched.value && !global[userId].loading.value) await fetchFiles()
		await global[userId].listener.start()
	})
	onUnmounted(async () => {
		await global[userId].listener.close()
	})

	const files = computed(() => global[userId].searchMode.value ? global[userId].searchResults.value : global[userId].files.value)

	return { ...global[userId], files, fetchOlderFiles: fetchFiles, search }
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
				if (global[file.user.id]) global[file.user.id].files.value = global[file.user.id].files.value
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
