import { createRouter, createWebHistory } from '@ionic/vue-router'
import routes from 'vue-auto-routing'
import { allModals, allPopovers } from '@app/composable/core/modals'

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach(async () => {
	await Promise.all(allModals.map((modal) => modal().closeAll()))
	await Promise.all(allPopovers.map((popover) => popover().closeAll()))
})
router.afterEach((route) => {
	window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
	const listRoute = router.options.routes.find((r) => r.name === route.name)
	router.currentRoute.value.meta = listRoute?.meta ?? {}
})

export { router }
