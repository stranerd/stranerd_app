import { defineAsyncComponent } from 'vue'
<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="layout-page">
				<div class="layout-body">
					<div class="col-span-12  md:col-start-3 md:col-end-11 px-3 ">
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
					<div class="mb-[60px] col-span-12 md:mb-[80px]">
					</div>
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
const AllQuestions = defineAsyncComponent(() => import('@/application/components/questions/all.vue'))
const SideProfileNav = defineAsyncComponent(() => import('@/application/components/layout/sidebars/SideProfileNav.vue'))

export default  {
	name: 'questions',
	components: { IonPage, IonContent, AllQuestions, SideProfileNav }
}
</script>
<style scoped>
ion-toolbar {
	--background: #ffffff;
}
</style>