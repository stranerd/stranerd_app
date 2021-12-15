import { ref } from 'vue'
import { useModal, usePopover } from '@app/composable/core/modal'
import CreateSchedule from '@app/components/modals/sessions/CreateSchedule.vue'
import CreateSession from '@app/components/modals/sessions/RequestSession.vue'
import ReportUser from '@app/components/modals/reports/ReportUser.vue'
import ReportQuestion from '@app/components/modals/reports/ReportQuestion.vue'
import ReportAnswer from '@app/components/modals/reports/ReportAnswer.vue'
import UploadImage from '@app/components/modals/profile/UploadProfileImage.vue'
import SubmitTest from '@app/components/modals/study/SubmitTest.vue'
import RateFlashcard from '@app/components/modals/study/RateFlashcard.vue'
import CreateSet from '@app/components/modals/study/CreateSet.vue'
import AskQuestion from '@app/components/modals/questions/AskQuestion.vue'

export const modal = useModal(ref([]))
const QuestionModal = modal.register('Question', { AskQuestion }, 'question-modal')
const ProfileModal = modal.register('Upload', { UploadImage }, 'modal-class')
const SessionModal = modal.register('Session', { CreateSession, CreateSchedule }, 'modal-class')
const ReportModal = modal.register('Report', { ReportUser, ReportQuestion, ReportAnswer }, 'modal-class')
const StudyModal = modal.register('submit', { SubmitTest, RateFlashcard, CreateSet }, 'study-modal')

export const useQuestionModal = () => QuestionModal
export const useProfileModal = () => ProfileModal
export const useSessionModal = () => SessionModal
export const useReportModal = () => ReportModal
export const useStudyModal = () => StudyModal
export const allModals = [useQuestionModal, useProfileModal, useSessionModal, useReportModal, useStudyModal]

export const popovers = usePopover(ref([]))
export const allPopovers = [] as typeof allModals
