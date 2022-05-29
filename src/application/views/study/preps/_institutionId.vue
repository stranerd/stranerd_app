<template>
	<Justified>
		<div class="lg:w-8/12 w-full mx-auto md:p-4 lg:p-0">
			<div class="lg:mt-6 rounded-xl flex flex-col p-4 md:p-6 gap-4">
				<IonText class="text-heading font-bold text-secondaryText mx-auto text-center">
					<Institution :institutionId="institutionId" />
				</IonText>
				<div class="showcase gap-4">
					<IonItem>
						<IonLabel class="!text-gray font-bold">Subject</IonLabel>
						<IonSelect v-model="courseId" class="capitalize" interface="action-sheet"
							placeholder="Select the subject">
							<IonSelectOption :value="null" class="capitalize">All</IonSelectOption>
							<IonSelectOption v-for="courseId in courses" :key="courseId" :value="courseId"
								class="capitalize">
								<Course :courseId="courseId" />
							</IonSelectOption>
						</IonSelect>
					</IonItem>

					<IonItem>
						<IonLabel class="!text-gray font-bold">Year</IonLabel>
						<IonSelect v-model.number="year" class="capitalize" interface="action-sheet"
							placeholder="Select the year">
							<IonSelectOption :value="null" class="capitalize">All</IonSelectOption>
							<IonSelectOption v-for="year in years" :key="year" :value="year" class="capitalize">
								<span>{{ year }}</span>
							</IonSelectOption>
						</IonSelect>
					</IonItem>

					<IonItem>
						<IonLabel class="!text-gray font-bold">Mode</IonLabel>
						<IonSelect v-model="questionType" class="capitalize" interface="action-sheet"
							placeholder="Select the question type">
							<IonSelectOption :value="null" class="capitalize">All</IonSelectOption>
							<IonSelectOption v-for="questionType in questionTypes" :key="questionType"
								:value="questionType" class="capitalize">
								<span>{{ questionType }}</span>
							</IonSelectOption>
						</IonSelect>
					</IonItem>
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
import Institution from '@app/components/school/institutions/Institution.vue'
import Course from '@app/components/school/courses/Course.vue'
import { useRoute } from 'vue-router'
import { useTestPrepList } from '@app/composable/study/testPreps'
import TestPrepListCard from '@app/components/study/testPreps/TestPrepListCard.vue'
import EmptyState from '@app/components/core/EmptyState.vue'
import { generateMiddlewares } from '@app/middlewares'

export default defineComponent({
	name: 'StudyPrepsInstitutionId',
	displayName: 'Preps',
	components: {
		Justified,
		Institution,
		Course,
		TestPrepListCard,
		EmptyState
	},
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
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
		--background: #{$color-newGray} !important;
		border-radius: .5rem;

		--border-radius: .5rem;
		--padding-start: 1rem;
		--padding-end: 0 !important;
		--inner-padding-end: 0px;
	}

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
