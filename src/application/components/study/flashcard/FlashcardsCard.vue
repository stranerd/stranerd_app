<template>
	<div class="flex flex-col items-end">


		<div
			:class="`m-0  h-[10rem] cardPadding ${bgColor(index)} rounded-xl flex flex-col md:gap-2 gap-[1rem] box-border justify-center p-5 border border-faded_gray lg:border-0`"
		>
			<div class="flex items-center justify-between w-full">
				<ion-text class="text-sm text-main_dark font-bold">
					Physics - Waves and Sounds (100l 1st
					semester exams)
				</ion-text>
			</div>
			<div class="flex items-center justify-between w-full mt-2">
				<ShowRatings :rating="4"/>
			</div>

			<div class="w-full flex items-center justify-between mt-4">
				<div class="flex items-center">
					<ion-icon
						:icon='flash'
						class="text-main_dark mr-3"
					/>
					<ion-text class="text-sm text-main_dark font-bold">
						50 cards
					</ion-text>
				</div>

				<div class="flex items-center">
					<ion-text class="text-xs font-bold text-main_dark mr-2">
						Timmy
					</ion-text>
					<Avatar :size="24"/>
				</div>
			</div>
		</div>
		<ion-text class="font-bold text-delete_red cursor-pointer" v-if="editState['flashcard']">
			Remove
		</ion-text>
	</div>
</template>



<script lang="ts">
import { flash } from 'ionicons/icons'
import { defineComponent,  } from 'vue'
import { formatNumber } from '@utils/commons'
import ShowRatings from '@app/components/core/ShowRatings.vue'
import Avatar from '@app/components/core/Avatar.vue'
import { useEditState } from '@app/composable/study/state'


export default defineComponent({
	name: 'TutorCard',
	props: {
		colorClass: {
			type: String,
			default: 'bg-light_gray'
		},
		index: {
			type: Number,
			required: false
		},
	},
	setup() {
		const {editState} = useEditState()

		const bgColor = (index: any)=>{
			console.log(index)
			if (index === 1 ) return 'bg-light_green'
			else if (index ===2) return 'bg-tinted_pink'
			else if(index === 3) return 'bg-butter_yellow'
		}
		return {
			editState,
			bgColor,
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
