<template>
	<div>
		<template v-if="filtered.length === 0">
			<EmptyState info="No flashCards saved." />
		</template>
		<template v-else>
			<div class="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
				<FlashCardListCard v-for="flashCard in filtered" :key="flashCard.hash" :flashCard="flashCard" />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import FlashCardListCard from '@app/components/study/flashCards/FlashCardListCard.vue'
import { FlashCardEntity, SetEntity } from '@modules/study'

export default defineComponent({
	name: 'SetFlashCardsList',
	components: { FlashCardListCard },
	props: {
		set: {
			type: SetEntity,
			required: true
		},
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
