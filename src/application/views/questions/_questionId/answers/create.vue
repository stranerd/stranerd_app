<template>
	<DefaultLayout :hideBottom="true">
		<AnswerForm
			:error="error"
			:factory="factory"
			:loading="loading"
			:question="answeringQuestion"
			:submit="createAnswer"
			class="p-4 flex-grow"
		>
			<template v-slot:buttonText>
				Answer
			</template>
		</AnswerForm>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import AnswerForm from '@app/components/questions/answers/AnswerForm.vue'
import { getAnsweringQuestion, useCreateAnswer } from '@app/composable/questions/answers'
import BaseEditor from '@app/components/core/editors/BaseEditor.vue'
import { useRouteMeta } from '@app/composable/core/states'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'QuestionsQuestionIdAnswer',
	components: { AnswerForm, BaseEditor },
	beforeRouteEnter: generateMiddlewares([
		'isAuthenticated',
		async ({ to }) => {
			const { id } = useAuth()
			const { questionId } = to.params
			const question = getAnsweringQuestion()
			if (!question || question.id !== questionId || question.user.id === id.value) return `/questions/${questionId}`
		}
	]),
	setup () {
		useRouteMeta('Question', { back: true })
		const { factory, error, loading, answeringQuestion, createAnswer } = useCreateAnswer()
		return { factory, error, loading, answeringQuestion, createAnswer }
	}
})
</script>
