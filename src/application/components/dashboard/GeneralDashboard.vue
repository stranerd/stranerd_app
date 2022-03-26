<template>
	<div class="flex flex-col gap-4 md:gap-6">
		<div class="border-bottom-line">
			<div class="w-full flex justify-between md:mb-4 px-4 md:px-0">
				<div class="text-main_dark flex items-center">
					<ion-text class="text-base font-bold">Activity</ion-text>
				</div>
			</div>

			<div class="showcase2">
				<DashboardCard :icon="rocketOutline"
					:title="`${formatNumber(user?.account.streak.longestStreak)} ${pluralize(user?.account.streak.longestStreak, 'day', 'days')}`"
					iconClass="text-orange" subtitle="Longest streak" />
			</div>
		</div>
		<div class="border-bottom-line">
			<div class="w-full flex justify-between md:mb-4 px-4 md:px-0">
				<div class="text-main_dark flex items-center">
					<ion-text class="text-base font-bold">Study materials</ion-text>
				</div>
			</div>

			<div class="showcase2">
				<DashboardCard :icon="documentOutline"
					:subtitle="`${pluralize(user?.meta.notes, 'Note', 'Notes')} uploaded`"
					:title="formatNumber(user?.meta.notes)"
					iconClass="text-pink" />
				<DashboardCard :icon="copyOutline"
					:subtitle="`${pluralize(user?.meta.flashCards, 'Flashcard', 'Flashcards')} created`"
					:title="formatNumber(user?.meta.flashCards)"
					iconClass="text-purple" />
				<DashboardCard :icon="playCircleOutline"
					:subtitle="`${pluralize(user?.meta.videos, 'Video', 'Videos')} added`"
					:title="formatNumber(user?.meta.videos)" iconClass="text-orange" />
				<DashboardCard :icon="folderOutline"
					:subtitle="`${pluralize(user?.meta.sets, 'Folder', 'Folders')} created`"
					:title="formatNumber(user?.meta.sets)"
					iconClass="text-blue" />
			</div>
		</div>
		<div>
			<div class="w-full flex justify-between md:mb-4 px-4 md:px-0">
				<div class="text-main_dark flex items-center">
					<ion-text class="text-base font-bold">Qs & As</ion-text>
				</div>
			</div>

			<div class="showcase2">
				<DashboardCard :icon="helpCircleOutline" :title="formatNumber(user?.meta.questions)"
					iconClass="text-green" subtitle="Questions asked" />
				<DashboardCard :icon="readerOutline" :title="formatNumber(user?.meta.answers)"
					iconClass="text-blue" subtitle="Questions answered" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
	copyOutline,
	documentOutline,
	folderOutline,
	helpCircleOutline,
	playCircleOutline,
	readerOutline,
	rocketOutline,
	timeOutline
} from 'ionicons/icons'
import DashboardCard from './DashboardCard.vue'
import { formatNumber, pluralize } from '@utils/commons'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'GeneralDashboard',
	components: { DashboardCard },
	setup () {
		const { user } = useAuth()
		return {
			rocketOutline, timeOutline, helpCircleOutline, readerOutline,
			copyOutline, documentOutline, playCircleOutline, folderOutline,
			user, formatNumber, pluralize
		}
	}
})
</script>
