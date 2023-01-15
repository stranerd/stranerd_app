<template>
	<TakeTest v-if="state.started" :close="close" :instant="state.instant" :questions="state.questions"
		:submit="close" />
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
import { closeOutline } from 'ionicons/icons'
import { PropType, reactive } from 'vue'
import { useRedirectToAuth } from '@app/composable/auth/session'
import { useAuth } from '@app/composable/auth/auth'
import { getRandomSample, shuffleArray } from '@stranerd/validate'
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

const { isLoggedIn } = useAuth()
const { redirect } = useRedirectToAuth()

// eslint-disable-next-line vue/no-setup-props-destructure
const length = props.flashCard.set.length
const state = reactive({
	noQuestions: length,
	started: false,
	instant: false,
	questions: [] as Test[]
})

const list = new Array(length).fill(0).map((_, i) => i)

const start = () => {
	if (!isLoggedIn.value) return redirect()
	const questions = props.flashCard.set.map((q, idx) => ({
		question: q.question,
		questionMedia: [],
		correct: 0,
		idx,
		options: shuffleArray([
			idx, ...getRandomSample(list.filter((i) => i !== idx), length < 4 ? length - 1 : 3)
		]).map((i) => ({ body: props.flashCard.set[i].answer, media: [], correct: i === idx }))
	})).map((q) => ({ ...q, correct: q.options.findIndex((o) => o.correct) }))
	state.questions = getRandomSample(questions, state.noQuestions)
	state.started = true
}
</script>