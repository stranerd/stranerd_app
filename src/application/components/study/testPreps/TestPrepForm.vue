<template>
	<form @submit.prevent="submit">
		<div class="mb-8">
			<label>Name</label>
			<IonInput v-model="factory.name" class="mb-2" placeholder="Enter Test Name" />
			<DisplayError :error="factory.errors.name" />
		</div>

		<div class="mb-8">
			<label>Institution</label>
			<IonSelect v-model="factory.institutionId" class="capitalize" interface="action-sheet"
				placeholder="Select the institution the prep belongs to">
				<IonSelectOption v-for="institution in institutions" :key="institution.hash" :value="institution.id"
					class="capitalize">
					{{ institution.name }}
				</IonSelectOption>
			</IonSelect>
		</div>

		<div class="mb-8">
			<label>Course</label>
			<IonSelect v-model="factory.courseId" class="capitalize" interface="action-sheet"
				placeholder="Select the institution the prep belongs to">
				<IonSelectOption v-for="course in courses" :key="course.hash" :value="course.id" class="capitalize">
					{{ course.name }}
				</IonSelectOption>
			</IonSelect>
		</div>

		<div class="mb-8">
			<label>Mode</label>
			<IonSelect v-model="factory.questionType" class="capitalize" interface="action-sheet"
				placeholder="Select the questions mode">
				<IonSelectOption v-for="questionType in factory.questionTypes" :key="questionType" :value="questionType"
					class="capitalize">
					{{ questionType }}
				</IonSelectOption>
			</IonSelect>
		</div>

		<div class="mb-8">
			<label>Year</label>
			<IonInput v-model.number="factory.year" class="mb-2" placeholder="Enter Test Year" />
			<DisplayError :error="factory.errors.year" />
		</div>

		<div class="mb-8">
			<label>Default Number of Questions</label>
			<IonInput v-model.number="factory.questions" class="mb-2" placeholder="Enter Length of Test Questions" />
			<DisplayError :error="factory.errors.questions" />
		</div>

		<div class="mb-8">
			<label>Default Time in Minutes</label>
			<IonInput v-model.number="factory.time" class="mb-2" placeholder="Enter Time for Test" />
			<DisplayError :error="factory.errors.time" />
		</div>

		<div class="flex w-full mt-8 items-center gap-6">
			<IonButton :disabled="loading || !factory.valid" class="ml-auto btn-primary" type="submit">
				<slot name="buttonText">Submit</slot>
			</IonButton>
		</div>

		<PageLoading v-if="loading" />
	</form>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { TestPrepFactory } from '@modules/study'
import { useInstitutionList } from '@app/composable/school/institutions'
import { useCourseList } from '@app/composable/school/courses'

export default defineComponent({
	name: 'TestPrepForm',
	props: {
		factory: {
			type: TestPrepFactory,
			required: true
		},
		submit: {
			type: Function as PropType<() => Promise<void>>,
			required: true
		},
		loading: {
			type: Boolean,
			required: true
		},
		error: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { institutions, loading: institutionLoading } = useInstitutionList()
		const { courses: allCourses, loading: courseLoading } = useCourseList()
		const courses = computed(() => allCourses.value.filter((course) => course.institutionId === props.factory.institutionId))
		return { institutions, institutionLoading, courses, courseLoading }
	}
})
</script>

<style lang="scss" scoped>
	ion-input, ion-textarea, ion-select {
		background-color: $color-newGray;
		border-radius: 0.25rem !important;
	}

	label {
		font-size: 1.2rem;
		font-weight: 500;
	}
</style>
