<template>
	<Justified>
		<div class="lg:w-8/12 w-full mx-auto md:p-4 lg:p-0">
			<div class="lg:mt-6 rounded-xl flex flex-col p-4 md:p-6 gap-4">
				<div class="showcase gap-4">
					<div class="flex flex-col">
						<ion-label class="font-bold text-sm mb-2">Subject</ion-label>
						<IonSelect v-model="courseId" class="capitalize" interface="action-sheet"
							placeholder="Select the subject">
							<IonSelectOption :value="null" class="capitalize">Select subject</IonSelectOption>
							<IonSelectOption v-for="courseId in courses" :key="courseId" :value="courseId"
								class="capitalize">
								<Course :courseId="courseId" />
							</IonSelectOption>
						</IonSelect>
					</div>
			
					<div class="flex flex-col">
						<ion-label class="font-bold text-sm mb-2">Year</ion-label>
						<IonSelect v-model.number="year" class="capitalize" interface="action-sheet"
							placeholder="Select the year">
							<IonSelectOption :value="null" class="capitalize">Select year</IonSelectOption>
							<IonSelectOption v-for="year in years" :key="year" :value="year" class="capitalize">
								<span>{{ year }}</span>
							</IonSelectOption>
						</IonSelect>
					</div>
			
					<div class="flex flex-col">
						<ion-label class="font-bold text-sm mb-2">Mode</ion-label>
						<IonSelect v-model="questionType" class="capitalize" interface="action-sheet"
							placeholder="Select the question type">
							<IonSelectOption :value="null" class="capitalize">Select Mode</IonSelectOption>
							<IonSelectOption v-for="questionType in questionTypes" :key="questionType"
								:value="questionType" class="capitalize">
								<span>{{ questionType }}</span>
							</IonSelectOption>
						</IonSelect>
					</div>

					<div class="flex flex-col">
						<ion-label class="font-bold text-sm mb-2">Type</ion-label>
						<IonSelect v-model="examType" class="capitalize" interface="action-sheet"
							placeholder="Select the question type">
							<IonSelectOption :value="null" class="capitalize">Select Type</IonSelectOption>
							<IonSelectOption v-for="examType in examTypes" :key="examType.name"
								:value="examType.value" class="capitalize">
								<span>{{ examType.name }}</span>
							</IonSelectOption>
						</IonSelect>
					</div>
					<div class="flex flex-col">
						<ion-button  class="w-full text-sm btn-primary mt-2" :disabled="testLoading"
							@click="createTest(preps[0], examType)"
							type="submit">
							<SpinLoading v-if="testLoading" />
							<span v-else>Add</span>
						
						</ion-button>
					</div>
				
				</div>
			</div>

		</div>
	</Justified>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import Course from '@app/components/school/courses/Course.vue'
import { useRoute } from 'vue-router'
import { useTestPrepList } from '@app/composable/study/testPreps'
import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/vue'
import TestPrepListCard from '@app/components/study/testPreps/TestPrepListCard.vue'
import EmptyState from '@app/components/core/EmptyState.vue'
import { useCreateTest } from '@app/composable/study/tests'

export default defineComponent({
	name: 'StudyPrepsInstitutionId',
	// TODO: displayName would have to be dynamic
	displayName: 'Preps',
	components: {
		Justified,
		Course,
		IonSelect,
		IonSelectOption,
		TestPrepListCard,
		IonItem,
		IonLabel,
		EmptyState
	},
	middlewares: ['isAuthenticated'],
	setup () {
		const { loading:testLoading, error:testError, createTest } = useCreateTest()
		const route = useRoute()
		const { institutionId } = route.params 
		const { testPreps, loading, error } = useTestPrepList()
		const institutionPreps = computed(() => testPreps.value.filter((prep) => prep.data.institutionId === institutionId))

		const courseId = ref(null as string | null)
		const year = ref(null as number | null)
		const questionType = ref(null as string | null)
		const examType = ref(null as string | null)
		const examTypes = [{name:'Test', value:true}, {name:'Solution', value:false}]

		const courses = computed(() => Array.from(new Set(institutionPreps.value.map((prep) => prep.data.courseId))).sort())
		const years = computed(() => Array.from(new Set(institutionPreps.value.map((prep) => prep.data.year))).sort())
		const questionTypes = computed(() => Array.from(new Set(institutionPreps.value.map((prep) => prep.data.questionType))))

		const preps = computed(() => institutionPreps.value.filter((prep) => {
			const matches = [] as boolean[]
			if (courseId.value) matches.push(prep.data.courseId === courseId.value)
			if (year.value) matches.push(prep.data.year === year.value)
			if (questionType.value) matches.push(prep.data.questionType === questionType.value)
			return matches.every((match) => match)
		}))

		return {
			loading, error,testLoading, testError, examTypes,examType, createTest,
			institutionId, preps, courseId, courses, year, years, questionType, questionTypes
		}
	}
})
</script>

<style lang="scss" scoped>


	ion-select {
		--background: #{$color-newGray} !important;
		border-radius: .75rem;
		--padding-start: 1rem;
		--padding-end: 1rem;
		--padding-top: 0.8rem;
		--padding-bottom: 0.8rem;
	}

	ion-select::part(icon) {
		margin-left: 1rem;
	}
</style>
