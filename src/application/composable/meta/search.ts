import { onMounted, ref, watch } from 'vue'
import { useErrorHandler, useLoadingHandler } from '@app/composable/core/states'
import { Search } from '@modules/meta'
import { AnswerEntity, QuestionEntity } from '@modules/questions'
import { UserEntity } from '@modules/users'
import { useRoute, useRouter } from 'vue-router'
import { FlashCardEntity, NoteEntity, SetEntity, TestPrepEntity, VideoEntity } from '@modules/study'

const global = {
	searchTerm: ref(''),
	questions: ref([] as QuestionEntity[]),
	answers: ref([] as AnswerEntity[]),
	users: ref([] as UserEntity[]),
	videos: ref([] as VideoEntity[]),
	notes: ref([] as NoteEntity[]),
	flashCards: ref([] as FlashCardEntity[]),
	testPreps: ref([] as TestPrepEntity[]),
	sets: ref([] as SetEntity[]),
	fetched: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}

const search = async () => {
	const val = global.searchTerm.value.trim()
	await global.setError('')
	try {
		// await global.setLoading(true)
		const res = await Search.call(val)
		global.questions.value = res.questions.results
		global.answers.value = res.answers.results
		global.users.value = res.users.results
		global.videos.value = res.videos.results
		global.notes.value = res.notes.results
		global.flashCards.value = res.flashCards.results
		global.testPreps.value = res.testPreps.results
		global.sets.value = res.sets.results
		global.fetched.value = true
	} catch (e) {
		await global.setError(e)
	}
	await global.setLoading(false)
}

export const useSearch = () => {
	const router = useRouter()
	const route = useRoute()

	global.searchTerm.value = route.query.search as string ?? ''

	const navigateToSearch = async () => {
		const val = global.searchTerm.value.trim()
		if (!route.path.startsWith('/search')) await router.push(`/search?search=${val}`)
	}

	watch(() => global.searchTerm.value, async () => {
		await navigateToSearch()
		await search()
	})

	onMounted(async () => {
		const val = global.searchTerm.value.trim()
		if (route.path.startsWith('/explore') && val) global.searchTerm.value = ''
		if (!global.fetched.value && !global.loading.value) await search()
	})

	return { ...global, navigateToSearch, search }
}
