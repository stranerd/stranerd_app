import { onMounted, ref, Ref } from 'vue'
import { ReportEntity, ReportFactory, ReportsUseCases, ReportType } from '@modules/moderation'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@app/composable/core/states'
import { useModerationModal } from '@app/composable/core/modals'
import { Alert } from '@utils/dialog'
import { addToArray } from '@utils/commons'

let reportedEntity = null as { type: ReportType, id: string } | null
export const openCreateReportModal = (type: ReportType, id: string) => {
	reportedEntity = { type, id }
	useModerationModal().openCreateReport()
}

export const useCreateReport = () => {
	const factory = ref(new ReportFactory(reportedEntity?.type ?? ReportType.users, reportedEntity?.id ?? '')) as Ref<ReportFactory>
	const { message, setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()
	if (!reportedEntity) useModerationModal().closeCreateReport()
	else {
		factory.value.type = reportedEntity.type
		factory.value.id = reportedEntity.id
	}

	const createReport = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				await ReportsUseCases.add(factory.value)
				useModerationModal().closeAll()
				factory.value.reset()
				await setMessage('Reported successfully')
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

const global = {
	reports: ref([] as ReportEntity[]),
	fetched: ref(false),
	hasMore: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}

export const useReportsList = () => {
	const fetchReports = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			const lastDate = global.reports.value[0]?.createdAt
			const reports = await ReportsUseCases.get(lastDate)
			global.hasMore.value = !!reports.pages.next
			reports.results.forEach((r) => addToArray(global.reports.value, r, (e) => e.id, (e) => e.createdAt))
			global.fetched.value = true
		} catch (error) {
			await global.setError(error)
		}
		await global.setLoading(false)
	}

	onMounted(async () => {
		if (!global.fetched.value && !global.loading.value) await fetchReports()
	})

	return { ...global, fetchOlderReports: fetchReports }
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
				global.reports.value = global.reports.value
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
