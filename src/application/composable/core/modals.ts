import { modal } from '@app/composable/core/modal'
import CreateReport from '@app/components/modals/reports/CreateReport.vue'
import CreateTestPrep from '@app/components/modals/study/CreateTestPrep.vue'
import EditTestPrep from '@app/components/modals/study/EditTestPrep.vue'
import CreateSet from '@app/components/modals/study/CreateSet.vue'
import EditSet from '@app/components/modals/study/EditSet.vue'
import CreateNote from '@app/components/modals/study/CreateNote.vue'
import EditNote from '@app/components/modals/study/EditNote.vue'
import SaveEntity from '@app/components/modals/study/SaveEntity.vue'
import CreateTimetable from '@app/components/modals/classes/CreateTimetable.vue'
import EditTimetable from '@app/components/modals/classes/EditTimetable.vue'
import CreateScheme from '@app/components/modals/classes/CreateScheme.vue'
import EditScheme from '@app/components/modals/classes/EditScheme.vue'
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
import FabMenu from '@app/components/modals/users/FabMenu.vue'
import CreateComment from '@app/components/modals/interactions/CreateComment.vue'
import CreateTag from '@app/components/modals/interactions/CreateTag.vue'
import EditTag from '@app/components/modals/interactions/EditTag.vue'

const SessionModal = modal.register('Session', { CreateSession: CreateReport, Ratings: CreateReport })
const ReportModal = modal.register('Report', { CreateReport })
const StudyModal = modal.register('Study', {
	CreateSet, EditSet, SaveEntity, CreateTestPrep, EditTestPrep, CreateNote, EditNote
})
const ClassModal = modal.register('Class', {
	CreateScheme, EditScheme, CreateTimetable, EditTimetable
})
const SchoolModal = modal.register('School', {
	CreateInstitution, EditInstitution, CreateFaculty, EditFaculty, CreateDepartment, EditDepartment,
	CreatePastQuestion, EditPastQuestion, CreateCourse, EditCourse
})
const UserModal = modal.register('User', { Settings, FabMenu })
const InteractionModal = modal.register('Interaction', { CreateComment, CreateTag, EditTag })

export const useSessionModal = () => SessionModal
export const useReportModal = () => ReportModal
export const useStudyModal = () => StudyModal
export const useClassModal = () => ClassModal
export const useSchoolModal = () => SchoolModal
export const useUserModal = () => UserModal
export const useInteractionModal = () => InteractionModal
export const allModals = [
	useSessionModal, useReportModal, useStudyModal,
	useClassModal, useSchoolModal, useUserModal, useInteractionModal
]

export const allPopovers = [] as typeof allModals
