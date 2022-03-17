<template>
	<PageLoading v-if="loading" />
	<div v-else class="flex items-center justify-center flex-col lg:w-8/12 w-full px-4 mx-auto mt-8 mb-16 bg-white rounded-xl pb-5">
		<ion-text class="heading text-main_dark font-bold my-8 mb-7">{{ test.scoreText }}</ion-text>

		<DonutChart :bgColor="test.passed ? '#00D24622' : '#FF666622'" :fgColor="test.passed ? '#00D246' : '#FF6666'"
			:percentage="test.score" :size="200" :thickness="12" >
			{{ formatNumber(test.score, 1) }}%
		</DonutChart>
		<!-- <DonutChart :bgColor="test.passed ? '#00D24622' : '#FF666622'" :fgColor="test.passed ? '#00D246' : '#FF6666'"
			:percentage="test.score" :size="200" :thickness="12" class="!block md:!hidden">
			{{ formatNumber(test.score, 1) }}%
		</DonutChart> -->

		<ion-text class="text-main_dark my-4 text-center">
			Correct answers - <b>{{ test.correctAnswers }}/{{ formatNumber(test.questions.length) }} </b>
			<!-- TODOS -->
			<br>
			Time used - <b> 3sec</b> 
		</ion-text>

		<div class=" mt-8 mx-auto w-full px-4 flex gap-2 items-center justify-between md:justify-center">
			<router-link :to="`/study/tests/${test.id}/take`" class="text-primary cursor-pointer">
				<ion-button class="btn-outline">
					Solutions
				</ion-button>

			</router-link>

			<router-link class="text-primary cursor-pointer" to="#">
				<ion-button class="btn-primary">
					Retry
				</ion-button>
			</router-link>
			<router-link class="text-primary cursor-pointer" to="/study">
				<ion-button class="btn-secondary">
					My Study
				</ion-button>
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { useTestDetails } from '@app/composable/study/tests'
import { defineComponent, onMounted } from 'vue'
import { TestEntity } from '@modules/study'
import DonutChart from '@app/components/core/DonutChart.vue'
import { formatNumber } from '@utils/commons'
import {  formatTime } from '@utils/dates'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'TestResults',
	components: { DonutChart },
	props: {
		test: {
			type: TestEntity,
			required: true
		}
	},
	setup (props) {
		const router = useRouter()
		const { error, loading, questions, endTest } = useTestDetails(props.test)
		onMounted(async () => {
			await endTest()
			if (!props.test.isTimed) await router.replace(`/study/tests/${props.test.id}/take`)
		})
		return { error, loading, questions, formatNumber, formatTime }
	}
})
</script>
