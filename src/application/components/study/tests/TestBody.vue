<template>
	<div class="flex flex-col lg:my-8 md:p-4 lg:p-0 pb-[68px] md:pb-[82px] lg:pb-[88px]">
		<div v-if="tab === 'list'" class="flex flex-col md:gap-8">
			<TestQuestion v-for="(question, index) in questions" :key="question.hash" :answer="updateAnswer"
				:question="question" :questionIndex="index" :test="test" />
		</div>

		<div class="footer-shadow fixed bottom-0 inset-x-0 bg-white z-[10]">
			<div :style="`width:${test.progress * 100}%`" class="bg-primary h-1" />
			<div class="lg:w-8/12 w-full px-4 mx-auto flex items-center justify-between py-2">
				<div>
					<ion-text v-if="test.isOBJ" class="text-secondaryText">
						{{ test.answered }}/{{ formatNumber(questions.length) }} answered
					</ion-text>
				</div>

				<div>
					<template v-if="test.isTimed && !test.done">
						<div class="h-2 w-2 bg-red-500 rounded-full mr-4" />
						<ion-text class="text-icon_inactive">
							{{ countDown }}
						</ion-text>
					</template>
				</div>

				<div>
					<router-link v-if="test.done && test.isTimed" :to="`/study/tests/${test.id}/results`">
						<ion-button class="btn-outline">See Results</ion-button>
					</router-link>
					<ion-button v-if="!test.done" class="btn-primary" @click="openSubmitTest">
						{{ test.isTimed ? 'Submit' : 'End Study' }}
					</ion-button>
				</div>
			</div>
		</div>

		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { useTestDetails } from '@app/composable/study/tests'
import { computed, defineComponent } from 'vue'
import { TestEntity } from '@modules/study'
import { useCountdown } from '@app/composable/core/dates'
import { getDigitalTime } from '@utils/dates'
import TestQuestion from '@app/components/study/tests/TestQuestion.vue'
import { formatNumber } from '@utils/commons'
import { useRouter } from 'vue-router'
import { Alert } from '@utils/dialog'

export default defineComponent({
	name: 'TestBody',
	components: { TestQuestion },
	props: {
		test: {
			type: TestEntity,
			required: true
		}
	},
	setup (props) {
		const router = useRouter()
		const { error, tab, questionIndex, loading, questions, updateAnswer, endTest } = useTestDetails(props.test)
		const { diffInSec } = useCountdown(props.test.endedAt, {})
		const countDown = computed({
			get: () => getDigitalTime(diffInSec.value),
			set: () => {
			}
		})
		const openSubmitTest = async () => {
			const res = await Alert({
				title: 'Are you sure you want to submit?',
				confirmButtonText: 'Submit'
			})
			if (!res) return
			await endTest()
			if (props.test.isTimed) await router.push(`/study/tests/${props.test.id}/results`)
			else await router.push('/dashboard')
		}
		return {
			error, loading, questions, openSubmitTest, updateAnswer,
			countDown, tab, questionIndex, formatNumber
		}
	}
})
</script>
