<template>
	<TakeTest v-if="state.started" :answers="state.answers" :close="close"
		:correct="correct.length"
		:instant="state.instant"
		:onAnswer="onAnswer" :questions="state.questions" :restart="start" :submit="submit"
		:submitted="state.submitted"
	>
		<template v-slot:study>
			<a v-for="{ label, sub, icon, func } in [
				{ label: 'Flashcard', icon: copyOutline, sub: 'The best way to memorize your studies', func: () => $router.push(`/study/flashCards/${flashCard.id}/flash`) },
				{ label: 'Read', icon: readerOutline, sub: 'Study questions with answers together', func: () => $router.push(`/study/flashCards/${flashCard.id}/read`) },
			]" :key="label" class="flex items-center card-padding !gap-4 card-sm" @click="func">
				<span class="rounded-full w-14 h-14 flex items-center justify-center bg-bodyBg">
					<IonIcon :icon="icon" />
				</span>
				<span class="flex flex-col">
					<span class="font-bold">{{ label }}</span>
					<span class="text-sm text-secondaryText">{{ sub }}</span>
				</span>
			</a>
		</template>
		<template v-if="correct.length !== state.questions.length" v-slot:retry>
			<a v-for="{ label, sub, icon, func } in [
				{ label: 'Retake failed questions', icon: closeOutline, sub: 'Test with the questions you missed', func: retakeFailed },
			]" :key="label" class="flex items-center card-padding !gap-4 card-sm" @click="func">
				<span class="rounded-full w-14 h-14 flex items-center justify-center bg-bodyBg">
					<IonIcon :icon="icon" />
				</span>
				<span class="flex flex-col">
					<span class="font-bold">{{ label }}</span>
					<span class="text-sm text-secondaryText">{{ sub }}</span>
				</span>
			</a>
		</template>
	</TakeTest>
	<div v-else class="flex flex-col">
		<div class="flex gap-4 justify-between items-center p-4 text-lg">
			<IonIcon :icon="closeOutline" @click="close" />
			<span class="font-bold">Test</span>
			<span />
		</div>

		<div class="page-side-padding showcase-flex !gap-6">
			<div class="flex gap-4 items-center justify-between">
				<span>No. of questions</span>
				<IonSelect v-model="state.noQuestions">
					<IonSelectOption v-for="i in length" :key="i" :value="i">
						{{ i }}
					</IonSelectOption>
				</IonSelect>
			</div>
			<div class="flex gap-4 items-center justify-between">
				<span>Instant result</span>
				<IonToggle v-model="state.instant" mode="ios" />
			</div>
			<IonButton class="btn-primary" @click="start">
				Start Test
			</IonButton>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { FlashCardEntity, Test } from '@modules/study'
import { closeOutline, copyOutline, readerOutline } from 'ionicons/icons'
import { computed, PropType, reactive, watch } from 'vue'
import { getRandomSample, shuffleArray } from 'valleyed'
import TakeTest from '@app/components/study/flashCards/modes/TakeTest.vue'

const props = defineProps({
	flashCard: {
		type: FlashCardEntity,
		required: true
	},
	close: {
		type: Function as PropType<() => void>,
		required: true
	}
})

// eslint-disable-next-line vue/no-setup-props-destructure
const length = props.flashCard.set.length
const state = reactive({
	noQuestions: length,
	started: false,
	instant: false,
	questions: [] as Test[],
	submitted: false,
	answers: {} as Record<string, number>
})

const resetQuestions = () => {
	const list = new Array(length).fill(0).map((_, i) => i)
	const questions = props.flashCard.set.map((q, idx) => ({
		id: idx.toString(),
		question: q.question,
		questionMedia: [],
		correct: 0,
		options: shuffleArray([
			idx, ...getRandomSample(list.filter((i) => i !== idx), length < 4 ? length - 1 : 3)
		]).map((i) => ({ body: props.flashCard.set[i].answer, media: [], correct: i === idx }))
	})).map((q) => ({ ...q, correct: q.options.findIndex((o) => o.correct) }))
	state.questions = getRandomSample(questions, state.noQuestions)
}

resetQuestions()
watch(() => state.noQuestions, resetQuestions)

const start = () => {
	state.submitted = false
	state.answers = {}
	state.started = true
}

const retakeFailed = () => {
	state.questions = state.questions.filter((q) => state.answers[q.id] !== q.correct)
	state.answers = {}
	state.submitted = false
	state.started = true
}

const submit = () => {
	state.submitted = true
}

const onAnswer = (questionId: string, optionIdx: number) => {
	if (state.submitted) return
	state.answers[questionId] = optionIdx
}

const correct = computed(() => state.questions.filter((q) => state.answers[q.id] === q.correct))
</script>
