<template>
	<ion-page>
		<ion-content>
			<top-bar :isNotDashboard="true" :noSideBar="true"></top-bar>
			<ion-header class="block lg:hidden" mode="ios">
				<ion-toolbar class="px-2">
					<ion-buttons slot="start" @click="router.go(-1)">
						<ion-icon :icon="arrowBackOutline" class="text-[23px] text-dark_gray"></ion-icon>
					</ion-buttons>
					<ion-title>Tutor Requests</ion-title>
				</ion-toolbar>
			</ion-header>
			<ion-router-outlet class="mt-10"></ion-router-outlet>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue'
import { arrowBackOutline } from 'ionicons/icons'
import { IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonRouterOutlet, IonTitle, IonToolbar } from '@ionic/vue'
import { useRouter } from 'vue-router'

const TopBar = defineAsyncComponent(() => import('@app/components/layout/topNavigations/Topbar.vue'))

export default {
	name: 'tutors page',
	components: { IonPage, IonContent, IonRouterOutlet, TopBar, IonTitle, IonIcon, IonButtons, IonHeader, IonToolbar },
	setup () {
		const router = useRouter()
		return {
			router,
			arrowBackOutline
		}
	}
}
</script>
