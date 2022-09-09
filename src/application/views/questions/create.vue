<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<template v-slot:panel>
			<QuestionsPanel />
		</template>
		<QuestionForm
			:error="error"
			:factory="factory"
			:loading="loading"
			:submit="createQuestion"
			class="page-padding h-full lg:h-auto"
		>
			<template v-slot:buttonText>
				Post Question
			</template>
		</QuestionForm>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import QuestionForm from '@app/components/questions/questions/QuestionForm.vue'
import { useCreateQuestion } from '@app/composable/questions/questions'
import { useRouteMeta } from '@app/composable/core/states'
import QuestionsPanel from '@app/components/layout/panels/QuestionsPanel.vue'
import { useAuth } from '@app/composable/auth/auth'
import { useReactionModal } from '@app/composable/core/modals'

export default defineComponent({
	name: 'QuestionsCreate',
	components: { QuestionForm, QuestionsPanel },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', async ({ goBackToNonAuth }) => {
		const { wallet, isSubscribed } = useAuth()
		if (!isSubscribed.value) {
			useReactionModal().openNeedsSubscription()
			return goBackToNonAuth()
		}
		if (!wallet.value?.subscription.data.questions) {
			useReactionModal().openNoMoreQuestions()
			return goBackToNonAuth()
		}
	}]),
	setup () {
		useRouteMeta('Ask a Question', { back: true })
		const { factory, error, loading, createQuestion } = useCreateQuestion()
		return { factory, error, loading, createQuestion }
	}
})
</script>
