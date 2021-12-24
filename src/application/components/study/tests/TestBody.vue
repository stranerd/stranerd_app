<template>
	<div class="flex justify-center flex-col lg:w-8/12 w-full mx-auto mt-8 mb-16 p-8 bg-white">
		<ion-segment v-model="tab" class="md:w-96 mb-12 mx-auto" mode="ios">
			<ion-segment-button value="list">
				<ion-label>All questions</ion-label>
			</ion-segment-button>
			<ion-segment-button value="single">
				<ion-label>Single question</ion-label>
			</ion-segment-button>
		</ion-segment>

		<template v-if="tab === 'list'">
			<TestQuestion v-for="(question, index) in questions" :key="question.hash" :answer="updateAnswer"
				:question="question" :questionIndex="index"
				:showBorder="index < questions.length - 1" :test="test" />
		</template>

		<template v-if="tab === 'single'">
			<TestQuestion :answer="updateAnswer" :question="questions[questionIndex]" :questionIndex="questionIndex"
				:test="test" />

			<div class="mt-16 flex justify-between items-center gap-4">
				<IonIcon :color="canGoBack ? 'grey' : 'light'" :icon="chevronBackCircle" size="large" @click="back" />
				<span class="flex gap-2 items-center">
					<span>Jump to</span>
					<IonSelect v-model="questionIndex">
						<IonSelectOption v-for="num in questions.length" :key="num" :value="num - 1">
							{{ num }}
						</IonSelectOption>
					</IonSelect>
				</span>
				<IonIcon :color="canGoForward ? 'grey' : 'light'" :icon="chevronForwardCircle" size="large"
					@click="forward" />
			</div>
		</template>

		<div class="footer-shadow py-4 fixed bottom-0 inset-x-0 bg-white z-[10]">
			<div class="lg:w-8/12  w-full px-4  mx-auto flex items-center justify-between">
				<div>
					<ion-text v-if="test.isOBJ" class="text-main_dark">
						{{ test.answered }}/{{ questions.length }} answered
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
					<router-link v-if="test.done" :to="`/study/tests/${test.id}/results`">
						<ion-button class="btn-primary btn-lgx">See Results</ion-button>
					</router-link>
					<ion-button v-else class="btn-primary btn-lgx" @click="openSubmitTest">Submit</ion-button>
				</div>
			</div>
		</div>

		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { IonSegment, IonSegmentButton, IonSelect, IonSelectOption } from '@ionic/vue'
import { useTestDetails } from '@app/composable/study/tests'
import { chevronBackCircle, chevronForwardCircle } from 'ionicons/icons'
import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import { TestEntity } from '@modules/study'
import { useCountdown } from '@app/composable/core/dates'
import { getDigitalTime } from '@utils/dates'
import { useStudyPopover } from '@app/composable/core/modals'
import TestQuestion from '@app/components/study/tests/TestQuestion.vue'

export default defineComponent({
	name: 'TestBody',
	components: { IonSegment, IonSegmentButton, TestQuestion, IonSelect, IonSelectOption },
	props: {
		test: {
			type: TestEntity,
			required: true
		}
	},
	setup (props) {
		const { error, loading, questions, updateAnswer } = useTestDetails(props.test)
		const tab = ref('list')
		const questionIndex = ref(0)
		const canGoBack = computed(() => questionIndex.value > 0)
		const canGoForward = computed(() => questionIndex.value < questions.value.length - 1)
		const back = () => canGoBack.value && questionIndex.value--
		const forward = () => canGoForward.value && questionIndex.value++
		const { diffInSec, startTimer: startCountdown, stopTimer: stopCountdown } = useCountdown(props.test.endedAt, {})
		onMounted(() => {
			startCountdown()
		})
		onBeforeUnmount(() => {
			stopCountdown()
		})
		const countDown = computed({
			get: () => getDigitalTime(diffInSec.value),
			set: () => {
			}
		})
		const openSubmitTest = () => useStudyPopover().openSubmitTest
		return {
			error, loading, questions, openSubmitTest, updateAnswer,
			countDown, tab, questionIndex, canGoBack, canGoForward, back, forward,
			chevronForwardCircle, chevronBackCircle
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
