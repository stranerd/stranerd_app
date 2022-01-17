<template>
	<Justified>
		<div>
			<div class="blueTop">
				<div class="flex-grow flex flex-col align-center p-4 md:p-6">
					<ion-text class="heading lg:text-2xl font-bold text-white mx-auto text-center">
						<Institution :institutionId="institutionId" />
					</ion-text>
					<div class="mx-auto w-full lg:w-7/12 showcase mt-4">

						<ion-item>
							<ion-label class="text-main_dark font-bold text-body"> Subject</ion-label>
							<IonSelect v-model="courseId" class="capitalize" interface="action-sheet"
								placeholder="Select the subject">
								<IonSelectOption :value="null" class="capitalize">All</IonSelectOption>
								<IonSelectOption v-for="courseId in courses" :key="courseId" :value="courseId"
									class="capitalize">
									<Course :courseId="courseId" />
								</IonSelectOption>
							</IonSelect>
						</ion-item>

						

						<IonSelect v-model="year" class="capitalize" interface="action-sheet"
							placeholder="Select the year">
							<IonSelectOption :value="null" class="capitalize">All</IonSelectOption>
							<IonSelectOption v-for="year in years" :key="year" :value="year" class="capitalize">
								<span>{{ year }}</span>
							</IonSelectOption>
						</IonSelect>

						<IonSelect v-model="questionType" class="capitalize" interface="action-sheet"
							placeholder="Select the question type">
							<IonSelectOption :value="null" class="capitalize">All</IonSelectOption>
							<IonSelectOption v-for="questionType in questionTypes" :key="questionType"
								:value="questionType" class="capitalize">
								<span>{{ questionType }}</span>
							</IonSelectOption>
						</IonSelect>
					</div>
				</div>
			</div>

			<div class="p-4 lg:w-7/12 w-full mx-auto showcase">
				<TestPrepListCard v-for="prep in preps" :key="prep.hash" :openMenu="openMenu" :testPrep="prep" />
			</div>
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
import { IonSelect, IonSelectOption, IonItem, IonLabel } from '@ionic/vue'
import TestPrepListCard from '@app/components/study/testPreps/TestPrepListCard.vue'
import { TestPrepEntity } from '@modules/study'
import { openStudyEntityMenu } from '@app/composable/study/menus'

export default defineComponent({
	name: 'InstitutionPrepsPage',
	displayName: 'Test Preps',
	components: { Justified, Institution, Course, IonSelect, IonSelectOption, TestPrepListCard, IonItem, IonLabel },
	middlewares: ['isAuthenticated'],
	setup () {
		const route = useRoute()
		const { institutionId } = route.params
		const openMenu = (entity: TestPrepEntity, event: Event) => openStudyEntityMenu(entity, {}, event)

		const { testPreps } = useTestPrepList()
		const institutionPreps = computed(() => testPreps.value.filter((prep) => prep.data.institutionId === institutionId))

		const courseId = ref(null as string | null)
		const year = ref(null as number | null)
		const questionType = ref(null as string | null)

		const courses = computed(() => Array.from(new Set(institutionPreps.value.map((prep) => prep.data.courseId))))
		const years = computed(() => Array.from(new Set(institutionPreps.value.map((prep) => prep.data.year))))
		const questionTypes = computed(() => Array.from(new Set(institutionPreps.value.map((prep) => prep.data.questionType))))

		const preps = computed(() => institutionPreps.value.filter((prep) => {
			const matches = [] as boolean[]
			if (courseId.value) matches.push(prep.data.courseId === courseId.value)
			if (year.value) matches.push(prep.data.year === year.value)
			if (questionType.value) matches.push(prep.data.questionType === questionType.value)
			return matches.every((match) => match)
		}))

		return {
			institutionId, preps, courseId, courses, year, years, questionType, questionTypes, openMenu
		}
	}
})
</script>

<style lang="scss" scoped>
	ion-item {
		background: #fff;
		border-radius: .75rem;
		--border-radius: .75rem;
		--padding-start: 1rem;
		--padding-end: 0 !important;
		--inner-padding-end: 0px;
		
	}
	ion-select {
		background: #fff;
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
