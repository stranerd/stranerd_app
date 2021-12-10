import { computed, onMounted, Ref, ref } from 'vue'
import {
	AddTest,
	EndTest,
	FindTest,
	GetTestQuestions,
	GetTests,
	ListenToTest,
	ListenToTests,
	PastQuestionEntity,
	TestEntity,
	TestPrepEntity,
	TestType,
	UpdateTestAnswer
} from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { useRouter } from 'vue-router'
import { useAuth } from '@app/composable/auth/auth'
import { useRedirectToAuth } from '@app/composable/auth/session'

const global = {
	tests: ref([] as TestEntity[]),
	fetched: ref(false),
	hasMore: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}

const testGlobal = {} as Record<string, {
	questions: Ref<PastQuestionEntity[]>
	fetched: Ref<boolean>
} & ReturnType<typeof useErrorHandler> & ReturnType<typeof useLoadingHandler>>

const pushToTestList = (test: TestEntity) => {
	const index = global.tests.value.findIndex((q) => q.id === test.id)
	if (index !== -1) global.tests.value.splice(index, 1, test)
	else global.tests.value.push(test)
}
const unshiftToTestList = (test: TestEntity) => {
	const index = global.tests.value.findIndex((q) => q.id === test.id)
	if (index !== -1) global.tests.value.splice(index, 1, test)
	else global.tests.value.unshift(test)
}

export const useTestList = () => {
	const fetchTests = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			const tests = await GetTests.call()
			global.hasMore.value = !!tests.pages.next
			tests.results.forEach(pushToTestList)
			global.fetched.value = true
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}
	const listener = useListener(async () => {
		return await ListenToTests.call({
			created: async (entity) => {
				unshiftToTestList(entity)
			},
			updated: async (entity) => {
				unshiftToTestList(entity)
			},
			deleted: async (entity) => {
				const index = global.tests.value.findIndex((q) => q.id === entity.id)
				if (index !== -1) global.tests.value.splice(index, 1)
			}
		})
	})

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchTests()
	})

	const unCompletedTests = computed({
		get: () => global.tests.value.filter((test) => !test.done && test.progress !== 100),
		set: (tests) => {
			tests.forEach(pushToTestList)
		}
	})

	return {
		...global, listener, unCompletedTests,
		fetchOlderTests: fetchTests
	}
}

export const useCreateTest = () => {
	const { isLoggedIn } = useAuth()
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()
	const router = useRouter()
	const { redirect } = useRedirectToAuth()

	const createTest = async (prep: TestPrepEntity, timed: boolean) => {
		if (!isLoggedIn.value) return await redirect()
		await setError('')
		if (!loading.value) {
			try {
				await setLoading(true)
				const testId = await AddTest.call({
					name: prep.name,
					prepId: prep.id,
					data: timed ? { type: TestType.timed, time: prep.time } : { type: TestType.unTimed }
				})
				await setMessage('Test created successfully')
				await router.push(`/study/tests/${testId}`)
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
			if (q) pushToTestList(q)
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
			test = await FindTest.call(testId)
			if (test) unshiftToTestList(test)
		} catch (error) {
			await setError(error)
		}
		await setLoading(false)
	}
	const listener = useListener(async () => {
		return await ListenToTest.call(testId, {
			created: async (entity) => {
				unshiftToTestList(entity)
			},
			updated: async (entity) => {
				unshiftToTestList(entity)
			},
			deleted: async (entity) => {
				const index = global.tests.value.findIndex((q) => q.id === entity.id)
				if (index !== -1) global.tests.value.splice(index, 1)
			}
		})
	})

	onMounted(fetchTest)

	return { error, loading, test, listener }
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
			testGlobal[test.id].questions.value = await GetTestQuestions.call(test.questions)
			testGlobal[test.id].fetched.value = true
		} catch (error) {
			await testGlobal[test.id].setError(error)
		}
		await testGlobal[test.id].setLoading(false)
	}

	const endTest = async () => {
		if (!test.done) await EndTest.call(test.id)
	}

	const updateAnswer = async (questionId: string, answer: number) => {
		await UpdateTestAnswer.call(test.id, questionId, answer)
	}

	onMounted(async () => {
		if (!testGlobal[test.id].fetched.value && !testGlobal[test.id].loading.value) await fetchQuestions()
	})

	return {
		error: testGlobal[test.id].error,
		loading: testGlobal[test.id].loading,
		questions: testGlobal[test.id].questions,
		endTest, updateAnswer
	}
}
