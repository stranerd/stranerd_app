<template>
	<FlashCardPageWrapper>
		<template v-slot="{ flashCard }">
			<Test :close="() => $router.replace(`/study/flashCards/${flashCard.id}`)" :flashCard="flashCard" />
		</template>
	</FlashCardPageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Test from '@app/components/study/flashCards/modes/Test.vue'
import { useRouteMeta } from '@app/composable/core/states'
import FlashCardPageWrapper from '@app/components/study/flashCards/FlashCardPageWrapper.vue'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'StudyFlashCardsFlashcardIdMatch',
	components: { FlashCardPageWrapper, Test },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Flashcard Set', { back: true })
	}
})
</script>
