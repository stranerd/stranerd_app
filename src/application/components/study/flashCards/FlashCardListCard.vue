<template>
	<div class="m-0 bg-white rounded-xl flex flex-col gap-2 box-border justify-between p-4">
		<div class="w-full justify-between items-start flex">
			<div class="flex flex-col items-start">
				<ion-text class="font-bold text-base text-main_dark">{{ flashCard.title }}</ion-text>
				<Tag :tag="`${formatNumber(flashCard.set.length)} ${pluralize(flashCard.set.length, 'Card', 'Cards')}`">
					<template v-slot="slotProps">
						<span class="flex items-center">
							<ion-icon :icon="copy" class="text-base mr-1" />
							<ion-text class="text-xs font-bold">{{ slotProps.tag }}</ion-text>
						</span>
					</template>
				</Tag>
			</div>
			<ion-icon :icon="ellipsisVertical" class="text-gray text-xl cursor-pointer" @click="openMenu" />
		</div>

		<div class="w-full flex items-center justify-between">
			<div class="flex items-center gap-2">
				<Avatar :id="flashCard.userId" :size="24" :src="flashCard.userBio.photo" />
				<ion-text class="text-xs font-bold text-main_dark">{{ flashCard.userBio.firstName }}</ion-text>
			</div>
			<router-link :to="`/study/flashCards/${flashCard.id}`">
				<ion-button class="btn-outline text-primary font-bold w-full lg:min-w-[7.5rem]" size="small">
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
