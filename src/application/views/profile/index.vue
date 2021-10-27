<template>
	<ion-page>
		<top-bar :isNotDashboard="true" :noSideBar="true" ></top-bar>
		<ion-header mode="ios" class="block lg:hidden">
			<ion-toolbar class="px-2">
				<ion-buttons @click="router.go(-1)" slot="start">
					<ion-icon :icon="arrowBackOutline" class="text-[23px] text-dark_gray"></ion-icon>
				</ion-buttons>
					<ion-title>My Profile</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-router-outlet class="mt-10"></ion-router-outlet>
	</ion-page>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue'
import { arrowBackOutline } from 'ionicons/icons'
const TopBar = defineAsyncComponent(() => import('@/application/components/layout/topNavigations/Topbar.vue'))
import { IonPage, IonRouterOutlet, IonTitle, IonIcon, IonButtons, IonHeader, IonToolbar  } from '@ionic/vue'
import { useRouter } from 'vue-router'

export default {
	name: 'profilePage',
	components: { IonPage, IonRouterOutlet, TopBar, IonTitle, IonIcon, IonButtons, IonHeader, IonToolbar  },
	setup() {
		const router = useRouter()
		return {
			router,
			arrowBackOutline
		}
	}
}
</script>
