<template>
	<div>
		<div class="mb-4">
			<IonText class="text-main_dark text-center text-heading font-bold w-full">Tests</IonText>
		</div>
		<div class="flex flex-col md:flex-row gap-4 items-center justify-center w-full mb-8">
			<div class="md:w-1/5 w-full">
				<ion-select v-model="filters.institution"
					class="bg-white border border-faded_gray rounded-xl capitalize" interface="action-sheet"
					placeholder="Institution">
					<ion-select-option v-for="institution in institutions" :key="institution.hash"
						:value="institution.id" class="capitalize">
						{{ institution.name }}
					</ion-select-option>
				</ion-select>
			</div>
			<div class="md:w-1/5 w-full">
				<ion-select v-model="filters.course" class="bg-white border border-faded_gray rounded-xl capitalize"
					interface="action-sheet" placeholder="Course">
					<ion-select-option v-for="course in courses" :key="course.hash" :value="course.id"
						class="capitalize">
						{{ course.name }}
					</ion-select-option>
				</ion-select>
			</div>
			<div class="md:w-1/5 w-full">
				<ion-select v-model.number="filters.year" class="bg-white border border-faded_gray rounded-xl"
					interface="action-sheet" placeholder="Year">
					<ion-select-option v-for="year in years" :key="year" :value="year">
						{{ year }}
					</ion-select-option>
				</ion-select>
			</div>
			<div class="md:w-1/5 w-full">
				<ion-select v-model="filters.questionType"
					class="bg-white border border-faded_gray rounded-xl capitalize" interface="action-sheet"
					placeholder="Mode">
					<ion-select-option v-for="questionType in questionTypes" :key="questionType" :value="questionType"
						class="capitalize">
						{{ questionType }}
					</ion-select-option>
				</ion-select>
			</div>
			<IonButton :disabled="!filters.institution || !filters.course || !filters.year || !filters.questionType"
				class="md:w-1/5 w-full btn-primary"
				@click="fetchPastQuestions">
				Fetch Questions
			</IonButton>
		</div>
		<EmptyState v-if="fetched && !loading && !error && pastQuestions.length === 0" info="No questions found." />
		<PastQuestionListCard v-for="pastQuestion in pastQuestions" :key="pastQuestion.hash"
			:pastQuestion="pastQuestion" class="mb-4" />
		<PageLoading v-if="loading" />
		<PageLoading v-if="institutionLoading" />
		<PageLoading v-if="courseLoading" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import PastQuestionListCard from '@app/components/study/pastQuestions/AdminPastQuestionListCard.vue'
import { usePastQuestionList } from '@app/composable/study/pastQuestions'
import { IonSelect, IonSelectOption } from '@ionic/vue'
import { useInstitutionList } from '@app/composable/study/institutions'
import { PastQuestionType } from '@modules/study'
import { useCourseList } from '@app/composable/study/courses'
import { years } from '@utils/constants'

export default defineComponent({
	name: 'AdminPastQuestionsList',
	components: { PastQuestionListCard, IonSelect, IonSelectOption },
	setup () {
		const { loading, fetched, error, pastQuestions, filters, fetchPastQuestions } = usePastQuestionList()
		const { institutions, loading: institutionLoading } = useInstitutionList()
		const { courses: allCourses, loading: courseLoading } = useCourseList()
		const courses = computed(() => new Set(allCourses.value.filter((c) => c.institutionId === filters.institution)))
		const questionTypes = Object.keys(PastQuestionType)

		return {
			loading, institutionLoading, courseLoading, error, pastQuestions, filters, fetched,
			institutions, courses, years, questionTypes, fetchPastQuestions
		}
	}
})
</script>
