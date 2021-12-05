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
import { useCreateFlashCard } from '@root/application/composable/study/flashCards'

export default defineComponent({
	name: 'Create Flashcard',
	displayName: 'Create Flashcard',
	components: { Justified, FlashCardForm },
	middlewares: ['isAuthenticated'],
	setup () {
		const { createFlashCard, factory, error, loading } = useCreateFlashCard()
		return { error, loading, createFlashCard, factory }
	}
})
</script>
