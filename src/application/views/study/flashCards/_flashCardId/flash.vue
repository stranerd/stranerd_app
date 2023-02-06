<template>
	<FlashCardPageWrapper>
		<template v-slot="{ flashCard }">
			<Flash :close="() => $router.replace(`/study/flashCards/${flashCard.id}`)" :flashCard="flashCard" />
		</template>
	</FlashCardPageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Flash from '@app/components/study/flashCards/modes/Flash.vue'
import { useRouteMeta } from '@app/composable/core/states'
import FlashCardPageWrapper from '@app/components/study/flashCards/FlashCardPageWrapper.vue'

export default defineComponent({
	name: 'StudyFlashCardsFlashcardIdFlash',
	components: { FlashCardPageWrapper, Flash },
	setup () {
		useRouteMeta('Flashcard Set', { back: true })
	}
})
</script>
