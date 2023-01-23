<template>
	<div>
		<div class="mb-4">
			<IonText class="text-secondaryText text-center text-xl font-bold w-full">Tests</IonText>
		</div>
		<div class="flex flex-col md:flex-row gap-4 items-center justify-center w-full mb-8">
			<div class="md:w-1/5 w-full">
				<IonSelect v-model="filters.institution"
					class="capitalize" interface="action-sheet"
					placeholder="Institution">
					<IonSelectOption v-for="institution in institutions" :key="institution.hash"
						:value="institution.id" class="capitalize">
						{{ institution.name }}
					</IonSelectOption>
				</IonSelect>
			</div>
			<div class="md:w-1/5 w-full">
				<IonSelect v-model="filters.course" class="capitalize"
					interface="action-sheet" placeholder="Course">
					<IonSelectOption v-for="course in courses" :key="course.hash" :value="course.id"
						class="capitalize">
						{{ course.name }}
					</IonSelectOption>
				</IonSelect>
			</div>
			<div class="md:w-1/5 w-full">
				<IonSelect v-model.number="filters.year" class="rounded-xl"
					interface="action-sheet" placeholder="Year">
					<IonSelectOption v-for="year in years" :key="year" :value="year">
						{{ year }}
					</IonSelectOption>
				</IonSelect>
			</div>
			<div class="md:w-1/5 w-full">
				<IonSelect v-model="filters.questionType"
					class="capitalize" interface="action-sheet"
					placeholder="Mode">
					<IonSelectOption v-for="questionType in questionTypes" :key="questionType" :value="questionType"
						class="capitalize">
						{{ questionType }}
					</IonSelectOption>
				</IonSelect>
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

<script lang="ts" setup>
import { computed, watch } from 'vue'
import PastQuestionListCard from '@app/components/school/pastQuestions/AdminPastQuestionListCard.vue'
import { usePastQuestionList } from '@app/composable/school/pastQuestions'
import { useInstitutionList } from '@app/composable/school/institutions'
import { PastQuestionType } from '@modules/school'
import { useCourseList } from '@app/composable/school/courses'
import { years } from '@utils/constants'

const { loading, fetched, error, pastQuestions, filters, fetchPastQuestions } = usePastQuestionList()
const { institutions, loading: institutionLoading } = useInstitutionList()
const { courses: allCourses, loading: courseLoading, fetchInstitutionCourses } = useCourseList()
const courses = computed(() => new Set(allCourses.value.filter((c) => c.institutionId === filters.institution)))
const questionTypes = Object.keys(PastQuestionType)

watch(() => filters.institution, async () => {
	if (filters.institution) await fetchInstitutionCourses(filters.institution)
})

</script>
