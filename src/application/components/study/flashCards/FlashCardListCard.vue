<template>
	<router-link :to="`/study/flashCards/${flashCard.id}`"
		class="flex flex-col justify-between card-padding">
		<div class="flex gap-4 items-center">
			<IonText class="font-500 truncate w-full">{{ flashCard.title }}</IonText>
			<IonIcon :icon="arrowForwardOutline" />
		</div>
		<div class="w-full flex items-center justify-between gap-2 text-sm text-secondaryText">
			<Tag :tag="`${formatNumber(flashCard.set.length)} ${pluralize(flashCard.set.length, 'Card', 'Cards')}`">
				<template v-slot="slotProps">
					<span class="flex items-center">
						<IonIcon :icon="copyOutline" class="mr-1" />
						<IonText>{{ slotProps.tag }}</IonText>
					</span>
				</template>
			</Tag>
			<div class="flex items-center gap-3">
				<Avatar v-if="flashCard.user.id !== id" :id="flashCard.user.id" :name="flashCard.user.bio.fullName"
					:size="24"
					:src="flashCard.user.bio.photo" />
				<Share :link="flashCard.shareLink" :title="flashCard.title" text="Share this flashcard" />
				<SaveToSet :entity="flashCard" />
				<SpinLoading v-if="loading" />
				<IonIcon v-if="flashCard.user.id === id" :icon="settingsOutline" @click.prevent="showMenu" />
			</div>
		</div>
	</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {
	arrowForwardOutline,
	closeOutline,
	copyOutline,
	pencilOutline,
	settingsOutline,
	trashBinOutline
} from 'ionicons/icons'
import { formatNumber, pluralize } from '@utils/commons'
import Avatar from '@app/components/core/Avatar.vue'
import { FlashCardEntity } from '@modules/study'
import Share from '@app/components/core/Share.vue'
import SaveToSet from '@app/components/study/sets/SaveToSet.vue'
import { useAuth } from '@app/composable/auth/auth'
import { actionSheetController } from '@ionic/vue'
import { openFlashCardEditModal, useDeleteFlashCard } from '@app/composable/study/flashCards'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'FlashCardListCard',
	components: { Avatar, Share, SaveToSet },
	props: {
		flashCard: {
			type: FlashCardEntity,
			required: true
		}
	},
	setup (props) {
		const { id } = useAuth()
		const { deleteFlashCard, loading } = useDeleteFlashCard(props.flashCard.id)
		const router = useRouter()
		const showMenu = async () => {
			const actionSheet = await actionSheetController.create({
				buttons: [
					{
						text: 'Edit flashCard', icon: pencilOutline,
						handler: () => openFlashCardEditModal(props.flashCard, router)
					},
					{ text: 'Delete flashCard', role: 'destructive', icon: trashBinOutline, handler: deleteFlashCard },
					{ text: 'Cancel', icon: closeOutline, role: 'cancel' }
				]
			})
			await actionSheet.present()
		}
		return {
			id, settingsOutline, copyOutline, arrowForwardOutline,
			formatNumber, pluralize, loading, showMenu
		}
	}
})
</script>
