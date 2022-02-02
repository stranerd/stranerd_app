<template>
	<div
		class="m-0 min-h-[7rem] !w-full bg-white rounded-xl flex flex-col md:gap-2 gap-[1rem] box-border justify-between p-4">
		<div class="w-full justify-between items-start flex">
			<div class="flex flex-col items-start">
				<ion-text class="font-bold text-base text-main_dark">{{ flashCard.title }}</ion-text>

				<Tag :tag="`${formatNumber(flashCard.set.length)} ${pluralize(flashCard.set.length, 'Card', 'Cards')}`"
					class="mt-2">
					<template v-slot="slotProps">
						<span class="flex items-center">
							<ion-icon :icon="copy" class="text-base mr-2" />
							<ion-text class="text-sm font-bold">{{ slotProps.tag }}</ion-text>
						</span>
					</template>
				</Tag>
			</div>
			<ion-icon :icon="ellipsisVertical" class="text-gray text-xl cursor-pointer" @click="openMenu" />
		</div>

		<div class="w-full flex items-center justify-between">
			<div class="flex items-center">
				<Avatar :id="flashCard.userId" :size="24" :src="flashCard.userBio.photo" />
				<ion-text class="text-xs font-bold text-main_dark ml-2">{{ flashCard.userBio.firstName }}</ion-text>
			</div>
			<router-link :to="`/study/flashCards/${flashCard.id}`">
				<ion-button class="btn-outline text-primary font-bold w-full lg:min-w-[7.5rem]">
					Open
				</ion-button>
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { copy, ellipsisVertical, flash } from 'ionicons/icons'
import { formatNumber, pluralize } from '@utils/commons'
import Avatar from '@app/components/core/Avatar.vue'
import { FlashCardEntity } from '@modules/study'

export default defineComponent({
	name: 'FlashCardListCard',
	props: {
		colorClass: {
			type: String,
			default: 'bg-white'
		},
		flashCard: {
			type: FlashCardEntity,
			required: true
		},
		openMenu: {
			type: Function,
			required: true
		}
	},
	setup () {
		return {
			ellipsisVertical, copy,
			formatNumber, flash, pluralize
		}
	},
	components: { Avatar }
})
</script>
