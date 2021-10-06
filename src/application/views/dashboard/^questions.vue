import { defineAsyncComponent } from 'vue'
<template>
	<ion-page>
		<top-bar></top-bar>
		<ion-content :fullscreen="true">
					
		</ion-content>
	</ion-page>
</template>

<script lang="ts">

import { IonPage, IonContent } from '@ionic/vue'
import { defineAsyncComponent } from 'vue'
const TopBar = defineAsyncComponent(() => import('@/application/components/layout/topNavigations/Topbar.vue'))


export default  {
	name: 'questions',
	components: { TopBar, IonPage, IonContent }
}
</script>
<style scoped>
ion-toolbar {
	--background: #ffffff;
}
</style>