import { computed, onMounted, ref } from 'vue'
import { useErrorHandler, useLoadingHandler } from '@app/composable/core/states'
import { QuestionEntity, QuestionsUseCases } from '@modules/questions'
import { UserEntity, UsersUseCases } from '@modules/users'
import { useRoute, useRouter } from 'vue-router'
import { FlashCardEntity, FlashCardsUseCases, NoteEntity, NotesUseCases } from '@modules/study'
import { storage } from '@utils/storage'
import { ClassEntity, ClassesUseCases } from '@modules/classes'

const global = {
	searchTerm: ref(''),
	fetched: ref(false),
	res: {
		questions: ref([] as QuestionEntity[]),
		users: ref([] as UserEntity[]),
		classes: ref([] as ClassEntity[]),
		notes: ref([] as NoteEntity[]),
		flashCards: ref([] as FlashCardEntity[])
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
		await router.push({
			path: route.path.startsWith('/search') ? route.path : '/search',
			query: { search: val }
		})
	}

	const search = async () => {
		const val = global.searchTerm.value.trim()
		if (val) {
			await navigateToSearch()
			await global.setError('')
			try {
				await global.setLoading(true)
				const searchObj = {
					questions: QuestionsUseCases, users: UsersUseCases, classes: ClassesUseCases,
					flashCards: FlashCardsUseCases, notes: NotesUseCases
				}
				await Promise.all(
					Object.entries(searchObj).map(async (s) => {
						global.res[s[0]].value = await s[1].search(val)
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
				global.res[key].value = []
			})
			global.fetched.value = false
		}
	}

	const count = computed(() => Object.values(global.res).map((val) => val.value.length).reduce((acc, cur) => acc + cur, 0))

	onMounted(async () => {
		await getRecentSearches()
	})

	return { ...global, ...global.res, count, search, clearFromRecent }
}
