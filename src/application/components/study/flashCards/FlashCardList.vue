<template>
	<div>
		<div class="w-full flex justify-between mb-4">
			<div class="heading font-bold text-main_dark flex items-center">
				<ion-text class="mr-3">
					FlashCards
				</ion-text>
				<ion-badge v-if="suggested" class="uppercase">
					Latest
				</ion-badge>
			</div>

			<router-link class="text-primary text-body flex items-center font-bold"
				to="/study/explore/flashCards">
				<span>view all</span>
			</router-link>
		</div>

		<template v-if="flashcards.length === 0">
			<EmptyState info="No flashcards available." />
		</template>
		<template v-else>
			<div class="showcase">
				<FlashCardListCard v-for="flashcard in flashcards" :key="flashcard" :flashCard="flashcard"
					:openMenu="(event) => openMenu(flashcard, event)" />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { useFlashCardList } from '@app/composable/study/flashCards'
import FlashCardListCard from '@app/components/study/flashCards/FlashCardListCard.vue'
import { IonBadge } from '@ionic/vue'
import { FlashCardEntity } from '@modules/study'
import { openStudyEntityMenu } from '@app/composable/study/menus'

export default defineComponent({
	name: 'FlashCardList',
	props: {
		suggested: {
			required: false,
			default: false
		}
	},
	components: { FlashCardListCard, IonBadge },
	setup () {
		const { flashCards: allFlashcard, listener, loading, error } = useFlashCardList()
		const flashcards = computed({
			get: () => allFlashcard.value.slice(0, 3),
			set: () => {
			}
		})

		const openMenu = (entity: FlashCardEntity, event: Event) => openStudyEntityMenu(entity, {}, event)

		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)

		return { flashcards, openMenu }
	}
})
</script>
