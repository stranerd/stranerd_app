<template>
	<Modal>
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

<script lang="ts">
import { defineComponent } from 'vue'
import PastQuestionForm from '@app/components/study/pastQuestions/PastQuestionForm.vue'
import { useEditPastQuestion } from '@app/composable/study/pastQuestions'

export default defineComponent({
	name: 'EditPastQuestionModal',
	components: { PastQuestionForm },
	setup () {
		const { factory, error, loading, editPastQuestion } = useEditPastQuestion()
		return { factory, error, loading, editPastQuestion }
	}
})
</script>
