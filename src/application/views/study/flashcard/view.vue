<template>
	<Justified>
		<!-- TODO: Break into sections -->
		<div class="bg-primary w-full min-h-[150px] flex flex-col justify-center items-center pt-0 pb-1">
			<ion-text class="heading lg:text-2xl font-bold text-white text-center my-2">
				Physics - Waves and Sounds (100l 1st semester exam)
			</ion-text>
			<div class="flex items-center md:flex-row flex-col">
				<div class="flex items-center mr-6">
					<ShowRatings :rating="5" class="mr-3" />
					<ion-text class="text-white font-semibold">
						(14 reviews)
					</ion-text>
				</div>
				<ion-text class="text-faded_gray font-semibold">
					leave a rating
				</ion-text>

			</div>
		</div>

		<div
			ref="screen"
			:class="[isFullscreen ? 'flex items-center justify-center flex-col':'', 'lg:w-8/12 w-full px-4 mx-auto mt-8 mb-16 bg-white']">
			<div
				class="flex items-center text-center justify-center h-96 custom-shadow w-full text-3xl p-4 max-w-[60rem] mx-auto">
				What will an air bubble in water act like?
			</div>

			<div class="w-full flex items-center justify-between my-8 max-w-[30rem] mx-auto">
				<ion-icon
					:icon="play"
					class="text-icon_inactive text-xl cursor-pointer"
				/>
				<div class="flex items-center gap-5">
					<ion-icon
						:icon="chevronBack"
						class="text-icon_inactive text-xl cursor-pointer"
					/>
					<ion-text class="mx-4 text-icon_inactive">
						<b>12</b> of <b>50</b>
					</ion-text>
					<ion-icon
						:icon="chevronForward"
						class="text-icon_inactive text-xl cursor-pointer"
					/>
				</div>
				<ion-icon
					v-if="!isFullscreen"
					:icon="scan"
					class="text-icon_inactive text-xl cursor-pointer"
					@click="enter()"
				/>
				<ion-icon
					v-else
					:icon="contract"
					class="text-icon_inactive text-xl cursor-pointer"
					@click="exit()"
				/>
			</div>
		</div>

		<div class="footer-shadow py-4 fixed bottom-0 inset-x-0 bg-white">
			<div class="lg:w-8/12 max-w-[60rem] w-full px-4 lg:p-0 mx-auto flex items-center justify-between">
				<div class="flex">
					<Avatar :size="28" class="mx-2 lg:ml-0" />
					<ion-text class="text-icon_inactive"> by <b>Timmy</b></ion-text>
				</div>

				<div class="flex items-center">

					<ion-icon
						:icon="pencil"
						class="text-icon_inactive text-xl cursor-pointer mx-2"
					/>
					<ion-icon
						:icon="bookmark"
						class="text-icon_inactive text-xl cursor-pointer mx-2"
					/>
					<ion-icon
						:icon="shareSocial"
						class="text-icon_inactive text-xl cursor-pointer mx-2"
					/>
				</div>
			</div>
		</div>


	</Justified>
</template>

<script lang="ts">
import Justified from '@app/layouts/Justified.vue'
import { add, bookmark, chevronBack, chevronForward, contract, pencil, play, scan, shareSocial } from 'ionicons/icons'
import ShowRatings from '@app/components/core/ShowRatings.vue'
import Avatar from '@app/components/core/Avatar.vue'

export default {
	name: 'StudyExploreTopSection',
	displayName: 'Flashcard Set',
	components: {
		Justified,
		ShowRatings,
		Avatar
	},
	setup () {
		return {
			play, add, scan, chevronBack, chevronForward, pencil, contract, bookmark, shareSocial
		}
	}
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
import { useFullscreen } from '@vueuse/core'

const screen = ref(null)
const { isFullscreen, enter, exit, toggle } = useFullscreen(screen)
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
</style>
