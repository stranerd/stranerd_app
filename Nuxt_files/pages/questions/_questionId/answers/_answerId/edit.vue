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
				Edit Your Answer
			</Heading>

			<AnswerForm
				:error="error"
				:factory="factory"
				:loading="loading"
				:submit="editAnswer"
			>
				<template slot="buttonText">
					Edit Answer
				</template>
			</AnswerForm>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { getEditingAnswer, useEditAnswer } from '@/application/hooks/questions/answers'
import AnswerForm from '@app/components/questions/answers/AnswerForm.vue'
import Tag from '@app/components/questions/tags/Tag.vue'
import { analytics } from '@/modules/core'
import { useAuth } from '@/application/hooks/auth/auth'
import { useRoute } from 'vue-router'

export default defineComponent({
	name: 'QuestionPageAnswerEditPage',
	components: { AnswerForm, Tag },
	middleware: [
		'isAuthenticated',
		// ({ redirect, route }) => {
		// 	const { id } = useAuth()
		// 	const { questionId = '' } = route.params
		// 	const edit = getEditingAnswer()
		// 	if (!edit) return redirect(`/questions/${questionId}`)
		// 	const canEditAnswer = edit.answer.userId === id.value && edit.answer.canBeEdited
		// 	if (!canEditAnswer) return redirect(`/questions/${edit.question.id}`)
		// }
	],
	setup () {
		const edit = getEditingAnswer()
		const { answerId } = useRoute().params
		const { loading, editAnswer, factory, error } = useEditAnswer(answerId[0])
		onMounted(() => {
			analytics.logEvent('answer_question_start', {
				questionId: edit?.answer.questionId,
				answerId,
				subject: edit?.question.subjectId
			})
		})
		// useMeta(() => ({
		// 	title: 'Edit An Answer | Stranerd'
		// }))
		return { loading, editAnswer, factory, error, question: edit?.question }
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
