import CreateAnnouncement from '@app/components/modals/classes/CreateAnnouncement.vue';
import CreateClass from '@app/components/modals/classes/CreateClass.vue';
import CreateGroup from '@app/components/modals/classes/CreateGroup.vue';
import EditAnnouncement from '@app/components/modals/classes/EditAnnouncement.vue';
import EditClass from '@app/components/modals/classes/EditClass.vue';
import EditGroup from '@app/components/modals/classes/EditGroup.vue';
import SetupAccount from '@app/components/modals/onboarding/SetupAccount.vue';
import CreateQuestion from '@app/components/modals/questions/CreateQuestion.vue';
import EditQuestion from '@app/components/modals/questions/EditQuestion.vue';
import CreateReport from '@app/components/modals/reports/CreateReport.vue';
import CreateSession from '@app/components/modals/sessions/RequestSession.vue';
import CreateCourse from '@app/components/modals/study/CreateCourse.vue';
import CreateInstitution from '@app/components/modals/study/CreateInstitution.vue';
import CreateNote from '@app/components/modals/study/CreateNote.vue';
import CreatePastQuestion from '@app/components/modals/study/CreatePastQuestion.vue';
import CreateSet from '@app/components/modals/study/CreateSet.vue';
import CreateTestPrep from '@app/components/modals/study/CreateTestPrep.vue';
import CreateVideo from '@app/components/modals/study/CreateVideo.vue';
import EditCourse from '@app/components/modals/study/EditCourse.vue';
import EditInstitution from '@app/components/modals/study/EditInstitution.vue';
import EditNote from '@app/components/modals/study/EditNote.vue';
import EditPastQuestion from '@app/components/modals/study/EditPastQuestion.vue';
import EditSet from '@app/components/modals/study/EditSet.vue';
import EditTestPrep from '@app/components/modals/study/EditTestPrep.vue';
import EditVideo from '@app/components/modals/study/EditVideo.vue';
import SaveEntity from '@app/components/modals/study/SaveEntity.vue';
import CreateDashboardMenu from '@app/components/popovers/menus/CreateDashboardMenu.vue';
import UserDashboardMenu from '@app/components/popovers/menus/UserDashboardMenu.vue';
import { useModal, usePopover } from '@app/composable/core/modal';
import { ref } from 'vue';

export const modal = useModal(ref([]))
const QuestionModal = modal.register('Question', {
	CreateQuestion,
	EditQuestion,
})
const SessionModal = modal.register('Session', {
	CreateSession,
	Ratings: CreateSession,
})
const ReportModal = modal.register('Report', { CreateReport })
const StudyModal = modal.register('Study', {
	CreateSet,
	EditSet,
	CreateNote,
	EditNote,
	CreateVideo,
	EditVideo,
	CreateInstitution,
	EditInstitution,
	CreateCourse,
	EditCourse,
	CreateTestPrep,
	EditTestPrep,
	CreatePastQuestion,
	EditPastQuestion,
	SaveEntity,
})
const ClassModal = modal.register('Class', {
	CreateClass,
	EditClass,
	CreateGroup,
	EditGroup,
	CreateAnnouncement,
	EditAnnouncement,
})
const OnboardingModal = modal.register('Onboarding', {
	SetupAccount,
})

export const useQuestionModal = () => QuestionModal
export const useSessionModal = () => SessionModal
export const useReportModal = () => ReportModal
export const useStudyModal = () => StudyModal
export const useClassModal = () => ClassModal
export const useOnboardingModal = () => OnboardingModal
export const allModals = [
	useQuestionModal,
	useSessionModal,
	useReportModal,
	useStudyModal,
	useClassModal,
	useOnboardingModal,
]

export const popover = usePopover(ref([]))
const MenuPopover = popover.register('Menu', {
	CreateDashboardMenu,
	UserDashboardMenu,
})

export const useMenuPopover = () => MenuPopover
export const allPopovers = [useMenuPopover]
