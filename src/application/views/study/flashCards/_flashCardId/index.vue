<template>
	<Justified>
		<div v-if="flashCard">
			<div class="blueTop py-4">
				<div
					class="flex flex-col md:flex-row md:justify-between justify-start items-start px-4 w-full lg:w-8/12 w-full mx-auto">
					<ion-text class="heading lg:text-xl font-bold text-main_dark text-start">
						{{ flashCard.title }}
					</ion-text>
					<div class="items-center text-gray font-normal flex gap-3">
						<div class="flex items-center lg:mr-4 mr-2" @click="cardMode = !cardMode">
							<ion-icon
								:icon="!cardMode ? copyOutline: listOutline"
								class="text-gray text-xl cursor-pointer mr-2 md:mt-0"
							/>
							<ion-text class=" flex">
								{{ !cardMode ? 'Card mode' : 'List mode' }}
							</ion-text>
						</div>
						<Avatar :id="flashCard.userId" :name="flashCard.userBio.fullName" :size="24"
							:src="flashCard.userBio.photo" />
						<Share :link="flashCard.shareLink" :title="flashCard.title" cssClass="text-xl"
							text="Share this flashcard" />
						<ion-icon :icon="isSaved ? bookmark : bookmarkOutline" class="text-xl"
							@click="openSaveModal(flashCard)" />
					</div>
				</div>
			</div>
			<div class="flex flex-col lg:w-8/12 w-full mx-auto">
				<FlashCardScreen v-if="cardMode" :flashCard="flashCard" />
				<FlashCardListView v-else :flashCard="flashCard" />
			</div>
		</div>
		<PageLoading v-if="loading" />
	</Justified>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import {
	bookmark,
	bookmarkOutline,
	checkmarkCircleOutline,
	copyOutline,
	ellipsisVerticalOutline,
	listOutline
} from 'ionicons/icons'
import Avatar from '@app/components/core/Avatar.vue'
import { useFlashCard } from '@app/composable/study/flashCards'
import { useRoute } from 'vue-router'
import FlashCardScreen from '@root/application/components/study/flashCards/FlashCardScreen.vue'
import FlashCardListView from '@root/application/components/study/flashCards/FlashCardListView.vue'
import { useUserSetList } from '@app/composable/users/users/sets'
import { openSaveModal } from '@app/composable/study/menus'

export default defineComponent({
	name: 'StudyFlashCardsFlashcardId',
	displayName: 'Flashcard Set',
	components: {
		Justified,
		Avatar,
		FlashCardScreen,
		FlashCardListView
	},
	setup () {
		const cardMode = ref(true)
		const { flashCardId } = useRoute().params
		const { flashCard, error, loading } = useFlashCard(flashCardId as string)
		const { sets } = useUserSetList()
		const isSaved = computed(() => sets.value.some((set) => set.allSaved.includes(flashCardId as string)))
		return {
			copyOutline, listOutline, cardMode, isSaved, openSaveModal,
			flashCard, loading, error,
			bookmark, bookmarkOutline, ellipsisVerticalOutline, checkmarkCircleOutline
		}
	}
})
</script>
