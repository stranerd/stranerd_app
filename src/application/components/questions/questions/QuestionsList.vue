<template>
	<div class="grid grid-col-6 px-3  text-xs md:text-sm  col-span-12">

		<div class="col-span-6 grid grid-cols-6 py-2 mt-2 md:mt-3">

			<div class="col-span-6 grid grid-cols-12 md:px-2 ">
				<div
					class="py-1 px-2 px-md text-sm col-span-12 md:col-start-4 md:col-end-10 md:mb-3   bg-light_gray rounded-xl md:rounded-md flex flex-row">
					<SelectSubject v-model:subjectId="subjectId" :show-all="true" />
				</div>

				<div
					class="mt-2 col-span-12  md:col-start-4 md:col-end-10 flex flex-row  justify-center items-center ">
					<span class="font-bold text-icon_inactive mr-3">Sort by: </span>
					<div v-for="choice in answeredChoices" :key="choice.key"
						class="flex flex-row items-center mr-2 cursor-pointer"
						@click="answered = choice.val">
						<ion-icon :icon=" answered === choice.val ? ellipse : ellipseOutline"
							class="text-lg mr-1 text-primary" />
						<span class="font-bold text-icon_inactive">{{ choice.key }}</span>
					</div>
				</div>
			</div>

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
						:class="0 === index ? 'w-full md:px-2 mb-3' :  'md:w-1/2 lg:w-full w-full md:px-2 md:py-3 mb-4 md:mb-0'">
						<question
							:colorClass="0 === index ? 'bg-butter_yellow h-[230px] md:h-[220px]' : 'bg-light_gray h-[230px] md:h-[220px]'"
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
import { IonIcon } from '@ionic/vue'
import { ellipse, ellipseOutline } from 'ionicons/icons'
import { useQuestionList } from '@app/composable/questions/questions'
import Question from '@app/components/questions/QuestionListCard.vue'
import EmptyState from '@app/components/core/EmptyState.vue'
import SelectSubject from '@app/components/questions/subjects/SelectSubject.vue'
import PageLoading from '@app/components/core/PageLoading.vue'

export default defineComponent({
	name: 'QuestionsList',
	components: { IonIcon, Question, EmptyState, SelectSubject, PageLoading },
	setup () {
		const {
			filteredQuestions: questions, error, loading, hasMore,
			answeredChoices, answered, subjectId, listener,
			fetchOlderQuestions
		} = useQuestionList()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)

		return {
			ellipseOutline, ellipse,
			questions, error, loading, hasMore,
			answeredChoices, answered, subjectId,
			fetchOlderQuestions
		}
	}
})
</script>
