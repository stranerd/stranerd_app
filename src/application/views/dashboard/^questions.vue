import { defineAsyncComponent } from 'vue'
<template>
	<ion-page class="pt-8">
		<ion-content :fullscreen="true">
			<div class="mx-auto min-w-[48%] max-w-[550px] px-3">
				<div class="bg-light_gray rounded-md flex flex-row items-center">
					<button class="py-3 px-3 text-xs md:text-sm  font-semibold text-white bg-icon_inactive rounded-md w-1/2">
						All questions
					</button>
					<button class="py-3 px-3 text-xs md:text-sm  font-semibold bg-light_gray text-dark_gray rounded-md w-1/2">
						Ask your question
					</button>
				</div>
			</div>
			<all-questions></all-questions>
			
		
			
		</ion-content>
	</ion-page>
</template>

<script lang="ts">

import { IonPage, IonContent } from '@ionic/vue'
import { defineAsyncComponent } from 'vue'
const AllQuestions = defineAsyncComponent(() => import('@/application/components/questions/all.vue'))

export default  {
	name: 'questions',
	components: { IonPage, IonContent, AllQuestions }
}
</script>
<style scoped>
ion-toolbar {
	--background: #ffffff;
}
</style>