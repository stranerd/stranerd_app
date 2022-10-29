<template>
	<div class="showcase-flex">
		<div class="flex flex-col">
			<IonText class="font-bold text-lg">Explore flashCards</IonText>
			<IonText class="text-secondaryText">All flashCards created show up here. Happy browsing!</IonText>
		</div>
		<EmptyState v-if="!loading && !error && flashCards.length === 0" info="There are no flashCards available." />
		<FlashCardListCard v-for="flashCard in flashCards" :key="flashCard.hash" :flashCard="flashCard" />
		<BlockLoading v-if="loading" />
		<LoadMore v-if="hasMore" :load="fetchOlderFlashCards" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useFlashCardList } from '@app/composable/study/flashCards'
import FlashCardListCard from '@app/components/study/flashCards/FlashCardListCard.vue'

export default defineComponent({
	name: 'FlashCardsList',
	components: { FlashCardListCard },
	setup () {
		const { flashCards, error, loading, hasMore, fetchOlderFlashCards } = useFlashCardList()
		return { flashCards, error, loading, hasMore, fetchOlderFlashCards }
	}
})
</script>
