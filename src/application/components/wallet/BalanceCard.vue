<template>
	<div class="bg-light_green md:p-8 py-8 px-4 rounded-xl">
		<div class="flex justify-between items-center">
			<div class="flex flex-col">
				<span class="font-bold text-dark_gray text-xs md:text-2xl md:mb-7 mb-4">Bronze coins</span>
				<div class="flex items-center">
					<Coins :size="24" class="md:hidden"/>
					<Coins :size="48" class="hidden md:block"/>
					<span class="font-bold text-dark_gray text-2xl md:text-5xl ml-3">10,000</span>
				</div>
			</div>

			<div class="flex flex-col">
				<span class="font-bold text-dark_gray text-xs md:text-2xl md:mb-7 mb-4 text-right">Gold coins</span>
				<div class="flex items-center">
					<Coins :size="24" :gold="true" class="md:hidden"/>
					<Coins :size="48" :gold="true" class="hidden md:block"/>
					<span class="font-bold text-dark_gray text-2xl md:text-5xl ml-3">2500</span>
				</div>
			</div>
		</div>

		<ion-button @click="buyCoins" class="md:w-[200px] w-[134px] md:mt-14 mt-7 font-bold capitalize md:text-base ">Buy coins</ion-button>
	</div>
</template>

<script lang="ts">

import { IonButton } from '@ionic/vue'
import Coins from '@/application/components/core/Coins.vue'
import { componentName, showModal } from '@/modules/Modal'
export default {
	name:'Balance Card',
	components:{IonButton, Coins, },
	setup(props: any) {
		const buyCoins = () => {
			showModal.value = true
			componentName.value = 'buyCoins'
		}

		return {
			buyCoins
		}
	}
}
</script>

<style scoped lang="scss">
ion-button {
	--background: #4D5C6F;
	--border-radius: 12px;
	--padding-top:1.5rem !important;
	--padding-bottom:1.5rem !important;

	@media (max-width: 640px) {
			--padding-top:1rem !important;
	--padding-bottom:1rem !important;
	}

}
</style>