import { computed, onMounted, onUnmounted, Ref, ref } from 'vue'
import {
	AddTest,
	EndTest,
	FindTest,
	GetTestQuestions,
	GetTests,
	ListenToTests,
	PastQuestionEntity,
	TestEntity,
	TestPrepEntity,
	TestType,
	UpdateTestAnswer
} from '@modules/study'
import { useErrorHandler, useListener, useLoadingHandler } from '@app/composable/core/states'
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

const testGlobal = {} as Record<string, {
	questions: Ref<PastQuestionEntity[]>
	fetched: Ref<boolean>,
	tab: Ref<'list' | 'single'>,
	questionIndex: Ref<number>,
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

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchTests()
		await listener.startListener()
	})
	onUnmounted(async () => {
		await listener.closeListener()
	})

	const unCompletedTests = computed({
		get: () => global.tests.value.filter((test) => !test.done && test.progress !== 100),
		set: (tests) => {
			tests.forEach(pushToTestList)
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
				const testId = await AddTest.call({
					name: prep.name,
					prepId: prep.id,
					data: timed ? { type: TestType.timed, time: prep.time } : { type: TestType.unTimed }
				})
				await router.push(`/study/tests/${testId}/take`)
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

	onMounted(async () => {
		await fetchTest()
		await listener.startListener()
	})
	onUnmounted(async () => {
		await listener.closeListener()
	})

	return { error, loading, test }
}

export const useTestDetails = (test: TestEntity) => {
	if (testGlobal[test.id] === undefined) testGlobal[test.id] = {
		questions: ref([]),
		fetched: ref(false),
		tab: ref('list'),
		questionIndex: ref(0),
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
		await testGlobal[test.id].setLoading(true)
		if (!test.done) await EndTest.call(test.id)
		await testGlobal[test.id].setLoading(false)
	}

	const updateAnswer = async (questionId: string, answer: number) => {
		await testGlobal[test.id].setError('')
		if (test.done) return
		try {
			await testGlobal[test.id].setLoading(true)
			await UpdateTestAnswer.call(test.id, questionId, answer)
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
