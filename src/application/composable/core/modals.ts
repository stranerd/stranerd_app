import { ref } from 'vue'
import { useModal } from '@app/composable/core/modal'
import BuyCoins from '@app/components/modals/BuyCoins.vue'
import WithdrawCoins from '@app/components/modals/Withdrawal.vue'
import CreateSchedule from '@app/components/modals/CreateSchedule.vue'
import CreateSession from '@app/components/modals/RequestSession.vue'

type AccountTypes = 'BuyCoins' | 'WithdrawCoins'
type ScheduleTypes = 'CreateSchedule'
type SessionTypes = 'CreateSession'

const AccountModals = { BuyCoins, WithdrawCoins } as Record<AccountTypes, any>
const ScheduleModals = { CreateSchedule } as Record<ScheduleTypes, any>
const SessionModals = { CreateSession } as Record<SessionTypes, any>

export const modal = useModal(ref([] as string[]))
const accountModal = modal.register('Account', AccountModals)
const ScheduleModal = modal.register('Schedule', ScheduleModals)
const sessionModal = modal.register('Session', SessionModals)

export const useAccountModal = () => accountModal
export const useScheduleModal = () => ScheduleModal
export const useSessionModal = () => sessionModal
