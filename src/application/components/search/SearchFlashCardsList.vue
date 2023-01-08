<template>
	<div class="showcase-flex !p-0">
		<EmptyState v-if="flashCards.length === 0" info="No flashCards found." />
		<FlashCardListCard v-for="flashCard in flashCards" :key="flashCard.hash" :flashCard="flashCard" />
	</div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import FlashCardListCard from '@app/components/study/flashCards/FlashCardListCard.vue'
import { FlashCardEntity } from '@modules/study'

defineProps({
	flashCards: {
		type: Array as PropType<FlashCardEntity[]>,
		required: true
	}
})
</script>
