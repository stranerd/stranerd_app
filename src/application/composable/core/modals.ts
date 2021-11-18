import { ref } from 'vue'
import { useModal } from '@app/composable/core/modal'
import CreateSchedule from '@app/components/modals/CreateSchedule.vue'
import CreateSession from '@app/components/modals/RequestSession.vue'
import ReportUser from '@app/components/modals/reports/ReportUser.vue'
import ReportQuestion from '@app/components/modals/reports/ReportQuestion.vue'
import ReportAnswer from '@app/components/modals/reports/ReportAnswer.vue'
import UploadImage from '@app/components/modals/media/UploadProfileImage.vue'

type ScheduleTypes = 'CreateSchedule'
type UploadTypes = 'UploadImage'
type SessionTypes = 'CreateSession' | 'Ratings'
type ReportTypes = 'ReportUser' | 'ReportQuestion' | 'ReportAnswer'

const ScheduleModals = { CreateSchedule } as Record<ScheduleTypes, any>
const UploadModals = { UploadImage } as Record<UploadTypes, any>
const SessionModals = { CreateSession } as Record<SessionTypes, any>
const ReportModals = { ReportUser, ReportQuestion, ReportAnswer } as Record<ReportTypes, any>

export const modal = useModal(ref([] as string[]))
const ScheduleModal = modal.register('Schedule', ScheduleModals)
const UploadModal = modal.register('Upload', UploadModals)
const sessionModal = modal.register('Session', SessionModals)
const reportModal = modal.register('Report', ReportModals)

export const useScheduleModal = () => ScheduleModal
export const useUploadModal = () => UploadModal
export const useSessionModal = () => sessionModal
export const useReportModal = () => reportModal
