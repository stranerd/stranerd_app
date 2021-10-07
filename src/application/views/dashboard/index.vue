<template>
	<ion-page>
		<top-bar></top-bar>
		<ion-tabs>
			<ion-router-outlet></ion-router-outlet>
			<bottom-nav></bottom-nav>
		</ion-tabs>
	</ion-page>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue'

const BottomNav = defineAsyncComponent(() => import('@/application/components/layout/bottomNavigations/BottomNav.vue'))
const TopBar = defineAsyncComponent(() => import('@/application/components/layout/topNavigations/Topbar.vue'))
import { IonPage, IonTabs, IonRouterOutlet } from '@ionic/vue'

export default {
	name: 'dashboard',
	components: { BottomNav, IonPage, IonTabs, IonRouterOutlet, TopBar },
	setup() {
		return {
			
		}
	}
}
</script>
