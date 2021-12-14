<template>
	<div class="flex items-center justify-center flex-col lg:w-8/12 w-full px-4 mx-auto mt-8 mb-16 bg-white">
		<ion-text class="text-4xl text-main_dark font-bold my-8 mb-16">{{ test.scoreText }}</ion-text>

		<DonutChart :bgColor="test.passed ? '#00D24622' : '#FF666622'" :fgColor="test.passed ? '#00D246' : '#FF6666'"
			:score="test.score" :size="320"
			:thickness="12" :total="100">
			{{ formatNumber(test.score, 1) }}%
		</DonutChart>

		<ion-text class="text-main_dark my-4">
			Correct answers - <b>{{ correctAnswers }}/{{ test.questions.length }} </b>
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
import { computed, defineComponent, onMounted } from 'vue'
import { TestEntity } from '@modules/study'
import DonutChart from '@app/components/core/DonutChart.vue'
import { formatNumber } from '@utils/commons'

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
		const { error, loading, questions, endTest } = useTestDetails(props.test)
		onMounted(endTest)
		// @ts-ignore
		const correctAnswers = computed(() => questions.value.filter((q) => props.test.answers[q.id] === q.data.correctIndex).length)
		return { error, loading, questions, correctAnswers, formatNumber }
	}
})
</script>

<style lang="scss" scoped>
	.btn-lgx {
		@media (min-width: 1042px) {
			--padding-top: 1.5rem;
			--padding-bottom: 1.5rem;
			--padding-start: 4.5rem;
			--padding-end: 4.5rem;
		}

	}

	.footer-shadow {
		box-shadow: 0px -5px 5px rgba(139, 158, 177, 0.05);
	}

	input[type="radio"]:checked + label {
		@apply border-primary
	}

	.segment-button-checked {
		color: white !important
	}

	ion-select {
		--background: #F7F7FC;
		background: #F7F7FC;
		--padding-start: 1rem;
		--padding-end: 1rem;
		--padding-top: 0.8rem;
		--padding-bottom: 0.8rem;
	}

	ion-segment {
		--background: #F7F7FC;
		color: #8B9EB1;
		font-weight: bold;
	}

	ion-segment-button {
		--background-checked: #4D5C6F;
		--background-focused: #4D5C6F;
		--indicator-color: #4D5C6F;
		--indicator-box-shadow: none;
		--padding-top: 0.8rem;
		--padding-bottom: 0.8rem;
		color: #8B9EB1;
		font-weight: bold;
	}

	.custom-shadow {
		box-shadow: 0px 0px 50px rgba(77, 92, 111, 0.1);
		border-radius: 24px;
		@media (max-width: 770px) {
			box-shadow: none;
			border-radius: 0;
		}
	}

	.ion-iten-transparent {
		--background: transparent;
	}

	ion-searchbar {
		--box-shadow: 'none';
		--border-radius: 0.5rem;
	}

	.searchbar-input.sc-ion-searchbar-md {
		padding-top: 12px;
		padding-bottom: 12px;
	}
</style>
