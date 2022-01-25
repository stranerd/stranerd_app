<template>
	<IonSkeletonText v-if="loading" animated class="h-36 rounded-xl " />
	<div v-else>
		<EmptyState v-if="!loading && filtered.length === 0" info="No flashCards available." />
		<div class="showcase">
			<FlashCardListCard v-for="flashCard in filtered" :key="flashCard.hash" :flashCard="flashCard"
				:openMenu="(event) => openMenu(flashCard, event)" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import FlashCardListCard from '@app/components/study/flashCards/FlashCardListCard.vue'
import { FlashCardEntity } from '@modules/study'
import { openStudyEntityMenu } from '@app/composable/study/menus'
import { IonSkeletonText } from '@ionic/vue'
import { useSearch } from '@app/composable/meta/search'

export default defineComponent({
	name: 'SearchFlashCardsList',
	components: { FlashCardListCard, IonSkeletonText },
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
		const { loading } = useSearch()
		const openMenu = (entity: FlashCardEntity, event: Event) => openStudyEntityMenu(entity, {}, event)
		const filtered = computed(() => props.flashCards.slice(0, props.sliced ? 6 : undefined))
		return { filtered, openMenu, loading }
	}
})
</script>
