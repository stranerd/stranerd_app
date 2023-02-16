<template>
	<div v-if="user" class="showcase-flex">
		<div class="border-bottom-line card card-padding">
			<div class="w-full flex justify-between">
				<IonText class="font-bold">Activity</IonText>
			</div>

			<div class="showcase2">
				<DashboardCard :icon="flameOutline"
					:title="`${user ? formatNumber(user.account.streak.count) : 'N/A'} ${pluralize(user.account.streak.count, 'day', 'days')}`"
					iconClass="text-warning" subtitle="Current streak" />
				<DashboardCard :icon="rocketOutline"
					:title="`${user ? formatNumber(user.account.streak.longestStreak) : 'N/A'} ${pluralize(user.account.streak.longestStreak, 'day', 'days')}`"
					iconClass="text-warning" subtitle="Longest streak" />
			</div>
		</div>
		<div class="border-bottom-line card card-padding">
			<div class="w-full flex justify-between">
				<IonText class="font-bold">Questions</IonText>
			</div>

			<div class="showcase2">
				<DashboardCard :icon="helpCircleOutline" :title="user ? formatNumber(user.meta.questions) : 'N/A'"
					subtitle="Questions" />
				<DashboardCard :icon="readerOutline" :title="user ? formatNumber(user.meta.answers) : 'N/A'"
					subtitle="Answers" />
				<DashboardCard :icon="checkmarkCircleOutline"
					:title="user ? formatNumber(user.meta.bestAnswers) : 'N/A'" subtitle="Best answers" />
			</div>
		</div>

		<div class="border-bottom-line card card-padding">
			<div class="w-full flex justify-between">
				<IonText class="font-bold">Study materials</IonText>
			</div>

			<div class="showcase2">
				<DashboardCard :icon="documentOutline"
					:subtitle="`${pluralize(user.meta.notes, 'Note', 'Notes')} uploaded`"
					:title="user ? formatNumber(user.meta.notes) : 'N/A'" />
				<DashboardCard :icon="flashOutline"
					:subtitle="`${pluralize(user.meta.flashCards, 'Flashcard', 'Flashcards')} created`"
					:title="user? formatNumber(user.meta.flashCards) : 'N/A'" />
				<DashboardCard :icon="folderOutline"
					:subtitle="`${pluralize(user.meta.sets, 'Folder', 'Folders')} created`"
					:title="user ? formatNumber(user.meta.sets) : 'N/A'" />
			</div>
		</div>

		<div class="border-bottom-line card card-padding">
			<div class="w-full flex justify-between">
				<IonText class="font-bold">Tests</IonText>
			</div>

			<div class="showcase2">
				<DashboardCard :icon="receiptOutline" :title="formatNumber(timedTests.length)" subtitle="Tests taken" />
				<DashboardCard :icon="checkmarkCircleOutline"
					:title="`${formatNumber(passed.length)}/${formatNumber(timedTests.length)}`"
					subtitle="Tests passed" />
				<DashboardCard :icon="schoolOutline" :title="`${formatNumber(averageScore, 2)}%`"
					subtitle="Average grade" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import {
	checkmarkCircleOutline,
	documentOutline,
	flameOutline,
	flashOutline,
	folderOutline,
	helpCircleOutline,
	readerOutline,
	receiptOutline,
	rocketOutline,
	schoolOutline
} from 'ionicons/icons'
import DashboardCard from './DashboardCard.vue'
import { formatNumber, pluralize } from '@utils/commons'
import { divideByZero } from 'valleyed'
import { useAuth } from '@app/composable/auth/auth'
import { useTestList } from '@app/composable/study/tests'

const { user } = useAuth()
const { tests } = useTestList()
const timedTests = computed(() => tests.value.filter((test) => test.isTimed))
const passed = computed(() => timedTests.value.filter((test) => test.passed))
const averageScore = computed(() => divideByZero(timedTests.value.reduce((acc, cur) => acc + cur.score, 0), timedTests.value.length))
</script>
