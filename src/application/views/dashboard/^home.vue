<template>
	<ion-page>
		<ion-content :fullscreen="true" class=" mx-auto">
			<div class="w-full lg:w-[84%] lg:ml-[16%] lg:px-20 relative flex  mt-[64px] md:mt-[74px] flex-row lg:gap-16 lg:mt-[93px]">
				<div class="lg:w-3/4 w-full grid-cols-12 grid lg:mt-6">
					<FeaturedTutors/>
					<RecentQuestions />
					<UpcomingEvent/>
					<RecentTransaction />
				</div>
				<div class="hidden lg:inline-block w-1/4 py-1">
					<side-profile-nav></side-profile-nav>
				</div>
			</div>		
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { IonPage,  IonContent } from '@ionic/vue'
import FeaturedTutors from '@/application/components/dashboard/FeaturedTutors.vue'
import RecentQuestions from '@/application/components/dashboard/RecentQuestions.vue'
import UpcomingEvent from '@/application/components/dashboard/UpcomingEvent.vue'
import RecentTransaction from '@/application/components/dashboard/RecentTransaction.vue'
import { defineAsyncComponent } from 'vue'
const SideProfileNav = defineAsyncComponent(() => import('@/application/components/layout/sideNavigations/SideProfileNav.vue'))



export default  {
	name: 'home',
	components: { IonContent, IonPage,  FeaturedTutors, RecentQuestions, UpcomingEvent, RecentTransaction, SideProfileNav },

}
</script>
