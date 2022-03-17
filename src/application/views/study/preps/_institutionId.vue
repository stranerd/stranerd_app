<template>
	<Justified>
		<div class="lg:w-8/12 w-full mx-auto md:p-4 lg:p-0">
			<div class="text-body bg-white lg:mt-6 rounded-xl flex flex-col p-4 md:p-6 gap-4">
				<ion-text class="heading lg:text-2xl font-bold text-main_dark mx-auto text-center">
					<Institution :institutionId="institutionId" />
				</ion-text>
				<div class="showcase gap-4">
					<ion-item>
						<ion-label class="!text-gray font-bold text-body">Subject</ion-label>
						<IonSelect v-model="courseId" class="capitalize" interface="action-sheet"
							placeholder="Select the subject">
							<IonSelectOption :value="null" class="capitalize">All</IonSelectOption>
							<IonSelectOption v-for="courseId in courses" :key="courseId" :value="courseId"
								class="capitalize">
								<Course :courseId="courseId" />
							</IonSelectOption>
						</IonSelect>
					</ion-item>

					<ion-item>
						<ion-label class="!text-gray font-bold text-body">Year</ion-label>
						<IonSelect v-model.number="year" class="capitalize" interface="action-sheet"
							placeholder="Select the year">
							<IonSelectOption :value="null" class="capitalize">All</IonSelectOption>
							<IonSelectOption v-for="year in years" :key="year" :value="year" class="capitalize">
								<span>{{ year }}</span>
							</IonSelectOption>
						</IonSelect>
					</ion-item>

					<ion-item>
						<ion-label class="!text-gray font-bold text-body">Mode</ion-label>
						<IonSelect v-model="questionType" class="capitalize" interface="action-sheet"
							placeholder="Select the question type">
							<IonSelectOption :value="null" class="capitalize">All</IonSelectOption>
							<IonSelectOption v-for="questionType in questionTypes" :key="questionType"
								:value="questionType" class="capitalize">
								<span>{{ questionType }}</span>
							</IonSelectOption>
						</IonSelect>
					</ion-item>
				</div>
			</div>

			<div class="md:py-6 showcase">
				<TestPrepListCard v-for="prep in preps" :key="prep.hash" :testPrep="prep" />
			</div>
			<EmptyState v-if="!loading && !error && preps.length === 0"
				class="p-4" info="There is currently no test for the given <b>Subject/Year/Mode</b>"
			/>
		</div>
	</Justified>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import Institution from '@app/components/study/institutions/Institution.vue'
import Course from '@app/components/study/courses/Course.vue'
import { useRoute } from 'vue-router'
import { useTestPrepList } from '@app/composable/study/testPreps'
import { IonItem, IonLabel, IonSelect, IonSelectOption } from '@ionic/vue'
import TestPrepListCard from '@app/components/study/testPreps/TestPrepListCard.vue'
import EmptyState from '@app/components/core/EmptyState.vue'

export default defineComponent({
	name: 'StudyPrepsInstitutionId',
	displayName: 'Preps',
	components: {
		Justified,
		Institution,
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
		const route = useRoute()
		const { institutionId } = route.params
		const { testPreps, loading, error } = useTestPrepList()
		const institutionPreps = computed(() => testPreps.value.filter((prep) => prep.data.institutionId === institutionId))

		const courseId = ref(null as string | null)
		const year = ref(null as number | null)
		const questionType = ref(null as string | null)

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
			loading, error,
			institutionId, preps, courseId, courses, year, years, questionType, questionTypes
		}
	}
})
</script>

<style lang="scss" scoped>
	ion-item {
		width: 100%;
		--background: $color-newGray !important;
		background: $color-newGray !important;
		border-radius: .5rem;

		--border-radius: .5rem;
		--padding-start: 1rem;
		--padding-end: 0 !important;
		--inner-padding-end: 0px;
	}

	ion-select {
		--background: $color-newGray !important;
		background: $color-newGray !important;
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
