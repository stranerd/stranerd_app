<template>
	<div v-if="state.settings" class="h-full flex flex-col">
		<div class="flex gap-4 justify-between items-center card-padding text-lg">
			<span class="font-bold">Options</span>
			<IonIcon :icon="closeOutline" @click="state.settings = false" />
		</div>
		<div v-if="!submitted" class="mt-auto flex gap-4 items-center card-padding border-top-line" @click="submitTest">
			<IonIcon :icon="paperPlaneOutline" />
			<span>Submit Test</span>
		</div>
		<div v-if="restart" class="flex gap-4 items-center card-padding border-top-line" @click="restartTest">
			<IonIcon :icon="repeatOutline" />
			<span>Restart Test</span>
		</div>
		<div class="flex gap-4 items-center card-padding border-top-line text-danger" @click="close">
			<IonIcon :icon="closeOutline" />
			<span>Cancel Test</span>
		</div>
	</div>
	<div v-else class="flex flex-col">
		<div class="flex gap-4 justify-between items-center p-4 text-lg">
			<IonIcon :icon="closeOutline" @click="close" />
			<span class="font-bold">
				{{ state.page + 1 }}/{{ formatNumber(questions.length) }}
			</span>
			<IonIcon v-if="!submitted && !state.corrections" :icon="ellipsisHorizontalOutline"
				@click="state.settings = true" />
			<span v-else />
		</div>
		<div class="bg-itemBg mb-8">
			<div :style="`width:${percentage}%;`" class="h-1 bg-primaryBg" />
		</div>

		<div v-if="submitted && !state.corrections" class="page-side-padding showcase-flex !gap-6">
			<p>Results</p>
			<div class="flex flex-col gap-4">
				<a v-for="{ label, sub, icon, func } in [
					{ label: 'Correction', icon: checkmarkOutline, sub: 'Compare correct answers with your own', func: () => state.corrections = true },
					...(restart ? [
						{ label: 'Retake the test', icon: documentTextOutline, sub: 'Start the test again', func: restartTest },
					] : [])
				]" :key="label" class="flex items-center card-padding !gap-4 card-sm" @click="func">
					<span class="rounded-full w-14 h-14 flex items-center justify-center bg-bodyBg">
						<IonIcon :icon="icon" />
					</span>
					<span class="flex flex-col">
						<span class="font-bold">{{ label }}</span>
						<span class="text-sm text-secondaryText">{{ sub }}</span>
					</span>
				</a>
			</div>
		</div>
		<div v-else class="page-side-padding showcase-flex !gap-6">
			<p class="text-xl">
				<span v-html="question.question" />
			</p>
			<div v-for="(option, idx) in question.options" :key="idx" :class="getClass(idx)"
				class="card-sm card-padding" @click="chooseAnswer(idx)">
				<span v-html="option.body" />
			</div>
			<div class="flex gap-4 items-center justify-between">
				<IonIcon :icon="chevronBackOutline" @click="goBack" />
				<IonIcon :icon="chevronForwardOutline" @click="goForward" />
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import {
	checkmarkOutline,
	chevronBackOutline,
	chevronForwardOutline,
	closeOutline,
	documentTextOutline,
	ellipsisHorizontalOutline,
	paperPlaneOutline,
	repeatOutline
} from 'ionicons/icons'
import { computed, PropType, reactive } from 'vue'
import { Test } from '@modules/study'
import { formatNumber } from '@utils/commons'

const props = defineProps({
	questions: {
		type: Array as PropType<Test[]>,
		required: true
	},
	instant: {
		type: Boolean,
		required: true
	},
	submitted: {
		type: Boolean,
		required: true
	},
	answers: {
		type: Object as PropType<Record<string, number>>,
		required: true
	},
	onAnswer: {
		type: Function as PropType<(questionId: string, optIdx: number) => void>,
		required: true
	},
	submit: {
		type: Function as PropType<() => void>,
		required: true
	},
	restart: {
		type: Function as PropType<() => void>,
		required: false
	},
	close: {
		type: Function as PropType<() => void>,
		required: true
	}
})

const state = reactive({
	settings: false,
	page: 0,
	corrections: false
})

const percentage = computed(() => 100 * (state.page + 1) / props.questions.length)

const goBack = () => state.page > 0 ? state.page-- : null
const goForward = () => state.page < (props.questions.length - 1) ? state.page++ : null
const chooseAnswer = async (optionIdx: number) => {
	await props.onAnswer(question.value.id, optionIdx)
}

const question = computed(() => props.questions[state.page]!)
const showAnswer = computed(() => (props.instant && question.value.id in props.answers) || props.submitted)
const getClass = (optionIdx: number) => {
	if (!showAnswer.value) return optionIdx === props.answers[question.value.id] ? 'info' : ''
	if (props.questions[state.page].correct === optionIdx) return 'success'
	if (props.questions[state.page].correct != optionIdx && props.answers[question.value.id] === optionIdx) return 'error'
	return ''
}

const submitTest = async () => {
	await props.submit()
	state.settings = false
}

const restartTest = async () => {
	await props.restart?.()
	state.page = 0
	state.settings = false
}
</script>

<style lang="scss" scoped>
.error {
	border-color: $color-danger !important;
}

.info {
	border-color: $color-info !important;
}

.success {
	border-color: $color-success !important;
}
</style>
