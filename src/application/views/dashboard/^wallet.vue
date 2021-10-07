<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="w-full lg:w-[84%] lg:ml-[16%] grid grid-cols-12">
				
			</div>		
		</ion-content>
	</ion-page>
</template>

<script lang="ts">

import { IonPage, IonContent } from '@ionic/vue'

export default  {
	name: 'wallet',
	components: { IonPage, IonContent }
}
</script>
<style scoped>
ion-toolbar {
	--background: #ffffff;
}
</style>