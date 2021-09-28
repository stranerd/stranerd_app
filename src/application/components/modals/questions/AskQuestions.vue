<template>
	<Modal :hide-separator="true" :modal="$attrs.modal">
		<template slot="title">
			Ask Your Question
		</template>
		<QuestionForm
			:coins="coins"
			:error="error"
			:factory="factory"
			:loading="loading"
			:submit="createQuestion"
		>
			<template slot="buttonText">
				Post Question
			</template>
		</QuestionForm>
	</Modal>
</template>

<script lang="ts">
import { defineComponent, onMounted, useMeta } from '@nuxtjs/composition-api'
import QuestionForm from '@app/components/questions/questions/QuestionForm.vue'
import { useCreateQuestion } from '@app/hooks/questions/questions'
import { analytics } from '@modules/core'

export default defineComponent({
	name: 'AskQuestion',
	components: { QuestionForm },
	setup () {
		const { loading, createQuestion, factory, error, coins } = useCreateQuestion()
		onMounted(() => {
			analytics.logEvent('ask_question_start')
		})
		useMeta({
			title: 'Ask a Question | Stranerd'
		})
		return { loading, createQuestion, factory, error, coins }
	},
	head: {}
})
</script>
