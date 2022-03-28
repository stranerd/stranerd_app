<template>
	<router-link :to="`/study/flashCards/${flashCard.id}`"
		class="bg-white rounded-xl flex flex-col box-border justify-between card-padding text-main_dark">
		<ion-text class="font-500 truncate w-full">{{ flashCard.title }}</ion-text>
		<div class="w-full flex items-center justify-between gap-2 text-sub">
			<Tag :index="1"
				:tag="`${formatNumber(flashCard.set.length)} ${pluralize(flashCard.set.length, 'Card', 'Cards')}`">
				<template v-slot="slotProps">
					<span class="flex items-center">
						<ion-icon :icon="copyOutline" class="mr-1" />
						<ion-text class="text-sub font-semibold">{{ slotProps.tag }}</ion-text>
					</span>
				</template>
			</Tag>
			<div class="flex items-center text-gray gap-3">
				<template v-if="edit && flashCard.userId === id">
					<span class="text-primary font-bold" @click.prevent="openFlashCardEditModal(flashCard, $router)">Edit</span>
					<span class="text-red font-bold" @click.prevent="deleteFlashCard">Delete</span>
				</template>
				<template v-else>
					<Avatar :id="flashCard.userId" :name="flashCard.userBio.fullName" :size="24"
						:src="flashCard.userBio.photo" />
					<Share :link="flashCard.shareLink" :title="flashCard.title" cssClass="text-xl"
						text="Share this flashcard" />
					<SaveToSet :entity="flashCard" />
				</template>
			</div>
			<PageLoading v-if="loading" />
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
import { useAuth } from '@app/composable/auth/auth'
import { openFlashCardEditModal, useDeleteFlashCard } from '@app/composable/study/flashCards'

export default defineComponent({
	name: 'FlashCardListCard',
	components: { Avatar, Share, SaveToSet },
	props: {
		flashCard: {
			type: FlashCardEntity,
			required: true
		},
		edit: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	setup (props) {
		const { id } = useAuth()
		const { deleteFlashCard, loading } = useDeleteFlashCard(props.flashCard.id)
		return {
			copyOutline, formatNumber, pluralize, id,
			openFlashCardEditModal, deleteFlashCard, loading
		}
	}
})
</script>
