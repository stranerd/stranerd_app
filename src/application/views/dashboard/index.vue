<template>
	<ion-page>
		<top-bar :isNotDashboard="false"></top-bar>
		<ion-tabs>
			<ion-router-outlet></ion-router-outlet>
			<bottom-nav></bottom-nav>
		</ion-tabs>
		<side-nav-bar></side-nav-bar>
	</ion-page>
</template>

<script lang="ts">
import { defineAsyncComponent, onMounted } from 'vue'

const BottomNav = defineAsyncComponent(() => import('@/application/components/layout/bottomNavigations/BottomNav.vue'))
const TopBar = defineAsyncComponent(() => import('@/application/components/layout/topNavigations/Topbar.vue'))
const SideNavBar = defineAsyncComponent(() => import('@/application/components/layout/sidebars/DefaultSidebar.vue'))
import { IonPage, IonTabs, IonRouterOutlet } from '@ionic/vue'
import { useStore } from '@/application/store'

export default {
	name: 'dashboard',
	components: { BottomNav, IonPage, IonTabs, IonRouterOutlet, TopBar, SideNavBar },
	setup() {

		const store = useStore()
		onMounted(() => {
			store.commit('hideIonPage')
		})
		return {
			
		}
	}
}
</script>
