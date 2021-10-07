<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="w-full lg:w-[84%] lg:ml-[16%] lg:px-20 relative flex  mt-[64px] md:mt-[74px] flex-row lg:gap-16 lg:mt-[93px]">
				<div class="lg:w-3/4 w-full grid-cols-12 grid lg:mt-6">
					<!-- page contents goes here -->
				</div>
				<div class="hidden lg:inline-block w-1/4 py-1">
					<side-profile-nav></side-profile-nav>
				</div>
			</div>		
		</ion-content>
	</ion-page>
</template>

<script lang="ts">

import { IonPage, IonContent } from '@ionic/vue'
import { defineAsyncComponent } from 'vue'
const SideProfileNav = defineAsyncComponent(() => import('@/application/components/layout/sideNavigations/SideProfileNav.vue'))

export default  {
	name: 'profile',
	components: { IonPage, IonContent, SideProfileNav }
}
</script>
<style scoped>
ion-toolbar {
	--background: #ffffff;
}
</style>