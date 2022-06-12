<template>
	<JustifiedLayout :hideBottom="true">
		<QuestionForm
			class="p-4"
			:error="error"
			:factory="factory"
			:loading="loading"
			:submit="createQuestion"
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

export default defineComponent({
	name: 'Ask a question',
	components: { JustifiedLayout, QuestionForm },
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),

	setup () {
		const { factory, error, loading, createQuestion } = useCreateQuestion()
		return { factory, error, loading, createQuestion }
	}
})
</script>
