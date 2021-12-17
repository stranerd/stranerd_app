<template>
	<div>
		<div class="w-full flex justify-between mb-4">
			<span class="heading font-bold text-main_dark">
				Latest questions
			</span>

			<router-link class="text-primary normalText flex items-center font-bold" to="/questions">
				<span>view all</span>
			</router-link>
		</div>

		<EmptyState v-if="questions.length === 0"
			btnText="Ask a question"
			info="You have no recent questions! Start asking questions to help with homework and studying."
			route="/questions"
		/>
		<div v-else class="showcase">
			<QuestionListCard v-for="question in questions" :key="question.hash" :question="question" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { chevronBackOutline, chevronForwardOutline, ellipse } from 'ionicons/icons'
import QuestionListCard from '@app/components/questions/questions/RecentQuestionListCard.vue'
import { useQuestionList } from '@app/composable/questions/questions'
import EmptyState from '@app/components/core/EmptyState.vue'

export default defineComponent({
	name: 'RecentQuestions',
	components: { QuestionListCard, EmptyState },
	setup () {
		const { questions: allQuestions, listener, loading, error } = useQuestionList()
		const questions = computed({
			get: () => allQuestions.value.slice(0, 3),
			set: () => {
			}
		})
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)

		return {
			chevronForwardOutline, chevronBackOutline, ellipse,
			questions, loading, error
		}
	}
})
</script>

<style>

</style>
