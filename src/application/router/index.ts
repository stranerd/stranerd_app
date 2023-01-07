import { createRouter, createWebHistory } from '@ionic/vue-router'
// @ts-ignore
import { routes } from '~pages'
import { allModals, allPopovers } from '@app/composable/core/modals'

const router = createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior: async (to) => {
		if (to.hash) return { el: to.hash }
	}
})

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
