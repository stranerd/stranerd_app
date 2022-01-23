<template>
	<div>
		<EmptyState v-if="filtered.length === 0" info="You have saved any flashcards yet. <br>
Create your own flashcards or explore the public and save ones you want."
		>
			<div class="flex items-center gap-5">
				<router-link class="py-3 lg:px-7 px-4 bg-gray text-white font-bold lg:text-base text-xs rounded-xl"
					to="/study/flashCards/create">
					Create Flashcards
				</router-link>
				<router-link
					class="py-3 lg:px-7 px-4  border border-solid border-faded_gray text-gray font-bold lg:text-base text-xs rounded-xl"
					to="/search/flashCards">
					Explore Flashcards
				</router-link>
			</div>

		</EmptyState>
		<div class="showcase">
			<FlashCardListCard v-for="flashCard in filtered" :key="flashCard.hash" :flashCard="flashCard"
				:openMenu="(event) => openMenu(flashCard, event)" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import FlashCardListCard from '@app/components/study/flashCards/FlashCardListCard.vue'
import { FlashCardEntity, SetEntity } from '@modules/study'
import { openStudyEntityMenu } from '@app/composable/study/menus'

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
		const openMenu = (entity: FlashCardEntity, event: Event) => openStudyEntityMenu(entity, { set: props.set }, event)
		const filtered = computed(() => props.flashCards.slice(0, props.sliced ? 6 : undefined))
		return { filtered, openMenu }
	}
})
</script>
