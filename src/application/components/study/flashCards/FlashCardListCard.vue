<template>
	<div class="m-0 bg-white rounded-xl flex flex-col gap-2 box-border justify-between p-4 text-main_dark">
		<div class="w-full justify-between items-start flex">
			<div class="flex flex-col items-start truncate">
				<ion-text class="font-semibold truncate w-52">{{ flashCard.title }}</ion-text>
		
			</div>
			<router-link :to="`/study/flashCards/${flashCard.id}`">
				<ion-icon :icon="arrowForwardCircleOutline" class="text-primary text-xl"  />
			</router-link>
		</div>

		<div class="w-full flex items-center justify-between mt-6">
			<Tag :index="3"
				:tag="`${formatNumber(flashCard.set.length)} ${pluralize(flashCard.set.length, 'Card', 'Cards')}`">
				<template v-slot="slotProps">
					<span class="flex items-center">
						<ion-icon :icon="copyOutline" class="mr-1" />
						<ion-text class="text-xs font-semibold">{{ slotProps.tag }}</ion-text>
					</span>
				</template>
			</Tag>
			<div class="flex items-center text-gray">
				<Avatar :id="flashCard.userId" :size="24" :src="flashCard.userBio.photo" />
				<share cssClass="text-xl mx-3"/>
				<ion-icon :icon="bookmarkOutline"  class="text-xl" />
			</div>
		</div>
		
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { checkmarkCircleOutline, copyOutline, arrowForwardCircleOutline, bookmarkOutline } from 'ionicons/icons'
import { formatNumber, pluralize } from '@utils/commons'
import Avatar from '@app/components/core/Avatar.vue'
import { FlashCardEntity } from '@modules/study'
import Share from '../../core/Share.vue'

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

	},
	setup () {
		return {
			arrowForwardCircleOutline, copyOutline, bookmarkOutline, formatNumber, pluralize
		}
	},
	components: { Avatar, Share }
})
</script>
