<template>
	<div class="flex flex-col">
		<span class="flex gap-4 justify-between card-padding !py-0">
			<IonText class="font-bold">{{ title }}</IonText>
			<router-link :to="route" class="text-info">view all</router-link>
		</span>
		<div class="showcase-flex !flex-row overflow-x-auto hide-scrollbar items-start">
			<EmptyState v-if="empty" :info="emptyMsg" />
			<FlashCardListCard v-for="flashCard in slice" :key="flashCard.hash" :flashCard="flashCard"
				class="min-w-[85%]" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import FlashCardListCard from '@app/components/study/flashCards/FlashCardListCard.vue'
import { FlashCardEntity } from '@modules/study'

export default defineComponent({
	name: 'FlashCardsHorizontalList',
	props: {
		title: {
			type: String,
			required: true
		},
		route: {
			type: String,
			required: true
		},
		flashCards: {
			type: Array as PropType<FlashCardEntity[]>,
			required: true
		},
		empty: {
			type: Boolean,
			required: true
		},
		emptyMsg: {
			type: String,
			required: true,
			default: ''
		}
	},
	components: { FlashCardListCard },
	setup (props) {
		const slice = computed(() => props.flashCards.slice(0, 10))
		return { slice }
	}
})
</script>
