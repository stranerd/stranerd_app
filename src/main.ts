import { createApp } from 'vue'
import App from './App.vue'
import routes from './application/router/routes'
import { createRouter, createWebHistory } from '@ionic/vue-router'
import { IonicVue } from '@ionic/vue'

import { store, key } from './application/store'


/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

/* Optional CSS utils that can be commented out */
// import '@ionic/vue/css/padding.css';
// import '@ionic/vue/css/float-elements.css';
// import '@ionic/vue/css/text-alignment.css';
// import '@ionic/vue/css/text-transformation.css';
// import '@ionic/vue/css/flex-utils.css';
// import '@ionic/vue/css/display.css';

// tailwind utility classes
import '@/application/assets/styles/tailwind.css'

// line awesome icons
import 'line-awesome/dist/line-awesome/css/line-awesome.min.css'

/*Ionic Theme variables */
import '@/application/assets/theme/variables.css'
import { setAuthUser } from './application/plugins/setLoggedIn'

const router = Promise.all(routes).then((routes) => {
	const router = createRouter({
		history: createWebHistory(),
		routes
	})

	router.beforeEach((to, from, next) => {
		if (!to.meta.middlewares) {
			return next()
		}
		const middlewares: any = to.meta.middlewares
		Object.keys(middlewares).forEach((middleware) => {
			middlewares[middleware]({ to, from, next })
		})
		return next()
	})

	return router
})


const init = async() => {
	createApp({
		components: {
			App
		},
		async mounted(){
			await setAuthUser()
		}
	}).use(await router)
		.use(store, key)
		.use(IonicVue)
		.mount('#app')
  
}
  
init()
