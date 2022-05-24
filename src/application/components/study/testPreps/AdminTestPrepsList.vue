<template>
	<div>
		<div class="mb-4">
			<IonText class="text-secondaryText text-center text-heading font-bold w-full">Tests</IonText>
		</div>
		<div class="flex flex-col md:flex-row gap-4 items-center justify-center w-full mb-8">
			<div class="md:w-1/4 w-full">
				<ion-select v-model="filters.institution"
					class="bg-white border border-faded_gray rounded-xl capitalize" interface="action-sheet"
					placeholder="Institution">
					<ion-select-option :value="null">All</ion-select-option>
					<ion-select-option v-for="institution in institutions" :key="institution" :value="institution"
						class="capitalize">
						<Institution :institutionId="institution" />
					</ion-select-option>
				</ion-select>
			</div>
			<div class="md:w-1/4 w-full">
				<ion-select v-model="filters.course" class="bg-white border border-faded_gray rounded-xl capitalize"
					interface="action-sheet" placeholder="Course">
					<ion-select-option :value="null">All</ion-select-option>
					<ion-select-option v-for="course in courses" :key="course" :value="course" class="capitalize">
						<Course :courseId="course" />
					</ion-select-option>
				</ion-select>
			</div>
			<div class="md:w-1/4 w-full">
				<ion-select v-model.number="filters.year" class="bg-white border border-faded_gray rounded-xl"
					interface="action-sheet" placeholder="Year">
					<ion-select-option :value="null">All</ion-select-option>
					<ion-select-option v-for="year in years" :key="year" :value="year">
						{{ year }}
					</ion-select-option>
				</ion-select>
			</div>
			<div class="md:w-1/4 w-full">
				<ion-select v-model="filters.questionType"
					class="bg-white border border-faded_gray rounded-xl capitalize" interface="action-sheet"
					placeholder="Mode">
					<ion-select-option :value="null">All</ion-select-option>
					<ion-select-option v-for="questionType in questionTypes" :key="questionType" :value="questionType"
						class="capitalize">
						{{ questionType }}
					</ion-select-option>
				</ion-select>
			</div>
		</div>
		<EmptyState v-if="!loading && !error && testPreps.length === 0" info="No testPreps found." />
		<TestPrepListCard v-for="testPrep in filteredPreps" :key="testPrep.hash" :testPrep="testPrep" class="mb-4" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, watch } from 'vue'
import TestPrepListCard from '@app/components/study/testPreps/AdminTestPrepListCard.vue'
import { useTestPrepList } from '@app/composable/study/testPreps'
import { IonSelect, IonSelectOption } from '@ionic/vue'
import { groupBy } from '@utils/commons'
import Institution from '@app/components/school/institutions/Institution.vue'
import Course from '@app/components/school/courses/Course.vue'

export default defineComponent({
	name: 'AdminTestPrepsList',
	components: { TestPrepListCard, IonSelect, IonSelectOption, Institution, Course },
	setup () {
		const filters = reactive({
			institution: null as string | null,
			course: null as string | null,
			year: null as number | null,
			questionType: null as string | null
		})
		const { loading, error, testPreps } = useTestPrepList()
		const institutions = computed(() => new Set(groupBy(testPreps.value, (i) => i.data.institutionId).map(({ key }) => key)))
		const courses = computed(() => new Set(groupBy(testPreps.value.filter((p) => p.data.institutionId === filters.institution), (i) => i.data.courseId).map(({ key }) => key)))
		const years = computed(() => new Set(groupBy(testPreps.value.filter((p) => p.data.institutionId === filters.institution && p.data.courseId === filters.course), (i) => i.data.year).map(({ key }) => key)))
		const questionTypes = computed(() => new Set(groupBy(testPreps.value.filter((p) => p.data.institutionId === filters.institution && p.data.courseId === filters.course && p.data.year === filters.year), (i) => i.data.questionType).map(({ key }) => key)))
		const filteredPreps = computed(() => testPreps.value.filter((prep) => {
			const matches = [] as boolean[]
			if (filters.institution) matches.push(prep.data.institutionId === filters.institution)
			if (filters.course) matches.push(prep.data.courseId === filters.course)
			if (filters.year) matches.push(prep.data.year === filters.year)
			if (filters.questionType) matches.push(prep.data.questionType === filters.questionType)
			return matches.every((m) => m)
		}))

		watch(() => filters.institution, () => filters.course = null)
		watch(() => filters.course, () => filters.year = null)
		watch(() => filters.year, () => filters.questionType = null)

		return {
			loading, error, filteredPreps, testPreps, filters,
			institutions, courses, years, questionTypes
		}
	}
})
</script>
