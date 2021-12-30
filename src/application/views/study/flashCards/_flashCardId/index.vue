<template>
	<Justified>
		<!-- TODO: Break into sections -->
		<div class="blueTop ">
			<div class="flex justify-between items-center">
				<div class="bg-white md:grid place-items-center p-1 rounded-sm mr-4 cursor-pointer hidden "
					@click="$router.go(-1)">
					<ion-icon :icon="arrowBackOutline" class="text-[23px] text-primary"></ion-icon>
				</div>
				<ion-text class="heading lg:text-2xl font-bold text-white text-center my-2">
					{{ flashCard?.title }}
				</ion-text>
			</div>

			<!-- <div class="flex items-center md:flex-row flex-col">
				<div class="flex items-center mr-6">
					<ShowRatings :rating="5" class="mr-3" />
					<ion-text class="text-white font-semibold">
						(14 reviews)
					</ion-text>
				</div>
				<ion-text class="text-faded_gray font-semibold">
					leave a rating
				</ion-text>

			</div> -->
		</div>
		<div
			id="screen"
			:class="[isFullscreen ? 'flex items-center justify-center flex-col':'', 'lg:w-8/12 w-full px-4 mx-auto mt-8 mb-16 ']">

			<div :class="[flipped ? 'vertical-flipped': 'vertical', 'divx w-full']" @click="flipped = !flipped">
				<!--  front side  -->
				<section
					class="front h-96 flex  items-center text-center justify-center  custom-shadow w-full text-3xl p-4 max-w-[60rem] mx-auto bg-white">
					<h2>{{ flashCard?.set[page].question }}</h2>
				</section>

				<!--  back side  -->
				<section
					class="back h-96 flex  items-center text-center justify-center  custom-shadow w-full text-3xl p-4 max-w-[60rem] mx-auto bg-white">
					<h2 v-if="flipped"> {{ flashCard?.set[page].answer }}</h2>
				</section>
			</div>

			<div class="w-full flex items-center justify-between my-8 max-w-[30rem] mx-auto">
				<ion-icon
					:icon="isPlaying ? pause : play"
					class="text-icon_inactive text-xl cursor-pointer"
					@click="playCard()"
				/>
				<div class="flex items-center ">
					<ion-icon
						:icon="chevronBack"
						class="text-icon_inactive text-xl cursor-pointer "
						@click="decrease()"
					/>
					<ion-text class="mx-4 text-icon_inactive mr-5">
						<b>{{ page + 1 }}</b> of <b>{{ flashCard?.set.length }}</b>
					</ion-text>
					<ion-icon
						:icon="chevronForward"
						class="text-icon_inactive text-xl cursor-pointer mr-5"
						@click="increase()"
					/>
				</div>
				<ion-icon
					v-if="!isFullscreen"
					:icon="scan"
					class="text-icon_inactive text-xl cursor-pointer"
					@click="toggle()"
				/>
				<ion-icon
					v-else
					:icon="contract"
					class="text-icon_inactive text-xl cursor-pointer"
					@click="toggle()"
				/>
			</div>
		</div>

		<div class="footer-shadow py-4 fixed bottom-0 inset-x-0 bg-white">
			<div class="lg:w-8/12 max-w-[60rem] w-full px-4 lg:p-0 mx-auto flex items-center justify-between">
				<div v-if="flashCard" class="flex">
					<Avatar :id="flashCard.userId" :size="28" :src="flashCard.userBio.photo" class="mx-2" />
					<ion-text class="text-icon_inactive"> by <b>{{ flashCard.userBio.firstName }}</b></ion-text>
				</div>

				<div class="flex items-center">

					<!-- <ion-icon
						:icon="pencil"
						class="text-icon_inactive text-xl cursor-pointer mx-2"
					/>
					<ion-icon
						:icon="bookmark"
						class="text-icon_inactive text-xl cursor-pointer mx-2"
					/> -->
					<Share
						cssClass="text-icon_inactive text-xl cursor-pointer mx-2"
					/>
				</div>
			</div>
		</div>

		<PageLoading v-if="loading" />
	</Justified>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import {
	add,
	arrowBackOutline,
	bookmark,
	chevronBack,
	chevronForward,
	contract,
	pause,
	pencil,
	play,
	scan,
	shareSocial
} from 'ionicons/icons'
import Avatar from '@app/components/core/Avatar.vue'
import { openFlashCardEditModal, useFlashCard } from '@app/composable/study/flashCards'
import { useRoute, useRouter } from 'vue-router'
import { Alert } from '@utils/dialog'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'View Flashcard',
	disPlayingName: 'Flashcard Set',
	components: {
		Justified,
		Avatar
	},
	setup () {
		const { id } = useAuth()
		const isFullscreen = ref(false)
		const canExit = ref(false)
		const flipped = ref(false)

		const page = ref(0)
		const router = useRouter()
		const { flashCardId } = useRoute().params
		const { flashCard, listener, error, loading } = useFlashCard(flashCardId as string)
		let interval: any
		const isPlaying = ref(false)

		const increase = async () => {
			flipped.value = false
			if (page.value + 1 === flashCard.value?.set.length) {
				playCard()
				const accepted = await Alert({
					title: 'You have gotten to the end of the flashCard set. Try again or return to study?',
					confirmButtonText: 'Yes, Try again',
					cancelButtonText: 'No, Back to study'
				})

				if (accepted) page.value = 0
				else await router.push('/study')
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
			if (document?.exitFullscreen) {
				document?.exitFullscreen()
				isFullscreen.value = false
			}
		}
		const toggle = () => {
			if (isFullscreen.value) exit()
			else enter()
		}

		const playCard = () => {
			if (!isPlaying.value) {
				interval = setInterval(increase, 3000)
				isPlaying.value = true
			} else {
				clearInterval(interval)
				isPlaying.value = false
			}
		}

		const canEdit = computed({
			get: () => flashCard.value?.userId === id.value,
			set: () => {
			}
		})

		const editFlashCard = async () => {
			await openFlashCardEditModal(flashCard.value!, router)
		}

		return {
			canExit, flipped, isPlaying, pause,
			page, increase, decrease, playCard,
			isFullscreen, toggle, exit, enter,
			flashCard, error, loading,
			play, add, scan, chevronBack,
			chevronForward, pencil, contract,
			bookmark, shareSocial, arrowBackOutline,
			canEdit, editFlashCard
		}
	}
})
</script>

<style lang="scss" scoped>
	.footer-shadow {
		box-shadow: 0px -5px 5px rgba(139, 158, 177, 0.05);
	}

	.custom-shadow {
		box-shadow: 0px 0px 50px rgba(77, 92, 111, 0.1);
		border-radius: 24px;
	}

	.ion-iten-transparent {
		--background: transparent;
	}

	ion-searchbar {
		--box-shadow: 'none';
		--border-radius: 0.5rem;
	}

	.searchbar-input.sc-ion-searchbar-md {
		padding-top: 12px;
		padding-bottom: 12px;
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


	//.divx.horizontal > .front {
	//   opacity: 1;
	//   transform: rotateY(0deg);
	// }
	// .horizontal > .back {
	//   opacity: 0;
	//   transform: rotateY(180deg);
	// }
	// .horizontal:hover > .front {
	//   opacity: 0;
	//   transform: rotateY(180deg);
	// }
	// .horizontal:hover > .back {
	//   opacity: 1;
	//   transform: rotateY(0deg);
	// }
</style>
