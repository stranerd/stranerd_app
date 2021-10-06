import { defineAsyncComponent } from 'vue'
<template>
	<ion-page>
		<top-bar></top-bar>
		<ion-content :fullscreen="true">
			<div class="w-full px-3 mt-[64px]">
				<div class="bg-light_gray rounded-md flex flex-row items-center">
					<button class="py-3 px-3 text-xs font-semibold text-white bg-icon_inactive rounded-md w-1/2">
						All questions
					</button>
					<button class="py-3 px-3 text-xs font-semibold bg-light_gray text-dark_gray rounded-md w-1/2">
						Ask your question
					</button>
				</div>
			</div>
			<all-questions></all-questions>
			<div class="mb-[60px]">
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">

import { IonPage, IonContent } from '@ionic/vue'
import { defineAsyncComponent } from 'vue'
const TopBar = defineAsyncComponent(() => import('@/application/components/nav/Topbar.vue'))
const AllQuestions = defineAsyncComponent(() => import('@/application/components/questions/all.vue'))

export default  {
	name: 'questions',
	components: { TopBar, IonPage, IonContent, AllQuestions }
}
</script>
<style scoped>
ion-toolbar {
	--background: #ffffff;
}
</style>