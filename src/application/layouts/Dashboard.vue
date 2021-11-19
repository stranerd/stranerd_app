<template>
	<IonPage>
		<TopBar />
		<div class="flex h-full">
			<Sidebar />
			<div class="layout">
				<IonContent>
					<div class="layout-page mt-10">
						<div class="layout-body">
							<slot />
						</div>
						<div class="layout-side-right">
							<RightSidebar />
						</div>
					</div>
					<!-- fab placed to the bottom start -->
					<ion-fab vertical="bottom" horizontal="end" slot="fixed" class="lg:hidden">
						<ion-fab-list class="w-screen h-screen left-0 top-0 bg-white bg-opacity-70 fixed z-50">
						</ion-fab-list>
						<ion-fab-button class="z-50 relative">
							<ion-icon :icon="add"></ion-icon>
						</ion-fab-button>
						<ion-fab-list side="top" class="z-50">
							<ion-fab-button color="primary" class="relative">
								<ion-icon :icon="folder" class="relative"></ion-icon>
								<ion-label class="px-1.5 py-1 mr-1.5 bg-white top-1/2 transform -translate-y-1/2 absolute right-full">Create a study set</ion-label>
								<!-- <div >
										<small class="text-xs text-dark_gray"></small>
									</div> -->
							</ion-fab-button>
							<ion-fab-button color="primary" class="relative">
								<img src="@app/assets/images/icons/flashCard.png" class="w-4" alt="">
								<ion-label class="px-1.5 py-1 mr-1.5 bg-white top-1/2 transform -translate-y-1/2 absolute right-full">Create a flashcard</ion-label>
								<!-- <div class="px-1.5 py-1 mr-1.5 bg-white top-1/2 transform -translate-y-1/2 absolute right-full">
										<small class="text-xs text-dark_gray">Create a study set</small>
									</div> -->
							</ion-fab-button>
							<ion-fab-button color="primary" class="relative overflow-visible">
								<ion-icon :icon="helpCircle"></ion-icon>
								<ion-label class="px-1.5 py-1 mr-1.5 bg-white top-1/2 transform -translate-y-1/2 absolute right-full">Ask a question</ion-label>
								<!-- <div class="px-1.5 py-1 mr-1.5 bg-white top-1/2 transform -translate-y-1/2 absolute right-full">
										<small class="text-xs text-dark_gray">Create a study set</small>
									</div> -->
							</ion-fab-button>
						</ion-fab-list>
					</ion-fab>
				</IonContent>
				<BottomNav class="mt-auto" />
			</div>
		</div>
	</IonPage>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { IonFab, IonFabButton, IonLabel, IonFabList, IonIcon,  IonContent, IonPage } from '@ionic/vue'
import { 
} from '@ionic/vue'
import { 
	add, 
	helpCircle, 
	folder
} from 'ionicons/icons'
import BottomNav from '@app/components/layout/bottomNavigations/BottomNav.vue'
import Sidebar from '@app/components/layout/sidebars/DefaultSidebar.vue'
import RightSidebar from '@app/components/layout/sidebars/RightSidebar.vue'
import TopBar from '@app/components/layout/topNavigations/Topbar.vue'

export default defineComponent({
	name: 'DashboardLayout',
	components: {
		IonPage,
		IonLabel,
		IonContent,
		BottomNav,
		Sidebar,
		TopBar,
		RightSidebar,
		IonFab, 
		IonFabButton, 
		IonFabList, 
		IonIcon
	},
	setup() {
		return {
			add, 
			helpCircle, 
			folder
		}
	}
})
</script>


<style scoped>
	ion-fab-button {
		--background: #546DD3;
		/* --background-activated: #4D5C6F; */
		--background-activated: #4D5C6F;
	}
</style>