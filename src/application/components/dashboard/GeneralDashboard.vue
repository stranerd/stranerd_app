<template>
	<div class="flex flex-col gap-4 md:gap-6 mt-6">
		<div v-if="user && !user.school"
			class="border-bottom-line flex justify-between items-center md:bg-white p-4 md:rounded-xl md:pt-4 pt-0">
			<span class="font-semibold">Complete your account set up</span>
			<router-link to="/settings/account">
				<IonIcon :icon="arrowForwardOutline" class="text-heading" />
			</router-link>
		</div>
		<div class="border-bottom-line py-2">
			<div class="w-full flex justify-between md:mb-4 px-4 md:px-0">
				<ion-text class="font-bold">Activity</ion-text>
			</div>

			<div class="showcase2">
				<DashboardCard :icon="flameOutline"
					:title="`${user ? formatNumber(user?.account.streak.count) : 'N/A'} ${pluralize(user?.account.streak.count, 'day', 'days')}`"
					iconClass="text-warning" subtitle="Current streak" />
				<DashboardCard :icon="rocketOutline"
					:title="`${user ? formatNumber(user?.account.streak.longestStreak) : 'N/A'} ${pluralize(user?.account.streak.longestStreak, 'day', 'days')}`"
					iconClass="text-warning" subtitle="Longest streak" />
			</div>
		</div>
		<div class="border-bottom-line py-2">
			<div class="w-full flex justify-between md:mb-4 px-4 md:px-0">
				<ion-text class="font-bold">Questions</ion-text>
			</div>

			<div class="showcase2">
				<DashboardCard :icon="helpCircleOutline" :title="user ? formatNumber(user?.meta.questions) : 'N/A'"
					subtitle="Questions" />
				<DashboardCard :icon="readerOutline" :title="user ? formatNumber(user?.meta.answers) : 'N/A'"
					subtitle="Answers" />
				<DashboardCard :icon="checkmarkCircleOutline"
					:title="user ? formatNumber(user?.meta.bestAnswers) : 'N/A'" subtitle="Best answers" />
			</div>
		</div>

		<div>
			<div class="w-full flex justify-between md:mb-4 px-4 md:px-0">
				<ion-text class="font-bold">Study materials</ion-text>
			</div>

			<div class="showcase2">
				<DashboardCard :icon="documentOutline"
					:subtitle="`${pluralize(user?.meta.files, 'File', 'Files')} uploaded`"
					:title="user ? formatNumber(user?.meta.files) : 'N/A'" />
				<DashboardCard :icon="flashOutline"
					:subtitle="`${pluralize(user?.meta.flashCards, 'Flashcard', 'Flashcards')} created`"
					:title="user? formatNumber(user?.meta.flashCards) : 'N/A'" />
				<DashboardCard :icon="folderOutline"
					:subtitle="`${pluralize(user?.meta.sets, 'Folder', 'Folders')} created`"
					:title="user ? formatNumber(user?.meta.sets) : 'N/A'" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
	arrowForwardOutline,
	checkmarkCircleOutline,
	copyOutline,
	documentOutline,
	flameOutline,
	flashOutline,
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
			copyOutline, documentOutline, playCircleOutline, folderOutline, checkmarkCircleOutline,
			user, formatNumber, pluralize, flameOutline, flashOutline
		}
	}
})
</script>
