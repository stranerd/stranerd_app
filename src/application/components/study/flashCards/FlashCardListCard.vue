<template>
	<router-link :to="`/study/flashCards/${flashCard.id}`"
		class="flex flex-col justify-between card-padding">
		<div class="flex gap-4 items-center">
			<ion-text class="font-500 truncate w-full">{{ flashCard.title }}</ion-text>
			<ion-icon :icon="arrowForwardOutline" class="text-heading2" />
		</div>
		<div class="w-full flex items-center justify-between gap-2 text-sub text-secondaryText">
			<Tag :tag="`${formatNumber(flashCard.set.length)} ${pluralize(flashCard.set.length, 'Card', 'Cards')}`">
				<template v-slot="slotProps">
					<span class="flex items-center">
						<ion-icon :icon="copyOutline" class="mr-1" />
						<ion-text>{{ slotProps.tag }}</ion-text>
					</span>
				</template>
			</Tag>
			<div class="flex items-center gap-3">
				<Avatar :id="flashCard.user.id" :name="flashCard.user.bio.fullName" :size="24"
					:src="flashCard.user.bio.photo" />
				<Share :link="flashCard.shareLink" :title="flashCard.title" cssClass="text-xl"
					text="Share this flashcard" />
				<SaveToSet :entity="flashCard" />
			</div>
		</div>
	</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { arrowForwardOutline, copyOutline } from 'ionicons/icons'
import { formatNumber, pluralize } from '@utils/commons'
import Avatar from '@app/components/core/Avatar.vue'
import { FlashCardEntity } from '@modules/study'
import Share from '@app/components/core/Share.vue'
import SaveToSet from '@app/components/study/sets/SaveToSet.vue'

export default defineComponent({
	name: 'FlashCardListCard',
	components: { Avatar, Share, SaveToSet },
	props: {
		flashCard: {
			type: FlashCardEntity,
			required: true
		}
	},
	setup () {
		return {
			copyOutline, arrowForwardOutline, formatNumber, pluralize
		}
	}
})
</script>
