<template>
	<router-link :to="`/study/flashCards/${flashCard.id}`"
		class="bg-white rounded-xl flex flex-col box-border justify-between card-padding text-main_dark">
		<ion-text class="font-semibold truncate w-full">{{ flashCard.title }}</ion-text>
		<div class="w-full flex items-center justify-between gap-2">
			<Tag :index="1" :tag="`${formatNumber(flashCard.set.length)} ${pluralize(flashCard.set.length, 'Card', 'Cards')}`">
				<template v-slot="slotProps">
					<span class="flex items-center">
						<ion-icon :icon="copyOutline" class="mr-1" />
						<ion-text class="text-xs font-semibold">{{ slotProps.tag }}</ion-text>
					</span>
				</template>
			</Tag>
			<div class="flex items-center text-gray gap-2">
				<Avatar :id="flashCard.userId" :name="flashCard.userBio.fullName" :size="24"
					:src="flashCard.userBio.photo" />
				<Share :link="flashCard.shareLink" :title="flashCard.title" cssClass="text-xl"
					text="Share this flashcard" />
				<SaveToSet :entity="flashCard" />
			</div>
		</div>
	</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { copyOutline } from 'ionicons/icons'
import { formatNumber, pluralize } from '@utils/commons'
import Avatar from '@app/components/core/Avatar.vue'
import { FlashCardEntity } from '@modules/study'
import Share from '../../core/Share.vue'
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
		return { copyOutline, formatNumber, pluralize }
	}
})
</script>
