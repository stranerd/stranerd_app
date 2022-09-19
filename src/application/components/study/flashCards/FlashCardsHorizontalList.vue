<template>
	<div class="flex flex-col lg:gap-4">
		<span class="flex gap-4 justify-between px-4 lg:px-0 gap-4">
			<IonText class="font-bold">{{ title }}</IonText>
			<router-link :to="route" class="text-info">view all</router-link>
		</span>
		<div class="showcase-flex !flex-row overflow-x-auto hide-scrollbar items-start">
			<div v-if="empty" class="flex flex-col gap-4 border border-itemBg min-w-full card-padding">
				<slot name="empty">
					<span>{{ empty }}</span>
				</slot>
			</div>
			<FlashCardListCard v-for="flashCard in slice" :key="flashCard.hash" :flashCard="flashCard"
				class="min-w-[85%] lg:min-w-[40%]" />
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
			type: String,
			required: false,
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
