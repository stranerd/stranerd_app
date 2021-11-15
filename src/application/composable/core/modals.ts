import { ref } from 'vue'
import { useModal } from '@app/composable/core/modal'
import BuyCoins from '@app/components/modals/BuyCoins.vue'
import WithdrawCoins from '@app/components/modals/Withdrawal.vue'
import CreateSchedule from '@app/components/modals/CreateSchedule.vue'
import CreateSession from '@app/components/modals/RequestSession.vue'
import ReportUser from '@app/components/modals/reports/ReportUser.vue'
import ReportQuestion from '@app/components/modals/reports/ReportQuestion.vue'
import ReportAnswer from '@app/components/modals/reports/ReportAnswer.vue'
import UploadImage from '@root/application/components/modals/media/UploadProfileImage.vue'

type AccountTypes = 'BuyCoins' | 'WithdrawCoins'
type ScheduleTypes = 'CreateSchedule'
type UploadTypes = 'UploadImage'
type SessionTypes = 'CreateSession' | 'Ratings'
type ReportTypes = 'ReportUser' | 'ReportQuestion' | 'ReportAnswer'
type PaymentTypes = 'MakePayment'

const AccountModals = { BuyCoins, WithdrawCoins } as Record<AccountTypes, any>
const ScheduleModals = { CreateSchedule } as Record<ScheduleTypes, any>
const UploadModals = { UploadImage } as Record<UploadTypes, any>
const SessionModals = { CreateSession } as Record<SessionTypes, any>
<<<<<<< HEAD
const ReportModals = {ReportUser, ReportQuestion, ReportAnswer} as Record<ReportTypes, any>
=======
const ReportModals = { ReportUser, ReportQuestion, ReportAnswer } as Record<ReportTypes, any>
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
const PaymentModals = {} as Record<PaymentTypes, any>

export const modal = useModal(ref([] as string[]))
const accountModal = modal.register('Account', AccountModals)
const ScheduleModal = modal.register('Schedule', ScheduleModals)
const UploadModal = modal.register('Upload', UploadModals)
const sessionModal = modal.register('Session', SessionModals)
const reportModal = modal.register('Report', ReportModals)
const paymentModal = modal.register('Payment', PaymentModals)

export const useAccountModal = () => accountModal
export const useScheduleModal = () => ScheduleModal
export const useUploadModal = () => UploadModal
export const useSessionModal = () => sessionModal
export const useReportModal = () => reportModal
export const usePaymentModal = () => paymentModal
