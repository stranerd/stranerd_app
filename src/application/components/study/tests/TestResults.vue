<template>
	<BlockLoading v-if="loading || createLoading" />
	<div v-else
		class="flex items-center justify-center flex-col p-4 border-bottom-line gap-4">
		<IonText class="text-xl font-bold">{{ test.scoreText }}</IonText>

		<DonutChart :bgColor="test.passed ? '#00D24622' : '#FF666622'"
			:fgColor="test.passed ? '#00D246' : '#FF6666'"
			:percentage="test.score" :size="200" :thickness="12">
			{{ formatNumber(test.score, 1) }}%
		</DonutChart>

		<IonText class="text-secondaryText">
			Correct answers - <b>{{ test.correctAnswers }}/{{ formatNumber(test.questions.length) }} </b>
		</IonText>

		<div class="mt-4 mx-auto w-full px-4 flex gap-2 items-center justify-between md:justify-center">
			<router-link :to="`/study/tests/${test.id}/take`" class="w-1/2">
				<IonButton class="btn-outline w-full h-9">Solutions</IonButton>
			</router-link>
			<IonButton v-if="prep" class="btn-primary w-1/2 h-9" @click="createTest(prep, test.isTimed)">
				Retry
			</IonButton>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useCreateTest, useTestDetails } from '@app/composable/study/tests'
import { onMounted } from 'vue'
import { TestEntity } from '@modules/study'
import DonutChart from '@app/components/core/DonutChart.vue'
import { formatNumber } from '@utils/commons'
import { useRouter } from 'vue-router'
import { useTestPrep } from '@app/composable/study/testPreps'

const props = defineProps({
	test: {
		type: TestEntity,
		required: true
	}
})

const router = useRouter()
const { error, loading, questions, endTest } = useTestDetails(props.test)
const { testPrep: prep } = useTestPrep(props.test.prepId)
const { createTest, loading: createLoading } = useCreateTest()
onMounted(async () => {
	await endTest()
	if (!props.test.isTimed) await router.replace(`/study/tests/${props.test.id}/take`)
})
</script>
