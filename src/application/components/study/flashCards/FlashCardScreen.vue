<template>
	<div id="screen" class="px-4">
		<Swipe :key="page" :class="[isFullscreen ? 'flex-grow' : '']" @swipeLeft="increase" @swipeRight="decrease">
			<div :class="[flipped ? 'vertical-flipped': 'vertical', 'divx w-full h-full text-xl']"
				@click="flipped = !flipped">
				<div class="front w-full">
					<section v-if="!flipped"
						class="h-[48vh] overflow-y-auto flex text-center custom-shadow p-4 mx-auto">
						<DisplayHtml :html="flashCard.set[page].question" class="w-full my-auto overflow-y-auto" />
					</section>
				</div>

				<div class="back bg-bodyBg w-full">
					<section v-if="flipped"
						class="h-[48vh] overflow-y-auto flex text-center custom-shadow p-4 mx-auto">
						<DisplayHtml :html="flashCard.set[page].answer" class="w-full my-auto" />
					</section>
				</div>
			</div>
		</Swipe>

		<div class="bg-itemBg transition-all absolute inset-x-0 z-10 bottom-[64px]">
			<div :style="`width:${percentage}%;`" class="h-1 bg-primaryBg" />
		</div>
		<div
			class="w-full flex items-center absolute inset-x-0 bottom-0 justify-between mx-auto gap-4 text-secondaryText p-6">
			<IonIcon :icon="isPlaying ? pauseOutline : playOutline" @click="isPlaying ? pauseCard() : playCard()" />
			<div class="flex items-center gap-4">
				<IonIcon :icon="chevronBackOutline" @click="decrease" />
				<IonText>
					<b>{{ page + 1 }}</b> of <b>{{ formatNumber(flashCard.set.length) }}</b>
				</IonText>
				<IonIcon :icon="chevronForwardOutline" @click="increase" />
			</div>
			<IonIcon :icon="isFullscreen ? contractOutline : scanOutline" @click="toggleFullscreen" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { FlashCardEntity } from '@modules/study'
import {
	addOutline,
	chevronBackOutline,
	chevronForwardOutline,
	contractOutline,
	pauseOutline,
	playOutline,
	scanOutline
} from 'ionicons/icons'
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
		const percentage = computed(() => Math.floor(((page.value + 1) / props.flashCard.set.length) * 100))
		let interval: any

		const increase = () => {
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
			increase,
			decrease,
			playCard,
			pauseCard,
			page,
			flipped,
			isPlaying,
			percentage,
			isFullscreen,
			toggleFullscreen,
			exit,
			enter,
			formatNumber,
			playOutline,
			pauseOutline,
			addOutline,
			scanOutline,
			chevronBackOutline,
			chevronForwardOutline,
			contractOutline
		}
	}
})
</script>

<style lang="scss" scoped>
	.custom-shadow {
		box-shadow: 0px 0px 50px rgba(77, 92, 111, 0.1);
		border-radius: 12px;
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
