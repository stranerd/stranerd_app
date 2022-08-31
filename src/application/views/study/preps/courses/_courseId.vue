<template>
	<DefaultLayout>
		<div class="flex flex-col gap-6 p-4 lg:p-0">
			<div class="flex flex-col gap-2">
				<IonLabel>Year</IonLabel>
				<IonSelect v-model="filters.year" class="capitalize" interface="action-sheet">
					<IonSelectOption :value="null" disabled>Select year</IonSelectOption>
					<IonSelectOption v-for="year in years" :key="year" :value="year">
						{{ year }}
					</IonSelectOption>
				</IonSelect>
			</div>
			<div class="flex flex-col gap-2">
				<IonLabel>Mode</IonLabel>
				<IonSelect v-model="filters.questionType" class="capitalize" interface="action-sheet">
					<IonSelectOption :value="null" disabled>Select mode</IonSelectOption>
					<IonSelectOption v-for="questionType in questionTypes" :key="questionType" :value="questionType"
						class="capitalize">
						{{ questionType }}
					</IonSelectOption>
				</IonSelect>
			</div>
			<div class="flex flex-col gap-2">
				<IonLabel>Type</IonLabel>
				<IonSelect v-model="filters.timed" class="capitalize" interface="action-sheet">
					<IonSelectOption :value="true">Test</IonSelectOption>
					<IonSelectOption :value="false">Solution</IonSelectOption>
				</IonSelect>
			</div>
			<IonButton v-if="prep" :disabled="testLoading" class="btn-primary"
				@click="createTest(prep, filters.timed)">
				<SpinLoading v-if="testLoading" class="mr-2" />
				Start
			</IonButton>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, watch } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import { generateMiddlewares } from '@app/middlewares'
import { useRoute } from 'vue-router'
import { useCourse } from '@app/composable/school/courses'
import { useTestPrepList } from '@app/composable/study/testPreps'
import { PastQuestionType } from '@modules/school'
import { useCreateTest } from '@app/composable/study/tests'

export default defineComponent({
	name: 'StudyPrepsCoursesCourseId',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		const route = useRoute()
		const { courseId } = route.params
		const { course } = useCourse(courseId as string)
		useRouteMeta(computed(() => course.value?.name ?? 'Course'), { back: true })
		const { testPreps, loading, error, fetchCoursePreps } = useTestPrepList()
		const { loading: testLoading, error: testError, createTest } = useCreateTest()
		const preps = computed(() => testPreps.value.filter((p) => p.data.courseId === courseId))
		onMounted(async () => fetchCoursePreps(courseId as string))
		const filters = reactive({
			year: null as number | null,
			questionType: null as PastQuestionType | null,
			timed: true
		})
		const prep = computed(() => preps.value.find((p) => {
			const matches = [p.data.year === filters.year, p.data.questionType === filters.questionType]
			return matches.every((b) => b)
		}))
		const years = computed(() => new Set(preps.value.map((p) => p.data.year)))
		const questionTypes = computed(() => new Set(preps.value.map((p) => p.data.questionType)))
		watch(() => filters.year, () => filters.questionType = null)
		return {
			prep, loading, error, years, questionTypes, filters,
			testLoading, testError, createTest
		}
	}
})
</script>
