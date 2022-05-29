<template>
	<div v-if="institution" class="flex flex-col gap-4 md:gap-6">
		<div class="border-bottom-line">
			<div class="w-full flex justify-between md:mb-4 px-4 md:px-0">
				<div class="text-secondaryText flex items-center">
					<IonText class="text-base font-bold">Details</IonText>
				</div>
			</div>

			<div class="showcase2">
				<DashboardCard :icon="receiptOutline" :title="institution.name.toUpperCase()" iconClass="text-blue"
					subtitle="Exam" />
				<DashboardCard :icon="calendarOutline" :title="formatTime(exam.startDate, true)" iconClass="text-green"
					subtitle="Exam date" />
				<DashboardCard :icon="timeOutline"
					:title="`${formatNumber(daysLeft)} ${pluralize(daysLeft, 'day', 'days')}`"
					iconClass="text-pink" subtitle="Time left to study" />
			</div>
		</div>
		<div class="border-bottom-line">
			<div class="w-full flex justify-between md:mb-4 px-4 md:px-0">
				<div class="text-secondaryText flex items-center">
					<IonText class="text-base font-bold">Progress</IonText>
				</div>
			</div>
			<div class="flex bg-white rounded-xl flex-col p-4 md:p-8 gap-4">
				<IonText class="text-heading2 text-secondaryText font-bold">
					{{ formatNumber(progress * 100) }}%
				</IonText>
				<IonProgressBar :value="progress" />
				<IonText class="text-gray">Finish all tests preps to complete.</IonText>
			</div>
		</div>
		<div class="border-bottom-line">
			<div class="w-full flex justify-between md:mb-4 px-4 md:px-0">
				<div class="text-secondaryText flex items-center">
					<IonText class="text-base font-bold">Tests</IonText>
				</div>
			</div>

			<div class="showcase2">
				<DashboardCard :icon="receiptOutline" :title="formatNumber(institutionTests.length)"
					iconClass="text-blue"
					subtitle="Tests taken" />
				<DashboardCard :icon="checkmarkCircleOutline" :title="formatNumber(passed.length)"
					iconClass="text-green" subtitle="Tests passed" />
				<DashboardCard :icon="schoolOutline" :title="`${averageScore}%`" iconClass="text-purple"
					subtitle="Average grade" />
			</div>
		</div>
		<div v-if="institutionTests.length">
			<div class="w-full flex justify-between md:mb-4 px-4 md:px-0">
				<div class="text-secondaryText flex items-center">
					<IonText class="text-base font-bold">History</IonText>
				</div>
			</div>
			<div class="flex bg-white rounded-xl flex-col">
				<div
					class="header flex flex-col md:flex-row text-body text-gray font-bold w-full justify-between border-b border-new_gray md:px-8 p-4">
					<div class="flex-grow flex justify-between">
						<span class="w-full">Title</span>
						<span class="min-w-[5rem]">Type</span>
					</div>
					<div class="w-full md:w-auto flex justify-between">
						<span class="min-w-[5rem]">Status</span>
						<span class="min-w-[5rem]">Date</span>
					</div>
				</div>
				<router-link
					v-for="test in institutionTests.slice(historyTab * historyDivisor, (historyTab + 1) * historyDivisor)"
					:key="test.hash" :to="`/study/tests/${test.id}`"
					class="header flex flex-col md:flex-row text-body text-gray justify-between border-b border-new_gray md:px-8 p-4">
					<div class="flex-grow flex justify-between">
						<span class="w-full truncate">
							{{ institutionTests.findIndex((t) => t.id === test.id) + 1 }}.
							{{ test.name }}
						</span>
						<span class="min-w-[5rem]">Test</span>
					</div>
					<div class="w-full md:w-auto flex justify-between">
						<span :class="test.passed ? 'text-green' : 'text-red'" class="min-w-[5rem]">
							{{ test.score }}%
						</span>
						<span class="min-w-[5rem]">{{ formatTime(test.createdAt) }}</span>
					</div>
				</router-link>
				<div v-if="Math.ceil(institutionTests.length / historyDivisor) > 1"
					class="flex p-4 items-center justify-center gap-4" style="overflow-x: auto">
					<a v-for="i in Math.ceil(institutionTests.length / historyDivisor)" :key="i"
						@click="historyTab = i - 1">{{ i }}</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import {
	calendarOutline,
	checkmarkCircleOutline,
	discOutline,
	receiptOutline,
	schoolOutline,
	timeOutline
} from 'ionicons/icons'
import DashboardCard from '@app/components/dashboard/DashboardCard.vue'
import { useInstitution } from '@app/composable/school/institutions'
import { formatTime } from '@utils/dates'
import { catchDivideByZero, formatNumber, pluralize } from '@utils/commons'
import { useTestList } from '@app/composable/study/tests'
import { useTestPrepList } from '@app/composable/study/testPreps'

export default defineComponent({
	name: 'ExamDetails',
	components: { DashboardCard },
	props: {
		exam: {
			type: Object as PropType<{ institutionId: string, courseIds: string[], startDate: number, endDate: number }>,
			required: true
		}
	},
	setup (props) {
		const { institution } = useInstitution(props.exam.institutionId)
		const historyTab = ref(0)
		const historyDivisor = 20
		const daysLeft = computed(() => {
			let days = (props.exam.startDate - Date.now()) / (1000 * 60 * 60 * 24)
			if (days < 0) days = 0
			return Math.round(days)
		})
		const { testPreps } = useTestPrepList()
		const { tests } = useTestList()
		const institutionPreps = computed(() => testPreps.value.filter((prep) => prep.data.institutionId === props.exam.institutionId && props.exam.courseIds.includes(prep.data.courseId) && prep.canTest))
		const institutionTests = computed(() => tests.value.filter((test) => institutionPreps.value.map((p) => p.id).includes(test.prepId) && test.isTimed))
		const passed = computed(() => institutionTests.value.filter((test) => test.passed))
		const averageScore = computed(() => catchDivideByZero(passed.value.reduce((acc, cur) => acc + cur.score, 0), passed.value.length))
		const progress = computed(() => {
			const values: number[] = institutionPreps.value.map((prep) => passed.value.find((test) => test.prepId === prep.id) ? 1 : 0)
			return catchDivideByZero(values.reduce((acc, cur) => acc + cur, 0), values.length)
		})
		return {
			historyTab, historyDivisor,
			institution,
			formatTime,
			daysLeft,
			formatNumber,
			pluralize,
			institutionTests,
			passed,
			averageScore,
			progress,
			calendarOutline,
			receiptOutline,
			timeOutline,
			discOutline,
			checkmarkCircleOutline,
			schoolOutline
		}
	}
})
</script>

<style lang="scss" scoped>
	ion-progress-bar {
		height: .5rem !important;
		border-radius: 12px !important;
		@media (max-width: 768px) {
			height: .25rem !important;
		}
	}

	ion-progress-bar::part(progress) {
		border-radius: 120px !important;
	}
</style>
