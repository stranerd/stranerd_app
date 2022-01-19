<template>
	<DashboardLayout>
		<div>
			<div v-if="isLoggedIn" class="md:px-4 md:pt-8 pb-24 md:pb-12">
				<StatusBar />
			</div>
			<div class="p-4">
				<ContinueStudy v-if="isLoggedIn" :sliced="true" class="mb-16" />
				<div class="mb-16">
					<div class="w-full flex justify-between mb-4">
						<div class="heading font-bold text-main_dark flex items-center">
							<ion-text class="mr-3">Test Preps</ion-text>
							<ion-badge class="uppercase">Latest</ion-badge>
						</div>
						<router-link class="text-primary text-body flex items-center font-bold" to="/explore/preps">
							explore
						</router-link>
					</div>
					<TestPrepList :sliced="true" />
				</div>
				<RecentQuestions class="mb-16" />
				<div class="mb-16">
					<div class="w-full flex justify-between mb-4">
						<div class="heading font-bold text-main_dark flex items-center">
							<ion-text class="mr-3">Notes</ion-text>
							<ion-badge class="uppercase">Latest</ion-badge>
						</div>
						<router-link class="text-primary text-body flex items-center font-bold" to="/explore/notes">
							explore
						</router-link>
					</div>
					<NotesList :sliced="true" />
				</div>
				<div v-if="false" class="mb-16">
					<div class="w-full flex justify-between mb-4">
						<div class="heading font-bold text-main_dark flex items-center">
							<ion-text class="mr-3">Videos</ion-text>
							<ion-badge class="uppercase">Latest</ion-badge>
						</div>
						<router-link class="text-primary text-body flex items-center font-bold" to="/explore/videos">
							explore
						</router-link>
					</div>
					<VideosList :sliced="true" />
				</div>
				<div>
					<div class="w-full flex justify-between mb-4">
						<div class="heading font-bold text-main_dark flex items-center">
							<ion-text class="mr-3">FlashCards</ion-text>
							<ion-badge class="uppercase">Latest</ion-badge>
						</div>
						<router-link class="text-primary text-body flex items-center font-bold"
							to="/explore/flashCards">
							explore
						</router-link>
					</div>
					<FlashCardList :sliced="true" />
				</div>
			</div>
		</div>
	</DashboardLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import StatusBar from '@app/components/dashboard/StatusBar.vue'
import TestPrepList from '@app/components/study/testPreps/ExploreTestPrepsList.vue'
import NotesList from '@app/components/study/notes/ExploreNotesList.vue'
import VideosList from '@app/components/study/videos/ExploreVideosList.vue'
import FlashCardList from '@app/components/study/flashCards/ExploreFlashCardsList.vue'
import RecentQuestions from '@app/components/questions/questions/RecentQuestions.vue'
import ContinueStudy from '@app/components/study/tests/ContinueTests.vue'
import { useAuth } from '@app/composable/auth/auth'
import { IonBadge } from '@ionic/vue'

export default defineComponent({
	name: 'Dashboard',
	components: {
		IonBadge,
		DashboardLayout,
		RecentQuestions,
		ContinueStudy,
		TestPrepList,
		NotesList,
		VideosList,
		FlashCardList,
		StatusBar
	},
	setup () {
		const { isLoggedIn } = useAuth()
		return { isLoggedIn }
	}
})
</script>
