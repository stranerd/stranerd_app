import { ref } from 'vue'
import { useModal, usePopover } from '@app/composable/core/modal'
import CreateSchedule from '@app/components/modals/sessions/CreateSchedule.vue'
import CreateSession from '@app/components/modals/sessions/RequestSession.vue'
import ReportUser from '@app/components/modals/reports/ReportUser.vue'
import ReportQuestion from '@app/components/modals/reports/ReportQuestion.vue'
import ReportAnswer from '@app/components/modals/reports/ReportAnswer.vue'
import SubmitTest from '@app/components/popovers/study/SubmitTest.vue'
import CreateSet from '@app/components/modals/study/CreateSet.vue'
import AskQuestion from '@app/components/modals/questions/AskQuestion.vue'
import CreateStudy from '@app/components/popovers/study/CreateStudy.vue'
import CreateDashboardMenu from '@app/components/popovers/menus/CreateDashboardMenu.vue'
import UserDashboardMenu from '@app/components/popovers/menus/UserDashboardMenu.vue'
import StudyEntityMenu from '@app/components/popovers/menus/StudyEntityMenu.vue'
import CreateInstitution from '@app/components/modals/study/CreateInstitution.vue'
import EditInstitution from '@app/components/modals/study/EditInstitution.vue'
import CreateCourse from '@app/components/modals/study/CreateCourse.vue'
import EditCourse from '@app/components/modals/study/EditCourse.vue'
import CreateTestPrep from '@app/components/modals/study/CreateTestPrep.vue'
import EditTestPrep from '@app/components/modals/study/EditTestPrep.vue'

export const modal = useModal(ref([]))
const QuestionModal = modal.register('Question', { AskQuestion }, 'lg-modal')
const SessionModal = modal.register('Session', { CreateSession, CreateSchedule, Ratings: CreateSession }, 'sm-modal')
const ReportModal = modal.register('Report', { ReportUser, ReportQuestion, ReportAnswer }, 'sm-modal')
const StudyModal = modal.register('Study', {
	CreateSet,
	CreateInstitution, EditInstitution,
	CreateCourse, EditCourse,
	CreateTestPrep, EditTestPrep
}, 'sm-modal')

export const useQuestionModal = () => QuestionModal
export const useSessionModal = () => SessionModal
export const useReportModal = () => ReportModal
export const useStudyModal = () => StudyModal
export const allModals = [useQuestionModal, useSessionModal, useReportModal, useStudyModal]

export const popover = usePopover(ref([]))
const StudyPopover = popover.register('Study', { CreateStudy, SubmitTest }, 'popover-class')
const MenuPopover = popover.register('Menu', {
	CreateDashboardMenu,
	UserDashboardMenu,
	StudyEntityMenu
}, 'popover-class')

export const useStudyPopover = () => StudyPopover
export const useMenuPopover = () => MenuPopover
export const allPopovers = [useStudyPopover, useMenuPopover]
