<template>
	<!-- <div class="flex flex-col items-end"> -->


	<router-link v-if="flashCard"
		:class="`m-0  h-[11rem]  !w-full cardPadding bg-white   rounded-xl flex flex-col md:gap-2 gap-[1rem] box-border justify-between p-5 `"
		:to="`/study/flashCards/${flashCard.id}`"
	>
		<div class="w-full justify-between items-start flex">
			<div class="flex flex-col items-start">
				<ion-text class="font-bold text-base text-main_dark">
					{{ flashCard.title }}
				</ion-text>

				<Tag
				>
					<template v-slot="slotProps">
						<div
							:style="`color:${slotProps.colors[slotProps.index || slotProps.randomNumber]}; background-color:${slotProps.bgColors[slotProps.index || slotProps.randomNumber]}`"
							class="flex items-center py-1 px-3 font-bold  rounded-3xl w-auto mt-2"
						>
							<ion-icon
								:icon="copy"
								class="text-base  mr-2"
							/>
							<ion-text
								class="text-sm  font-bold"

							>
								{{ flashCard.set.length }}
								{{ pluralize(flashCard.set.length, 'Card', 'Cards') }}
							</ion-text>
						</div>

					</template>

				</Tag>
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
import { copy, ellipsisVertical, flash } from 'ionicons/icons'
import { formatNumber, pluralize } from '@utils/commons'
import Avatar from '@app/components/core/Avatar.vue'
import { useEditState } from '@app/composable/study/state'
import { FlashCardEntity } from '@modules/study'
import Tag from '../../questions/tags/StudyTag.vue'

export default defineComponent({
	name: 'StudyFlashCardListCard',
	props: {

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
	components: { Avatar, Tag }
})

</script>

<style lang="scss" scoped>
	ion-card {
		box-shadow: none !important;

	}
</style>
