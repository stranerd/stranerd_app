<template>
	<div
		:class="`m-0  h-[10rem] cardPadding ${colorClass}  md:rounded-xl rounded-md flex flex-col md:gap-2 gap-[1rem] box-border  p-5`"
	>
		<div class="flex items-center justify-between w-full">
			<ion-text class="text-sm text-dark_gray font-bold">
				Physics - Waves and Sounds (100l 1st
				semester exams)
			</ion-text>
		</div>
		<div class="flex items-center justify-between w-full mt-2">
			<ShowRatings :rating="4"/>
		</div>

		<div class="w-full flex items-center justify-between mt-2">
			<div class="flex items-center">
				<ion-icon
					:icon='flash'
					class="text-icon_inactive mr-3"
				/>
				<ion-text class="text-sm text-icon_inactive font-bold">
					50 cards
				</ion-text>
			</div>

			<div class="flex items-center">
				<ion-text class="text-xs font-bold text-icon_inactive mr-3">
					Timmy
				</ion-text>
				<Avatar :size="24"/>
			</div>
		</div>
	


	</div>
</template>

<script lang="ts">
import { flash } from 'ionicons/icons'
import { defineComponent,  } from 'vue'
import { formatNumber } from '@utils/commons'
import ShowRatings from '@app/components/core/ShowRatings.vue'
import Avatar from '@app/components/core/Avatar.vue'

export default defineComponent({
	name: 'TutorCard',
	props: {
		colorClass: {
			type: String,
			default: 'bg-light_gray'
		},
	},
	setup() {
		return {
			formatNumber,
			flash,
		}
	},
	components: { ShowRatings, Avatar }
})
</script>

<style lang="scss" scoped>
	ion-card {
		box-shadow: none !important;

	}
</style>
