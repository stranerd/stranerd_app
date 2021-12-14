<template>
	<div>
		<div class="w-full flex justify-between mb-8">

			<div class="heading font-bold text-main_dark flex items-center">
				<ion-text class="mr-3">
					FlashCards
				</ion-text>
				<ion-badge v-if="suggested" class="uppercase">
					Suggested
				</ion-badge>
			</div>

			<router-link class="text-primary normalText flex items-center font-bold"
				to="/study/flashCards/explore">
				<span>view all</span>
			</router-link>
		</div>

		<template v-if="flashcards.length === 0">
			<div class="py-3">
				<EmptyState info="No flashcards Available." />
			</div>
		</template>
		<template v-else>
			<div class="showcase">
				<StudyFlashCardListCard v-for="(flashcard, index) in flashcards" :key="flashcard" :flashCard="flashcard" :index="index+1"  />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { chevronForwardOutline } from 'ionicons/icons'
import { useFlashCardList } from '@app/composable/study/flashCards'
import StudyFlashCardListCard from '@app/components/study/flashCards/StudyFlashCardListCard.vue'
import { IonBadge } from '@ionic/vue'

export default defineComponent({
	name: 'StudyFlashCardList',
	props: {
		suggested: {
			required: false,
			default: false
		}
	},
	components: {  StudyFlashCardListCard, IonBadge },
	setup () {
		const { flashCards: allFlashcard, listener, loading, error } = useFlashCardList()
		const flashcards = computed({
			get: () => allFlashcard.value.slice(0, 6),
			set: () => {
			}
		})

		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)

		return {
			flashcards,
			chevronForwardOutline
		}
	}
})
</script>

<style>

</style>
