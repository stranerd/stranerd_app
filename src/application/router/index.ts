import { createRouter, createWebHistory } from '@ionic/vue-router'
// @ts-ignore
import routes from '~pages'
import { allModals, allPopovers } from '@app/composable/core/modals'
import { showAddAnswer } from '@app/composable/questions/answers'

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach(async () => {
	await Promise.all(allModals.map((modal) => modal().closeAll()))
	await Promise.all(allPopovers.map((popover) => popover().closeAll()))
	showAddAnswer.value = false
})
router.afterEach(() => {
	window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
})

export { router }
