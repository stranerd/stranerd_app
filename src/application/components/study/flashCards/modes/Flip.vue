<template>
	<div :id="id" :class="[flipped ? 'vertical-flipped': 'vertical', 'flap']" @click="flipped = !flipped">
		<div class="front w-full">
			<section v-if="!flipped" :class="height" class="overflow-y-auto flex text-center custom-shadow p-4 mx-auto">
				<DisplayHtml :html="front" class="w-full my-auto overflow-y-auto" />
			</section>
		</div>

		<div class="back w-full">
			<section v-if="flipped" :class="height" class="overflow-y-auto flex text-center custom-shadow p-4 mx-auto">
				<DisplayHtml :html="back" class="w-full my-auto overflow-y-auto" />
			</section>
		</div>

		<IonIcon :icon="expandOutline" class="absolute z-1 right-[1rem] top-[1rem]" @click.prevent="toggleFullscreen" />
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { expandOutline } from 'ionicons/icons'
import { getRandomValue } from '@utils/commons'

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
	}
})

const id = getRandomValue()
const flipped = ref(false)
const isFullscreen = ref(false)
const toggleFullscreen = () => {
	isFullscreen.value ? document.exitFullscreen() : document.getElementById(id)?.requestFullscreen()
	isFullscreen.value = !isFullscreen.value
}
</script>

<style lang="scss" scoped>
.custom-shadow {
	box-shadow: 0px 0px 50px rgba(77, 92, 111, 0.1);
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

.flap > .front, .flap > .back {
	text-align: center;
	background: $color-itemBg;
	border-radius: 12px;
	transition-duration: 0.7s;
	transition-property: transform, opacity;
	box-shadow: 0 0 10px rgba(22, 37, 101, 0.1);
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
