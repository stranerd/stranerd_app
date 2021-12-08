<template>
	<div>
		<div class="w-full flex justify-between">

			<div class="heading font-bold text-main_dark flex items-center">
			

				<ion-text class="mr-3">
					FlashCards
				</ion-text>
				<ion-badge class="uppercase" v-if="suggested"> 
					Suggested
				</ion-badge>
			</div>

			<router-link v-if="flashcards.length && isLoggedIn"
				class="text-primary normalText flex items-center font-bold "
				to="/study/flashCards/explore">
				<span>view all</span>
			</router-link>
		</div>

		<template v-if="flashcards.length === 0"> 
			<div class="py-3">
				<empty-state
					info="You Have no Flashcard Available."
				></empty-state>
			</div>
		</template>
		<template v-else>
			<Swiper :freeMode="true" :items="flashcards" :slides="1.1" class="mt-2 overflow-x-auto flex"
				slideClass="flex md:!w-[300px] !w-[265px] mr-3 lg:!w-2/5 lg:!max-w-[18rem] !mr-6">
				<template v-slot:default="{ item, index }">
					<FlashcardsCard :colorClass=" index  === 0 ? 'bg-white' : 'bg-white'" :flashCard="item"
						:index="index+1"
					/>

				</template>
			</Swiper>
		</template>


	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { chevronForwardOutline } from 'ionicons/icons'
import Swiper from '@app/components/core/Swiper.vue'
import { useAuth } from '@app/composable/auth/auth'
import { useFlashCardList } from '@app/composable/study/flashCards'
import FlashcardsCard from './StudyFlashCardCard.vue'

export default defineComponent({
	name: 'RecentTransactions',
	components: {  Swiper, FlashcardsCard },
	props:{
		suggested:{
			required: false,
			default: false
		}
	},
	setup () {

		const { id, isLoggedIn } = useAuth()
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
			chevronForwardOutline,
			isLoggedIn
		}
	}
})
</script>

<style>

</style>
