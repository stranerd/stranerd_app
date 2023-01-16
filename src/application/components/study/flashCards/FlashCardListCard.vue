<template>
	<router-link :to="`/study/flashCards/${flashCard.id}`"
		class="flex flex-col card-sm justify-between card-padding">
		<IonText class="font-500 truncate w-full">{{ flashCard.title }}</IonText>
		<div class="w-full flex items-center justify-between gap-2 text-sm text-secondaryText">
			<Tag
				:tag="`${formatNumber(flashCard.set.length)} ${pluralize(flashCard.set.length, 'card', 'cards')}`" />
			<div class="flex items-center gap-3">
				<Avatar v-if="flashCard.user.id !== id" :id="flashCard.user.id" :name="flashCard.user.bio.fullName"
					:size="24"
					:src="flashCard.user.bio.photo" />
				<Share :link="flashCard.shareLink" :title="flashCard.title" text="Share this flashcard" />
				<SaveToSet :entity="flashCard" />
				<SpinLoading v-if="loading" />
				<IonIcon v-if="flashCard.user.id === id" :icon="settingsOutline" @click.prevent="showMenu" />
				<IonIcon v-else :icon="copyOutline" @click.prevent="cloneFlashCard(flashCard, $router)" />
			</div>
		</div>
	</router-link>
</template>

<script lang="ts" setup>
import { closeOutline, copyOutline, pencilOutline, settingsOutline, trashBinOutline } from 'ionicons/icons'
import { formatNumber, pluralize } from '@utils/commons'
import { FlashCardEntity } from '@modules/study'
import SaveToSet from '@app/components/study/sets/SaveToSet.vue'
import { useAuth } from '@app/composable/auth/auth'
import { actionSheetController } from '@ionic/vue'
import { cloneFlashCard, openFlashCardEditModal, useDeleteFlashCard } from '@app/composable/study/flashCards'
import { useRouter } from 'vue-router'

const props = defineProps({
	flashCard: {
		type: FlashCardEntity,
		required: true
	}
})

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
</script>
