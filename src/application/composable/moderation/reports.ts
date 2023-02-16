import { useModerationModal } from '@app/composable/core/modals'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { ReportEntity, ReportFactory, ReportsUseCases, ReportType } from '@modules/moderation'
import { addToArray } from '@utils/commons'
import { Alert } from '@utils/dialog'
import { onMounted, ref } from 'vue'

let reportedEntity = null as { type: ReportType, id: string } | null
export const openCreateReportModal = (type: ReportType, id: string) => {
	reportedEntity = { type, id }
	useModerationModal().openCreateReport()
}

export const useCreateReport = () => {
	const factory = new ReportFactory(reportedEntity?.type ?? ReportType.users, reportedEntity?.id ?? '')
	const { message, setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	if (!reportedEntity) useModerationModal().closeCreateReport()
	else {
		factory.type = reportedEntity.type
		factory.id = reportedEntity.id
	}

	const createReport = async () => {
		await setError('')
		if (factory.valid && !loading.value) {
			try {
				await setLoading(true)
				await ReportsUseCases.add(factory)
				useModerationModal().closeAll()
				factory.reset()
				await setMessage('Reported successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		} else factory.validateAll()
	}

	return {
		factory, error, loading, message,
		createReport
	}
}

const store = {
	reports: ref([] as ReportEntity[]),
	fetched: ref(false),
	hasMore: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}

export const useReportsList = () => {
	const fetchReports = async () => {
		await store.setError('')
		try {
			await store.setLoading(true)
			const lastDate = store.reports.value[0]?.createdAt
			const reports = await ReportsUseCases.get(lastDate)
			store.hasMore.value = !!reports.pages.next
			reports.results.forEach((r) => addToArray(store.reports.value, r, (e) => e.id, (e) => e.createdAt))
			store.fetched.value = true
		} catch (error) {
			await store.setError(error)
		}
		await store.setLoading(false)
	}

	onMounted(async () => {
		if (!store.fetched.value && !store.loading.value) await fetchReports()
	})

	return { ...store, fetchOlderReports: fetchReports }
}

export const useDeleteReport = (id: string) => {
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	const { setMessage } = useSuccessHandler()

	const deleteReport = async () => {
		await setError('')
		const accepted = await Alert({
			message: 'Are you sure you want  to delete this report?',
			confirmButtonText: 'Yes, remove'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await ReportsUseCases.delete(id)
				store.reports.value = store.reports.value
					.filter((r) => r.id !== id)
				await setMessage('Report deleted successfully')
			} catch (error) {
				await setError(error)
			}
			await setLoading(false)
		}
	}

	return { loading, error, deleteReport }
}
