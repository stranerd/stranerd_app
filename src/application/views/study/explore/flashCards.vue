<template>
	<ExploreWrapper>
		<div>
			<EmptyState v-if="flashCards.length === 0" info="No available flashCards" />
			<ExploreFlashCardsList :flashCards="flashCards" />
			<PageLoading v-if="loading" />
		</div>
	</ExploreWrapper>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import ExploreWrapper from '@app/components/study/explore/ExploreWrapper.vue'
import { useFlashCardList } from '@app/composable/study/flashCards'
import ExploreFlashCardsList from '@app/components/study/flashCards/ExploreFlashCardsList.vue'

export default defineComponent({
	name: 'ExploreFlashCards',
	displayName: 'Explore',
	components: { ExploreWrapper, ExploreFlashCardsList },
	setup () {
		const { flashCards, listener, loading, error } = useFlashCardList()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { flashCards, loading, error }
	}
})
</script>
