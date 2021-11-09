import { ref } from 'vue'
import { useModal } from '@app/composable/core/modal'
import BuyCoins from '@app/components/modals/BuyCoins.vue'
import WithdrawCoins from '@app/components/modals/Withdrawal.vue'
import CreateSchedule from '@app/components/modals/CreateSchedule.vue'
import CreateSession from '@app/components/modals/RequestSession.vue'

type AccountTypes = 'BuyCoins' | 'WithdrawCoins'
type ScheduleTypes = 'CreateSchedule'
type SessionTypes = 'CreateSession' | 'Ratings'
type ReportTypes = 'ReportUser' | 'ReportQuestion' | 'ReportAnswer'
type PaymentTypes = 'MakePayment'

const AccountModals = { BuyCoins, WithdrawCoins } as Record<AccountTypes, any>
const ScheduleModals = { CreateSchedule } as Record<ScheduleTypes, any>
const SessionModals = { CreateSession } as Record<SessionTypes, any>
const ReportModals = {} as Record<ReportTypes, any>
const PaymentModals = {} as Record<PaymentTypes, any>

export const modal = useModal(ref([] as string[]))
const accountModal = modal.register('Account', AccountModals)
const ScheduleModal = modal.register('Schedule', ScheduleModals)
const sessionModal = modal.register('Session', SessionModals)
const reportModal = modal.register('Report', ReportModals)
const paymentModal = modal.register('Payment', PaymentModals)

export const useAccountModal = () => accountModal
export const useScheduleModal = () => ScheduleModal
export const useSessionModal = () => sessionModal
export const useReportModal = () => reportModal
export const usePaymentModal = () => paymentModal
