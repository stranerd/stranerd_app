<template>
	<div v-if="state.settings" class="h-full flex flex-col">
		<div class="flex gap-4 justify-between items-center card-padding text-lg mb-auto">
			<span class="font-bold">Options</span>
			<IonIcon :icon="closeOutline" @click="state.settings = false" />
		</div>
		<div class="flex gap-4 items-center card-padding border-top-line">
			<IonIcon :icon="paperPlaneOutline" />
			<span>Submit Test</span>
		</div>
		<div class="flex gap-4 items-center card-padding border-top-line" @click="restart">
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
			<IonIcon :icon="ellipsisHorizontalOutline" @click="state.settings = true" />
		</div>
		<div class="bg-itemBg mb-8">
			<div :style="`width:${percentage}%;`" class="h-1 bg-primaryBg" />
		</div>

		<div class="page-side-padding showcase-flex !gap-6">
			<p class="text-xl">
				<span v-html="props.questions[state.page].question" />
			</p>
			<div v-for="(option, idx) in props.questions[state.page].options" :key="idx" :class="getClass(idx)"
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
	chevronBackOutline,
	chevronForwardOutline,
	closeOutline,
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
	submit: {
		type: Function as PropType<() => void>,
		required: true
	},
	close: {
		type: Function as PropType<() => void>,
		required: true
	}
})

const state = reactive({
	settings: false,
	page: 0,
	answers: {} as Record<number, number>
})

const percentage = computed(() => 100 * (state.page + 1) / props.questions.length)

const goBack = () => state.page > 0 ? state.page-- : null
const goForward = () => state.page < (props.questions.length - 1) ? state.page++ : null
const chooseAnswer = (optionIdx: number) => {
	state.answers[state.page] = optionIdx
}

const restart = () => {
	state.page = 0
	state.answers = {}
	state.settings = false
}

const getClass = (optionIdx: number) => {
	const showAnswer = props.instant && state.page in state.answers
	if (!showAnswer) return optionIdx === state.answers[state.page] ? 'info' : ''
	if (props.questions[state.page].correct === optionIdx) return 'success'
	if (props.questions[state.page].correct != optionIdx && state.answers[state.page] === optionIdx) return 'error'
	return ''
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
