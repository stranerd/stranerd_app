import { ref, onMounted } from 'vue'
import { GetTags, TagEntity } from '@/modules/questions'
import { useErrorHandler, useLoadingHandler } from '@/application/composable/core/states'

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
		global.tags.value = (await GetTags.call()).results
		global.fetched.value = true
	} catch (error) {
		await global.setError(error)
	}
	await global.setLoading(false)
}

export const useTagsList = () => {
	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchTags()
	})

	return { ...global }
}
