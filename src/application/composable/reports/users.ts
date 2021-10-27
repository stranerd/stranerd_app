import { ref, onMounted } from 'vue'
import {
	AddUserReport,
	DeleteUserReport,
	GetUserReports,
	ReportFactory,
	ReportType,
	UserReportEntity
} from '@/modules/reports'
import { useErrorHandler, useLoadingHandler, useSuccessHandler } from '@/application/composable/core/states'
import { Alert } from '../core/notifications'

let reportedEntity = null as string | null
export const setReportedEntity = (userId: string) => reportedEntity = userId

export const useCreateReport = () => {
	const factory = ref(new ReportFactory())
	const { message, setMessage } = useSuccessHandler()
	const { loading, setLoading } = useLoadingHandler()
	const { error, setError } = useErrorHandler()

	factory.value.type = ReportType.users
	factory.value.reportedId = reportedEntity!

	const createReport = async () => {
		await setError('')
		if (factory.value.valid && !loading.value) {
			try {
				await setLoading(true)
				await AddUserReport.call(factory.value)
				//useReportModal().closeReportUser()
				factory.value.reset()
				await setMessage('Report sent successfully')
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
	reports: ref([] as UserReportEntity[]),
	fetched: ref(false),
	hasMore: ref(false),
	...useErrorHandler(),
	...useLoadingHandler()
}

/* const pushToReportList = (report: UserReportEntity) => {
 const index = global.reports.value.findIndex((r) => r.id === report.id)
 if (index !== -1) global.reports.value.splice(index, 1, report)
 else global.reports.value.push(report)
 } */

const unshiftToReportList = (report: UserReportEntity) => {
	const index = global.reports.value.findIndex((r) => r.id === report.id)
	if (index !== -1) global.reports.value.splice(index, 1, report)
	else global.reports.value.unshift(report)
}

export const useReportsList = () => {
	const fetchReports = async () => {
		await global.setError('')
		try {
			await global.setLoading(true)
			const lastDate = global.reports.value[0]?.createdAt
			const reports = await GetUserReports.call(lastDate)
			global.hasMore.value = !!reports.pages.next
			reports.results.forEach(unshiftToReportList)
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
			title: 'Are you sure you want to remove this report?',
			text: 'This cannot be reversed',
			icon: 'warning',
			confirmButtonText: 'Yes, remove'
		})
		if (accepted) {
			await setLoading(true)
			try {
				await DeleteUserReport.call(id)
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
