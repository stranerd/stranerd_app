<template>
	<DefaultLayout :hideBottom="true" :hideFab="true" :hideTop="!loading && !!flashCard">
		<template v-slot:content-top>
			<div v-if="flashCard" />
		</template>
		<div class="h-full flex flex-col">
			<BlockLoading v-if="loading" class="page-padding" />
			<FlashCardDetails v-else-if="flashCard" :flashCard="flashCard" />
			<NotFound v-else title="Flashcard not found" />
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useFlashCard } from '@app/composable/study/flashCards'
import { useRoute } from 'vue-router'
import FlashCardDetails from '@app/components/study/flashCards/FlashCardDetails.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'StudyFlashCardsFlashcardId',
	components: { FlashCardDetails },
	setup () {
		useRouteMeta('Flashcard Set', { back: true })
		const { flashCardId } = useRoute().params
		const { flashCard, error, loading } = useFlashCard(flashCardId as string)
		return { flashCard, loading, error }
	}
})
</script>
