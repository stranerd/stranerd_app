<template>
	<div id="screen"
		:class="[isFullscreen ? 'flex items-center justify-center flex-col':'', 'lg:w-8/12 w-full px-4 mx-auto mt-8 mb-16 ']">

		<div :class="[flipped ? 'vertical-flipped': 'vertical', 'divx w-full']" @click="flipped = !flipped">
			<section
				class="front h-96 flex items-center text-center justify-center custom-shadow w-full text-3xl p-4 max-w-[60rem] mx-auto bg-white">
				<h2>
					<DisplayHtml :html="flashCard.set[page].question" />
				</h2>
			</section>

			<section
				class="back h-96 flex items-center text-center justify-center custom-shadow w-full text-3xl p-4 max-w-[60rem] mx-auto bg-white">
				<h2 v-if="flipped">
					<DisplayHtml :html="flashCard.set[page].answer" />
				</h2>
			</section>
		</div>

		<div class="w-full flex items-center justify-between my-8 max-w-[30rem] mx-auto">
			<ion-icon
				:icon="isPlaying ? pause : play"
				class="text-icon_inactive text-xl cursor-pointer"
				@click="isPlaying ? pauseCard() : playCard()"
			/>
			<div class="flex items-center">
				<ion-icon
					:icon="chevronBack"
					class="text-icon_inactive text-xl cursor-pointer "
					@click="decrease"
				/>
				<ion-text class="mx-4 text-icon_inactive mr-5">
					<b>{{ page + 1 }}</b> of <b>{{ formatNumber(flashCard.set.length) }}</b>
				</ion-text>
				<ion-icon
					:icon="chevronForward"
					class="text-icon_inactive text-xl cursor-pointer mr-5"
					@click="increase"
				/>
			</div>
			<ion-icon
				:icon="isFullscreen ? contract : scan"
				class="text-icon_inactive text-xl cursor-pointer"
				@click="toggleFullscreen"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { FlashCardEntity } from '@modules/study'
import { add, chevronBack, chevronForward, contract, pause, play, scan } from 'ionicons/icons'
import { formatNumber } from '@utils/commons'

export default defineComponent({
	name: 'FlashCardScreen',
	props: {
		flashCard: {
			type: FlashCardEntity,
			required: true
		}
	},
	setup (props) {
		const isFullscreen = ref(false)
		const flipped = ref(false)
		const isPlaying = ref(false)
		const page = ref(0)
		let interval: any

		const increase = async () => {
			flipped.value = false
			if (page.value + 1 === props.flashCard?.set.length) {
				pauseCard()
				page.value = 0
			} else page.value++
		}
		const decrease = () => {
			flipped.value = false
			if (page.value !== 0) page.value--
		}
		const enter = () => {
			const screen = document.getElementById('screen')
			screen?.requestFullscreen()
			isFullscreen.value = true
		}
		const exit = () => {
			document.exitFullscreen()
			isFullscreen.value = false
		}
		const toggleFullscreen = () => isFullscreen.value ? exit() : enter()

		const playCard = () => {
			interval = setInterval(increase, 3000)
			isPlaying.value = true
		}
		const pauseCard = () => {
			clearInterval(interval)
			isPlaying.value = false
		}

		return {
			increase, decrease, playCard, pauseCard, page, flipped, isPlaying,
			isFullscreen, toggleFullscreen, exit, enter, formatNumber,
			play, pause, add, scan, chevronBack, chevronForward, contract
		}
	}
})
</script>

<style lang="scss" scoped>
	.custom-shadow {
		box-shadow: 0px 0px 50px rgba(77, 92, 111, 0.1);
		border-radius: 24px;
	}

	.divx {
		background: #F2F3F5;
		border-radius: 12px;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.divx > .back {
		position: absolute;
	}

	.divx > .front, .divx > .back {
		text-align: center;
		transition-duration: 0.7s;
		transition-property: transform, opacity;
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
