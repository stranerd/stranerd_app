<template>
	<div class="flex flex-col gap-4 md:gap-6">
		<div v-if="user && !user.school"
			class="border-bottom-line flex justify-between items-center md:bg-white p-4 md:rounded-xl md:pt-4 pt-0">
			<span class="font-semibold">Complete your account set up</span>
			<router-link to="/settings/account">
				<IonIcon :icon="arrowForwardOutline" class="text-heading" />
			</router-link>
		</div>
		<div class="border-bottom-line">
			<div class="w-full flex justify-between md:mb-4 px-4 md:px-0">
				<div class="text-main_dark flex items-center">
					<ion-text class="text-base font-bold">Activity</ion-text>
				</div>
			</div>

			<div class="showcase2">
				<DashboardCard :icon="rocketOutline"
					:title="`${user ? formatNumber(user?.account.streak.count) : 'N/A'} ${pluralize(user?.account.streak.count, 'day', 'days')}`"
					iconClass="text-orange" subtitle="Current streak" />
				<DashboardCard :icon="rocketOutline"
					:title="`${user ? formatNumber(user?.account.streak.longestStreak) : 'N/A'} ${pluralize(user?.account.streak.longestStreak, 'day', 'days')}`"
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
					:title="user ? formatNumber(user?.meta.notes) : 'N/A'" iconClass="text-pink" />
				<DashboardCard :icon="copyOutline"
					:subtitle="`${pluralize(user?.meta.flashCards, 'Flashcard', 'Flashcards')} created`"
					:title="user? formatNumber(user?.meta.flashCards) : 'N/A'" iconClass="text-purple" />
				<DashboardCard :icon="playCircleOutline"
					:subtitle="`${pluralize(user?.meta.videos, 'Video', 'Videos')} added`"
					:title="user ? formatNumber(user?.meta.videos) : 'N/A'" iconClass="text-orange" />
				<DashboardCard :icon="folderOutline"
					:subtitle="`${pluralize(user?.meta.sets, 'Folder', 'Folders')} created`"
					:title="user ? formatNumber(user?.meta.sets) : 'N/A'" iconClass="text-blue" />
			</div>
		</div>
		<div>
			<div class="w-full flex justify-between md:mb-4 px-4 md:px-0">
				<div class="text-main_dark flex items-center">
					<ion-text class="text-base font-bold">Qs & As</ion-text>
				</div>
			</div>

			<div class="showcase2">
				<DashboardCard :icon="helpCircleOutline" :title="user ? formatNumber(user?.meta.questions) : 'N/A'"
					iconClass="text-green" subtitle="Questions asked" />
				<DashboardCard :icon="readerOutline" :title="user ? formatNumber(user?.meta.answers) : 'N/A'"
					iconClass="text-blue" subtitle="Questions answered" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
	arrowForwardOutline,
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
			arrowForwardOutline, rocketOutline, timeOutline, helpCircleOutline, readerOutline,
			copyOutline, documentOutline, playCircleOutline, folderOutline,
			user, formatNumber, pluralize
		}
	}
})
</script>