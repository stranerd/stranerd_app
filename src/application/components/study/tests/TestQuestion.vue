<template>
	<div class="flex flex-col items-start w-full bg-white md:rounded-xl border-bottom-line p-4">
		<PageLoading v-if="loading" />

		<div class="flex item-center justify-between mb-2 w-full">
			<ion-text class="text-main_dark font-bold md:text-2xl">
				Question {{ questionIndex + 1 }}
			</ion-text>
			<div class="flex items-center text-lg text-icon_inactive gap-4">
				<IonIcon :icon="flagOutline" @click="createReport(question)" />
			</div>
		</div>

		<div class="mb-2">
			<IonText class="text-main_dark mb-2 w-full">
				<DisplayHtml :html="question.question" />
			</IonText>
			<PhotoList v-if="question.questionMedia.length" :photos="question.questionMedia" />
		</div>

		<div v-if="question.isObjective" class="answers flex flex-col w-full">
			<div v-for="(option, optionIndex) in question.data.options ?? []" :key="optionIndex"
				class="w-full hover:bg-new_gray rounded-lg py-4"
				@click="answer(question.id, optionIndex)">
				<div class="flex gap-2 items-center">
					<IonIcon v-if="test.isTimed && !test.done && optionIndex === test.answers[question.id]"
						:icon="radioButtonOn" color="primary" size="large" />
					<IonIcon v-else-if="optionIndex === test.answers[question.id] && isCorrect"
						:icon="checkmarkCircleOutline"
						color="success" size="large" />
					<IonIcon v-else-if="optionIndex === test.answers[question.id] && isInCorrect"
						:icon="closeCircleOutline"
						color="danger" size="large" />
					<IonIcon v-else :icon="radioButtonOff" size="large" />
					<IonText>
						<DisplayHtml :html="option" />
					</IonText>
				</div>
				<PhotoList v-if="question.data.optionsMedia[optionIndex]?.length"
					:photos="question.data.optionsMedia[optionIndex]" />
			</div>
		</div>

		<template v-if="showAnswers && question.isObjective">
			<span v-if="isCorrect"
				class="rounded-md text-white bg-[#00D246] p-2 px-4">
				Nice, you are correct
			</span>
			<span v-if="isInCorrect" class="rounded-md text-white bg-[#FF6666] p-2 px-4">
				Sorry, you're wrong. The answer is {{ getAlphabet(question.data.correctIndex + 1).toUpperCase() }}
			</span>

			<template v-if="question.data.explanation?.length > 0 || question.data.explanationMedia?.length > 0">
				<span class="text-primary flex items-center font-bold py-8" @click="showExplanation = !showExplanation">
					show solution <IonIcon :icon="showExplanation ? chevronUpOutline : chevronDownOutline" />
				</span>

				<div v-if="showExplanation">
					<IonText class="block mb-2">
						<DisplayHtml :html="question.data.explanation" />
					</IonText>
					<PhotoList v-if="question.data.explanationMedia.length" :photos="question.data.explanationMedia" />
				</div>
			</template>
		</template>

		<div v-if="!question.isObjective">
			<IonText class="block mb-2">
				<DisplayHtml :html="question.data.answer" />
			</IonText>
			<PhotoList v-if="question.data.answerMedia.length" :photos="question.data.answerMedia" />
		</div>

		<span v-if="error" class="text-danger my-4">{{ error }}</span>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import {
	checkmarkCircleOutline,
	chevronDownOutline,
	chevronUpOutline,
	closeCircleOutline,
	ellipsisVerticalOutline,
	flagOutline,
	radioButtonOff,
	radioButtonOn
} from 'ionicons/icons'
import { TestEntity, TestType } from '@modules/study'
import { PastQuestionEntity, PastQuestionType } from '@modules/school'
import { getAlphabet } from '@utils/commons'
import { useCreateReport } from '@app/composable/reports/reports'
import { ReportType } from '@modules/reports'

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
		const { factory, loading, error, createReport } = useCreateReport()
		// @ts-ignore
		const isCorrect = computed(() => showAnswers.value && props.test.answers[props.question.id] === props.question.data.correctIndex)
		// @ts-ignore
		const isInCorrect = computed(() => showAnswers.value && props.test.answers[props.question.id] !== props.question.data.correctIndex)
		const showExplanation = ref(false)
		onMounted(() => {
			factory.value.type = ReportType.pastQuestions
			factory.value.reportedId = props.question.id
			factory.value.message = 'Flagged'
		})
		return {
			showAnswers,
			checkmarkCircleOutline,
			radioButtonOff,
			chevronDownOutline,
			chevronUpOutline,
			flagOutline,
			ellipsisVerticalOutline,
			radioButtonOn,
			closeCircleOutline,
			getAlphabet,
			isCorrect,
			isInCorrect,
			showExplanation,
			loading, error, createReport
		}
	}
})
</script>
