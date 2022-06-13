<template>
	<JustifiedLayout :hideBottom="true">
		<QuestionForm
			:error="error"
			:factory="factory"
			:loading="loading"
			:submit="createQuestion"
			class="p-4 flex-grow"
		>
			<template v-slot:buttonText>
				Post Question
			</template>
		</QuestionForm>
	</JustifiedLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import QuestionForm from '@app/components/questions/questions/QuestionForm.vue'
import JustifiedLayout from '@app/layouts/Justified.vue'
import { useCreateQuestion } from '@app/composable/questions/questions'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'QuestionsCreate',
	components: { JustifiedLayout, QuestionForm },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Ask a Question')
		const { factory, error, loading, createQuestion } = useCreateQuestion()
		return { factory, error, loading, createQuestion }
	}
})
</script>
