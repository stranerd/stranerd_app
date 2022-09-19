<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<div class="flex flex-col gap-4 page-padding h-full lg:h-auto">
			<span class="card p-4 bg-highlight text-center block">
				You have <span class="font-bold">{{
					wallet?.subscription.data.questions
				}} questions</span> to ask
			</span>
			<QuestionForm
				:error="error"
				:factory="factory"
				:loading="loading"
				:submit="createQuestion"
				class="flex-grow"
			>
				<template v-slot:buttonText>
					Post Question
				</template>
			</QuestionForm>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import QuestionForm from '@app/components/questions/questions/QuestionForm.vue'
import { useCreateQuestion } from '@app/composable/questions/questions'
import { useRouteMeta } from '@app/composable/core/states'
import { useAuth } from '@app/composable/auth/auth'
import { useReactionModal } from '@app/composable/core/modals'

export default defineComponent({
	name: 'QuestionsCreate',
	components: { QuestionForm },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', 'isSubscribed', async ({ goBackToNonAuth }) => {
		const { wallet } = useAuth()
		if (!wallet.value?.subscription.data.questions) {
			useReactionModal().openNoMoreQuestions()
			return goBackToNonAuth()
		}
	}]),
	setup () {
		useRouteMeta('Ask a Question', { back: true })
		const { wallet } = useAuth()
		const { factory, error, loading, createQuestion } = useCreateQuestion()
		return { factory, error, loading, createQuestion, wallet }
	}
})
</script>
