<template>
	<div class="showcase-flex">
		<div class="flex justify-end !py-0 card-padding">
			<ion-button class="btn-primary btn-sm" @click="openQuestionModalFromClass(classInst, $router)">
				Ask a Question
			</ion-button>
		</div>
		<QuestionListCard v-for="question in questions" :key="question.hash" :classInst="classInst"
			:question="question" />
		<div v-if="hasMore" class="text-center py-4 text-primary w-full font-semibold cursor-pointer">
			<a @click.prevent="fetchOlderQuestions">Load More</a>
		</div>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ClassEntity } from '@modules/classes'
import QuestionListCard from '@app/components/questions/questions/QuestionListCard.vue'
import { useClassQuestionList } from '@app/composable/classes/questions'
import { openQuestionModalFromClass } from '@app/composable/questions/questions'

export default defineComponent({
	name: 'ClassQuestions',
	props: {
		classInst: {
			type: ClassEntity,
			required: true
		}
	},
	components: { QuestionListCard },
	setup (props) {
		const { loading, error, questions, hasMore, fetchOlderQuestions } = useClassQuestionList(props.classInst.id)
		return {
			loading, error, questions, hasMore, fetchOlderQuestions, openQuestionModalFromClass
		}
	}
})
</script>
