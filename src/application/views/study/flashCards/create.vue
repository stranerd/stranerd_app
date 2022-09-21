<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<div class="flex flex-col gap-4 page-padding h-full lg:h-auto">
			<router-link class="card-sm gap-4 flex p-4 items-center text-secondaryText" to="/study/flashCards/about">
				<IonIcon :icon="helpCircleOutline" />
				<span>See how it works</span>
				<div class="flex-1" />
				<IonIcon :icon="arrowForwardOutline" />
			</router-link>
			<FlashCardForm :error="error" :factory="factory" :loading="loading" :submit="createFlashCard"
				class="flex-grow">
				<template v-slot:buttonTitle>Create</template>
			</FlashCardForm>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FlashCardForm from '@app/components/study/flashCards/FlashCardForm.vue'
import { useCreateFlashCard } from '@app/composable/study/flashCards'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import { arrowForwardOutline, helpCircleOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'StudyFlashCardsCreate',
	components: { FlashCardForm },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Create Flashcard', { back: true })
		const { createFlashCard, factory, error, loading } = useCreateFlashCard()
		return { error, loading, createFlashCard, factory, helpCircleOutline, arrowForwardOutline }
	}
})
</script>
