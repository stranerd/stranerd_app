<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>Questions</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
			<div class="grid grid-col-6 px-3 py-4">
				<div class="flex flex-row items-center justify-center col-span-6">
					<button class="w-1/2 py-2 px-2 font-medium text-center text-sm text-white rounded-lg customShadow bg-primary">
						Answer
					</button>
					<button class="w-1/2 py-2 px-2 font-medium border border-gray-400 text-center text-sm text-primary customShadow rounded-lg bg-white">
						Ask
					</button>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue'

export default  {
	name: 'Questions',
	components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
}
</script>
<style scoped>
ion-toolbar {
	--background: #ffffff;
}

.customShadow {
	 box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
}
</style>