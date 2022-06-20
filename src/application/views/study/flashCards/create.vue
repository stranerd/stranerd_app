<template>
	<DefaultLayout>
		<FlashCardForm :error="error" :factory="factory" :loading="loading" :submit="createFlashCard"
			title="Create a Flashcard set">
			<template v-slot:buttonTitle>Create</template>
		</FlashCardForm>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FlashCardForm from '@app/components/study/flashCards/FlashCardForm.vue'
import { useCreateFlashCard } from '@app/composable/study/flashCards'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'StudyFlashCardsCreate',
	components: { FlashCardForm },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Create Flashcard', { back: true })
		const { createFlashCard, factory, error, loading } = useCreateFlashCard()
		return { error, loading, createFlashCard, factory }
	}
})
</script>
