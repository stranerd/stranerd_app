import { computed, onMounted, reactive, ref } from 'vue'
import { useErrorHandler, useLoadingHandler } from '@app/composable/core/states'
import { QuestionEntity, QuestionsUseCases } from '@modules/questions'
import { UserEntity, UsersUseCases } from '@modules/users'
import { useRouter } from 'vue-router'
import { FlashCardEntity, FlashCardsUseCases, NoteEntity, NotesUseCases } from '@modules/study'
import { storage } from '@utils/storage'
import { ClassEntity, ClassesUseCases } from '@modules/classes'

const global = {
	searchTerm: ref(''),
	fetched: ref(false),
	searched: ref(false),
	tab: ref(0),
	results: reactive({
		questions: [] as QuestionEntity[],
		users: [] as UserEntity[],
		classes: [] as ClassEntity[],
		notes: [] as NoteEntity[],
		flashCards: [] as FlashCardEntity[]
	}),
	explore: reactive({
		questions: [] as QuestionEntity[],
		users: [] as UserEntity[],
		classes: [] as ClassEntity[],
		notes: [] as NoteEntity[],
		flashCards: [] as FlashCardEntity[]
	}),
	recent: ref([] as string[]),
	...useErrorHandler(),
	...useLoadingHandler()
}

const searchObj = {
	questions: QuestionsUseCases, users: UsersUseCases, classes: ClassesUseCases,
	flashCards: FlashCardsUseCases, notes: NotesUseCases
}

const SEARCH_STORAGE_KEY = 'recent_searches'

export const useSearch = () => {
	const router = useRouter()

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
		await router.push('/search/results')
	}

	const search = async () => {
		const val = global.searchTerm.value.trim()
		if (val) {
			await navigateToSearch()
			await global.setError('')
			try {
				await global.setLoading(true)
				await Promise.all(
					Object.entries(searchObj).map(async (s) => {
						// @ts-ignore
						global.results[s[0]] = await s[1].search(val)
					})
				)
				global.searched.value = true
				await saveSearch(val)
			} catch (e) {
				await global.setError(e)
			}
			await global.setLoading(false)
		} else {
			Object.keys(global.results).forEach((key) => {
				global.results[key] = []
			})
			global.searched.value = false
		}
	}

	const fetchExplore = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			await Promise.all(
				Object.entries(searchObj).map(async (s) => {
					// @ts-ignore
					global.explore[s[0]] = await s[1].searchExplore()
				})
			)
			global.fetched.value = true
		} catch (e) {
			await global.setError(e)
		}
		await global.setLoading(false)
	}

	const searchCount = computed(() => Object.values(global.results).map((val) => val.length).reduce((acc, cur) => acc + cur, 0))
	const exploreCount = computed(() => Object.values(global.explore).map((val) => val.length).reduce((acc, cur) => acc + cur, 0))

	onMounted(async () => {
		await getRecentSearches()
	})

	return {
		...global, searchCount, exploreCount,
		search, fetchExplore, clearFromRecent, navigateToSearch
	}
}
