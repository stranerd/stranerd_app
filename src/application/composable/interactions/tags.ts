import { computed, onMounted, Ref, ref } from 'vue'
import { TagEntity, TagFactory, TagsUseCases, TagTypes } from '@modules/interactions'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { useInteractionModal } from '@app/composable/core/modals'
import { addToArray } from '@utils/commons'

const store = {
	fetched: ref(false),
	tags: ref([] as TagEntity[]),
	...useErrorHandler(),
	...useLoadingHandler()
}

const fetchTags = async () => {
	await store.setError('')
	await store.setLoading(true)
	try {
		const tags = await TagsUseCases.getAllTags()
		tags.results.forEach((i) => addToArray(store.tags.value, i, (e) => e.id, (e) => e.title, true))
		store.fetched.value = true
	} catch (error) {
		await store.setError(error)
	}
	await store.setLoading(false)
}

export const useTagList = () => {
	onMounted(async () => {
		if (!store.fetched.value && !store.loading.value) await fetchTags()
	})
	const questionTags = computed(() => store.tags.value.filter((tag) => tag.type === TagTypes.questions))
	return { ...store, questionTags }
}

export const useTag = (id: string) => {
	const tag = computed({
		get: () => store.tags.value.find((s) => s.id === id) ?? null,
		set: (i) => {
			if (i) addToArray(store.tags.value, i, (e) => e.id, (e) => e.title, true)
		}
	})
	onMounted(async () => {
		if (!store.fetched.value && !store.loading.value) await fetchTags()
	})

	return { tag }
}

let tagParent = null as TagEntity | null
export const openCreateTagModal = (parent: TagEntity | null) => {
	tagParent = parent
	useInteractionModal().openCreateTag()
}

export const useCreateTag = () => {
	const factory = new TagFactory()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()

	if (tagParent) {
		factory.parent = tagParent.id
		factory.type = tagParent.type
	}
	tagParent = null

	const createTag = async () => {
		await setError('')
		if (factory.valid && !loading.value) {
			await setLoading(true)
			try {
				const tag = await TagsUseCases.add(factory)
				addToArray(store.tags.value, tag, (e) => e.id, (e) => e.title, true)
				factory.reset()
				useInteractionModal().closeCreateTag()
				await setMessage('Tag created successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.validateAll()
	}

	return { factory, loading, error, createTag }
}

let editingTag = null as TagEntity | null
export const openTagEditModal = async (tag: TagEntity) => {
	editingTag = tag
	useInteractionModal().openEditTag()
}

export const useEditTag = () => {
	const factory = new TagFactory()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	if (editingTag) factory.loadEntity(editingTag)
	else useInteractionModal().closeEditTag()

	const editTag = async () => {
		await setError('')
		if (factory.valid && !loading.value) {
			await setLoading(true)
			try {
				const updatedTag = await TagsUseCases.update(editingTag!.id, factory)
				addToArray(store.tags.value, updatedTag, (e) => e.id, (e) => e.title, true)
				factory.reset()
				useInteractionModal().closeEditTag()
				await setMessage('Tag updated successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.validateAll()
	}

	return { factory, loading, error, editTag }
}

export const useDeleteTag = () => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteTag = async (tag: TagEntity) => {
		await setError('')
		const accepted = await Alert({
			message: 'Are you sure you want to delete this tag?',
			confirmButtonText: 'Yes, remove'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await TagsUseCases.delete(tag.id)
				store.tags.value = store.tags.value
					.filter((s) => s.id !== tag.id)
				await setMessage('Tag deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteTag }
}
