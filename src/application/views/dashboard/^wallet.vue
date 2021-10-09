<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="layout-page">
				<div class="layout-body">
					<!-- page contents goes here -->
				</div>
				<div class="layout-side-right">
					<side-profile-nav></side-profile-nav>
				</div>
			</div>		
		</ion-content>
	</ion-page>
</template>

<script lang="ts">

import { IonPage, IonContent } from '@ionic/vue'
import { defineAsyncComponent } from 'vue'
const SideProfileNav = defineAsyncComponent(() => import('@/application/components/layout/sidebars/SideProfileNav.vue'))

export default  {
	name: 'wallet',
	components: { IonPage, IonContent, SideProfileNav }
}
</script>
<style scoped>
ion-toolbar {
	--background: #ffffff;
}
</style>