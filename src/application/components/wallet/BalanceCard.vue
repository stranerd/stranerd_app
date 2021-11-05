<template>
	<div class="bg-light_green md:p-8 py-8 px-4 rounded-xl mt-2">
		<div class="flex justify-between items-center">
			<div class="flex flex-col">
				<span class="font-bold text-dark_gray text-xs md:text-base md:mb-7 mb-4">Bronze coins</span>
				<div class="flex items-center">
					<Coins :size="24" class="md:hidden" />
					<Coins :size="48" class="hidden md:block" />
					<span v-if="user" class="font-bold text-dark_gray text-2xl md:text-3xl ml-3">{{ formatNumber(user.account.coins.bronze, 5) }}</span>
				</div>
			</div>

			<div class="flex flex-col">
				<span class="font-bold text-dark_gray text-xs md:text-base md:mb-7 mb-4 text-right">Gold coins</span>
				<div class="flex items-center">
					<Coins :gold="true" :size="24" class="md:hidden" />
					<Coins :gold="true" :size="48" class="hidden md:block" />
					<span v-if="user" class="font-bold text-dark_gray text-2xl md:text-3xl ml-3">{{ formatNumber(user.account.coins.gold, 5) }}</span>
				</div>
			</div>
		</div>

		<div class="mt-9 flex flex-row items-center gap-4 md:gap-6 ">
			<button
				class=" px-6 py-3 md:px-10 headings relative ion-activatable rounded-lg text-white font-bold bg-dark_gray "
				@click="buyCoins">
				Buy coins
				<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
			</button>

			<button
				class=" px-6 py-3 md:px-10 headings relative ion-activatable border-[1px] border-solid border-dark_gray rounded-lg text-dark_gray font-bold bg-transparent "
				@click="makeWithdrawal">
				Withdraw
				<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
			</button>
		</div>

	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IonRippleEffect } from '@ionic/vue'
import Coins from '@app/components/core/Coins.vue'
import { componentName, showModal } from '@app/composable/core/Modal'
import { UserEntity } from '@modules/users'
import { formatNumber } from '@utils/commons'

export default defineComponent({
	name: 'Balance Card',
	components: { IonRippleEffect, Coins },
	props: {
		user: {
			required: true,
			type: Object as PropType<UserEntity>
		}
	},
	setup () {
		const buyCoins = () => {
			componentName.value = 'buyCoins'
			showModal.value = true

		}

		const makeWithdrawal = () => {
			componentName.value = 'withdrawal'
			showModal.value = true

		}
		return { formatNumber, buyCoins, makeWithdrawal }
	}

})
</script>

<style lang="scss" scoped>
	ion-button {
		--background: #4D5C6F;
		--border-radius: 12px;
		--padding-top: 1.5rem !important;
		--padding-bottom: 1.5rem !important;

		@media (max-width: 640px) {
			--padding-top: 1rem !important;
			--padding-bottom: 1rem !important;
		}

	}
</style>
