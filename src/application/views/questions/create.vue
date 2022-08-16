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
import { Notify } from '@utils/dialog'

export default defineComponent({
	name: 'QuestionsCreate',
	components: { QuestionForm, QuestionsPanel },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated', async ({ goBackToNonAuth }) => {
		const { wallet } = useAuth()
		if (!wallet.value) return goBackToNonAuth()
		if (!wallet.value?.subscription.data.questions) {
			Notify({ title: 'You don\'t have any questions left' })
			return '/settings/subscription'
		}
	}]),
	setup () {
		useRouteMeta('Ask a Question', { back: true })
		const { factory, error, loading, createQuestion } = useCreateQuestion()
		return { factory, error, loading, createQuestion }
	}
})
</script>
