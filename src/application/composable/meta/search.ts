import { computed, onMounted, ref } from 'vue'
import { useErrorHandler, useLoadingHandler } from '@app/composable/core/states'
import { AnswerEntity, QuestionEntity, SearchQuestions } from '@modules/questions'
import { SearchUsers, UserEntity } from '@modules/users'
import { useRoute, useRouter } from 'vue-router'
import {
	FlashCardEntity,
	NoteEntity,
	SearchFlashCards,
	SearchNotes,
	SearchSets,
	SearchTestPreps,
	SearchVideos,
	SetEntity,
	TestPrepEntity,
	VideoEntity
} from '@modules/study'
import { storage } from '@utils/storage'

const global = {
	searchTerm: ref(''),
	fetched: ref(false),
	res: {
		questions: ref([] as QuestionEntity[]),
		answers: ref([] as AnswerEntity[]),
		users: ref([] as UserEntity[]),
		videos: ref([] as VideoEntity[]),
		notes: ref([] as NoteEntity[]),
		flashCards: ref([] as FlashCardEntity[]),
		testPreps: ref([] as TestPrepEntity[]),
		sets: ref([] as SetEntity[])
	},
	recent: ref([] as string[]),
	...useErrorHandler(),
	...useLoadingHandler()
}

const SEARCH_STORAGE_KEY = 'recent_searches'

export const useSearch = () => {
	const router = useRouter()
	const route = useRoute()

	global.searchTerm.value = route.query.search as string ?? ''
	if (!global.searchTerm.value) global.fetched.value = false

	const getRecentSearches = async () => {
		const searches = await storage.get(SEARCH_STORAGE_KEY) ?? '[]'
		const recent = JSON.parse(searches) as string[]
		global.recent.value = recent
		return recent
	}

	const saveSearch = async (val: string) => {
		let searches = await getRecentSearches()
		searches.unshift(val)
		searches = [...new Set(searches)].slice(0, 10)
		global.recent.value = searches
		await storage.set(SEARCH_STORAGE_KEY, JSON.stringify(searches))
	}

	const clearFromRecent = async (val: string) => {
		const searches = global.recent.value.filter((r) => r !== val)
		global.recent.value = searches
		await storage.set(SEARCH_STORAGE_KEY, JSON.stringify(searches))
	}

	const navigateToSearch = async () => {
		const val = global.searchTerm.value.trim()
		if (!route.path.startsWith('/search')) await router.push(`/search?search=${val}`)
	}

	const search = async () => {
		const val = global.searchTerm.value.trim()
		if (val) {
			await navigateToSearch()
			await global.setError('')
			try {
				await global.setLoading(true)
				const searchObj = {
					questions: SearchQuestions, users: SearchUsers,
					flashCards: SearchFlashCards, sets: SearchSets, testPreps: SearchTestPreps,
					notes: SearchNotes, videos: SearchVideos
				}
				await Promise.all(
					Object.entries(searchObj).map(async ([key, useCase]) => {
						//@ts-ignore
						global.res[key].value = await useCase.call(val)
					})
				)
				global.fetched.value = true
				await saveSearch(val)
			} catch (e) {
				await global.setError(e)
			}
			await global.setLoading(false)
		} else {
			Object.keys(global.res).forEach((key) => {
				//@ts-ignore
				global.res[key].value = []
			})
			global.fetched.value = false
		}
	}

	const count = computed(() => {
		return Object.values(global.res).map((val) => val.value.length)
			.reduce((acc, cur) => acc + cur, 0) - global.res.answers.value.length
	})

	onMounted(async () => {
		await getRecentSearches()
	})

	return { ...global, ...global.res, count, search, clearFromRecent }
}
