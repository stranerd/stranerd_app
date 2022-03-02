<template>
	<DashboardLayout>
		<div>
			<div v-if="isLoggedIn" class="md:px-4 md:pt-8 pb-0 ">
				<StatusBar />
			</div>
			<div class="md:p-4">
				<ContinueStudy v-if="isLoggedIn" :sliced="true" class="pb-4" />
				<div class="py-4 border-b border-new_gray">
					<div class="w-full flex justify-between mb-4 px-4 md:px-0">
						<div class="heading font-bold text-main_dark flex items-center">
							<ion-text class="mr-3">Test Preps</ion-text>
							<ion-text class="text-orange font-normal flex items-center text-body">
								<div class="h-1 w-1 bg-orange mr-2 rounded-full"/>
								Latest</ion-text>
						</div>
						<router-link class="text-primary text-body flex items-center font-normal" to="/explore/preps">
							explore
						</router-link>
					</div>
					<TestPrepList :sliced="true" />
				</div>
				<RecentQuestions class="py-4 border-b border-new_gray" />
				<div  class="py-4 border-b border-new_gray">
					<div class="w-full flex justify-between mb-4 px-4 md:px-0">
						<div class="heading font-bold text-main_dark flex items-center">
							<ion-text class="mr-3">FlashCards</ion-text>
							<ion-text class="text-orange font-normal flex items-center text-body">
								<div class="h-1 w-1 bg-orange mr-2 rounded-full"/>
								Latest</ion-text>
						</div>
						<router-link class="text-primary text-body flex items-center font-normal"
							to="/explore/flashCards">
							explore
						</router-link>
					</div>
					<FlashCardList :sliced="true" />
				</div>
				<div class="py-4 border-b border-new_gray">
					<div class="w-full flex justify-between mb-4 px-4 md:px-0">
						<div class="heading font-bold text-main_dark flex items-center">
							<ion-text class="mr-3">Notes</ion-text>
							<ion-text class="text-orange font-normal flex items-center text-body">
								<div class="h-1 w-1 bg-orange mr-2 rounded-full"/>
								Latest</ion-text>
						</div>
						<router-link class="text-primary text-body flex items-center font-normal" to="/explore/notes">
							explore
						</router-link>
					</div>
					<NotesList :sliced="true" />
				</div>
				<div class="py-4 border-b border-new_gray">
					<div class="w-full flex justify-between mb-4 px-4 md:px-0">
						<div class="heading font-bold text-main_dark flex items-center">
							<ion-text class="mr-3">Videos</ion-text>
							<ion-text class="text-orange font-normal flex items-center text-body">
								<div class="h-1 w-1 bg-orange mr-2 rounded-full"/>
								Latest</ion-text>
						</div>
						<router-link class="text-primary text-body flex items-center font-normal" to="/explore/videos">
							explore
						</router-link>
					</div>
					<VideosList :sliced="true" />
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


export default defineComponent({
	name: 'Dashboard',
	displayName: 'Dashboard',
	components: {
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
