<template>
	<div class="flex flex-col items-start w-full">
		<PageLoading v-if="loading" />

		<div class="flex item-center justify-between mb-8 mt-10 w-full">
			<ion-text class="text-main_dark font-bold md:text-2xl">
				Question {{ questionIndex + 1 }}
			</ion-text>
			<div class="flex items-center text-lg text-icon_inactive gap-4">
				<IonIcon :icon="flag" @click="createReport(question)" />
			</div>
		</div>

		<div class="mb-4">
			<IonText class="text-main_dark mb-2 w-full">
				<DisplayHtml :html="question.question" />
			</IonText>
			<PhotoList v-if="question.questionMedia.length" :photos="question.questionMedia" />
		</div>

		<div class="answers flex flex-col w-full">
			<div v-for="(option, optionIndex) in question.data.options ?? []" :key="optionIndex"
				class="w-full hover:bg-light_gray py-3"
				@click="answer(question.id, optionIndex)">
				<div class="flex mb-2">
					<IonIcon v-if="test.isTimed && !test.done && optionIndex === test.answers[question.id]"
						:icon="checkmarkCircle" color="primary" size="large" />
					<IonIcon v-else-if="optionIndex === test.answers[question.id] && isCorrect" :icon="checkmarkCircle"
						color="primary" size="large" />
					<IonIcon v-else-if="optionIndex === test.answers[question.id] && isInCorrect" :icon="closeCircle"
						color="danger" size="large" />
					<span v-else
						class="label border-4 rounded-full border-light_gray h-8 w-8 text-base font-bold grid place-items-center capitalize">
						{{ getAlphabet(optionIndex + 1) }}</span>
					<IonText class="text-lg ml-5">
						<DisplayHtml :html="option" />
					</IonText>
				</div>
				<PhotoList v-if="question.data.optionsMedia[optionIndex]?.length"
					:photos="question.data.optionsMedia[optionIndex]" />
			</div>
		</div>

		<template v-if="showAnswers">
			<span v-if="isCorrect"
				class="rounded-md text-white bg-[#00D246] p-2 px-4">
				Nice, you are correct
			</span>
			<span v-if="isInCorrect" class="rounded-md text-white bg-[#FF6666] p-2 px-4">
				Sorry, you're wrong. The answer is {{ getAlphabet(question.data.correctIndex + 1).toUpperCase() }}
			</span>

			<template v-if="question.data.explanation.length > 0 || question.data.explanationMedia.length > 0">
				<span class="text-primary flex items-center font-bold py-8" @click="showExplanation = !showExplanation">
					show solution <IonIcon :icon="showExplanation ? chevronUpOutline : chevronDownOutline" />
				</span>

				<div v-if="showExplanation">
					<span class="block mb-2">{{ question.data.explanation }}</span>
					<PhotoList v-if="question.data.explanationMedia.length" :photos="question.data.explanationMedia" />
				</div>
			</template>
		</template>

		<span v-if="error" class="text-danger my-4">{{ error }}</span>

		<div v-if="showBorder" class="bg-light_gray rounded-lg w-full h-2 mt-12" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import {
	checkmarkCircle,
	chevronDownOutline,
	chevronUpOutline,
	closeCircle,
	ellipsisVertical,
	flag
} from 'ionicons/icons'
import { PastQuestionEntity, PastQuestionType, TestEntity, TestType } from '@modules/study'
import { getAlphabet } from '@utils/commons'
import { useCreateReport } from '@app/composable/reports/pastQuestions'

export default defineComponent({
	name: 'TestQuestion',
	props: {
		test: {
			type: TestEntity,
			required: true
		},
		question: {
			type: PastQuestionEntity,
			required: true
		},
		questionIndex: {
			type: Number,
			required: true
		},
		answer: {
			required: true,
			type: Function
		},
		showBorder: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	setup (props) {
		const showAnswers = computed(() => {
			if (props.test.data.type === TestType.unTimed) {
				if (props.test.questionType === PastQuestionType.objective) return props.test.answers[props.question.id] !== undefined
				else return true
			}
			return props.test.done
		})
		const { loading, error, createReport } = useCreateReport()
		// @ts-ignore
		const isCorrect = computed(() => showAnswers.value && props.test.answers[props.question.id] === props.question.data.correctIndex)
		// @ts-ignore
		const isInCorrect = computed(() => showAnswers.value && props.test.answers[props.question.id] !== props.question.data.correctIndex)
		const showExplanation = ref(false)
		return {
			showAnswers,
			chevronDownOutline,
			chevronUpOutline,
			flag,
			ellipsisVertical,
			checkmarkCircle,
			closeCircle,
			getAlphabet,
			isCorrect,
			isInCorrect,
			showExplanation,
			loading, error, createReport
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
