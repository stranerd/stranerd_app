<template>
	<div class="flex justify-between items-center mt-14 mb-4">
		<span class="font-bold text-dark_gray text-2xl" variant="1">
			Transaction history
		</span>

		<ion-select value="notifications" class="max-w-[138px] text-xs md:text-sm  placeholder-[#8B9EB1] font-bold" placeholder="Daily" interface="action-sheet">
			<ion-select-option value="maths" >Daily</ion-select-option>
			<ion-select-option value="physics" >Monthly</ion-select-option>
			<ion-select-option value="bio" >Yearly</ion-select-option>
					
		</ion-select>
	</div>

	<div class="flex flex-col items-center justify-content-center gap-1 gap-md-2">
		<div class="flex flex-col gap-0-5 w-full">
			<div class="flex table-custom-style  text-dark bg-line">
				<div class="w-3/12">
					<span>Date</span>
				</div>
				<div class="w-3/12">
					<span>Amount</span>
				</div>
				<div class="w-6/12 text-end">
					<span>Description</span>
				</div>
			</div>


			<div v-for="(n) in 10" :key="n" class="flex items-center mt-4 table-data-style">
				<div class="w-3/12">
					<span>Aug 10 - 2021 </span>
				</div>
				<div class="w-3/12 flex items-center gap-2">
					<Coins :size="24"/>
					<span>
						10
					</span>
				</div>
				<div class="w-6/12 font-normal">
					<span>You got coins for a best answer</span>
				</div>
			</div>
		</div>

		<div class="text-center text-18">
			<a class="text-primary-dark py-2" @click.prevent="fetchOlderTransactions">LOAD MORE</a>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonSelect, IonSelectOption, } from '@ionic/vue'
import Coins from '../core/Coins.vue'

export default defineComponent({
	name: 'Transcration History',
	components: { IonSelect, IonSelectOption, Coins,    }

})
</script>

<style lang="scss" scoped>
ion-select {
  --placeholder-color: #8B9EB1;
  --placeholder-opacity: 1;
  background-color: #F7F7FC;
  --padding-end:1rem;
  --padding-top:0.8rem;
  --padding-bottom:0.8rem;
  border-radius: 12px;
  
}


	.table-custom-style {
		border-radius: 7px;
		background: $color-sub;
		font-weight: bold;
		font-size: 15px;
		color: white;
        padding: 1rem 2.281rem;
	}

	.table-data-style {
		border-radius: 6px;
		background: #F7F7FC;
		font-weight: 700;
		font-size: 15px;
		color: $color-sub;
		padding: 1rem 2.281rem;
	}
</style>
