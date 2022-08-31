import { computed, onMounted, onUnmounted, Ref, ref } from 'vue'
import { TestEntity, TestPrepEntity, TestsUseCases, TestType } from '@modules/study'
import { PastQuestionEntity, PastQuestionsUseCases } from '@modules/school'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
import { useRouter } from 'vue-router'
import { useAuth } from '@app/composable/auth/auth'
import { useRedirectToAuth } from '@app/composable/auth/session'
import { addToArray } from '@utils/commons'

const global = {
	tests: ref([] as TestEntity[]),
	fetched: ref(false),
	hasMore: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}
const listener = useListener(async () => {
	return await TestsUseCases.listen({
		created: async (entity) => {
			addToArray(global.tests.value, entity, (e) => e.id, (e) => e.createdAt)
		},
		updated: async (entity) => {
			addToArray(global.tests.value, entity, (e) => e.id, (e) => e.createdAt)
		},
		deleted: async (entity) => {
			const index = global.tests.value.findIndex((q) => q.id === entity.id)
			if (index !== -1) global.tests.value.splice(index, 1)
		}
	})
})

const testGlobal = {} as Record<string, {
	questions: Ref<PastQuestionEntity[]>
	fetched: Ref<boolean>,
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

export const useTestList = () => {
	const fetchTests = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			const tests = await TestsUseCases.get()
			global.hasMore.value = !!tests.pages.next
			tests.results.forEach((t) => addToArray(global.tests.value, t, (e) => e.id, (e) => e.createdAt))
			global.fetched.value = true
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchTests()
		await listener.start()
	})
	onUnmounted(async () => {
		await listener.close()
	})

	const unCompletedTests = computed({
		get: () => global.tests.value.filter((test) => !test.done),
		set: (tests) => {
			tests.forEach((t) => addToArray(global.tests.value, t, (e) => e.id, (e) => e.createdAt))
		}
	})

	return { ...global, unCompletedTests, fetchOlderTests: fetchTests }
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
		get: () => global.tests.value.find((q) => q.id === testId) ?? null,
		set: (q) => {
			if (q) addToArray(global.tests.value, q, (e) => e.id, (e) => e.createdAt)
		}
	})

	const fetchTest = async () => {
		await setError('')
		try {
			await setLoading(true)
			let test = global.tests.value.find((q) => q.id === testId) ?? null
			if (test) {
				await setLoading(false)
				return
			}
			test = await TestsUseCases.find(testId)
			if (test) addToArray(global.tests.value, test, (e) => e.id, (e) => e.createdAt)
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
	if (testGlobal[test.id] === undefined) testGlobal[test.id] = {
		questions: ref([]),
		fetched: ref(false),
		...useErrorHandler(),
		...useLoadingHandler()
	}

	const fetchQuestions = async () => {
		await testGlobal[test.id].setError('')
		try {
			await testGlobal[test.id].setLoading(true)
			testGlobal[test.id].questions.value = await PastQuestionsUseCases.getQuestionsInList(test.questions)
			testGlobal[test.id].fetched.value = true
		} catch (error) {
			await testGlobal[test.id].setError(error)
		}
		await testGlobal[test.id].setLoading(false)
	}

	const endTest = async () => {
		await testGlobal[test.id].setLoading(true)
		if (!test.done) await TestsUseCases.end(test.id)
		await testGlobal[test.id].setLoading(false)
	}

	const updateAnswer = async (questionId: string, answer: number) => {
		await testGlobal[test.id].setError('')
		if (test.done) return
		try {
			await testGlobal[test.id].setLoading(true)
			await TestsUseCases.updateAnswer(test.id, questionId, answer)
		} catch (error) {
			await testGlobal[test.id].setError(error)
		}
		await testGlobal[test.id].setLoading(false)
	}

	onMounted(async () => {
		if (!testGlobal[test.id].fetched.value && !testGlobal[test.id].loading.value) await fetchQuestions()
	})

	return {
		...testGlobal[test.id],
		endTest, updateAnswer
	}
}
