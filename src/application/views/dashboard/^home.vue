<template>
	<ion-page>
		<ion-content :fullscreen="true" class=" mx-auto">
			<div class="layout-page">
				<div class="layout-body">
					<div class="col-span-12 px-3 mb-14 md:px-5">
						<!-- <ChallengesCard class="lg:hidden"/> -->
						<FeaturedTutors />
						<RecentQuestions />
						<UpcomingEvent />
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
import { IonContent, IonPage } from '@ionic/vue'
import FeaturedTutors from '@app/components/dashboard/FeaturedTutors.vue'
import RecentQuestions from '@app/components/dashboard/RecentQuestions.vue'
import UpcomingEvent from '@app/components/dashboard/UpcomingEvent.vue'
import RecentTransaction from '@app/components/dashboard/RecentTransaction.vue'
import { defineAsyncComponent } from 'vue'
// import ChallengesCard from '@app/components/dashboard/Challenges.vue'
const SideProfileNav = defineAsyncComponent(() => import('@app/components/layout/sidebars/SideProfileNav.vue'))

export default {
	name: 'home',
	layout: 'dashboard',
	components: {
		IonContent,
		IonPage,
		FeaturedTutors,
		RecentQuestions,
		UpcomingEvent,
		RecentTransaction,
		SideProfileNav
	}

}
</script>
