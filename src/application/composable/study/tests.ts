import { onMounted, Ref, ref } from 'vue'
import {
	AddTest,
	EndTest,
	GetTestQuestions,
	GetTests,
	ListenToTest,
	ListenToTests,
	PastQuestionEntity,
	TestEntity,
	TestType,
	UpdateTestAnswer
} from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'

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

	return {
		...global, listener,
		fetchOlderTests: fetchTests
	}
}

export const useCreateTest = (prepId: string) => {
	const { error, setError } = useErrorHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { setMessage } = useSuccessHandler()

	const createTest = async (timed: boolean) => {
		await setError('')
		if (!loading.value) {
			try {
				await setLoading(true)
				await AddTest.call(prepId, timed ? TestType.timed : TestType.unTimed)
				await setMessage('Test created successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { error, loading, createTest }
}

export const useTest = (test: TestEntity) => {
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

	const listener = useListener(async () => {
		return await ListenToTest.call(test.id, {
			created: async (entity) => {
				pushToTestList(entity)
				test = entity
			},
			updated: async (entity) => {
				pushToTestList(entity)
				test = entity
			},
			deleted: async (entity) => {
				const index = global.tests.value.findIndex((q) => q.id === entity.id)
				if (index !== -1) global.tests.value.splice(index, 1)
			}
		})
	})

	onMounted(async () => {
		if (!testGlobal[test.id].fetched.value && !testGlobal[test.id].loading.value) await fetchQuestions()
	})

	return {
		error: testGlobal[test.id].error,
		loading: testGlobal[test.id].loading,
		questions: testGlobal[test.id].questions,
		listener, endTest, updateAnswer
	}
}
