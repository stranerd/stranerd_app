import { ref } from 'vue'
import { useErrorHandler, useLoadingHandler } from '@app/composable/core/states'
import { Search } from '@modules/meta'
import { AnswerEntity, QuestionEntity } from '@modules/questions'
import { UserEntity } from '@modules/users'
import { useRoute, useRouter } from 'vue-router'
import { FlashCardEntity, NoteEntity, SetEntity, TestPrepEntity, VideoEntity } from '@modules/study'

const global = {
	count: ref(0),
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

export const useSearch = () => {
	const router = useRouter()
	const route = useRoute()

	global.searchTerm.value = route.query.search as string ?? ''
	if (!global.searchTerm.value) global.fetched.value = false

	const navigateToSearch = async () => {
		const val = global.searchTerm.value.trim()
		if (!route.path.startsWith('/search')) await router.push(`/search?search=${val}`)
	}

	const search = async () => {
		const val = global.searchTerm.value.trim()
		await navigateToSearch()
		await global.setError('')
		try {
			await global.setLoading(true)
			const res = await Search.call(val)
			global.questions.value = res.questions.results
			global.answers.value = res.answers.results
			global.users.value = res.users.results
			global.videos.value = res.videos.results
			global.notes.value = res.notes.results
			global.flashCards.value = res.flashCards.results
			global.testPreps.value = res.testPreps.results
			global.sets.value = res.sets.results
			global.count.value = Object.values(res).map((key) => key.results.length).reduce((acc, cur) => acc + cur, 0) - res.answers.results.length
			global.fetched.value = true
		} catch (e) {
			await global.setError(e)
		}
		await global.setLoading(false)
	}

	return { ...global, search }
}
