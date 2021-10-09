<template>
	<ion-page class="pt-8">
		<ion-content :fullscreen="true">
			<div class="mx-auto min-w-[48%] max-w-[550px] px-3">
				<div class="bg-light_gray rounded-md flex flex-row items-center">
					<button class="py-3 px-3 text-xs md:text-sm  font-semibold text-white bg-icon_inactive rounded-md w-1/2">
						Explore tutors
					</button>
					<button class="py-3 px-3 text-xs md:text-sm  font-semibold bg-light_gray text-dark_gray rounded-md w-1/2 ">
						Find a tutor
					</button>
				</div>
			</div>
			<ExploreTutors/>
					
		</ion-content>
	</ion-page>
</template>

<script lang="ts">

import { IonPage, IonContent } from '@ionic/vue'
import { defineAsyncComponent } from 'vue'
import ExploreTutors from '@/application/components/tutors/ExploreTutors.vue'

export default  {
	name: 'tutors',
	components: { IonPage, IonContent, ExploreTutors,  }
}
</script>
<style scoped>
ion-toolbar {
	--background: #ffffff;
}
</style>