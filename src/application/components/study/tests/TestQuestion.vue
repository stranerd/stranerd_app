<template>
	<div class="flex flex-col items-start w-full border-bottom-line card-padding !gap-0">
		<div class="flex items-center justify-between mb-2 w-full gap-4 text-secondaryText text-sm">
			<IonText class="font-bold">{{ questionIndex + 1 }} / {{ total }}</IonText>
			<IonIcon :icon="flagOutline" @click="openReportModal" />
		</div>

		<div class="mb-2">
			<IonText class="mb-2 w-full">
				<DisplayHtml :html="question.question" />
			</IonText>
			<Gallery v-if="question.questionMedia.length" :media="question.questionMedia" :path="question.saveFilePath" />
		</div>

		<div v-if="question.isObj(question)" class=" flex flex-col w-full">
			<a v-for="(option, optionIndex) in question.data.options ?? []" :key="optionIndex" class="w-full py-4"
				@click="answer(question.id, optionIndex)">
				<div class="flex gap-2 items-center">
					<IonIcon v-if="test.isTimed && !test.done && optionIndex === test.answers[question.id]"
						:icon="radioButtonOn" class="text-primaryBg" />
					<IonIcon v-else-if="optionIndex === test.answers[question.id] && isCorrect"
						:icon="checkmarkCircleOutline" class="text-success" />
					<IonIcon v-else-if="optionIndex === test.answers[question.id] && isInCorrect" :icon="closeCircleOutline"
						class="text-danger" />
					<IonIcon v-else :icon="radioButtonOff" />
					<IonText>
						<DisplayHtml :html="option" />
					</IonText>
				</div>
				<Gallery v-if="question.data.optionsMedia[optionIndex]?.length"
					:media="question.data.optionsMedia[optionIndex]" :path="question.saveFilePath" />
			</a>
		</div>

		<template v-if="showAnswers && question.isObj(question)">
			<span v-if="isCorrect" class="rounded-xl bg-success py-2 px-4">
				Nice, you are correct
			</span>
			<span v-if="isInCorrect" class="rounded-xl bg-danger py-2 px-4">
				Sorry, you're wrong. The answer is {{ getAlphabet(question.data.correctIndex).toUpperCase() }}
			</span>

			<template v-if="question.data.explanation.length > 0 || question.data.explanationMedia.length > 0">
				<a class="text-primaryBg flex items-center font-bold py-8 gap-2"
					@click="showExplanation = !showExplanation">
					<span>{{ showExplanation ? 'hide' : 'show' }} solution</span>
					<IonIcon :class="{ 'rotate-90': showExplanation }" :icon="chevronForwardOutline" />
				</a>

				<div v-if="showExplanation">
					<IonText class="block mb-2">
						<DisplayHtml :html="question.data.explanation" />
					</IonText>
					<Gallery v-if="question.data.explanationMedia.length" :media="question.data.explanationMedia"
						:path="question.saveFilePath" />
				</div>
			</template>
		</template>

		<div v-if="question.isNotObj(question)">
			<IonText class="block mb-2">
				<DisplayHtml :html="question.data.answer" />
			</IonText>
			<Gallery v-if="question.data.answerMedia.length" :media="question.data.answerMedia"
				:path="question.saveFilePath" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { openCreateReportModal, useCreateReport } from '@app/composable/moderation/reports'
import { ReportType } from '@modules/moderation'
import { PastQuestionEntity, PastQuestionType } from '@modules/school'
import { TestEntity, TestType } from '@modules/study'
import { getAlphabet } from 'valleyed'
import {
	checkmarkCircleOutline,
	chevronForwardOutline,
	closeCircleOutline,
	flagOutline,
	radioButtonOff,
	radioButtonOn
} from 'ionicons/icons'
import { computed, onMounted, PropType, ref } from 'vue'

const props = defineProps({
	total: {
		type: Number,
		required: true
	},
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
		type: Function as PropType<(id: string, idx: number) => Promise<void>>,
		required: true
	}
})

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
const openReportModal = () => openCreateReportModal(ReportType.pastQuestions, props.question.id)
onMounted(() => {
	factory.type = ReportType.pastQuestions
	factory.id = props.question.id
	factory.message = 'Flagged'
})
</script>
