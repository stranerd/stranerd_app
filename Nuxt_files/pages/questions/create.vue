<template>
	<div>
		<div class="question-body">
			<Heading class="mb-1-25 text-dark" variant="1">
				Ask Your Question
			</Heading>

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
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import QuestionForm from '@app/components/questions/questions/QuestionForm.vue'
import { useCreateQuestion } from '@/application/hooks/questions/questions'
import { analytics } from '@/modules/core'

export default defineComponent({
	name: 'QuestionCreatePage',
	components: { QuestionForm },
	layout: 'justified',
	middleware: ['isAuthenticated'],
	setup () {
		const { loading, createQuestion, factory, error, coins } = useCreateQuestion()
		onMounted(() => {
			analytics.logEvent('ask_question_start')
		})
		// useMeta({
		// 	title: 'Ask a Question | Stranerd'
		// })
		return { loading, createQuestion, factory, error, coins }
	},
	head: {}

})
</script>

<style lang="scss" scoped>
	.question-body {
		@media (min-width: $lg) {
			background: $color-tags;
			border: 1px solid $color-line;
			padding: 3rem;
		}
	}
</style>
