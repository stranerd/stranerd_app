<template>
	<Justified>
		<div class="blueTop">
			<ion-text class="heading lg:text-2xl font-bold text-white text-center my-2">
				<Institution :institutionId="institutionId" />
			</ion-text>
			<div class="flex items-center hidden">
				<ion-text class="text-faded_gray font-semibold text-center">
					Study exam questions and their solutions for tertiary level institutions in Nigeria.
				</ion-text>
			</div>
		</div>

		<div class="md:w-8/12 lg:w-6/12 w-full px-4 mx-auto bg-white rounded-xl md:my-16 p-8 md:p-16 max-w-[600px]">
			<div class="flex flex-col">
				<ion-segment v-model="testType" class="mb-8" mode="ios">
					<ion-segment-button value="test">
						<ion-label>Test yourself</ion-label>
					</ion-segment-button>
					<ion-segment-button value="study">
						<ion-label>Study Solutions</ion-label>
					</ion-segment-button>
				</ion-segment>

				<IonSelect v-model="courseId" class="capitalize mb-8" interface="action-sheet"
					placeholder="Select the subject">
					<IonSelectOption v-for="courseId in courses" :key="courseId" :value="courseId" class="capitalize">
						<Course :courseId="courseId" />
					</IonSelectOption>
				</IonSelect>

				<IonSelect v-model="year" class="capitalize mb-8" interface="action-sheet"
					placeholder="Select the year">
					<IonSelectOption v-for="year in years" :key="year" :value="year" class="capitalize">
						<span>{{ year }}</span>
					</IonSelectOption>
				</IonSelect>

				<IonSelect v-model="questionType" class="capitalize mb-8" interface="action-sheet"
					placeholder="Select the question type">
					<IonSelectOption v-for="questionType in questionTypes" :key="questionType" :value="questionType"
						class="capitalize">
						<span>{{ questionType }}</span>
					</IonSelectOption>
				</IonSelect>

				<IonButton :disabled="!prep" class="btn-primary" @click="startTest">
					Start {{ testType === 'test' ? 'Test' : 'Studying' }}
				</IonButton>
			</div>
		</div>

		<PageLoading v-if="loading" />
	</Justified>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import Institution from '@app/components/study/institutions/Institution.vue'
import Course from '@app/components/study/courses/Course.vue'
import { useRoute } from 'vue-router'
import { useTestPrepList } from '@app/composable/study/testPreps'
import { useCreateTest } from '@app/composable/study/tests'
import { IonSegment, IonSegmentButton, IonSelect, IonSelectOption } from '@ionic/vue'

export default defineComponent({
	name: 'InstitutionPrepsPage',
	displayName: 'Test Preps',
	components: { Justified, Institution, Course, IonSelect, IonSelectOption, IonSegment, IonSegmentButton },
	middlewares: ['isAuthenticated'],
	setup () {
		const route = useRoute()
		const { institutionId } = route.params
		const { type } = route.query
		const testType = ref(['test', 'study'].includes(type as string) ? type : 'test')

		const { testPreps } = useTestPrepList()
		const preps = computed({
			get: () => testPreps.value.filter((prep) => prep.data.institutionId === institutionId),
			set: () => {
			}
		})

		const courseId = ref(null as string | null)
		const year = ref(null as number | null)
		const questionType = ref(null as string | null)
		const courses = computed(() => Array.from(new Set(preps.value.map((prep) => prep.data.courseId))))
		const years = computed(() => Array.from(new Set(preps.value.filter((prep) => prep.data.courseId === courseId.value).map((prep) => prep.data.year))))
		const questionTypes = computed(() => Array.from(new Set(preps.value.filter((prep) => prep.data.courseId === courseId.value && prep.data.year === year.value).map((prep) => prep.data.questionType))))

		watch(() => courseId.value, () => year.value = null)
		watch(() => year.value, () => questionType.value = null)

		const { loading, error, createTest } = useCreateTest()
		const prep = computed(() => preps.value.find((prep) => {
			return prep.data.courseId === courseId.value && prep.data.year === year.value && prep.data.questionType === questionType.value
		}) ?? null)
		const startTest = async () => {
			if (prep.value) await createTest(prep.value, testType.value === 'test')
		}

		return {
			institutionId, preps, loading, error, testType, startTest,
			courseId, courses, year, years, questionType, questionTypes, prep
		}
	}
})
</script>

<style lang="scss" scoped>
	ion-select {
		--background: #F7F7FC;
		background: #F7F7FC;
		--padding-start: 1rem;
		--padding-end: 1rem;
		--padding-top: 0.8rem;
		--padding-bottom: 0.8rem;
	}

	.custom-shadow {
		box-shadow: 0px 0px 50px rgba(77, 92, 111, 0.1);
		border-radius: 24px;
		@media (max-width: 770px) {
			box-shadow: none;
			border-radius: 0;
		}
	}

	.ion-iten-transparent {
		--background: transparent;
	}

	ion-searchbar {
		--box-shadow: 'none';
		--border-radius: 0.5rem;
	}

	.searchbar-input.sc-ion-searchbar-md {
		padding-top: 12px;
		padding-bottom: 12px;
	}
</style>
