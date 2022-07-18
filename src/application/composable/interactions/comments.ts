import { onMounted, onUnmounted, ref, Ref } from 'vue'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { addToArray } from '@utils/commons'
import { CommentEntity, CommentFactory, CommentsUseCases, InteractionEntities } from '@modules/interactions'
import { useInteractionModal } from '@app/composable/core/modals'

const global = {} as Record<string, {
	comments: Ref<CommentEntity[]>
	fetched: Ref<boolean>
	listener: ReturnType<typeof useListener>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useCommentsList = (id: string, type: InteractionEntities) => {
	if (global[id] === undefined) {
		const listener = useListener(async () => {
			return await CommentsUseCases.listen({ id, type }, {
				created: async (entity) => {
					addToArray(global[id].comments.value, entity, (e) => e.id, (e) => e.createdAt, true)
				},
				updated: async (entity) => {
					addToArray(global[id].comments.value, entity, (e) => e.id, (e) => e.createdAt, true)
				},
				deleted: async (entity) => {
					global[id].comments.value = global[id].comments.value.filter((c) => c.id !== entity.id)
				}
			})
		})
		global[id] = {
			comments: ref([]),
			fetched: ref(false),
			listener,
			...useErrorHandler(),
			...useLoadingHandler()
		}
	}

	const fetchComments = async () => {
		await global[id].setError('')
		try {
			await global[id].setLoading(true)
			const comments = await CommentsUseCases.get({ id, type })
			comments.results.forEach((c) => addToArray(global[id].comments.value, c, (e) => e.id, (e) => e.createdAt, true))
			global[id].fetched.value = true
		} catch (error) {
			await global[id].setError(error)
		}
		await global[id].setLoading(false)
	}

	onMounted(async () => {
		if (!global[id].fetched.value && !global[id].loading.value) await fetchComments()
		await global[id].listener.start()
	})
	onUnmounted(async () => {
		await global[id].listener.close()
	})

	return {
		error: global[id].error,
		loading: global[id].loading,
		comments: global[id].comments
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
