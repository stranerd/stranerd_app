<template>
	<div class=" text-xs md:text-sm ">

		<div class="lg:mt-8 mt-4">

			<div class="flex items-center flex-col lg:flex-row justify-between w-full mb-8 lg:gap-14 gap-4">
				<div
					class="py-1 px-2  text-sm   flex flex-row items-center gap-4 lg:w-1/2">
					<ion-text class="text-icon_inactive font-bold w-20 hidden lg:block">Filter By:</ion-text>
					<SelectSubject v-model:subjectId="subjectId" :show-all="true" class="w-[92vw] lg:w-auto"
						placeholder="Search by subjects" />
				</div>


				<div class=" flex items-center">
					<ion-text class="text-icon_inactive font-bold w-20 hidden lg:block">Sort By:</ion-text>
					<ion-segment :value="answeredChoices[0].val"
						class="w-[92vw] lg:w-auto border border-faded_gray lg:border-0"
						mode="ios">
						<ion-segment-button v-for="choice in answeredChoices" :key="choice.key" :value="choice.val"
							@click="answered = choice.val">
							<ion-label>{{ choice.key }}</ion-label>
						</ion-segment-button>
					</ion-segment>
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
					<div v-for="(question,index) in questions" :key="index"
						:class="0 === index ? 'w-full md:px-2 mb-5' :  'md:w-1/2 lg:w-full w-full md:px-2 md:py-3 mb-4 md:mb-0'">
						<QuestionListCard :colorClass="0 === index ? 'bg-butter_yellow' : 'bg-light_gray'"
							:question="question" class="md:h-[10.5rem]" />
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
import { IonSegment, IonSegmentButton } from '@ionic/vue'
import { useQuestionList } from '@app/composable/questions/questions'
import QuestionListCard from '@app/components/questions/QuestionListCard.vue'
import EmptyState from '@app/components/core/EmptyState.vue'
import SelectSubject from '@app/components/questions/subjects/SelectSubject.vue'
import PageLoading from '@app/components/core/PageLoading.vue'

export default defineComponent({
	name: 'QuestionsList',
	components: { QuestionListCard, EmptyState, SelectSubject, PageLoading, IonSegment, IonSegmentButton },
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


<style scoped>
	.segment-button-checked {
		color: white !important
	}

	ion-segment {
		--background: #F7F7FC;
		color: #8B9EB1;
		font-weight: bold;
	}

	ion-segment-button {
		--background-checked: #4D5C6F;
		--background-focused: #4D5C6F;
		--indicator-color: #4D5C6F;
		--indicator-box-shadow: none;
		--padding-top: 0.5rem;
		--padding-bottom: 0.5rem;
		color: #8B9EB1;
		font-weight: bold;
		margin: 0 !important;
	}
</style>
