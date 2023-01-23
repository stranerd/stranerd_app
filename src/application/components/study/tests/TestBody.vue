<template>
	<div class="flex flex-col">
		<BlockLoading v-if="loading" />

		<TestQuestion v-for="(question, index) in questions" :key="question.hash" :answer="updateAnswer"
			:question="question" :questionIndex="index" :test="test" :total="questions.length" />

		<div class="pb-[50px]" />

		<div class="footer-shadow fixed bottom-0 inset-x-0 bg-bodyBg z-[10] text-secondaryText text-sm">
			<div :style="`width:${test.progress * 100}%`" class="h-1" />
			<div class="w-full px-4 mx-auto flex items-center justify-between py-2">
				<div>
					<IonText v-if="test.isOBJ" class="font-bold">
						{{ test.answered }}/{{ formatNumber(questions.length) }}
					</IonText>
				</div>

				<div>
					<template v-if="test.isTimed && !test.done">
						<div class="h-2 w-2 bg-danger rounded-full mr-4" />
						<IonText>{{ countDown }}</IonText>
					</template>
				</div>

				<div>
					<router-link v-if="test.done && test.isTimed" :to="`/study/tests/${test.id}/results`">
						<IonButton class="btn-outline">See Results</IonButton>
					</router-link>
					<IonButton v-if="!test.done" class="btn-primary" @click="openSubmitTest">
						{{ test.isTimed ? 'Submit' : 'End Study' }}
					</IonButton>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useTestDetails } from '@app/composable/study/tests'
import { computed } from 'vue'
import { TestEntity } from '@modules/study'
import { useCountdown } from '@app/composable/core/dates'
import { getDigitalTime } from '@utils/dates'
import TestQuestion from '@app/components/study/tests/TestQuestion.vue'
import { formatNumber } from '@utils/commons'
import { useRouter } from 'vue-router'
import { Alert } from '@utils/dialog'

const props = defineProps({
	test: {
		type: TestEntity,
		required: true
	}
})

const router = useRouter()
const { error, loading, questions, updateAnswer, endTest } = useTestDetails(props.test)
const { diffInSec } = useCountdown(props.test.endedAt, {})
const countDown = computed({
	get: () => getDigitalTime(diffInSec.value),
	set: () => {
	}
})
const openSubmitTest = async () => {
	const res = await Alert({
		message: 'Are you sure you want to submit?',
		confirmButtonText: 'Submit'
	})
	if (!res) return
	await endTest()
	if (props.test.isTimed) await router.push(`/study/tests/${props.test.id}/results`)
	else await router.push('/dashboard')
}
</script>
