<template>
	<!-- fab placed to the bottom start -->
	<ion-fab slot="fixed"  :class="[$route.name == 'TakeTest' ? 'hidden':'', `lg:hidden active`]" horizontal="end" vertical="bottom">

		<ion-fab-button :activated="active" :class="[active ? 'active':'', 'z-50 relative']" @click="active = !active">
			<ion-icon :icon="add"></ion-icon>
		</ion-fab-button>
		<ion-fab-list class="z-50" side="top">
			<!-- <router-link class="relative"
				to="/study">
				<ion-fab-button  color="success" size="small">
					<ion-icon :icon="folder" class="text-lg"></ion-icon>
				</ion-fab-button>
				<ion-label
					class="px-2 py-1 mr-1.5 w-max bg-orange rounded-xl text-xs font-bold shadow-md text-white top-1/2 transform -translate-y-1/2 absolute right-full">
					Create a study set
				</ion-label>
			</router-link> -->
			<router-link class="relative"
				to="/study/flashCards/create">
				<ion-fab-button  color="success" size="small">
					<img alt="" class="w-4" src="@app/assets/images/icons/flashCard-purple.svg">
				</ion-fab-button>
				<ion-label
					class="px-2 py-1 mr-1.5 w-max  text-xs bg-orange rounded-xl  font-bold shadow-md text-white top-1/2 transform -translate-y-1/2 absolute right-full">
					Create a flashcard
				</ion-label>
			</router-link>
			<div class="relative"
				@click="openAskQuestion">
				<ion-fab-button  color="tertiary" size="small">
					<ion-icon :icon="helpCircle" class="text-xl"></ion-icon>
				</ion-fab-button>
				<ion-label
					class="px-2 py-1 mr-1.5 w-max  bg-purple rounded-xl text-xs font-bold shadow-md text-white top-1/2 transform -translate-y-1/2 absolute right-full">
					Ask a question
				</ion-label>
			</div>
			<router-link class="relative"
				to="/study/preps/explore">
				<ion-fab-button  color="secondary" size="small">
					<ion-icon :icon="compass" class="text-xl"></ion-icon>
				</ion-fab-button>
				<ion-label
					class="px-2 py-1 mr-1.5 w-max  bg-green rounded-xl text-xs font-bold shadow-md text-white top-1/2 transform -translate-y-1/2 absolute right-full">
					Explore
				</ion-label>
			</router-link>
		</ion-fab-list>
	</ion-fab>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonFab, IonFabButton, IonFabList, IonLabel } from '@ionic/vue'
import { add, folder, helpCircle, compass } from 'ionicons/icons'
import { useQuestionModal } from '@app/composable/core/modals'

export default defineComponent({
	name: 'Fab',
	components: { IonFab, IonFabButton, IonFabList, IonLabel },
	setup () {
		const openAskQuestion = () => {
			useQuestionModal().openAskQuestion()
		}
		const active = ref(false)
		return {
			openAskQuestion, active, compass,
			add, helpCircle, folder
		}
	}
})

</script>

<style >
.orange{
	--background: #FFA84B !important;
	--color: #ffffff !important;
}
	ion-fab {	
		--background: #546DD3;
		--background-activated: #FF6666 !important;
		--background-focused: #FF6666 !important;
		--background-hover: #FF6666 !important;
	}

	.active {
		--background: #FF6666 !important;
	}

	ion-fab-button {
		--background: #546DD3;
		--background-activated: #FF6666 !important;
		--background-focused: #FF6666 !important;
		--background-hover: #FF6666 !important;
	}
</style>
