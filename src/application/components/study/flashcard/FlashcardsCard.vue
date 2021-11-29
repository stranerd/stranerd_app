<template>
	<!-- <div class="flex flex-col items-end"> -->


	<router-link v-if="flashCard" :to="`/study/flashcard/${flashCard.id}`"
		:class="`m-0  h-[10rem] md:!w-[18rem] !w-[17rem] cardPadding ${bgColor(index)} rounded-xl flex flex-col md:gap-2 gap-[1rem] box-border justify-between p-5 border border-faded_gray lg:border-0`"
	>
		<div class="flex items-center justify-between w-full" v-if="flashCard">
			<ion-text class="text-sm text-main_dark font-bold">
				{{flashCard.title}}
			</ion-text>
		</div>
		<!-- <div class="flex items-center justify-between w-full mt-2">
			<ShowRatings :rating="4"/>
		</div> -->

		<div class="w-full flex items-center justify-between mt-4" v-if="flashCard">
			<div class="flex items-center">
				<ion-icon
					:icon='flash'
					class="text-main_dark mr-3"
				/>
				<ion-text class="text-sm text-main_dark font-bold">
					{{flashCard.set.length}} cards
				</ion-text>
			</div>

			<div class="flex items-center">
				<ion-text class="text-xs font-bold text-main_dark mr-2">
					{{flashCard.userBio.firstName}}
				</ion-text>
				<Avatar :size="24"/>
			</div>
		</div>
	</router-link>
	<!-- <ion-text class="font-bold text-delete_red cursor-pointer" v-if="editState['flashcard']">
			Remove
		</ion-text>
	</div> -->

	<!-- <page-loading v-if="loading"/> -->
</template>



<script lang="ts">
import { flash } from 'ionicons/icons'
import { defineComponent,  } from 'vue'
import { formatNumber } from '@utils/commons'
// import ShowRatings from '@app/components/core/ShowRatings.vue'
import Avatar from '@app/components/core/Avatar.vue'
import { useEditState } from '@app/composable/study/state'
import { FlashCardEntity } from '@root/modules/study'


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
		flashCard:{
			type:FlashCardEntity,
			required:true
		}
	},
	setup() {
		const {editState} = useEditState()

		const bgColor = (index: any)=>{
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
	components: {  Avatar }
})
</script>



<style lang="scss" scoped>
	ion-card {
		box-shadow: none !important;

	}
</style>
