import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'
import Dashboard from '../views/dashboard/index.vue'

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/dashboard/home'
	},
	{
		path: '/dashboard/',
		component: Dashboard,
		children: [
			{
				path: '',
				redirect: '/dashboard/home'
			},
			{
				path: 'home',
				component: () => import('@/views/Tab1.vue')
			},
			{
				path: 'questions',
				component: () => import('@/views/Tab2.vue')
			},
			{
				path: 'tutors',
				component: () => import('@/views/Tab3.vue')
			},
			{
				path: 'chats',
				component: () => import('@/views/Tab3.vue')
			},
			{
				path: 'schedule',
				component: () => import('@/views/Tab3.vue')
			},
			{
				path: 'wallet',
				component: () => import('@/views/Tab3.vue')
			}
		]
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
