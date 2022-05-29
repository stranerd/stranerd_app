<template>
	<Justified>
		<div v-if="flashCard">
			<div class="blueTop py-4">
				<div
					class="flex flex-col md:flex-row md:justify-between justify-start items-start px-4 w-full lg:w-8/12 w-full mx-auto">
					<IonText class="text-heading font-bold text-secondaryText text-start">
						{{ flashCard.title }}
					</IonText>
					<div class="items-center text-gray font-normal flex gap-3">
						<div class="flex items-center lg:mr-4 mr-2" @click="cardMode = !cardMode">
							<IonIcon
								:icon="!cardMode ? copyOutline: listOutline"
								class="text-gray text-heading2 cursor-pointer mr-2 md:mt-0"
							/>
							<IonText class=" flex">
								{{ !cardMode ? 'Card mode' : 'List mode' }}
							</IonText>
						</div>
						<Avatar :id="flashCard.user.id" :name="flashCard.user.bio.fullName" :size="24"
							:src="flashCard.user.bio.photo" />
						<Share :link="flashCard.shareLink" :title="flashCard.title" cssClass="text-heading2"
							text="Share this flashcard" />
						<SaveToSet :entity="flashCard" />
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
import { defineComponent, ref } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import { checkmarkCircleOutline, copyOutline, ellipsisVerticalOutline, listOutline } from 'ionicons/icons'
import Avatar from '@app/components/core/Avatar.vue'
import { useFlashCard } from '@app/composable/study/flashCards'
import { useRoute } from 'vue-router'
import FlashCardScreen from '@root/application/components/study/flashCards/FlashCardScreen.vue'
import FlashCardListView from '@root/application/components/study/flashCards/FlashCardListView.vue'
import SaveToSet from '@app/components/study/sets/SaveToSet.vue'

export default defineComponent({
	name: 'StudyFlashCardsFlashcardId',
	displayName: 'Flashcard Set',
	components: {
		Justified,
		Avatar,
		FlashCardScreen,
		FlashCardListView,
		SaveToSet
	},
	setup () {
		const cardMode = ref(true)
		const { flashCardId } = useRoute().params
		const { flashCard, error, loading } = useFlashCard(flashCardId as string)
		return {
			copyOutline, listOutline, cardMode,
			flashCard, loading, error, ellipsisVerticalOutline, checkmarkCircleOutline
		}
	}
})
</script>
