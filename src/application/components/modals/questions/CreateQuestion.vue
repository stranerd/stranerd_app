<template>
	<Modal>
		<template v-slot:title>
			Ask a question
		</template>
		<QuestionForm
			:error="error"
			:factory="factory"
			:loading="loading"
			:submit="createQuestion"
		>
			<template v-slot:buttonText>
				Send
			</template>
		</QuestionForm>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import QuestionForm from '@app/components/questions/questions/QuestionForm.vue'
import { useCreateQuestion } from '@app/composable/questions/questions'

export default defineComponent({
	name: 'CreateQuestionModal',
	components: { QuestionForm },
	setup () {
		const { factory, error, loading, createQuestion } = useCreateQuestion()
		return { factory, error, loading, createQuestion }
	}
})
</script>
