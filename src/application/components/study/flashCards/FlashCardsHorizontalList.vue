<template>
	<div class="flex flex-col gap-4">
		<span class="flex justify-between gap-4">
			<IonText class="font-bold">{{ title }}</IonText>
			<router-link :to="route" class="text-info">view all</router-link>
		</span>
		<div class="showcase-flex !p-0 !flex-row overflow-x-auto hide-scrollbar items-start">
			<div v-if="empty" class="flex flex-col card-sm min-w-full card-padding">
				<slot name="empty">
					<span>{{ empty }}</span>
				</slot>
			</div>
			<FlashCardListCard v-for="flashCard in slice" :key="flashCard.hash" :flashCard="flashCard"
				class="min-w-[85%] lg:min-w-[40%]" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import FlashCardListCard from '@app/components/study/flashCards/FlashCardListCard.vue'
import { FlashCardEntity } from '@modules/study'

const props = defineProps({
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
})

const slice = computed(() => props.flashCards.slice(0, 10))
</script>
