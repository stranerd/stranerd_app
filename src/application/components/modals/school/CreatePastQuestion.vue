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
import { PropType } from 'vue'

defineProps({
	close: {
		type: Function as PropType<() => void>,
		required: true
	}
})

const { factory, error, loading, createPastQuestion } = useCreatePastQuestion()
</script>
