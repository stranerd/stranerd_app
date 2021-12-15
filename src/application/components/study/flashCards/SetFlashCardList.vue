<template>
	<div>
		<div class="w-full flex justify-between mb-4">
			<div class="heading font-bold text-main_dark flex items-center">
				<ion-text>FlashCards</ion-text>
			</div>
			<router-link
				class="text-primary normalText flex items-center font-bold"
				to="/study/explore/flashCards">
				<span>explore</span>
			</router-link>
		</div>

		<template v-if="flashCards.length === 0">
			<div class="py-3">
				<EmptyState info="No flashcards saved." />
			</div>
		</template>
		<template v-else>
			<div class="showcase">
				<FlashCardListCard v-for="(flashCard, index) in flashCards" :key="flashCard.hash" :flashCard="flashCard"
					:index="index+1" />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import FlashCardListCard from '@app/components/study/flashCards/FlashCardListCard.vue'
import { FlashCardEntity } from '@modules/study'

export default defineComponent({
	name: 'SetFlashCardList',
	props: {
		flashCards: {
			type: Array as PropType<FlashCardEntity[]>,
			required: true
		}
	},
	components: { FlashCardListCard }
})
</script>

<style>

</style>
