<template>
	<div>
		<div class="mb-4">
			<IonText class="text-secondaryText text-center text-xl font-bold w-full">Tests</IonText>
		</div>
		<div class="flex flex-col md:flex-row gap-4 items-center justify-center w-full mb-8">
			<div class="md:w-1/4 w-full">
				<IonSelect v-model="filters.institutionId"
					class="capitalize" interface="action-sheet"
					placeholder="Institution">
					<IonSelectOption :value="null">All</IonSelectOption>
					<IonSelectOption v-for="institution in institutions" :key="institution" :value="institution"
						class="capitalize">
						<Institution :institutionId="institution" />
					</IonSelectOption>
				</IonSelect>
			</div>
			<div class="md:w-1/4 w-full">
				<IonSelect v-model="filters.courseId" class="capitalize"
					interface="action-sheet" placeholder="Course">
					<IonSelectOption :value="null">All</IonSelectOption>
					<IonSelectOption v-for="course in courses" :key="course" :value="course" class="capitalize">
						<Course :courseId="course" />
					</IonSelectOption>
				</IonSelect>
			</div>
			<div class="md:w-1/4 w-full">
				<IonSelect v-model.number="filters.year"
					interface="action-sheet" placeholder="Year">
					<IonSelectOption :value="null">All</IonSelectOption>
					<IonSelectOption v-for="year in years" :key="year" :value="year">
						{{ year }}
					</IonSelectOption>
				</IonSelect>
			</div>
			<div class="md:w-1/4 w-full">
				<IonSelect v-model="filters.questionTypes"
					class="capitalize" interface="action-sheet"
					placeholder="Mode">
					<IonSelectOption :value="null">All</IonSelectOption>
					<IonSelectOption v-for="questionType in questionTypes" :key="questionType" :value="questionType"
						class="capitalize">
						{{ questionType }}
					</IonSelectOption>
				</IonSelect>
			</div>
		</div>
		<EmptyState v-if="!loading && !error && testPreps.length === 0" info="No testPreps found." />
		<TestPrepListCard v-for="testPrep in filteredPreps" :key="testPrep.hash" :testPrep="testPrep" class="mb-4" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue'
import TestPrepListCard from '@app/components/study/testPreps/AdminTestPrepListCard.vue'
import { useTestPrepList } from '@app/composable/study/testPreps'
import { groupBy } from '@utils/commons'
import Institution from '@app/components/school/institutions/Institution.vue'
import Course from '@app/components/school/courses/Course.vue'

export default defineComponent({
	name: 'AdminTestPrepsList',
	components: { TestPrepListCard, Institution, Course },
	setup () {
		const { loading, error, testPreps, filters } = useTestPrepList()
		const institutions = computed(() => new Set(groupBy(testPreps.value, (i) => i.data.institutionId).map(({ key }) => key)))
		const courses = computed(() => new Set(groupBy(testPreps.value.filter((p) => p.data.institutionId === filters.institutionId), (i) => i.data.courseId).map(({ key }) => key)))
		const years = computed(() => new Set(groupBy(testPreps.value.filter((p) => p.data.institutionId === filters.institutionId && p.data.courseId === filters.courseId), (i) => i.data.year).map(({ key }) => key)))
		const questionTypes = computed(() => new Set(groupBy(testPreps.value.filter((p) => p.data.institutionId === filters.institutionId && p.data.courseId === filters.courseId && p.data.year === filters.year), (i) => i.data.questionType).map(({ key }) => key)))
		const filteredPreps = computed(() => testPreps.value.filter((prep) => {
			const matches = [filters.questionTypes.includes(prep.data.questionType)]
			if (filters.institutionId) matches.push(prep.data.institutionId === filters.institutionId)
			if (filters.courseId) matches.push(prep.data.courseId === filters.courseId)
			if (filters.year) matches.push(prep.data.year === filters.year)
			return matches.every((m) => m)
		}))

		watch(() => filters.institutionId, () => filters.courseId = null)
		watch(() => filters.courseId, () => filters.year = null)
		watch(() => filters.year, () => filters.questionTypes = [])

		return {
			loading, error, filteredPreps, testPreps, filters,
			institutions, courses, years, questionTypes
		}
	}
})
</script>
