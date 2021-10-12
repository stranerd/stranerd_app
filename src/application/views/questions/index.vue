<template>
	<ion-page>
		<top-bar :isNotDashboard="true"></top-bar>
		<ion-router-outlet></ion-router-outlet>
		<side-nav-bar></side-nav-bar>
	</ion-page>
</template>

<script lang="ts">
import { defineAsyncComponent, onMounted } from 'vue'


const TopBar = defineAsyncComponent(() => import('@/application/components/layout/topNavigations/Topbar.vue'))
const SideNavBar = defineAsyncComponent(() => import('@/application/components/layout/sidebars/DefaultSidebar.vue'))
import { IonPage, IonRouterOutlet } from '@ionic/vue'
import { useStore } from '@/application/store'

export default {
	name: 'questionPage',
	components: { IonPage, IonRouterOutlet, TopBar, SideNavBar },
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
