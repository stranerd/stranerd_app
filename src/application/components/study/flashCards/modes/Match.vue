<template>
	<div class="flex gap-4 justify-between items-center card-padding text-lg">
		<IonIcon :icon="closeOutline" @click="close" />
		<span v-if="done" class="font-bold">Results</span>
		<span v-else-if="started" class="flex gap-2">
			<IonIcon :icon="stopwatchOutline" />
			<span>{{ time.toFixed(1) }} s</span>
		</span>
		<span v-else class="font-bold">Match</span>
		<span />
	</div>
	<div class="flex flex-col page-side-padding">
		<div v-if="done" class="showcase-flex !gap-4">
			<template v-if="record">
				<p class="text-2xl font-bold text-center">
					{{ record.record ? 'Awesome! you set a new record' : `Your best time is ${ record.time } seconds` }}
				</p>
				<p class="text-lg text-center">
					You finished in {{ time.toFixed(1) }} seconds
				</p>
			</template>
			<IonButton class="btn-primary" @click="start">
				Start again
			</IonButton>
		</div>

		<div v-else-if="started" class="p-2 lg:p-0 grid grid-cols-2 sm:grid-cols-3 gap-2"
			style="grid-auto-rows: min(25vh, 300px);">
			<Transition v-for="idx in indexes" :key="idx" name="fade">
				<div v-if="!success[idx]"
					:class="errors[idx] ? 'error' : idx === pending ? 'info': ''"
					class="flex p-4 card-sm justify-center items-center text-center overflow-y-auto"
					@click="() => select(idx)">
					<DisplayHtml
						:html="flashCard.set[isQuestion(idx) ? idx : idx - flashCard.set.length][isQuestion(idx) ? 'question' : 'answer']"
						class="w-full my-auto overflow-y-auto" />
				</div>
			</Transition>
		</div>

		<div v-else class="showcase-flex !gap-6">
			<p class="text-2xl text-center">
				Match all the questions with their answers as fast as you can.
			</p>
			<IonButton class="btn-primary" @click="start">
				Start
			</IonButton>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { FlashCardEntity } from '@modules/study'
import { closeOutline, stopwatchOutline } from 'ionicons/icons'
import { onUnmounted, PropType, ref } from 'vue'
import { shuffleArray } from 'valleyed'
import { useSaveFlashCardMatch } from '@app/composable/study/flashCards'

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

const { record, loading, saveMatch } = useSaveFlashCardMatch(props.flashCard.id)

const started = ref(false)
const done = ref(false)
const time = ref(0)
const indexes = ref(new Array(props.flashCard.set.length * 2).fill(0).map((_, i) => i))
let interval = null as unknown as ReturnType<typeof setInterval>
const pending = ref(null as number | null)
const errors = ref({} as Record<number, boolean>)
const success = ref({} as Record<number, boolean>)
const isQuestion = (idx: number) => idx < props.flashCard.set.length

onUnmounted(() => {
	clearInterval(interval)
})

const start = () => {
	indexes.value = shuffleArray(indexes.value)
	success.value = {}
	errors.value = {}
	pending.value = null
	interval = setInterval(() => time.value += 0.1, 100)
	started.value = true
	done.value = false
}

const select = async (idx: number) => {
	const isQuestionIdx = isQuestion(idx)
	if (success.value[idx]) return
	if (!isQuestionIdx && pending.value === null) return
	if (isQuestionIdx) {
		pending.value = idx
		errors.value = []
	} else {
		errors.value = {}
		if (idx - props.flashCard.set.length === pending.value) {
			success.value[idx] = success.value[idx - props.flashCard.set.length] = true
			pending.value = null
		} else errors.value[idx] = errors.value[pending.value!] = true
	}
	if (Object.keys(success.value).length === indexes.value.length) {
		clearInterval(interval)
		await saveMatch(time.value)
		done.value = true
	}
}
</script>

<style lang="scss" scoped>
.error {
	border-color: $color-danger !important;
}

.info {
	border-color: $color-info !important;
}

.fade-leave-active {
	transition: opacity 1s ease;
}

.fade-leave-to {
	opacity: 0;
	border-color: $color-success !important;
}
</style>
