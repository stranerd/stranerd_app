<template>
	<div class="flex flex-col lg:w-8/12 w-full mx-auto  lg:my-8 p-4 pb-12 md:p-8 md:pb-16 lg:pb-20">
		<!-- <ion-segment v-model="tab" class="md:w-96 mb-8 md:mb-12 mx-auto" mode="ios">
			<ion-segment-button value="list">
				<ion-label>All questions</ion-label>
			</ion-segment-button>
			<ion-segment-button value="single">
				<ion-label>Single question</ion-label>
			</ion-segment-button>
		</ion-segment> -->

		<div v-if="tab === 'list'" class="flex flex-col gap-8">
			<TestQuestion v-for="(question, index) in questions" :key="question.hash" :answer="updateAnswer"
				:question="question" :questionIndex="index" class="border-bottom-line pb-6 "
				:test="test" />
		</div>

		<!-- <template v-if="tab === 'single'">
			<TestQuestion :answer="updateAnswer" :question="questions[questionIndex]" :questionIndex="questionIndex"
				:test="test" />
			<div class="mt-6 mb-10 flex justify-between items-center gap-4">
				<IonIcon :color="canGoBack ? 'grey' : 'light'" :icon="chevronBackCircleOutline" size="large"
					@click="back" />
				<span class="flex gap-2 items-center">
					<span>Jump to</span>
					<IonSelect v-model="questionIndex" interface="action-sheet">
						<IonSelectOption v-for="num in questions.length" :key="num" :value="num - 1">
							{{ num }}
						</IonSelectOption>
					</IonSelect>
				</span>
				<IonIcon :color="canGoForward ? 'grey' : 'light'" :icon="chevronForwardCircleOutline" size="large"
					@click="forward" />
			</div>
		</template> -->

		<div class="footer-shadow py-4 fixed bottom-0 inset-x-0 bg-white z-[10]">
			<div class="lg:w-8/12 w-full px-4 mx-auto flex items-center justify-between">
				<div>
					<ion-text v-if="test.isOBJ" class="text-main_dark">
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
						<ion-button class="btn-primary btn-lgx">See Results</ion-button>
					</router-link>
					<ion-button v-if="!test.done" class="btn-primary btn-lgx" @click="openSubmitTest">
						{{ test.isTimed ? 'Submit' : 'End Study' }}
					</ion-button>
				</div>
			</div>
		</div>

		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
// import { IonSegment, IonSegmentButton, IonSelect, IonSelectOption } from '@ionic/vue'
import { useTestDetails } from '@app/composable/study/tests'
import { chevronBackCircleOutline, chevronForwardCircleOutline } from 'ionicons/icons'
import { computed, defineComponent, onMounted, onUnmounted } from 'vue'
import { TestEntity } from '@modules/study'
import { useCountdown } from '@app/composable/core/dates'
import { getDigitalTime } from '@utils/dates'
import TestQuestion from '@app/components/study/tests/TestQuestion.vue'
import { formatNumber } from '@utils/commons'
import { useRouter } from 'vue-router'
import { Alert } from '@utils/dialog'

export default defineComponent({
	name: 'TestBody',
	components: { TestQuestion,
		// IonSegment, IonSegmentButton,  IonSelect, IonSelectOption 
	},
	props: {
		test: {
			type: TestEntity,
			required: true
		}
	},
	setup (props) {
		const router = useRouter()
		const { error, tab, questionIndex, loading, questions, updateAnswer, endTest } = useTestDetails(props.test)
		const canGoBack = computed(() => questionIndex.value > 0)
		const canGoForward = computed(() => questionIndex.value < questions.value.length - 1)
		const back = () => canGoBack.value && questionIndex.value--
		const forward = () => canGoForward.value && questionIndex.value++
		const { diffInSec, startTimer: startCountdown, stopTimer: stopCountdown } = useCountdown(props.test.endedAt, {})
		onMounted(startCountdown)
		onUnmounted(stopCountdown)
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
			countDown, tab, questionIndex, canGoBack, canGoForward, back, forward,
			chevronForwardCircleOutline, chevronBackCircleOutline, formatNumber
		}
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

	input[type="radio"]:checked + label {
		@apply border-primary
	}

	ion-select {
		--background: #F7F7FC;
		background: #F7F7FC;
		--padding-start: 1rem;
		--padding-end: 1rem;
		--padding-top: 0.8rem;
		--padding-bottom: 0.8rem;
	}
</style>
