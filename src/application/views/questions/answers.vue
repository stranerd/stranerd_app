<template>
	<ion-page v-if="store.state.showPage">
		<!-- smaller screens -->
		<ion-header mode="ios" class="block lg:hidden">
			<ion-toolbar>
				<ion-buttons slot="start" class="px-1 ">
					<ion-button @click="handleBack">
						<ion-icon :icon="arrowBack" class="text-dark_gray"></ion-icon>
					</ion-button>
				</ion-buttons>
				<ion-title>Answers</ion-title>
			</ion-toolbar>
		</ion-header>
		<!-- larger screens -->
		<top-bar :isNotDashboard="false"></top-bar>

		<ion-content :fullscreen="true">
			<div class="layout-page">
				<div class="layout-body">
					Hello oo
				</div>
				<div class="layout-side-right">
					<side-profile-nav></side-profile-nav>
				</div>
			</div>		
		</ion-content>
		<side-nav-bar></side-nav-bar>
	</ion-page>
</template>

<script lang="ts">

import { IonPage, IonContent, IonIcon, IonHeader, IonButtons, IonButton, IonToolbar, IonTitle } from '@ionic/vue'
import { defineAsyncComponent } from 'vue'
const SideProfileNav = defineAsyncComponent(() => import('@/application/components/layout/sidebars/SideProfileNav.vue'))
const TopBar = defineAsyncComponent(() => import('@/application/components/layout/topNavigations/Topbar.vue'))
const SideNavBar = defineAsyncComponent(() => import('@/application/components/layout/sidebars/DefaultSidebar.vue'))
import { useRouter } from 'vue-router'
import { arrowBack } from 'ionicons/icons'
import { useStore } from '@/application/store'

export default  {
	name: 'answers',
	components: { IonPage, IonContent, SideProfileNav, IonIcon, IonHeader, IonButtons, IonButton, IonToolbar, IonTitle, TopBar, SideNavBar },
	setup() {
		const router = useRouter()

		const store = useStore()

		const handleBack = () => {
			router.go(-1)
			store.commit('hideIonPage')
		}

		return {
			arrowBack,
			handleBack,
			store
		}
	}
}
</script>
<style scoped>
ion-toolbar {
	--background: #ffffff;
}

ion-icon {
  font-size: 22px;
}
</style>