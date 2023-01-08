import { onMounted, onUnmounted, ref, Ref } from 'vue'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { addToArray } from '@utils/commons'
import { CommentEntity, CommentFactory, CommentsUseCases, InteractionEntities } from '@modules/interactions'
import { useInteractionModal } from '@app/composable/core/modals'
import { useListener } from '@app/composable/core/listener'

const store = {} as Record<string, {
	comments: Ref<CommentEntity[]>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const commentStore = {} as Record<string, {
	comment: Ref<CommentEntity | null>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useCommentsList = (id: string, type: InteractionEntities) => {
	if (store[id] === undefined) {
		const listener = useListener(async () => {
			return await CommentsUseCases.listen({ id, type }, {
				created: async (entity) => {
					addToArray(store[id].comments.value, entity, (e) => e.id, (e) => e.createdAt, true)
				},
				updated: async (entity) => {
					addToArray(store[id].comments.value, entity, (e) => e.id, (e) => e.createdAt, true)
				},
				deleted: async (entity) => {
					store[id].comments.value = store[id].comments.value.filter((c) => c.id !== entity.id)
				}
			})
		})
		store[id] = {
			comments: ref([]),
			fetched: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchComments = async () => {
		await store[id].setError('')
		try {
			await store[id].setLoading(true)
			const comments = await CommentsUseCases.get({ id, type })
			comments.results.forEach((c) => addToArray(store[id].comments.value, c, (e) => e.id, (e) => e.createdAt, true))
			store[id].fetched.value = true
		} catch (error) {
			await store[id].setError(error)
		}
		await store[id].setLoading(false)
	}

	onMounted(async () => {
		if (!store[id].fetched.value && !store[id].loading.value) await fetchComments()
		await store[id].listener.start()
	})
	onUnmounted(async () => {
		await store[id].listener.close()
	})

	return {
		error: store[id].error,
		loading: store[id].loading,
		comments: store[id].comments
	}
}

export const useCommentsById = (id: string) => {
	if (commentStore[id] === undefined) {
		const listener = useListener(async () => {
			return await CommentsUseCases.listenToOne(id, {
				created: async (entity) => {
					commentStore[id].comment.value = entity
				},
				updated: async (entity) => {
					commentStore[id].comment.value = entity
				},
				deleted: async (entity) => {
					commentStore[id].comment.value = entity
				}
			})
		})
		commentStore[id] = {
			comment: ref(null),
			fetched: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchComment = async () => {
		await commentStore[id].setError('')
		try {
			await commentStore[id].setLoading(true)
			commentStore[id].comment.value = await CommentsUseCases.find(id)
			commentStore[id].fetched.value = true
		} catch (error) {
			await commentStore[id].setError(error)
		}
		await commentStore[id].setLoading(false)
	}

	onMounted(async () => {
		if (!commentStore[id].fetched.value && !commentStore[id].loading.value) await fetchComment()
		await commentStore[id].listener.start()
	})
	onUnmounted(async () => {
		await commentStore[id].listener.close()
	})

	return {
		error: commentStore[id].error,
		loading: commentStore[id].loading,
		comment: commentStore[id].comment
	}
}

let commentEntity = null as { id: string, type: InteractionEntities } | null
export const getCommentEntity = () => commentEntity
export const openCreateCommentModal = async (entity: { id: string, type: InteractionEntities }) => {
	commentEntity = entity
	useInteractionModal().openCreateComment()
}

export const useCreateComment = (id: string, type: InteractionEntities) => {
	const factory = ref(new CommentFactory()) as Ref<CommentFactory>
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { message, setMessage } = useSuccessHandler()

	if (!commentEntity) useInteractionModal().closeCreateComment()

	const createComment = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				await CommentsUseCases.add({ id, type }, factory.value)
				factory.value.reset()
				useInteractionModal().closeCreateComment()
				await setMessage('Comment posted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { factory, error, message, loading, createComment }
}
