<template>
	<div class=" text-xs md:text-sm  ">

		<div class="lg:mt-8 mt-4">


			<div class="mt-5 md:mt-6  col-span-6 flex flex-row flex-wrap ">

				<template v-if="questions.length === 0">
					<empty-state
						:btnText="'Ask a question'"
						:info="'No questions found! Start asking questions to help with homework and studying.'"
						route="/questions/create"
					></empty-state>
				</template>
				<template v-else>
					<div v-for="(question,index) in questions"
						:key="index"
						:class="0 === index ? 'w-full md:px-2 mb-5' :  'md:w-1/2 lg:w-full w-full md:px-2 md:py-3 mb-4 md:mb-0'">
						<question
							:colorClass="0 === index ? 'bg-white  md:h-[10.5rem]' : 'bg-white  md:h-[10.5rem] '"
							:isFeatured="0 === index ? true : false" :question="question" />
					</div>

					<div v-if="hasMore"
						class="text-center py-8 text-lg text-primary w-full font-semibold cursor-pointer">
						<a @click.prevent="fetchOlderQuestions">Load More</a>
					</div>
				</template>

			</div>
		</div>

	</div>
	<page-loading v-if="loading" />
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { useQuestionList } from '@app/composable/questions/questions'
import Question from '@app/components/questions/QuestionCard.vue'
import EmptyState from '@app/components/core/EmptyState.vue'
import PageLoading from '@app/components/core/PageLoading.vue'

export default defineComponent({
	name: 'QuestionsList',
	components: { Question, EmptyState,  PageLoading, },
	setup () {
		const {
			filteredQuestions: questions, error, loading, hasMore,
			answeredChoices, answered, subjectId, listener,
			fetchOlderQuestions
		} = useQuestionList()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)

		return {
			questions, error, loading, hasMore,
			answeredChoices, answered, subjectId,
			fetchOlderQuestions
		}
	}
})
</script>

