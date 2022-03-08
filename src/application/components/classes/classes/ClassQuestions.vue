<template>
	<div class="showcase-flex">
		<QuestionForm
			:error="createError"
			:factory="factory"
			:loading="createLoading"
			:submit="createQuestion"
			class="bg-white px-4 md:py-4 rounded-xl"
		>
			<template v-slot:buttonText>
				Post Question
			</template>
		</QuestionForm>
		<QuestionListCard v-for="question in questions" :key="question.hash" :classInst="classInst"
			:question="question" />
		<div v-if="hasMore" class="text-center py-4 text-primary w-full font-semibold cursor-pointer">
			<a @click.prevent="fetchOlderQuestions">Load More</a>
		</div>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { ClassEntity } from '@modules/classes'
import QuestionListCard from '@app/components/questions/questions/QuestionListCard.vue'
import { useClassQuestionList } from '@app/composable/classes/questions'
import { useCreateQuestion } from '@app/composable/questions/questions'
import { QuestionType } from '@modules/questions'
import QuestionForm from '@app/components/questions/questions/QuestionForm.vue'

export default defineComponent({
	name: 'ClassQuestions',
	props: {
		classInst: {
			type: ClassEntity,
			required: true
		}
	},
	components: { QuestionListCard, QuestionForm },
	setup (props) {
		const { loading, error, questions, hasMore, fetchOlderQuestions } = useClassQuestionList(props.classInst.id)
		const { factory, error: createError, loading: createLoading, createQuestion } = useCreateQuestion()
		onMounted(() => {
			factory.value.type = QuestionType.classes
			factory.value.classId = props.classInst.id
		})
		return {
			loading, error, questions, hasMore, fetchOlderQuestions,
			factory, createError, createLoading, createQuestion
		}
	}
})
</script>
