import { computed, onMounted, Ref, ref } from 'vue'
import { TagEntity, TagFactory, TagsUseCases, TagTypes } from '@modules/interactions'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { Alert } from '@utils/dialog'
import { useInteractionModal } from '@app/composable/core/modals'
import { addToArray } from '@utils/commons'

const global = {
	fetched: ref(false),
	tags: ref([] as TagEntity[]),
	...useErrorHandler(),
	...useLoadingHandler()
}

const fetchTags = async () => {
	await global.setError('')
	await global.setLoading(true)
	try {
		const tags = await TagsUseCases.getAllTags()
		tags.results.forEach((i) => addToArray(global.tags.value, i, (e) => e.id, (e) => e.title, true))
		global.fetched.value = true
	} catch (error) {
		await global.setError(error)
	}
	await global.setLoading(false)
}

export const useTagList = () => {
	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchTags()
	})
	const questionTags = computed(() => global.tags.value.filter((tag) => tag.type === TagTypes.questions))
	const departmentTags = computed(() => global.tags.value.filter((tag) => tag.type === TagTypes.departments))
	return { ...global, questionTags, departmentTags }
}

export const useTag = (id: string) => {
	const tag = computed({
		get: () => global.tags.value.find((s) => s.id === id) ?? null,
		set: (i) => {
			if (i) addToArray(global.tags.value, i, (e) => e.id, (e) => e.title, true)
		}
	})
	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchTags()
	})

	return { tag }
}

let tagParent = null as TagEntity | null
export const openCreateTagModal = (parent: TagEntity | null) => {
	tagParent = parent
	useInteractionModal().openCreateTag()
}

export const useCreateTag = () => {
	const factory = ref(new TagFactory()) as Ref<TagFactory>
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()

	if (tagParent) {
		factory.value.parent = tagParent.id
		factory.value.type = tagParent.type
	}
	tagParent = null

	const createTag = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			await setLoading(true)
			try {
				const tag = await TagsUseCases.add(factory.value)
				addToArray(global.tags.value, tag, (e) => e.id, (e) => e.title, true)
				factory.value.reset()
				useInteractionModal().closeCreateTag()
				await setMessage('Tag created successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return { factory, loading, error, createTag }
}

let editingTag = null as TagEntity | null
export const openTagEditModal = async (tag: TagEntity) => {
	editingTag = tag
	useInteractionModal().openEditTag()
}

export const useEditTag = () => {
	const factory = ref(new TagFactory()) as Ref<TagFactory>
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	if (editingTag) factory.value.loadEntity(editingTag)
	else useInteractionModal().closeEditTag()

	const editTag = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			await setLoading(true)
			try {
				const updatedTag = await TagsUseCases.update(editingTag!.id, factory.value)
				addToArray(global.tags.value, updatedTag, (e) => e.id, (e) => e.title, true)
				factory.value.reset()
				useInteractionModal().closeEditTag()
				await setMessage('Tag updated successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
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
				global.tags.value = global.tags.value
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
