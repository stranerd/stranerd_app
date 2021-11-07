<template>
	<div
		class="rounded-xl bg-white md:py-6 md:px-6 py-4 px-3 md:text-sm text-xs flex flex-col lg:col-start-5 lg:col-end-9 md:col-start-3 md:col-end-11 col-span-12">

		<div class="flex flex-col gap-1 text-center justify-center items-center ">
			<h3 class="text-xl font-semibold text-dark_gray">Coins withdrawal</h3>
			<span class="text-icon_inactive px-10 mt-1 md:px-12">Convert coins to money and withdraw to your bank account.</span>
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


		<div class="flex flex-row mt-4 py-3 px-3 items-center bg-light_gray justify-between rounded-lg">
			<div class="flex flex-row items-center">
				<img class="inline h-9 mr-1" src="/assets/images/bronze.svg" />
				<ion-icon :icon="chevronDown" class="text-[20px] mr-3 text-icon_inactive"></ion-icon>
				<span class="font-semibold text-dark_gray ">10,000</span>
			</div>
			<div class="flex flex-row items-center">
				<ion-icon :icon="repeatOutline" class="text-[26px] text-icon_inactive"></ion-icon>
			</div>
			<div class="flex flex-row-reverse items-center">
				<img class="inline h-9 ml-1" src="/assets/images/dollar.svg" />
				<ion-icon :icon="chevronDown" class="text-[20px] ml-3 text-icon_inactive"></ion-icon>
				<span class="font-semibold  text-dark_gray  ">100</span>
			</div>
		</div>

		<div class="flex flex-col mt-1 py-1 px-2 items-end gap-1  text-icon_inactive">
			<div class="flex flex-row items-center normalText ">
				<span>Stranerd Service Fee (20%): <b class="font-bold text-dark_gray">$20</b></span>
			</div>
			<div class="flex flex-row items-center headings ">
				<span>You will receive (80%): <b class="font-bold text-dark_gray">$80</b></span>
			</div>
		</div>

		<div class="mt-3 py-2 px-2 flex md:flex-row flex-col md:items-center">
			<span class="mr-2 font-semibold text-dark_gray">Payment method:</span>
			<div class="flex flex-row items-center gap-3 mt-2 md:mt-0">
				<div class="flex flex-row items-center ">
					<ion-icon :icon="ellipse" class="text-lg mr-1 text-primary"></ion-icon>
					<span class="font-bold text-icon_inactive">Bank account</span>
				</div>
				<div class="flex flex-row items-center ">
					<ion-icon :icon="ellipseOutline" class="text-lg mr-1 text-primary"></ion-icon>
					<span class="font-bold text-icon_inactive">Paypal</span>
				</div>
			</div>
		</div>


		<div class="mt-3 py-2 px-2 grid grid-cols-12 w-full gap-3">
			<div class="col-span-12 md:col-span-6">
				<div class="py-2 px-2 w-full bg-light_gray rounded-xl flex flex-row">
					<ion-input class="w-full font-medium" placeholder="Bank" value="">
					</ion-input>
				</div>
			</div>
			<div class="col-span-12 md:col-span-6">
				<div class="py-2 px-2 w-full  bg-light_gray rounded-xl flex flex-row">
					<ion-input class="w-full font-medium" placeholder="Account name" value="">
					</ion-input>
				</div>
			</div>
			<div class="col-span-12 md:col-span-6">
				<div class="py-2 px-2 w-full  bg-light_gray rounded-xl flex flex-row">
					<ion-input class="w-full font-medium" placeholder="Account number" value="">
					</ion-input>
				</div>
			</div>
			<div class="col-span-12 md:col-span-6">
				<div class="py-2 px-2 w-full  bg-light_gray rounded-xl flex flex-row">
					<ion-input class="w-full font-medium" placeholder="Authorization (Stranerd Password)" value="">
					</ion-input>
				</div>
			</div>
		</div>


		<div class="flex flex-row  mt-5  text-white gap-4">
			<div class="w-1/2 flex flex-row justify-center items-center">
				<button class=" px-6 py-3 relative ion-activatable rounded-lg w-full font-bold bg-dark_gray "
					@click="closeWithdrawCoins">
					Cancel
					<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
				</button>
			</div>
			<div class="w-1/2 flex flex-row justify-center items-center">
				<button class=" px-6 relative ion-activatable font-bold w-full py-3 rounded-lg bg-primary">
					Create
					<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
				</button>
			</div>
		</div>

	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import { IonIcon, IonInput, IonRippleEffect, } from '@ionic/vue'
import { chevronDown, ellipse, ellipseOutline, repeatOutline } from 'ionicons/icons'
import { useAccountModal} from '@app/composable/core/modals'

export default defineComponent({
	setup () {

		const closeWithdrawCoins =  () => {
			 useAccountModal().closeWithdrawCoins()
		}

		return {
			closeWithdrawCoins,
			chevronDown,
			ellipse,
			ellipseOutline,
			repeatOutline
		}
	},
	components: {
		IonIcon, IonInput, IonRippleEffect
	}
})
</script>
<style scoped>
	ion-input {

		/* Set a different placeholder color */
		--placeholder-color: #8B9EB1;

		/* Set full opacity on the placeholder */
		--placeholder-opacity: 1;
	}

</style>
