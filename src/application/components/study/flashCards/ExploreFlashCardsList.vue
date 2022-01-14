<template>
	<div>
		<EmptyState v-if="filtered.length === 0" info="No flashCards found." />
		<div v-else class="showcase">
			<FlashCardListCard v-for="flashCard in filtered" :key="flashCard.hash" :flashCard="flashCard"
				:openMenu="(event) => openMenu(flashCard, event)" />
		</div>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import FlashCardListCard from '@app/components/study/flashCards/FlashCardListCard.vue'
import { FlashCardEntity } from '@modules/study'
import { openStudyEntityMenu } from '@app/composable/study/menus'
import { useFlashCardList } from '@app/composable/study/flashCards'

export default defineComponent({
	name: 'ExploreFlashCardsList',
	components: { FlashCardListCard },
	props: {
		sliced: {
			type: Boolean,
			default: false,
			required: false
		}
	},
	setup (props) {
		const { loading, error, flashCards, hasMore } = useFlashCardList()
		const openMenu = (entity: FlashCardEntity, event: Event) => openStudyEntityMenu(entity, {}, event)
		const filtered = computed(() => flashCards.value.slice(0, props.sliced ? 6 : undefined))
		return { filtered, openMenu, loading, error, hasMore }
	}
})
</script>
