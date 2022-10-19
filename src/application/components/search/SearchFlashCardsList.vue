<template>
	<div class="showcase-flex !p-0">
		<EmptyState v-if="flashCards.length === 0" info="No flashCards found." />
		<FlashCardListCard v-for="flashCard in flashCards" :key="flashCard.hash" :flashCard="flashCard" />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import FlashCardListCard from '@app/components/study/flashCards/FlashCardListCard.vue'
import { FlashCardEntity } from '@modules/study'

export default defineComponent({
	name: 'SearchFlashCardsList',
	components: { FlashCardListCard },
	props: {
		flashCards: {
			type: Array as PropType<FlashCardEntity[]>,
			required: true
		}
	}
})
</script>
