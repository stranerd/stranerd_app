<template>
	<div class="overflow-y-auto">
		<div
			class="rounded-xl bg-white md:py-6 md:px-6 py-3 px-3 md:text-sm text-xs flex flex-col lg:col-start-5 lg:col-end-9 md:col-start-3 md:col-end-11 col-span-12">
			<div class="flex flex-col gap-1 justify-center items-center">
				<h3 class="text-xl font-semibold text-dark_gray">Buy Coin</h3>
				<span class="text-icon_inactive">Ask more questions, get more tutoring...</span>
			</div>

			<div class="flex flex-row mt-3 py-2 px-2 justify-between border-faded_gray border-2 rounded-lg">
				<div class="flex flex-row items-center">
					<img class="inline h-7 mr-2" src="/assets/images/bronze.svg" />
					<span class="font-semibold text-dark_gray ">10k</span>
				</div>
				<div class="flex flex-row-reverse items-center">
					<span class="font-semibold  text-dark_gray  ">250</span>
					<img class="inline h-7 mr-2" src="/assets/images/gold.svg" />
				</div>
			</div>

			<div class="flex flex-row mt-5 gap-2 items-center text-icon_inactive">
				<div class="flex flex-col w-1/2 gap-1">
					<h1>Bronze</h1>
					<div class="py-3 mt-1 px-3 bg-light_gray rounded flex flex-row items-center justify-between">
						<ion-icon :icon="removeOutline" class="text-[24px]">
						</ion-icon>
						<div class="flex flex-row items-center">
							<img class="inline h-8 mr-2" src="/assets/images/bronze.svg" />
							<span class="font-semibold text-dark_gray ">100</span>
						</div>
						<ion-icon :icon="add" class="text-[24px]">
						</ion-icon>
					</div>
					<button
						class="rounded-md bg-icon_inactive py-2 px-2 mt-1 text text-white center w-full font-semibold">
						N500
					</button>
				</div>
				<div class="flex flex-col w-1/2 gap-1">
					<h1>Gold</h1>
					<div class="py-3 mt-1 px-3 bg-light_gray rounded flex flex-row items-center justify-between">
						<ion-icon :icon="removeOutline" class="text-[24px]">
						</ion-icon>
						<div class="flex flex-row items-center">
							<img class="inline h-8 mr-2" src="/assets/images/gold.svg" />
							<span class="font-semibold text-dark_gray ">5</span>
						</div>
						<ion-icon :icon="add" class="text-[24px]">
						</ion-icon>
					</div>
					<button
						class="rounded-md bg-icon_inactive py-2 px-2 mt-1 text text-white center w-full font-semibold">
						N500
					</button>
				</div>
			</div>

			<div class="flex flex-col gap-2  mt-4 text-icon_inactive">
				<h1>Bronze x Gold Bundles</h1>
				<div class="py-3 mt-1 px-3 bg-light_gray rounded flex flex-row items-center justify-between">
					<ion-icon :icon="removeOutline" class="text-[24px]">
					</ion-icon>
					<div class="flex flex-row items-center">
						<div class="flex flex-row items-center">
							<img class="inline h-7 mr-1" src="/assets/images/bronze.svg" />
							<span class="font-semibold text-dark_gray">100</span>
						</div>
						<span class="w-2 h-2 bg-icon_inactive rounded-full mx-3"></span>
						<div class="flex flex-row items-center">
							<img class="inline h-7 mr-1" src="/assets/images/gold.svg" />
							<span class="font-semibold text-dark_gray ">5</span>
						</div>

					</div>
					<ion-icon :icon="add" class="text-[24px]">
					</ion-icon>
				</div>
				<button class="rounded-md bg-icon_inactive py-2 px-2 mt-1 text text-white center w-full font-semibold">
					N500
				</button>
			</div>

			<div class="flex flex-col gap-2  mt-4 text-icon_inactive">
				<div class="py-3 mt-1 px-3 bg-light_gray rounded flex flex-row items-center justify-between">
					<ion-icon :icon="removeOutline" class="text-[24px]">
					</ion-icon>
					<div class="flex flex-row items-center">
						<div class="flex flex-row items-center">
							<img class="inline h-7 mr-1" src="/assets/images/bronze.svg" />
							<span class="font-semibold text-dark_gray">250</span>
						</div>
						<span class="w-2 h-2 bg-icon_inactive rounded-full mx-3"></span>
						<div class="flex flex-row items-center">
							<img class="inline h-7 mr-1" src="/assets/images/gold.svg" />
							<span class="font-semibold text-dark_gray ">10</span>
						</div>

					</div>
					<ion-icon :icon="add" class="text-[24px]">
					</ion-icon>
				</div>
				<button class="rounded-md text-icon_inactive py-2 px-2 mt-1 text border-2 center w-full font-semibold"
						style="border: 2px solid #8B9EB1;">
					N500
				</button>
			</div>


			<div class="flex flex-row  mt-5  text-white gap-4">
				<div class="w-1/2 flex flex-row justify-center items-center">
					<button class=" px-6 py-3 relative ion-activatable rounded-lg w-full font-bold bg-dark_gray "
							@click="closeBuyCoins()">
						Cancel
						<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
					</button>
				</div>
				<div class="w-1/2 flex flex-row justify-center items-center">
					<button class=" px-6 relative ion-activatable font-bold w-full py-3 rounded-lg bg-primary">
						Buy all(N2000)
						<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
					</button>
				</div>
			</div>

		</div>
	</div>

</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { IonIcon, IonRippleEffect } from '@ionic/vue'
import { add, removeOutline } from 'ionicons/icons'
import { useAccountModal } from '@app/composable/core/modals'

export default defineComponent({
	setup () {
		const closeBuyCoins = () => {
			useAccountModal().closeBuyCoins()
		}

		return {
			closeBuyCoins,
			removeOutline,
			add
		}
	},
	components: {
		IonIcon, IonRippleEffect
	}
})
</script>
