<template>
	<Modal>
		<template v-slot:title>
			Edit Question
		</template>
		<QuestionForm
			:error="error"
			:factory="factory"
			:loading="loading"
			:submit="editQuestion"
		>
			<template v-slot:buttonText>
				Save Question
			</template>
		</QuestionForm>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import QuestionForm from '@app/components/questions/questions/QuestionForm.vue'
import { useEditQuestion } from '@app/composable/questions/questions'

export default defineComponent({
	name: 'EditQuestionModal',
	components: { QuestionForm },
	setup () {
		const { factory, error, loading, editQuestion } = useEditQuestion()
		return { factory, error, loading, editQuestion }
	}
})
</script>
