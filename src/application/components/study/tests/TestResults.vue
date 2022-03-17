<template>
	<PageLoading v-if="loading" />
	<div v-else
		class="flex items-center justify-center flex-col md:my-8 px-4 py-8 bg-white rounded-xl gap-4">
		<ion-text class="heading text-main_dark font-bold">{{ test.scoreText }}</ion-text>

		<DonutChart :bgColor="test.passed ? '#00D24622' : '#FF666622'" :fgColor="test.passed ? '#00D246' : '#FF6666'"
			:percentage="test.score" :size="200" :thickness="12">
			{{ formatNumber(test.score, 1) }}%
		</DonutChart>

		<ion-text class="text-main_dark">
			Correct answers - <b>{{ test.correctAnswers }}/{{ formatNumber(test.questions.length) }} </b>
		</ion-text>

		<div class="mt-4 mx-auto w-full px-4 flex gap-2 items-center justify-between md:justify-center">
			<router-link :to="`/study/tests/${test.id}/take`" class="text-primary cursor-pointer">
				<ion-button class="btn-outline">Solutions</ion-button>
			</router-link>
			<!--  TODO: Add retry test functionality -->
			<router-link class="text-primary cursor-pointer" to="#">
				<ion-button class="btn-primary">
					Retry
				</ion-button>
			</router-link>
			<!--  TODO: Add link to preps home page -->
			<router-link class="text-primary cursor-pointer" to="/study/preps/">
				<ion-button class="btn-secondary">
					Home
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
		return { error, loading, questions, formatNumber }
	}
})
</script>
