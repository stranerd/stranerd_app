import { ref } from 'vue'
import { useModal } from '@app/composable/core/modal'
import CreateSchedule from '@app/components/modals/CreateSchedule.vue'
import CreateSession from '@app/components/modals/RequestSession.vue'
import ReportUser from '@app/components/modals/reports/ReportUser.vue'
import ReportQuestion from '@app/components/modals/reports/ReportQuestion.vue'
import ReportAnswer from '@app/components/modals/reports/ReportAnswer.vue'
import UploadImage from '@app/components/modals/media/UploadProfileImage.vue'
import SubmitTestprep from '@app/components/modals/study/SubmitTestprep.vue'
import RateFlashcard from '@app/components/modals/study/RateFlashcard.vue'
import CreateSet from '@app/components/modals/study/CreateSet.vue'

type ScheduleTypes = 'CreateSchedule'
type UploadTypes = 'UploadImage'
type SessionTypes = 'CreateSession' | 'Ratings'
type ReportTypes = 'ReportUser' | 'ReportQuestion' | 'ReportAnswer'
type StudyTypes = 'SubmitTestprep' | 'RateFlashcard' | 'CreateSet'

const ScheduleModals = { CreateSchedule } as Record<ScheduleTypes, any>
const UploadModals = { UploadImage } as Record<UploadTypes, any>
const SessionModals = { CreateSession } as Record<SessionTypes, any>
const ReportModals = { ReportUser, ReportQuestion, ReportAnswer } as Record<ReportTypes, any>
const StudyModals = { SubmitTestprep, RateFlashcard, CreateSet } as Record<StudyTypes, any>

export const modal = useModal(ref([] as string[]))
const ScheduleModal = modal.register('Schedule', ScheduleModals, 'modal-class')
const UploadModal = modal.register('Upload', UploadModals, 'modal-class')
const sessionModal = modal.register('Session', SessionModals, 'modal-class')
const reportModal = modal.register('Report', ReportModals, 'modal-class')
const StudyModal = modal.register('submit', StudyModals, 'sm-modal')

export const useScheduleModal = () => ScheduleModal
export const useUploadModal = () => UploadModal
export const useSessionModal = () => sessionModal
export const useReportModal = () => reportModal
export const useStudyModal = () => StudyModal
