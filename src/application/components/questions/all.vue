<template>
	<div class="grid grid-col-6 px-3  text-xs md:text-sm  col-span-12">

		<div class="col-span-6 grid grid-cols-6 py-2 mt-2 md:mt-3">

			<div class="col-span-6 grid grid-cols-12 md:px-2 ">
				<div
					class="py-1 px-2 px-md text-sm col-span-12 md:col-start-4 md:col-end-10 md:mb-3   bg-light_gray rounded-xl md:rounded-md flex flex-row">
					<ion-select v-model="subjectId"
						class="w-full text-xs md:text-sm text-icon_inactive  placeholder-[#8B9EB1] font-bold"
						interface="action-sheet" placeholder="Filter by subject">
						<ion-select-option :value="''">All Subjects</ion-select-option>
						<ion-select-option v-for="(subject, index) in subjects" :key="index + 'subject'"
							:value="subject.id">{{ subject.name }}
						</ion-select-option>
					</ion-select>
				</div>

				<div
					class="mt-2 col-span-12  md:col-start-4 md:col-end-10 flex flex-row-reverse  justify-center items-center ">
					<div class="flex flex-row items-center mr-2 cursor-pointer"
						@click="answered = answeredChoices[2].val; selectedFilter = 'All'">
						<ion-icon :icon=" selectedFilter == 'All' ? ellipse : ellipseOutline"
							class="text-lg mr-1 text-primary"></ion-icon>
						<span class="font-bold text-icon_inactive">Answered </span>
					</div>
					<div class="flex flex-row items-center mr-2 cursor-pointer"
						@click="answered = answeredChoices[3].val; selectedFilter = 'Answered'">
						<ion-icon :icon=" selectedFilter == 'Answered' ? ellipse : ellipseOutline"
							class="text-lg mr-1 text-primary"></ion-icon>
						<span class="font-bold text-icon_inactive">Unanswered </span>
					</div>
					<div class="flex flex-row items-center mr-2 cursor-pointer"
						@click="answered = answeredChoices[0].val; selectedFilter = 'Unanswered'">
						<ion-icon :icon=" selectedFilter == 'Unanswered' ? ellipse : ellipseOutline"
							class="text-lg mr-1 text-primary"></ion-icon>
						<span class="font-bold text-icon_inactive">All </span>
					</div>
					<span class="font-bold text-icon_inactive mr-3">Sort by: </span>

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
				</template>

			</div>
		</div>

	</div>

</template>
<script lang="ts">
import { IonIcon, IonSelect, IonSelectOption } from '@ionic/vue'
import { defineComponent, ref } from 'vue'
import { ellipse, ellipseOutline } from 'ionicons/icons'
import { useQuestionList } from '@app/composable/questions/questions'
import { useSubjectList } from '@app/composable/questions/subjects'
import Question from '@app/components/questions/question.vue'
import EmptyState from '@app/components/core/emptyState.vue'

export default defineComponent({
	setup () {
		const {
			filteredQuestions: questions, error, loading, hasMore,
			answeredChoices, answered, subjectId,
			fetchOlderQuestions
		} = useQuestionList()
		const { subjects } = useSubjectList()
		const selectedFilter = ref('All')
		return {
			ellipseOutline,
			ellipse,
			questions, error, loading, hasMore,
			answeredChoices, answered, subjectId,
			fetchOlderQuestions,
			selectedFilter,
			subjects
		}
	},
	components: { IonSelect, IonSelectOption, IonIcon, Question, EmptyState }
})
</script>
<style scoped>
	.customShadow {
		box-shadow: 0 2px 6px rgb(0 0 0 / 0.2);
	}

	ion-select {

		/* Set a different placeholder color */
		--placeholder-color: #8B9EB1;

		/* Set full opacity on the placeholder */
		--placeholder-opacity: 1;
	}

</style>
