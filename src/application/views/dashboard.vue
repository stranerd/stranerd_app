<template>
	<DashboardLayout>
		<div class="md:p-4 flex flex-col gap-4 md:gap-6">
			<StatusBar v-if="isLoggedIn" />
			<activity-view class="border-bottom-line"/>
			<div class="border-bottom-line">
				<div class="w-full flex justify-between md:mb-4 px-4 md:px-0">
					<div class="text-main_dark flex items-center">
						<ion-text class="text-heading font-bold mr-3">FlashCards</ion-text>
						<ion-text class="text-orange flex items-center">
							<div class="h-1 w-1 bg-orange mr-2 rounded-full" />
							Latest
						</ion-text>
					</div>
					<router-link class="text-primary flex items-center font-normal"
						to="/explore/flashCards">
						explore
					</router-link>
				</div>
				<FlashCardList :sliced="true" />
			</div>
			<div class="border-bottom-line">
				<div class="w-full flex justify-between md:mb-4 px-4 md:px-0">
					<div class="text-main_dark flex items-center">
						<ion-text class="text-heading font-bold mr-3">Notes</ion-text>
						<ion-text class="text-orange flex items-center">
							<div class="h-1 w-1 bg-orange mr-2 rounded-full" />
							Latest
						</ion-text>
					</div>
					<router-link class="text-primary flex items-center font-normal" to="/explore/notes">
						explore
					</router-link>
				</div>
				<NotesList :sliced="true" />
			</div>
			<div class="border-bottom-line">
				<div class="w-full flex justify-between md:mb-4 px-4 md:px-0">
					<div class="text-main_dark flex items-center">
						<ion-text class="text-heading font-bold mr-3">Videos</ion-text>
						<ion-text class="text-orange flex items-center">
							<div class="h-1 w-1 bg-orange mr-2 rounded-full" />
							Latest
						</ion-text>
					</div>
					<router-link class="text-primary flex items-center font-normal" to="/explore/videos">
						explore
					</router-link>
				</div>
				<VideosList :sliced="true" />
			</div>
		</div>
	</DashboardLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import StatusBar from '@app/components/dashboard/StatusBar.vue'
import NotesList from '@app/components/study/notes/ExploreNotesList.vue'
import VideosList from '@app/components/study/videos/ExploreVideosList.vue'
import FlashCardList from '@app/components/study/flashCards/ExploreFlashCardsList.vue'
import { useAuth } from '@app/composable/auth/auth'
import ActivityView from '../components/dashboard/ActivityView.vue'

export default defineComponent({
	name: 'Dashboard',
	displayName: 'Dashboard',
	components: {
		DashboardLayout,
		NotesList,
		VideosList,
		FlashCardList,
		StatusBar,
		ActivityView
	},
	setup () {
		const { isLoggedIn } = useAuth()
		return { isLoggedIn }
	}
})
</script>
