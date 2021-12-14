<template>
	<div>
		<div class="w-full flex justify-between">

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
			<Swiper :freeMode="true" :items="flashcards" :slides="1.1" class="mt-2 overflow-x-auto flex"
				slideClass="flex md:!w-[300px] !w-[265px] mr-3 lg:!w-2/5 lg:!max-w-[18rem] !mr-6">
				<template v-slot:default="{ item, index }">
					<StudyFlashCardListCard :flashCard="item" :index="index+1" colorClass="bg-white" />
				</template>
			</Swiper>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { chevronForwardOutline } from 'ionicons/icons'
import Swiper from '@app/components/core/Swiper.vue'
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
	components: { Swiper, StudyFlashCardListCard, IonBadge },
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
