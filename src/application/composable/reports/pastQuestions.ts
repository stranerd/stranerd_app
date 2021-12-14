import { ref, Ref } from 'vue'
import { AddReport, ReportFactory, ReportType } from '@modules/reports'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { PastQuestionEntity } from '@modules/study'

export const useCreateReport = () => {
	const factory = ref(new ReportFactory()) as Ref<ReportFactory>
	const { message, setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	factory.value.type = ReportType.pastQuestions

	const createReport = async (question: PastQuestionEntity) => {
		await setError('')
		factory.value.reportedId = question.id
		factory.value.message = 'Flagged'
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				await AddReport.call(factory.value)
				factory.value.reset()
				await setMessage('Flagged successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.value.validateAll()
	}

	return {
		factory, error, loading, message,
		createReport
	}
}
