<template>
	<Justified>
		<FlashCardForm :error="error" :factory="factory" :loading="loading" :submit="editFlashCard"
			title="Edit a Flashcard set">
			<template v-slot:buttonTitle>Edit</template>
		</FlashCardForm>
	</Justified>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import FlashCardForm from '@app/components/study/flashCards/FlashCardForm.vue'
import { getEditingFlashCard, useEditFlashCard } from '@app/composable/study/flashCards'
import { useRoute } from 'vue-router'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'Edit Flashcard',
	displayName: 'Edit Flashcard',
	components: { Justified, FlashCardForm },
	middlewares: ['isAuthenticated', async ({ to }) => {
		const { id } = useAuth()
		const { flashCardId = '' } = to.params
		const flashCard = getEditingFlashCard()
		if (!flashCard || flashCard.id !== flashCardId) return `/study/flashCards/${flashCardId}`
		const canEdit = flashCard.userId === id.value
		if (!canEdit) return `/study/flashCards/${flashCard.id}`
	}],
	setup () {
		const { flashCardId } = useRoute().params
		const { editFlashCard, factory, error, loading } = useEditFlashCard(flashCardId as string)
		return { loading, error, editFlashCard, factory }
	}
})
</script>
