import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useErrorHandler, useLoadingHandler } from '@app/composable/core/states'
import { QuestionEntity, QuestionsUseCases } from '@modules/questions'
import { UserEntity, UsersUseCases } from '@modules/users'
import { useRouter } from 'vue-router'
import { FlashCardEntity, FlashCardsUseCases, NoteEntity, NotesUseCases } from '@modules/study'
import { storage } from '@utils/storage'
import { ClassEntity, ClassesUseCases } from '@modules/classes'

const store = {
	searchTerm: ref(''),
	searched: ref(false),
	tab: ref(0),
	results: reactive({
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
		store.recent.value = recent
		return recent
	}

	const saveSearch = async (val: string) => {
		let searches = await getRecentSearches()
		searches.unshift(val)
		searches = [...new Set(searches)].slice(0, 10)
		store.recent.value = searches
		await storage.set(SEARCH_STORAGE_KEY, JSON.stringify(searches))
	}

	const clearFromRecent = async (val: string) => {
		const searches = store.recent.value.filter((r) => r !== val)
		store.recent.value = searches
		await storage.set(SEARCH_STORAGE_KEY, JSON.stringify(searches))
	}

	const navigateToSearch = async () => {
		await router.push('/search/results')
	}

	const search = async () => {
		const val = store.searchTerm.value.trim()
		if (val) {
			await navigateToSearch()
			await store.setError('')
			try {
				await store.setLoading(true)
				await Promise.all(
					Object.entries(searchObj).map(async (s) => {
						// @ts-ignore
						store.results[s[0]] = await s[1].search(val)
					})
				)
				store.searched.value = true
				await saveSearch(val)
			} catch (e) {
				await store.setError(e)
			}
			await store.setLoading(false)
		} else {
			Object.keys(store.results).forEach((key) => {
				store.results[key] = []
			})
			store.searched.value = false
		}
	}

	watch(store.searchTerm, () => {
		if (!store.searchTerm.value) store.searched.value = false
	})

	const searchCount = computed(() => Object.values(store.results).map((val) => val.length).reduce((acc, cur) => acc + cur, 0))

	onMounted(async () => {
		await getRecentSearches()
	})

	return {
		...store, searchCount, search, clearFromRecent, navigateToSearch
	}
}
