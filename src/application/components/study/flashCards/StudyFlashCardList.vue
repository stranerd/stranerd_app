<template>
	<div>
		<div class="w-full flex justify-between">
			<span class="heading font-bold text-main_dark">
				FlashCards
			</span>

			<router-link class="text-primary normalText flex items-center font-bold"
				to="/study/flashCards/explore">
				<span>view all</span>
				<ion-icon :icon="chevronForwardOutline" class="text-xs md:text-xl" />
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
					<StudyFlashCardListCard :colorClass="index  === 0 ? 'bg-butter_yellow' : 'bg-light_gray'"
						:flashCard="item"
						:index="index+1"
					/>

				</template>
			</Swiper>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { IonIcon } from '@ionic/vue'
import { chevronForwardOutline } from 'ionicons/icons'
import Swiper from '@app/components/core/Swiper.vue'
import { useFlashCardList } from '@app/composable/study/flashCards'
import StudyFlashCardListCard from '@app/components/study/flashCards/StudyFlashCardListCard.vue'

export default defineComponent({
	name: 'StudyFlashCardList',
	components: { IonIcon, Swiper, StudyFlashCardListCard },
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
