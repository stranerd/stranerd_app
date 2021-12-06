<template>
	<!-- fab placed to the bottom start -->
	<ion-fab slot="fixed" class="lg:hidden active" horizontal="end" vertical="bottom">
		<ion-fab-list class="w-screen h-screen left-0 top-0 bg-white bg-opacity-70 fixed z-50">
		</ion-fab-list>
		<ion-fab-button :activated="active" :class="[active ? 'active':'', 'z-50 relative']" @click="active = !active">
			<ion-icon :icon="add"></ion-icon>
		</ion-fab-button>
		<ion-fab-list class="z-50" side="top">
			<router-link class="relative"
				to="/study">
				<ion-fab-button class="relative" color="primary" size="small">
					<ion-icon :icon="folder" class="relative"></ion-icon>
				</ion-fab-button>
				<ion-label
					class="px-2 py-1 mr-1.5 w-max bg-white text-xs font-bold shadow-md text-main_dark top-1/2 transform -translate-y-1/2 absolute right-full">
					Create a study set
				</ion-label>
			</router-link>
			<router-link class="relative"
				to="/study/flashCards/create">
				<ion-fab-button class="relative" color="primary" size="small">
					<img alt="" class="w-4" src="@app/assets/images/icons/flashCard.png">
				</ion-fab-button>
				<ion-label
					class="px-2 py-1 mr-1.5 w-max bg-white text-xs font-bold shadow-md text-main_dark top-1/2 transform -translate-y-1/2 absolute right-full">
					Create a flashcard
				</ion-label>
			</router-link>
			<router-link class="relative"
				to="/questions/create">
				<ion-fab-button class="relative" color="primary" size="small">
					<ion-icon :icon="helpCircle"></ion-icon>
				</ion-fab-button>
				<ion-label
					class="px-2 py-1 mr-1.5 w-max bg-white text-xs font-bold shadow-md text-main_dark top-1/2 transform -translate-y-1/2 absolute right-full">
					Ask a question
				</ion-label>
			</router-link>
		</ion-fab-list>
	</ion-fab>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonFab, IonFabButton, IonFabList, IonLabel } from '@ionic/vue'
import { add, folder, helpCircle } from 'ionicons/icons'

export default defineComponent({
	name: 'Fab',
	components: { IonFab, IonFabButton, IonFabList, IonLabel },
	setup () {
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

	.active {
		--background: #4D5C6F !important;
	}

	ion-fab-button {
		--background: #546DD3;
		--background-activated: #4D5C6F !important;
		--background-focused: #4D5C6F !important;
		--background-hover: #4D5C6F !important;
	}
</style>
