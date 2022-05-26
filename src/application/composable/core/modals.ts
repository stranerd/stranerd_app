import { ref } from 'vue'
import { useModal, usePopover } from '@app/composable/core/modal'
import CreateSession from '@app/components/modals/sessions/RequestSession.vue'
import CreateReport from '@app/components/modals/reports/CreateReport.vue'
import CreateQuestion from '@app/components/modals/questions/CreateQuestion.vue'
import EditQuestion from '@app/components/modals/questions/EditQuestion.vue'
import CreateDashboardMenu from '@app/components/popovers/menus/CreateDashboardMenu.vue'
import UserDashboardMenu from '@app/components/popovers/menus/UserDashboardMenu.vue'
import CreateTestPrep from '@app/components/modals/study/CreateTestPrep.vue'
import EditTestPrep from '@app/components/modals/study/EditTestPrep.vue'
import CreateSet from '@app/components/modals/study/CreateSet.vue'
import EditSet from '@app/components/modals/study/EditSet.vue'
import CreateDocument from '@app/components/modals/study/CreateDocument.vue'
import EditDocument from '@app/components/modals/study/EditDocument.vue'
import SaveEntity from '@app/components/modals/study/SaveEntity.vue'
import CreateClass from '@app/components/modals/classes/CreateClass.vue'
import EditClass from '@app/components/modals/classes/EditClass.vue'
import CreateGroup from '@app/components/modals/classes/CreateGroup.vue'
import EditGroup from '@app/components/modals/classes/EditGroup.vue'
import CreateAnnouncement from '@app/components/modals/classes/CreateAnnouncement.vue'
import EditAnnouncement from '@app/components/modals/classes/EditAnnouncement.vue'
import Timetable from '@app/components/modals/classes/Timetable.vue'
import CreateInstitution from '@app/components/modals/school/CreateInstitution.vue'
import EditInstitution from '@app/components/modals/school/EditInstitution.vue'
import CreateFaculty from '@app/components/modals/school/CreateFaculty.vue'
import EditFaculty from '@app/components/modals/school/EditFaculty.vue'
import CreateDepartment from '@app/components/modals/school/CreateDepartment.vue'
import EditDepartment from '@app/components/modals/school/EditDepartment.vue'
import CreateCourse from '@app/components/modals/school/CreateCourse.vue'
import EditCourse from '@app/components/modals/school/EditCourse.vue'
import CreatePastQuestion from '@app/components/modals/school/CreatePastQuestion.vue'
import EditPastQuestion from '@app/components/modals/school/EditPastQuestion.vue'
import Settings from '@app/components/modals/users/Settings.vue'

export const modal = useModal(ref([]))
const QuestionModal = modal.register('Question', { CreateQuestion, EditQuestion })
const SessionModal = modal.register('Session', { CreateSession, Ratings: CreateSession })
const ReportModal = modal.register('Report', { CreateReport })
const StudyModal = modal.register('Study', {
	CreateSet, EditSet, SaveEntity, CreateTestPrep, EditTestPrep, CreateDocument, EditDocument
})
const ClassModal = modal.register('Class', {
	CreateClass, EditClass, CreateGroup, EditGroup,
	CreateAnnouncement, EditAnnouncement, Timetable
})
const SchoolModal = modal.register('School', {
	CreateInstitution, EditInstitution, CreateFaculty, EditFaculty, CreateDepartment, EditDepartment,
	CreatePastQuestion, EditPastQuestion, CreateCourse, EditCourse
})
const UserModal = modal.register('Onboarding', { Settings })

export const useQuestionModal = () => QuestionModal
export const useSessionModal = () => SessionModal
export const useReportModal = () => ReportModal
export const useStudyModal = () => StudyModal
export const useClassModal = () => ClassModal
export const useSchoolModal = () => SchoolModal
export const useUserModal = () => UserModal
export const allModals = [useQuestionModal, useSessionModal, useReportModal, useStudyModal, useClassModal, useSchoolModal]

export const popover = usePopover(ref([]))
const MenuPopover = popover.register('Menu', { CreateDashboardMenu, UserDashboardMenu })

export const useMenuPopover = () => MenuPopover
export const allPopovers = [useMenuPopover]
