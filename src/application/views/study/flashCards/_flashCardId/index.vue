<template>
	<DefaultLayout :hideBottom="true">
		<div v-if="flashCard">
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
							<SpinLoading v-if="deleteLoading" />
							<IonIcon v-else :icon="trashBinOutline" class="text-danger" @click="deleteFlashCard" />
						</template>
					</div>
				</div>
			</div>
			<div class="flex flex-col">
				<FlashCardScreen v-if="cardMode" :flashCard="flashCard" />
				<FlashCardListView v-else :flashCard="flashCard" />
			</div>
		</div>
		<PageLoading v-if="loading" />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { copyOutline, createOutline, listOutline, trashBinOutline } from 'ionicons/icons'
import { openFlashCardEditModal, useDeleteFlashCard, useFlashCard } from '@app/composable/study/flashCards'
import { useRoute } from 'vue-router'
import FlashCardScreen from '@root/application/components/study/flashCards/FlashCardScreen.vue'
import FlashCardListView from '@root/application/components/study/flashCards/FlashCardListView.vue'
import SaveToSet from '@app/components/study/sets/SaveToSet.vue'
import { useRouteMeta } from '@app/composable/core/states'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'StudyFlashCardsFlashcardId',
	components: { FlashCardScreen, FlashCardListView, SaveToSet },
	setup () {
		useRouteMeta('Flashcard Set', { back: true })
		const { id } = useAuth()
		const cardMode = ref(true)
		const { flashCardId } = useRoute().params
		const { flashCard, error, loading } = useFlashCard(flashCardId as string)
		const { deleteFlashCard, loading: deleteLoading } = useDeleteFlashCard(flashCardId as string)
		return {
			id, cardMode, flashCard, loading, error,
			createOutline, trashBinOutline, copyOutline, listOutline,
			openFlashCardEditModal, deleteFlashCard, deleteLoading
		}
	}
})
</script>
