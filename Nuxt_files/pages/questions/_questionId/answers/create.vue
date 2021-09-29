<template>
	<div>
		<div class="flex flex-col gap-1 gap-lg-2 mb-1-5 mb-md-2-5">
			<Heading class="color-dark" variant="1">
				Question
			</Heading>
			<BodyText variant="large">
				<div class="mb-0-5 editor-body" v-html="question.body" />
			</BodyText>
			<div class="gap-0-5 flex align-items-center flex-row flex-wrap">
				<Tag v-for="tag in question.tags" :key="tag" :tag="tag" />
			</div>
		</div>
		<div class="answer-body p-md-3 p-1">
			<Heading class="mb-0-5" variant="2">
				Give Your Answer
			</Heading>

			<AnswerForm
				:error="error"
				:factory="factory"
				:loading="loading"
				:submit="createAnswer"
			>
				<template slot="buttonText">
					Add Answer
				</template>
			</AnswerForm>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { getAnsweringQuestion, useCreateAnswer } from '@/application/hooks/questions/answers'
import AnswerForm from '@app/components/questions/answers/AnswerForm.vue'
import Tag from '@app/components/questions/tags/Tag.vue'
import { analytics } from '@/modules/core'
import { useAuth } from '@/application/hooks/auth/auth'

export default defineComponent({
	name: 'QuestionPageAnswersCreatePage',
	components: { AnswerForm, Tag },
	middleware: [
		'isAuthenticated',
		// ({ redirect, route }) => {
		// 	const { id } = useAuth()
		// 	const { questionId = '' } = route.params
		// 	const question = getAnsweringQuestion()
		// 	if (!question) return redirect(`/questions/${questionId}`)
		// 	const canAnswer = question.userId !== id.value &&
		// 		!question.isAnswered && !question.answers.find((a) => a.userId === id.value)
		// 	if (!canAnswer) return redirect(`/questions/${question.id}`)
		// }
	],
	setup () {
		const { loading, createAnswer, factory, error, answeringQuestion } = useCreateAnswer()
		onMounted(() => {
			analytics.logEvent('answer_question_start', {
				questionId: answeringQuestion?.id,
				subject: answeringQuestion?.subjectId
			})
		})
		// useMeta(() => ({
		// 	title: 'Answer A Question | Stranerd'
		// }))
		return { loading, createAnswer, factory, error, question: getAnsweringQuestion() }
	},
	head: {}
})
</script>

<style lang="scss" scoped>
	.answer-body {
		background: $color-tags;
		border: 1px solid $color-line;
	}
</style>
