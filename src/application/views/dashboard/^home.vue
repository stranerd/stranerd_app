<template>
	<ion-page>
		<ion-content :fullscreen="true" class=" mx-auto">	
			<div class="layout-page">
				<div class="layout-body">
					<div class="col-span-12 px-3 mb-14 md:px-5">
						<ChallengesCard class="lg:hidden"/>
						<FeaturedTutors/>
						<RecentQuestions />
						<UpcomingEvent/>
						<RecentTransaction />
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
import { IonPage,  IonContent } from '@ionic/vue'
import FeaturedTutors from '@/application/components/dashboard/FeaturedTutors.vue'
import RecentQuestions from '@/application/components/dashboard/RecentQuestions.vue'
import UpcomingEvent from '@/application/components/dashboard/UpcomingEvent.vue'
import RecentTransaction from '@/application/components/dashboard/RecentTransaction.vue'
import { defineAsyncComponent } from 'vue'
import ChallengesCard from '@/application/components/dashboard/Challenges.vue'
const SideProfileNav = defineAsyncComponent(() => import('@/application/components/layout/sidebars/SideProfileNav.vue'))

export default  {
	name: 'home',
	layout: 'Dashboard',
	components: { IonContent, IonPage,  FeaturedTutors, RecentQuestions, UpcomingEvent, RecentTransaction, SideProfileNav, ChallengesCard },

}
</script>
