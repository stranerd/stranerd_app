<template>
	<ion-page class="pt-8">
		<ion-content :fullscreen="true">
			<div class="layout-page">
				<div class="layout-body">
					<!-- page contents goes here -->
					<div class="col-span-12  md:col-start-3 md:col-end-11 px-3 ">
						<div class="bg-light_gray rounded-md flex flex-row items-center">
							<button class="py-3 px-3 text-xs md:text-sm  font-semibold text-white bg-icon_inactive rounded-md w-1/2">
								Explore tutors
							</button>
							<button class="py-3 px-3 text-xs md:text-sm  font-semibold bg-light_gray text-dark_gray rounded-md w-1/2">
								Find a tutor
							</button>
						</div>
					</div>

					<ExploreTutors/>
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
import ExploreTutors from '@/application/components/tutors/ExploreTutors.vue'

export default  {
	name: 'tutors',
	components: { IonPage, IonContent, SideProfileNav , ExploreTutors}
}
</script>
<style scoped>
ion-toolbar {
	--background: #ffffff;
}
</style>