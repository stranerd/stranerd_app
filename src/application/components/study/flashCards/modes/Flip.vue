<template>
	<div :id="id" :class="[flipped ? 'vertical-flipped': 'vertical', isFullscreen ? 'fullscreen' : '', 'flap']">
		<div class="front w-full" @click.prevent="flipped = !flipped">
			<section v-if="!flipped" :class="height" class="overflow-y-auto flex text-center custom-shadow p-4 mx-auto">
				<DisplayHtml :html="front" class="w-full my-auto overflow-y-auto" />
			</section>
		</div>

		<div class="back w-full" @click.prevent="flipped = !flipped">
			<section v-if="flipped" :class="height" class="overflow-y-auto flex text-center custom-shadow p-4 mx-auto">
				<DisplayHtml :html="back" class="w-full my-auto overflow-y-auto" />
			</section>
		</div>

		<IonIcon v-if="canFullScreen" :icon="expandOutline" class="absolute z-1 right-[1rem] top-[1rem]"
			@click.prevent="toggleFullscreen" />
	</div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { expandOutline } from 'ionicons/icons'
import { getRandomValue } from 'valleyed'

const props = defineProps({
	front: {
		type: String,
		required: true
	},
	back: {
		type: String,
		required: true
	},
	height: {
		type: String,
		required: false,
		default: 'h-[70vh]'
	},
	play: {
		type: Number,
		required: false,
		default: 0
	}
})

const id = getRandomValue()
const flipped = ref(false)
const isFullscreen = ref(false)
const canFullScreen = ref(false)
let interval = null as any
const toggleFullscreen = async () => {
	if (!canFullScreen.value) return
	isFullscreen.value ? await document.exitFullscreen() : await document.getElementById(id)?.requestFullscreen?.()
	isFullscreen.value = !isFullscreen.value
}
onMounted(() => {
	canFullScreen.value = 'requestFullscreen' in (document.getElementById(id) ?? {})
	if (props.play) interval = setInterval(() => {
		flipped.value = !flipped.value
	}, props.play)
})
onUnmounted(() => {
	clearInterval(interval)
})
</script>

<style lang="scss" scoped>
.custom-shadow {
	box-shadow: 0 0 50px rgb(77 92 111 / 10%);
	border-radius: 12px;
}

.flap {
	border-radius: 12px;
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
}

.fullscreen section {
	height: 80vh !important;
}

.flap > .front, .flap > .back {
	text-align: center;
	background: $color-itemBg;
	border-radius: 12px;
	transition-duration: 0.7s;
	transition-property: transform, opacity;
	box-shadow: 0 0 10px rgb(22 37 101 / 10%);
}

.vertical > .front {
	opacity: 1;
	transform: rotateX(0deg);
}

.vertical > .back {
	opacity: 0;
	transform: rotateX(180deg);
}

.vertical-flipped > .front {
	opacity: 0;
	transform: rotateX(180deg);
}

.vertical-flipped > .back {
	opacity: 1;
	transform: rotateX(0deg);
}
</style>
