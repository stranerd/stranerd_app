<template>
	<div class="bg-white rounded-xl flex flex-col box-border justify-between card-padding text-main_dark">
		<div class="w-full justify-between items-start flex">
			<div class="flex flex-col items-start truncate">
				<ion-text class="font-semibold truncate w-52">{{ flashCard.title }}</ion-text>

			</div>
			<router-link :to="`/study/flashCards/${flashCard.id}`">
				<ion-icon :icon="arrowForwardCircleOutline" class="text-primary text-xl" />
			</router-link>
		</div>

		<div class="w-full flex items-center justify-between gap-2">
			<Tag :tag="`${formatNumber(flashCard.set.length)} ${pluralize(flashCard.set.length, 'Card', 'Cards')}`">
				<template v-slot="slotProps">
					<span class="flex items-center">
						<ion-icon :icon="copyOutline" class="mr-1" />
						<ion-text class="text-xs font-semibold">{{ slotProps.tag }}</ion-text>
					</span>
				</template>
			</Tag>
			<div class="flex items-center text-gray gap-2">
				<Avatar :id="flashCard.userId" :size="24" :src="flashCard.userBio.photo" />
				<Share :link="flashCard.shareLink" :title="flashCard.title" cssClass="text-xl"
					text="Share this flashcard" />
				<ion-icon :icon="isSaved ? bookmark : bookmarkOutline" class="text-xl"
					@click="openSaveModal(flashCard)" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { arrowForwardCircleOutline, bookmark, bookmarkOutline, copyOutline } from 'ionicons/icons'
import { formatNumber, pluralize } from '@utils/commons'
import Avatar from '@app/components/core/Avatar.vue'
import { FlashCardEntity } from '@modules/study'
import Share from '../../core/Share.vue'
import { useUserSetList } from '@app/composable/users/users/sets'
import { openSaveModal } from '@app/composable/study/menus'

export default defineComponent({
	name: 'FlashCardListCard',
	props: {
		flashCard: {
			type: FlashCardEntity,
			required: true
		}
	},
	setup (props) {
		const { sets } = useUserSetList()
		const isSaved = computed(() => sets.value.some((set) => set.allSaved.includes(props.flashCard.id)))
		return {
			arrowForwardCircleOutline, copyOutline, bookmark, bookmarkOutline, formatNumber, pluralize, isSaved,
			openSaveModal
		}
	},
	components: { Avatar, Share }
})
</script>
