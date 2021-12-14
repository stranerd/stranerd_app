<template>
	<Modal>
		<template v-slot:title>
			Ask a question and get expert answers
		</template>
		<div
			class="rounded-xl bg-white  md:px-6  px-3 py-6 md:text-sm text-xs flex flex-col lg:col-start-5 lg:col-end-9 md:col-start-3 md:col-end-11 col-span-12">

			<QuestionForm
				:error="error"
				:factory="factory"
				:loading="loading"
				:submit="createQuestion"
			>
				<template v-slot:buttonText>
					Post Question
				</template>
			</QuestionForm>
		</div>
	</Modal>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import QuestionForm from '@app/components/questions/questions/QuestionForm.vue'
import { useCreateQuestion } from '@app/composable/questions/questions'

import { chevronDown, ellipse, ellipseOutline } from 'ionicons/icons'
import { useQuestionModal } from '@app/composable/core/modals'

export default defineComponent({
	setup () {
		const closeAskQuestion = () => {
			useQuestionModal().closeAskQuestion()
		}
		const { factory, error, loading, createQuestion } = useCreateQuestion()
		return {
			factory, error, loading, createQuestion,
			closeAskQuestion, chevronDown, ellipse, ellipseOutline
		}
	},
	components: {
		QuestionForm
	}
})
</script>
<style scoped>
	ion-input {

		/* Set a different placeholder color */
		--placeholder-color: #8B9EB1;

		/* Set full opacity on the placeholder */
		--placeholder-opacity: 1;
	}

</style>
