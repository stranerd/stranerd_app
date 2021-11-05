<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="layout-page-nosidebars normalText ">
				<div class="w-full grid grid-cols-12 mt-12">
					<top-session :userId="id"></top-session>

					<div
						class="col-span-12 grid grid-cols-12 md:col-start-2 md:col-end-12 lg:col-start-4 lg:col-end-10">
						<template v-if="selectedTab == '#dashboard'">
							<dashboard :userId="id"></dashboard>
						</template>
						<template v-if="selectedTab == '#questions'">
							<questions :userId="id"></questions>
						</template>
						<!-- <template v-if="selectedTab == '#reviews'">
							<reviews :userId="id"></reviews>
						</template> -->
						<template v-if="selectedTab == '#answers'">
							<answers :userId="id"></answers>
						</template>
						<template v-if="selectedTab == '#bio'">
							<bio :userId="id"></bio>
						</template>
						<template v-if="selectedTab == '#settings'">
							<settings :userId="id"></settings>
						</template>
						<!-- <template v-if="selectedTab == '#achievements'">
							<achievements :userId="id"></achievements>
						</template> -->
					</div>

				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">

import { IonContent, IonPage } from '@ionic/vue'
import { defineAsyncComponent } from 'vue'
// const Achievements = defineAsyncComponent(() => import('@app/components/profile/achievements.vue'))
import { star } from 'ionicons/icons'
import { useRoute } from 'vue-router'
import { selectedTab } from '@app/composable/profile'

const topSession = defineAsyncComponent(() => import('@app/components/profile/topSession.vue'))
const Dashboard = defineAsyncComponent(() => import('@app/components/profile/dashboard.vue'))
const Questions = defineAsyncComponent(() => import('@app/components/profile/questions.vue'))
const Reviews = defineAsyncComponent(() => import('@app/components/profile/reviews.vue'))
const Answers = defineAsyncComponent(() => import('@app/components/profile/UserAnswerList.vue'))
const Bio = defineAsyncComponent(() => import('@app/components/profile/bio.vue'))
const Settings = defineAsyncComponent(() => import('@app/components/profile/settings.vue'))

export default {
	name: 'profileDashboard',
	middlewares: ['isAuthenticated'],
	layout: 'Justified',
	displayName: 'Profile',
	components: { IonPage, IonContent, topSession, Dashboard, Questions, Answers, Bio, Settings },
	setup () {

		const { id } = useRoute().params
		selectedTab.value = useRoute().hash

		return {
			id,
			star,
			selectedTab
		}
	}
}
</script>
<style scoped>
	ion-toolbar {
		--background: #F7F7FC;
	}

</style>
