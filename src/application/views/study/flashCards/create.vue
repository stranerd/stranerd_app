<template>
	<Justified>
		<FlashCardForm :error="error" :factory="factory" :loading="loading" :submit="createFlashCard"
			title="Create a Flashcard set">
			<template v-slot:buttonTitle>Create</template>
		</FlashCardForm>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import FlashCardForm from '@app/components/study/flashCards/FlashCardForm.vue'
import { useCreateFlashCard } from '@app/composable/study/flashCards'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'StudyFlashCardsCreate',
	displayName: 'Create Flashcard',
	components: { Justified, FlashCardForm },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		const { createFlashCard, factory, error, loading } = useCreateFlashCard()
		return { error, loading, createFlashCard, factory }
	}
})
</script>
