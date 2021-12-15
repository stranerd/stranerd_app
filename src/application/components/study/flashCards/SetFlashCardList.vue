<template>
	<div>
		<div class="w-full flex justify-between mb-4">
			<div class="heading font-bold text-main_dark flex items-center">
				<ion-text>FlashCards</ion-text>
			</div>
			<router-link
				:to="`/study/sets/${set.id}/flashCards`"
				class="text-primary normalText flex items-center font-bold">
				<span>view all</span>
			</router-link>
		</div>

		<template v-if="filtered.length === 0">
			<EmptyState info="No flashCards saved." />
		</template>

		<template v-else>
			<div class="showcase">
				<FlashCardCard v-for="flashCard in filtered" :key="flashCard.hash" :flashCard="flashCard" />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import FlashCardCard from '@app/components/study/flashCards/FlashCardListCard.vue'
import { FlashCardEntity, SetEntity } from '@modules/study'

export default defineComponent({
	name: 'SetFlashCardList',
	components: { FlashCardCard },
	props: {
		set: {
			type: SetEntity,
			required: true
		},
		flashCards: {
			type: Array as PropType<FlashCardEntity[]>,
			required: true
		}
	},
	setup (props) {
		const filtered = computed({
			get: () => props.flashCards.slice(0, 6),
			set: () => {
			}
		})
		return { filtered }
	}
})
</script>

<style>
	ion-badge {
		--background: #FFDC00 !important;
		--color: #132740 !important;
		--padding-top: 6px !important;
	}
</style>
