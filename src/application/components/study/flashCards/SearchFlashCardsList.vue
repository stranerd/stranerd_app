<template>
	<div>
		<template v-if="filtered.length === 0">
			<EmptyState info="No flashCards available." />
		</template>
		<template v-else>
			<div class="showcase">
				<FlashCardListCard v-for="flashCard in filtered" :key="flashCard.hash" :flashCard="flashCard"
					:openMenu="(event) => openMenu(flashCard, event)" />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import FlashCardListCard from '@app/components/study/flashCards/FlashCardListCard.vue'
import { FlashCardEntity } from '@modules/study'
import { openStudyEntityMenu } from '@app/composable/study/menus'

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
		const openMenu = (entity: FlashCardEntity, event: Event) => openStudyEntityMenu(entity, {}, event)
		const filtered = computed(() => props.flashCards.slice(0, props.sliced ? 6 : undefined))
		return { filtered, openMenu }
	}
})
</script>
