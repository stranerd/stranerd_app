<template>
	<div class="flex flex-col">
		<div class="flex flex-col">
			<div class="border-bottom-line w-full flex p-4 gap-4 justify-between">
				<IonText class="text-xl font-bold">{{ flashCard.title }}</IonText>
				<Avatar :id="flashCard.user.id" :name="flashCard.user.bio.fullName" :size="24"
					:src="flashCard.user.bio.photo" />
			</div>
			<div class="flex justify-between items-center gap-4 p-4 text-secondaryText">
				<div class="flex items-center" @click="cardMode = !cardMode">
					<IonIcon :icon="!cardMode ? copyOutline: listOutline" class="text-secondaryText mr-2 md:mt-0" />
					<IonText class="flex">
						{{ !cardMode ? 'Card mode' : 'List mode' }}
					</IonText>
				</div>

				<div class="flex items-center gap-4">
					<Share :link="flashCard.shareLink" :title="flashCard.title" text="Share this flashcard" />
					<SaveToSet :entity="flashCard" />
					<template v-if="flashCard.user.id === id">
						<IonIcon :icon="createOutline" class="text-primaryBg"
							@click="openFlashCardEditModal(flashCard, $router)" />
						<SpinLoading v-if="loading" />
						<IonIcon v-else :icon="trashBinOutline" class="text-danger" @click="deleteFlashCard" />
					</template>
				</div>
			</div>
		</div>
		<FlashCardScreen v-if="cardMode" :flashCard="flashCard" class="flex-1" />
		<FlashCardListView v-else :flashCard="flashCard" />
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { copyOutline, createOutline, listOutline, trashBinOutline } from 'ionicons/icons'
import { openFlashCardEditModal, useDeleteFlashCard } from '@app/composable/study/flashCards'
import FlashCardScreen from '@root/application/components/study/flashCards/FlashCardScreen.vue'
import FlashCardListView from '@root/application/components/study/flashCards/FlashCardListView.vue'
import SaveToSet from '@app/components/study/sets/SaveToSet.vue'
import { useAuth } from '@app/composable/auth/auth'
import { FlashCardEntity } from '@modules/study'

export default defineComponent({
	name: 'FlashCardDetails',
	components: { FlashCardScreen, FlashCardListView, SaveToSet },
	props: {
		flashCard: {
			type: FlashCardEntity,
			required: true
		}
	},
	setup (props) {
		const { id } = useAuth()
		const cardMode = ref(true)
		const { deleteFlashCard, loading, error } = useDeleteFlashCard(props.flashCard.id)
		return {
			id, cardMode, createOutline, trashBinOutline, copyOutline, listOutline,
			openFlashCardEditModal, deleteFlashCard, loading, error
		}
	}
})
</script>
