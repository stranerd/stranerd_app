<template>
	<!-- <div class="flex flex-col items-end"> -->


	<router-link v-if="flashCard"
		:class="`m-0  h-[10rem] md:!w-[21rem] !w-[17rem] cardPadding ${colorClass}   rounded-xl flex flex-col md:gap-2 gap-[1rem] box-border justify-between p-5 `"
		:to="`/study/flashCards/${flashCard.id}`"
	>
		<div class="w-full justify-between items-start flex">
			<div class="flex flex-col">
				<ion-text class="font-bold text-base text-main_dark">
					{{ flashCard.title }}
				</ion-text>
				<div class="flex items-center">
					<ion-icon
						:icon="copy"
						class="text-base text-gray mr-2"
					/>
					<ion-text class="text-sm text-gray font-bold">
						{{flashCard.set.length}}
						{{pluralize(flashCard.set.length, 'Card', 'Cards')}} 
					</ion-text>
				</div>
			</div>
	

			<ion-icon

				:icon="ellipsisVertical"
				class="text-gray text-2xl"
			/>

		</div>


		<div v-if="flashCard" class="w-full flex items-center justify-between ">

			<div class="flex items-center">
				<Avatar :size="24" :src="flashCard.userBio.photo" />
				<ion-text class="text-xs font-bold text-main_dark ml-2">
					{{ flashCard.userBio.firstName }}
				</ion-text>
			
			</div>
			<div class="flex items-center">
				<ion-button class="btn-outline  text-primary   font-bold w-full  lg:min-w-[7.5rem] " to="#">
					Open
				</ion-button>
		
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
import { defineComponent } from 'vue'
import { flash, ellipsisVertical, copy } from 'ionicons/icons'
import { formatNumber } from '@utils/commons'
import Avatar from '@app/components/core/Avatar.vue'
import { useEditState } from '@app/composable/study/state'
import { FlashCardEntity } from '@modules/study'
import { pluralize } from '@utils/commons'

export default defineComponent({
	name: 'StudyFlashCardCard',
	props: {
		colorClass: {
			type: String,
			default: 'bg-light_gray'
		},
		index: {
			type: Number,
			required: false
		},
		flashCard: {
			type: FlashCardEntity,
			required: true
		}
	},
	setup () {
		const { editState } = useEditState()

	
		return {
			ellipsisVertical, editState, copy,
			formatNumber, flash, pluralize
		}
	},
	components: { Avatar }
})
</script>

<style lang="scss" scoped>
	ion-card {
		box-shadow: none !important;

	}
</style>
