<template>
	<ion-page>
		<top-bar></top-bar>
		<ion-content :fullscreen="true">
					
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { defineAsyncComponent } from 'vue'

import { IonPage, IonContent } from '@ionic/vue'
const TopBar = defineAsyncComponent(() => import('@/application/components/layout/topNavigations/Topbar.vue'))

export default  {
	name: 'profile',
	components: { TopBar, IonPage, IonContent }
}
</script>
<style scoped>
ion-toolbar {
	--background: #ffffff;
}
</style>