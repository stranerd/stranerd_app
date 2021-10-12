<template>
	<ion-page>
		<top-bar :isNotDashboard="false"></top-bar>
		<ion-tabs>
			<ion-router-outlet></ion-router-outlet>
			<bottom-nav></bottom-nav>
		</ion-tabs>
		<side-nav-bar></side-nav-bar>
	</ion-page>

	<modal></modal>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue'

const BottomNav = defineAsyncComponent(() => import('@/application/components/layout/bottomNavigations/BottomNav.vue'))
const TopBar = defineAsyncComponent(() => import('@/application/components/layout/topNavigations/Topbar.vue'))
const SideNavBar = defineAsyncComponent(() => import('@/application/components/layout/sidebars/DefaultSidebar.vue'))
const Modal = defineAsyncComponent(() => import('@/application/components/core/Modal.vue'))

import { IonPage, IonTabs, IonRouterOutlet } from '@ionic/vue'


export default {
	name: 'dashboard',
	components: { BottomNav, IonPage, IonTabs, IonRouterOutlet, TopBar, SideNavBar, Modal },
	setup() {

		return {
			
		}
	}
}
</script>
