<template>
	<Modal :close="close">
		<template v-slot:title>
			Edit a question
		</template>
		<PastQuestionForm
			:error="error"
			:factory="factory"
			:loading="loading"
			:submit="editPastQuestion"
		>
			<template v-slot:buttonText>
				Update Question
			</template>
		</PastQuestionForm>
	</Modal>
</template>

<script lang="ts" setup>
import PastQuestionForm from '@app/components/school/pastQuestions/PastQuestionForm.vue'
import { useEditPastQuestion } from '@app/composable/school/pastQuestions'
import { PropType } from 'vue'

defineProps({
	close: {
		type: Function as PropType<() => void>,
		required: true
	}
})

const { factory, error, loading, editPastQuestion } = useEditPastQuestion()
</script>
