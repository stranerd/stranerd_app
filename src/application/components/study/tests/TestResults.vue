<template>
	<div class="flex items-center justify-center flex-col lg:w-8/12 w-full px-4 mx-auto mt-8 mb-16 bg-new_gray">
		<ion-text class="text-4xl text-main_dark font-bold my-8 mb-16">{{ test.scoreText }}</ion-text>

		<DonutChart :bgColor="test.passed ? '#00D24622' : '#FF666622'" :fgColor="test.passed ? '#00D246' : '#FF6666'"
			:score="test.score"
			:size="320" :thickness="12"
			:total="100" class="md:!block !hidden">
			{{ formatNumber(test.score, 1) }}%
		</DonutChart>
		<DonutChart :bgColor="test.passed ? '#00D24622' : '#FF666622'" :fgColor="test.passed ? '#00D246' : '#FF6666'"
			:score="test.score"
			:size="200" :thickness="12"
			:total="100" class="!block md:!hidden">
			{{ formatNumber(test.score, 1) }}%
		</DonutChart>

		<ion-text class="text-main_dark my-4">
			Correct answers - <b>{{ test.correctAnswers }}/{{ test.questions.length }} </b>
		</ion-text>

		<div class="md:w-80 mt-20 mx-auto w-full px-4 flex items-center justify-between">
			<router-link :to="`/study/tests/${test.id}/take`" class="text-primary cursor-pointer">
				See <b>Solutions</b>
			</router-link>

			<router-link class="text-primary cursor-pointer" to="/study">
				Back to <b> My Study</b>
			</router-link>
		</div>

		<PageLoading v-if="loading" />
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
