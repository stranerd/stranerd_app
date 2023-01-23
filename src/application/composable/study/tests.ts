import { computed, onMounted, onUnmounted, Ref, ref } from 'vue'
import { TestEntity, TestPrepEntity, TestsUseCases, TestType } from '@modules/study'
import { PastQuestionEntity, PastQuestionsUseCases } from '@modules/school'
import { useErrorHandler, useLoadingHandler } from '@app/composable/core/states'
import { useRouter } from 'vue-router'
import { useAuth } from '@app/composable/auth/auth'
import { useRedirectToAuth } from '@app/composable/auth/session'
import { addToArray } from '@utils/commons'
import { useListener } from '@app/composable/core/listener'

const store = {
	tests: ref([] as TestEntity[]),
	fetched: ref(false),
	hasMore: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}
const listener = useListener(async () => {
	return await TestsUseCases.listen({
		created: async (entity) => {
			addToArray(store.tests.value, entity, (e) => e.id, (e) => e.createdAt)
		},
		updated: async (entity) => {
			addToArray(store.tests.value, entity, (e) => e.id, (e) => e.createdAt)
		},
		deleted: async (entity) => {
			const index = store.tests.value.findIndex((q) => q.id === entity.id)
			if (index !== -1) store.tests.value.splice(index, 1)
		}
	})
})

const testStore = {} as Record<string, {
	questions: Ref<PastQuestionEntity[]>
	fetched: Ref<boolean>,
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useTestList = () => {
	const fetchTests = async () => {
		await store.setError('')
		try {
			await store.setLoading(true)
			const tests = await TestsUseCases.get()
			store.hasMore.value = !!tests.pages.next
			tests.results.forEach((t) => addToArray(store.tests.value, t, (e) => e.id, (e) => e.createdAt))
			store.fetched.value = true
		} catch (error) {
			await store.setError(error)
		}
		await store.setLoading(false)
	}

	onMounted(async () => {
		if (!store.fetched.value && !store.loading.value) await fetchTests()
		await listener.start()
	})
	onUnmounted(async () => {
		await listener.close()
	})

	const unCompletedTests = computed({
		get: () => store.tests.value.filter((test) => !test.done),
		set: (tests) => {
			tests.forEach((t) => addToArray(store.tests.value, t, (e) => e.id, (e) => e.createdAt))
		}
	})

	return { ...store, unCompletedTests, fetchOlderTests: fetchTests }
}

export const useCreateTest = () => {
	const { isLoggedIn } = useAuth()
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const router = useRouter()
	const { redirect } = useRedirectToAuth()

	const createTest = async (prep: TestPrepEntity, timed: boolean) => {
		if (!isLoggedIn.value) return await redirect()
		await setError('')
		if (!loading.value) {
			try {
				await setLoading(true)
				const test = await TestsUseCases.add({
					name: prep.name,
					prepId: prep.id,
					data: timed ? { type: TestType.timed, time: prep.time } : { type: TestType.unTimed }
				})
				await router.push(`/study/tests/${test.id}/take`)
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { error, loading, createTest }
}

export const useTest = (testId: string) => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const test = computed({
		get: () => store.tests.value.find((q) => q.id === testId) ?? null,
		set: (q) => {
			if (q) addToArray(store.tests.value, q, (e) => e.id, (e) => e.createdAt)
		}
	})

	const fetchTest = async () => {
		await setError('')
		try {
			await setLoading(true)
			let test = store.tests.value.find((q) => q.id === testId) ?? null
			if (test) {
				await setLoading(false)
				return
			}
			test = await TestsUseCases.find(testId)
			if (test) addToArray(store.tests.value, test, (e) => e.id, (e) => e.createdAt)
		} catch (error) {
			await setError(error)
		}
		await setLoading(false)
	}

	onMounted(async () => {
		await fetchTest()
		await listener.start()
	})
	onUnmounted(async () => {
		await listener.close()
	})

	return { error, loading, test }
}

export const useTestDetails = (test: TestEntity) => {
	if (testStore[test.id] === undefined) testStore[test.id] = {
		questions: ref([]),
		fetched: ref(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchQuestions = async () => {
		await testStore[test.id].setError('')
		try {
			await testStore[test.id].setLoading(true)
			testStore[test.id].questions.value = await PastQuestionsUseCases.getQuestionsInList(test.questions)
			testStore[test.id].fetched.value = true
		} catch (error) {
			await testStore[test.id].setError(error)
		}
		await testStore[test.id].setLoading(false)
	}

	const endTest = async () => {
		await testStore[test.id].setLoading(true)
		if (!test.done) await TestsUseCases.end(test.id)
		await testStore[test.id].setLoading(false)
	}

	const updateAnswer = async (questionId: string, answer: number) => {
		await testStore[test.id].setError('')
		if (test.done) return
		try {
			await testStore[test.id].setLoading(true)
			await TestsUseCases.updateAnswer(test.id, questionId, answer)
		} catch (error) {
			await testStore[test.id].setError(error)
		}
		await testStore[test.id].setLoading(false)
	}

	onMounted(async () => {
		if (!testStore[test.id].fetched.value && !testStore[test.id].loading.value) await fetchQuestions()
	})

	return {
		...testStore[test.id],
		endTest, updateAnswer
	}
}
