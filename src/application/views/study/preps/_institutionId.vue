<template>
	<DefaultLayout>
		<div class="flex flex-col p-4 gap-6">
			<div class="flex flex-col gap-2">
				<IonLabel class="font-bold">Subject</IonLabel>
				<IonSelect v-model="courseId" class="capitalize" interface="action-sheet"
					placeholder="Select subject">
					<IonSelectOption :value="null" class="capitalize">Select subject</IonSelectOption>
					<IonSelectOption v-for="courseId in courses" :key="courseId" :value="courseId"
						class="capitalize">
						<Course :courseId="courseId" />
					</IonSelectOption>
				</IonSelect>
			</div>

			<div class="flex flex-col gap-2">
				<IonLabel class="font-bold">Year</IonLabel>
				<IonSelect v-model.number="year" :disabled="!courseId" class="capitalize"
					interface="action-sheet" placeholder="Select year">
					<IonSelectOption :value="null" class="capitalize">Select year</IonSelectOption>
					<IonSelectOption v-for="year in years" :key="year" :value="year" class="capitalize">
						<span>{{ year }}</span>
					</IonSelectOption>
				</IonSelect>
			</div>

			<div class="flex flex-col gap-2">
				<IonLabel class="font-bold">Mode</IonLabel>
				<IonSelect v-model="questionType" :disabled="!year" class="capitalize"
					interface="action-sheet" placeholder="Select the question type">
					<IonSelectOption :value="null" class="capitalize">Select Mode</IonSelectOption>
					<IonSelectOption v-for="questionType in questionTypes" :key="questionType"
						:value="questionType" class="capitalize">
						<span>{{ questionType }}</span>
					</IonSelectOption>
				</IonSelect>
			</div>

			<div class="flex flex-col gap-2">
				<IonLabel class="font-bold">Type</IonLabel>
				<IonSelect v-model="testType" :disabled="!questionType" class="capitalize"
					interface="action-sheet" placeholder="Select the question type">
					<IonSelectOption :value="null" class="capitalize">Select Type</IonSelectOption>
					<IonSelectOption v-for="testType in testTypes" :key="testType.name"
						:value="testType.value" class="capitalize">
						<span>{{ testType.name }}</span>
					</IonSelectOption>
				</IonSelect>
			</div>

			<IonButton :disabled="testLoading || preps.length === 0" class="w-full btn-primary"
				@click="createTest(preps[0], testType)">
				<SpinLoading v-if="testLoading" />
				<span v-else>Start</span>
			</IonButton>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import Course from '@app/components/school/courses/Course.vue'
import { useRoute } from 'vue-router'
import { useTestPrepList } from '@app/composable/study/testPreps'
import TestPrepListCard from '@app/components/study/testPreps/TestPrepListCard.vue'
import EmptyState from '@app/components/core/EmptyState.vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import { useCreateTest } from '@app/composable/study/tests'

export default defineComponent({
	name: 'StudyPrepsInstitutionId',
	components: {
		Course,
		TestPrepListCard,
		EmptyState
	},
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Preps')
		const { loading: testLoading, error: testError, createTest } = useCreateTest()
		const route = useRoute()
		const { institutionId } = route.params
		const { testPreps, loading, error } = useTestPrepList()
		const institutionPreps = computed(() => testPreps.value.filter((prep) => prep.data.institutionId === institutionId))

		const courseId = ref(null as string | null)
		const year = ref(null as number | null)
		const questionType = ref(null as string | null)
		const testType = ref(null as boolean | null)
		const testTypes = [{ name: 'Test', value: true }, { name: 'Solutions', value: false }]

		const courses = computed(() => Array.from(new Set(institutionPreps.value.map((prep) => prep.data.courseId))).sort())
		const years = computed(() => Array.from(new Set(institutionPreps.value.filter((prep) => prep.data.courseId === courseId.value).map((prep) => prep.data.year))).sort())
		const questionTypes = computed(() => Array.from(new Set(institutionPreps.value.filter((prep) => prep.data.courseId === courseId.value && prep.data.year === year.value).map((prep) => prep.data.questionType))))

		watch(() => courseId.value, () => year.value = null)
		watch(() => year.value, () => questionType.value = null)
		watch(() => questionType.value, () => testType.value = null)

		const preps = computed(() => institutionPreps.value.filter((prep) => {
			const matches = [] as boolean[]
			matches.push(prep.data.courseId === courseId.value)
			matches.push(prep.data.year === year.value)
			matches.push(prep.data.questionType === questionType.value)
			matches.push(testType.value !== null)
			return matches.every((match) => match)
		}))

		return {
			loading, error, testLoading, testError, testTypes, testType, createTest,
			institutionId, preps, courseId, courses, year, years, questionType, questionTypes
		}
	}
})
</script>
