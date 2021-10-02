<template>
	<ion-page>
		<ion-header mode="ios">
			<ion-toolbar>
				<ion-title>Home</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content :fullscreen="true">
					
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue'

export default  {
	name: 'Home',
	components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage }
}
</script>
<style scoped>
ion-toolbar {
	--background: #ffffff;
}
</style>