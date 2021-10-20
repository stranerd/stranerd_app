<template>
	<ion-page>
		<top-bar :isNotDashboard="false" :userData="user"></top-bar>
		<ion-tabs>
			<ion-router-outlet></ion-router-outlet>
			<bottom-nav></bottom-nav>
		</ion-tabs>
		<side-nav-bar></side-nav-bar>
		<modal></modal>
	</ion-page>
</template>

<script lang="ts">
import { defineAsyncComponent, onMounted } from 'vue'

const BottomNav = defineAsyncComponent(() => import('@/application/components/layout/bottomNavigations/BottomNav.vue'))
const TopBar = defineAsyncComponent(() => import('@/application/components/layout/topNavigations/Topbar.vue'))
const SideNavBar = defineAsyncComponent(() => import('@/application/components/layout/sidebars/DefaultSidebar.vue'))
const Modal = defineAsyncComponent(() => import('@/application/components/core/Modal.vue'))
import { IonPage, IonTabs, IonRouterOutlet } from '@ionic/vue'
import { useAuth } from '@/application/composable/auth/auth'


export default {
	name: 'dashboard',
	components: { BottomNav, IonPage, IonTabs, IonRouterOutlet, TopBar, SideNavBar, Modal },
	setup() {

		const { user } = useAuth()	

		return {
			user
		}
	}
}
</script>
