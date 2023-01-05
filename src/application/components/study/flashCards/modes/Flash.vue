<template>
	<div class="flex flex-col h-full">
		<div class="flex gap-4 justify-between items-center p-4">
			<IonIcon :icon="closeOutline" @click="close" />
			<span class="font-bold text-lg">
				{{ page + 1 }}/{{ formatNumber(flashCard.set.length) }}
			</span>
			<span />
		</div>
		<div class="bg-itemBg">
			<div :style="`width:${percentage}%;`" class="h-1 bg-primaryBg" />
		</div>

		<div class="flex-1 flex flex-col my-6 text-xl">
			<Swipe :key="page" class="px-4 h-full" @swipeLeft="increase" @swipeRight="decrease">
				<Flip :back="flashCard.set[page].answer" :front="flashCard.set[page].question" />
			</Swipe>
		</div>

		<div class="text-secondaryText card-padding flex justify-between text-lg items-center gap-4">
			<IonIcon :icon="chevronBackOutline" @click="decrease" />
			<IonIcon :icon="isPlaying ? pauseOutline : playOutline" @click="isPlaying ? pauseCard() : playCard()" />
			<IonIcon :icon="chevronForwardOutline" @click="increase" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { FlashCardEntity } from '@modules/study'
import { chevronBackOutline, chevronForwardOutline, closeOutline, pauseOutline, playOutline } from 'ionicons/icons'
import { formatNumber } from '@utils/commons'
import { computed, ref } from 'vue'
import Flip from '@app/components/study/flashCards/modes/Flip.vue'

const props = defineProps({
	flashCard: {
		type: FlashCardEntity,
		required: true
	},
	close: {
		type: Function,
		required: true
	}
})

const isPlaying = ref(false)
const page = ref(0)
const percentage = computed(() => 100 * (page.value + 1) / props.flashCard.set.length)
let interval: any

const increase = () => {
	if (page.value + 1 === props.flashCard?.set.length) {
		pauseCard()
		page.value = 0
	} else page.value++
}
const decrease = () => {
	if (page.value !== 0) page.value--
}

const playCard = () => {
	interval = setInterval(increase, 3000)
	isPlaying.value = true
}
const pauseCard = () => {
	clearInterval(interval)
	isPlaying.value = false
}
</script>
