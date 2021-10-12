import { ref } from 'vue'
import { useModal } from '@/application/hooks/core/modal'
import MakePayment from '@/application/components/modals/payments/MakePayment.vue'
import BuyCoins from '@/application/components/modals/account/AccountBuyCoins.vue'
import WithdrawCoins from '@/application/components/modals/account/WithdrawCoins.vue'
import RightSidebar from '@/application/components/modals/menus/RightSidebarMenu.vue'
import Sidebar from '@/application/components/modals/menus/SidebarMenu.vue'
import CreateSession from '@/application/components/modals/sessions/SessionCreateSession.vue'
import Ratings from '@/application/components/modals/sessions/SessionRatings.vue'
import ReportUser from '@/application/components/modals/reports/ReportUser.vue'
import ReportQuestion from '@/application/components/modals/reports/ReportQuestion.vue'
import ReportAnswer from '@/application/components/modals/reports/ReportAnswer.vue'
import AskQuestions from '@/application/components/modals/questions/AskQuestions.vue'

type AccountTypes = 'BuyCoins' | 'WithdrawCoins'
type MenuTypes = 'RightSidebar' | 'Sidebar'
type SessionTypes = 'CreateSession' | 'Ratings'
type PaymentTypes = 'MakePayment'
type ReportTypes = 'ReportUser' | 'ReportQuestion' | 'ReportAnswer'
type QuestionTypes = 'AskQuestions'

const AccountModals = { BuyCoins, WithdrawCoins } as Record<AccountTypes, any>
const MenuModals = { RightSidebar, Sidebar } as Record<MenuTypes, any>
const SessionModals = { CreateSession, Ratings } as Record<SessionTypes, any>
const PaymentModals = { MakePayment } as Record<PaymentTypes, any>
const ReportModals = { ReportUser, ReportQuestion, ReportAnswer } as Record<ReportTypes, any>
const QuestionModals = { AskQuestions } as Record<QuestionTypes, any>

export const modal = useModal(ref([] as string[]))
const accountModal = modal.register('Account', AccountModals)
const menuModal = modal.register('Menu', MenuModals)
const sessionModal = modal.register('Session', SessionModals)
const paymentModal = modal.register('Payment', PaymentModals)
const reportModal = modal.register('Report', ReportModals)
const questionModals = modal.register('Question', QuestionModals)

export const useAccountModal = () => accountModal
export const useMenuModal = () => menuModal
export const useSessionModal = () => sessionModal
export const usePaymentModal = () => paymentModal
export const useReportModal = () => reportModal
export const useQuestionsModal = () => questionModals
