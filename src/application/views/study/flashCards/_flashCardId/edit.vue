<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<FlashCardForm :error="error" :factory="factory" :loading="loading" :submit="editFlashCard"
			class="flex-grow page-padding h-full lg:h-auto">
			<template v-slot:buttonTitle>Save</template>
		</FlashCardForm>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FlashCardForm from '@app/components/study/flashCards/FlashCardForm.vue'
import { getEditingFlashCard, useEditFlashCard } from '@app/composable/study/flashCards'
import { useRoute } from 'vue-router'
import { useAuth } from '@app/composable/auth/auth'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'StudyFlashCardsFlashcardIdEdit',
	components: { FlashCardForm },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', async ({ to }) => {
		const { id } = useAuth()
		const { flashCardId = '' } = to.params
		const flashCard = getEditingFlashCard()
		if (!flashCard || flashCard.id !== flashCardId) return `/study/flashCards/${flashCardId}`
		const canEdit = flashCard.user.id === id.value
		if (!canEdit) return `/study/flashCards/${flashCard.id}`
	}]),
	setup () {
		useRouteMeta('Edit Flashcard', { back: true })
		const { flashCardId } = useRoute().params
		const { editFlashCard, factory, error, loading } = useEditFlashCard(flashCardId as string)
		return { loading, error, editFlashCard, factory }
	}
})
</script>
