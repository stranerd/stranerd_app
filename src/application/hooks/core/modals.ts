import { ssrRef } from '@nuxtjs/composition-api'
import { useModal } from '@app/hooks/core/modal'
import MakePayment from '@app/components/modals/payments/MakePayment.vue'
import BuyCoins from '@app/components/modals/account/AccountBuyCoins.vue'
import WithdrawCoins from '@app/components/modals/account/WithdrawCoins.vue'
import RightSidebar from '@app/components/modals/menus/RightSidebarMenu.vue'
import Sidebar from '@app/components/modals/menus/SidebarMenu.vue'
import CreateSession from '@app/components/modals/sessions/SessionCreateSession.vue'
import Ratings from '@app/components/modals/sessions/SessionRatings.vue'
import ReportUser from '@app/components/modals/reports/ReportUser.vue'
import ReportQuestion from '@app/components/modals/reports/ReportQuestion.vue'
import ReportAnswer from '@app/components/modals/reports/ReportAnswer.vue'
import AskQuestions from '@app/components/modals/questions/AskQuestions.vue'

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

export const modal = useModal(ssrRef([] as string[]))
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
