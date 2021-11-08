<template>
	<IonPage>
		<IonContent>
			<div class="col-span-12 px-3 mb-14 md:px-5">
				<!-- <ChallengesCard class="lg:hidden"/> -->
				<FeaturedTutors />
				<RecentQuestions />
				<UpcomingEvent />
				<RecentTransaction />
			</div>
		</IonContent>
	</IonPage>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonContent, IonPage } from '@ionic/vue'
import FeaturedTutors from '@app/components/dashboard/FeaturedTutors.vue'
import RecentQuestions from '@app/components/dashboard/RecentQuestions.vue'
import UpcomingEvent from '@app/components/dashboard/UpcomingEvent.vue'
import RecentTransaction from '@app/components/dashboard/RecentTransaction.vue'
// import ChallengesCard from '@app/components/dashboard/Challenges.vue'

export default defineComponent({
	name: 'DashboardHomePage',
	layout: 'dashboard',
	components: {
		IonPage,
		IonContent,
		FeaturedTutors,
		RecentQuestions,
		UpcomingEvent,
		RecentTransaction
	}
})
</script>
