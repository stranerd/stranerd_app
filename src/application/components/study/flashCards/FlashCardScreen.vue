<template>
	<div id="screen" class="flex flex-col lg:w-8/12 w-full px-4 mx-auto py-8 gap-8">
		<Swipe :key="page" :class="[isFullscreen ? 'flex-grow' : '']" @swipeLeft="increase" @swipeRight="decrease">
			<div :class="[flipped ? 'vertical-flipped': 'vertical', 'divx w-full h-full']"
				@click="flipped = !flipped">
				<div class="front bg-white w-full max-w-[72rem]">
					<section v-if="!flipped"
						class="h-[48vh] overflow-y-auto flex text-center custom-shadow text-2xl p-4 mx-auto">
						<DisplayHtml :html="flashCard.set[page].question" class="w-full my-auto overflow-y-auto" />
					</section>
				</div>

				<div class="back bg-white w-full max-w-[72rem]">
					<section v-if="flipped"
						class="h-[48vh] overflow-y-auto flex text-center custom-shadow text-2xl p-4 mx-auto">
						<DisplayHtml :html="flashCard.set[page].answer" class="w-full my-auto" />
					</section>
				</div>
			</div>
		</Swipe>

		<div class="w-full flex items-center justify-between max-w-[30rem] mx-auto gap-4">
			<ion-icon
				:icon="isPlaying ? pause : play"
				class="text-icon_inactive text-xl cursor-pointer"
				@click="isPlaying ? pauseCard() : playCard()"
			/>
			<div class="flex items-center gap-4">
				<ion-icon
					:icon="chevronBack"
					class="text-icon_inactive text-xl cursor-pointer "
					@click="decrease"
				/>
				<ion-text class="text-icon_inactive">
					<b>{{ page + 1 }}</b> of <b>{{ formatNumber(flashCard.set.length) }}</b>
				</ion-text>
				<ion-icon
					:icon="chevronForward"
					class="text-icon_inactive text-xl cursor-pointer"
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
		border-radius: 12px;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
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
