<template>
	<div class="showcase-flex">
		<EmptyState v-if="filtered.length === 0" info="No results found." />
		<FlashCardListCard v-for="flashCard in filtered" :key="flashCard.hash" :flashCard="flashCard" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import FlashCardListCard from '@app/components/study/flashCards/FlashCardListCard.vue'
import { FlashCardEntity } from '@modules/study'

export default defineComponent({
	name: 'SearchFlashCardsList',
	components: { FlashCardListCard },
	props: {
		flashCards: {
			type: Array as PropType<FlashCardEntity[]>,
			required: true
		},
		sliced: {
			type: Boolean,
			default: false,
			required: false
		}
	},
	setup (props) {
		const filtered = computed(() => props.flashCards.slice(0, props.sliced ? 6 : undefined))
		return { filtered }
	}
})
</script>
