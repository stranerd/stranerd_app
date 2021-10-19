<template>
	<ion-page>
		<ion-content :fullscreen="true">
			<div class="layout-page-nosidebars normalText ">
				<div class="w-full grid grid-cols-12" >
					<top-session></top-session>

					<div class="col-span-12 grid grid-cols-12 md:col-start-2 md:col-end-12 lg:col-start-4 lg:col-end-10">
						<template v-if="selectedTab == 'dashboard'">
							<dashboard></dashboard>
						</template>
						<template v-if="selectedTab == 'questions'">
							<questions></questions>
						</template>
						<template v-if="selectedTab == 'reviews'">
							<reviews></reviews>
						</template>
						<template v-if="selectedTab == 'answers'">
							<answers></answers>
						</template>
						<template v-if="selectedTab == 'bio'">
							<bio></bio>
						</template>
						<template v-if="selectedTab == 'settings'">
							<settings></settings>
						</template>
						<template v-if="selectedTab == 'achievements'">
							<achievements></achievements>
						</template>
					</div>
					
				</div> 
			</div>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">

import { IonPage, IonContent } from '@ionic/vue'
import { defineAsyncComponent } from 'vue'
const topSession = defineAsyncComponent(() => import('@/application/components/profile/topSession.vue'))
const Dashboard = defineAsyncComponent(() => import('@/application/components/profile/dashboard.vue'))
const Questions = defineAsyncComponent(() => import('@/application/components/profile/questions.vue'))
const Reviews = defineAsyncComponent(() => import('@/application/components/profile/reviews.vue'))
const Answers = defineAsyncComponent(() => import('@/application/components/profile/answers.vue'))
const Bio = defineAsyncComponent(() => import('@/application/components/profile/bio.vue'))
const Settings = defineAsyncComponent(() => import('@/application/components/profile/settings.vue'))
const Achievements = defineAsyncComponent(() => import('@/application/components/profile/achievements.vue'))
import { star } from 'ionicons/icons'
import { useRouter } from 'vue-router'
import { selectedTab } from '@/application/composable/profile'

export default  {
	name: 'profileDashboard',
	components: { IonPage, IonContent, topSession, Dashboard, Questions, Reviews, Answers, Bio, Settings, Achievements},
	setup() {
		const router = useRouter()

		return {
			router,
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