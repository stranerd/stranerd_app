<template>
	<Modal :close="close">
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

<script lang="ts" setup>
import PastQuestionForm from '@app/components/school/pastQuestions/PastQuestionForm.vue'
import { useCreatePastQuestion } from '@app/composable/school/pastQuestions'

defineProps({
	close: {
		type: Function,
		required: true
	}
})

const { factory, error, loading, createPastQuestion } = useCreatePastQuestion()
</script>
