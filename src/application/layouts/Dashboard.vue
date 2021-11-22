<template>
	<IonPage>
		<TopBar />
		<div class="flex h-full">
			<Sidebar />
			<div class="layout">
				<IonContent >
					<div class="layout-page ">
						<div class="layout-body">
							<slot />
						</div>
						<div class="layout-side-right">
							<RightSidebar />
						</div>
					</div>
					<!-- fab placed to the bottom start -->
					<ion-fab vertical="bottom" horizontal="end" slot="fixed" class="lg:hidden active">
						<ion-fab-list class="w-screen h-screen left-0 top-0 bg-white bg-opacity-70 fixed z-50">
						</ion-fab-list>
						<ion-fab-button :class="[active ? 'active':'', 'z-50 relative']" :activated="active" @click="active = !active">
							<ion-icon :icon="add"></ion-icon>
						</ion-fab-button>
						<ion-fab-list side="top" class="z-50">
							<router-link class="relative"
								to="/study">
								<ion-fab-button color="primary" size="small" class="relative">
									<ion-icon :icon="folder" class="relative"></ion-icon>
								</ion-fab-button>								
								<ion-label class="px-2 py-1 mr-1.5 w-max bg-white text-xs font-bold shadow-md text-main_dark top-1/2 transform -translate-y-1/2 absolute right-full">Create a study set</ion-label>
							</router-link>	
							<router-link class="relative"
								to="/study/flashcard/create">
								<ion-fab-button color="primary" size="small" class="relative">
									<img src="@app/assets/images/icons/flashCard.png" class="w-4" alt="">
								</ion-fab-button>								
								<ion-label class="px-2 py-1 mr-1.5 w-max bg-white text-xs font-bold shadow-md text-main_dark top-1/2 transform -translate-y-1/2 absolute right-full">Create a flashcard</ion-label>
							</router-link>
							<router-link class="relative"
								to="/questions/create"> 
								<ion-fab-button color="primary" size="small" class="relative">
									<ion-icon :icon="helpCircle"></ion-icon>
								</ion-fab-button>								
								<ion-label class="px-2 py-1 mr-1.5 w-max bg-white text-xs font-bold shadow-md text-main_dark top-1/2 transform -translate-y-1/2 absolute right-full">Ask a question</ion-label>
							</router-link>
						</ion-fab-list>
					</ion-fab>
				</IonContent>
				<BottomNav class="mt-auto" />
			</div>
		</div>
	</IonPage>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonFab, IonFabButton, IonLabel, IonFabList, IonIcon,  IonContent, IonPage } from '@ionic/vue'
import { add, helpCircle, folder} from 'ionicons/icons'
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
		const active = ref(false)
		return {
			active,
			add, 
			helpCircle, 
			folder
		}
	}
})
</script>


<style scoped>
	ion-fab {
		--background: #546DD3;
		--background-activated: #4D5C6F !important;
		--background-focused: #4D5C6F !important;
		--background-hover: #4D5C6F !important;
	}
	.active{
--background: #4D5C6F !important;
	}
	ion-fab-button {
		--background: #546DD3;
		--background-activated: #4D5C6F !important;
		--background-focused: #4D5C6F !important;
		--background-hover: #4D5C6F !important;
	}
</style> 