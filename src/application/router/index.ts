import { createRouter, createWebHistory } from '@ionic/vue-router'
import routes from 'vue-auto-routing'
import { allModals, allPopovers } from '@app/composable/core/modals'

const appRoutes = routes.map((r) => {
	const path = r.path.split('/')
	if (path.at(-1) === ':?' && path.at(-2).includes(':')) path.pop()
	return { ...r, path: path.join('/') + '/' }
})

const router = createRouter({ history: createWebHistory(), routes: appRoutes })

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
