<template>
	<ion-fab slot="fixed" class="lg:hidden" horizontal="end" vertical="bottom">
		<ion-fab-button :activated="active" :color="active ? 'danger' : 'primary'" class="z-50 relative"
			@click="active = !active">
			<ion-icon :icon="add"></ion-icon>
		</ion-fab-button>
		<ion-fab-list class="z-50" side="top">
			<router-link class="relative" to="/study/sets/create">
				<ion-fab-button color="secondary" size="small">
					<ion-icon :icon="folder" class="text-lg"></ion-icon>
				</ion-fab-button>
				<ion-text
					class="px-4 py-1 mr-1.5 w-max bg-orange rounded-xl text-xs font-bold shadow-md text-white top-1/2 transform -translate-y-1/2 absolute right-full">
					Create a study set
				</ion-text>
			</router-link>
			<router-link class="relative" to="/study/flashCards/create">
				<ion-fab-button color="tertiary" size="small">
					<ion-icon :icon="flash" class="text-lg"></ion-icon>
				</ion-fab-button>
				<ion-text
					class="px-4 py-1 mr-1.5 w-max text-xs bg-purple rounded-xl font-bold shadow-md text-white top-1/2 transform -translate-y-1/2 absolute right-full">
					Create a flashcard
				</ion-text>
			</router-link>
			<router-link class="relative" to="/study/notes/create">
				<ion-fab-button color="primary" size="small">
					<ion-icon :icon="reader" class="text-lg"></ion-icon>
				</ion-fab-button>
				<ion-text
					class="px-4 py-1 mr-1.5 w-max text-xs bg-primary rounded-xl font-bold shadow-md text-white top-1/2 transform -translate-y-1/2 absolute right-full">
					Upload a note
				</ion-text>
			</router-link>
			<router-link class="relative" to="/questions/create">
				<ion-fab-button color="success" size="small">
					<ion-icon :icon="helpCircle" class="text-xl"></ion-icon>
				</ion-fab-button>
				<ion-text
					class="px-4 py-1 mr-1.5 w-max bg-green rounded-xl text-xs font-bold shadow-md text-white top-1/2 transform -translate-y-1/2 absolute right-full">
					Ask a question
				</ion-text>
			</router-link>
		</ion-fab-list>
	</ion-fab>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonFab, IonFabButton, IonFabList, IonText } from '@ionic/vue'
import { add, flash, folder, helpCircle, reader } from 'ionicons/icons'

export default defineComponent({
	name: 'Fab',
	components: { IonFab, IonFabButton, IonFabList, IonText },
	setup () {
		const active = ref(false)
		return { active, add, helpCircle, flash, folder, reader }
	}
})
</script>
