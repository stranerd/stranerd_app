<template>
	<FlashCardPageWrapper>
		<template v-slot="{ flashCard }">
			<FlashCardDetails :flashCard="flashCard" />
		</template>
	</FlashCardPageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FlashCardDetails from '@app/components/study/flashCards/FlashCardDetails.vue'
import { useRouteMeta } from '@app/composable/core/states'
import FlashCardPageWrapper from '@app/components/study/flashCards/FlashCardPageWrapper.vue'

export default defineComponent({
	name: 'StudyFlashCardsFlashcardId',
	components: { FlashCardPageWrapper, FlashCardDetails },
	setup () {
		useRouteMeta('Flashcard Set', { back: true })
	}
})
</script>
