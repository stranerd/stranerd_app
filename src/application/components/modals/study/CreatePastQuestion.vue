<template>
	<Modal>
		<template v-slot:title>
			Create a question
		</template>
		<PastQuestionForm
			:error="error"
			:factory="factory"
			:loading="loading"
			:submit="createPastQuestion"
		>
			<template v-slot:buttonText>
				Create Question
			</template>
		</PastQuestionForm>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PastQuestionForm from '@app/components/school/pastQuestions/PastQuestionForm.vue'
import { useCreatePastQuestion } from '@app/composable/school/pastQuestions'

export default defineComponent({
	name: 'CreatePastQuestionModal',
	components: { PastQuestionForm },
	setup () {
		const { factory, error, loading, createPastQuestion } = useCreatePastQuestion()
		return { factory, error, loading, createPastQuestion }
	}
})
</script>
