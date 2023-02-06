<template>
	<FlashCardPageWrapper>
		<template v-slot="{ flashCard }">
			<Read :close="() => $router.replace(`/study/flashCards/${flashCard.id}`)" :flashCard="flashCard" />
		</template>
	</FlashCardPageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Read from '@app/components/study/flashCards/modes/Read.vue'
import { useRouteMeta } from '@app/composable/core/states'
import FlashCardPageWrapper from '@app/components/study/flashCards/FlashCardPageWrapper.vue'

export default defineComponent({
	name: 'StudyFlashCardsFlashcardIdRead',
	components: { FlashCardPageWrapper, Read },
	setup () {
		useRouteMeta('Flashcard Set', { back: true })
	}
})
</script>
