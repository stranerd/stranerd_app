<template>
	<form @submit.prevent="submit">
		<div class="mb-8">
			<IonLabel>Name</IonLabel>
			<IonInput v-model="factory.name" class="mb-2" placeholder="Enter Test Name" />
			<DisplayError :error="factory.errors.name" />
		</div>

		<div class="mb-8">
			<IonLabel>Institution</IonLabel>
			<IonSelect v-model="factory.institutionId" class="capitalize" interface="action-sheet"
				placeholder="Select the institution the prep belongs to">
				<IonSelectOption v-for="institution in institutions" :key="institution.hash" :value="institution.id"
					class="capitalize">
					{{ institution.name }}
				</IonSelectOption>
			</IonSelect>
		</div>

		<div class="mb-8">
			<IonLabel>Course</IonLabel>
			<IonSelect v-model="factory.courseId" class="capitalize" interface="action-sheet"
				placeholder="Select the institution the prep belongs to">
				<IonSelectOption v-for="course in courses" :key="course.hash" :value="course.id" class="capitalize">
					{{ course.name }}
				</IonSelectOption>
			</IonSelect>
		</div>

		<div class="mb-8">
			<IonLabel>Mode</IonLabel>
			<IonSelect v-model="factory.questionType" class="capitalize" interface="action-sheet"
				placeholder="Select the questions mode">
				<IonSelectOption v-for="questionType in factory.questionTypes" :key="questionType" :value="questionType"
					class="capitalize">
					{{ questionType }}
				</IonSelectOption>
			</IonSelect>
		</div>

		<div class="mb-8">
			<IonLabel>Year</IonLabel>
			<IonInput v-model.number="factory.year" class="mb-2" placeholder="Enter Test Year" />
			<DisplayError :error="factory.errors.year" />
		</div>

		<div class="mb-8">
			<IonLabel>Default Number of Questions</IonLabel>
			<IonInput v-model.number="factory.questions" class="mb-2" placeholder="Enter Length of Test Questions" />
			<DisplayError :error="factory.errors.questions" />
		</div>

		<div class="mb-8">
			<IonLabel>Default Time in Minutes</IonLabel>
			<IonInput v-model.number="factory.time" class="mb-2" placeholder="Enter Time for Test" />
			<DisplayError :error="factory.errors.time" />
		</div>

		<div class="flex w-full mt-8 items-center gap-6">
			<ion-button :disabled="loading || !factory.valid" class="ml-auto btn-primary" type="submit">
				<slot name="buttonText">Submit</slot>
			</ion-button>
		</div>

		<PageLoading v-if="loading" />
	</form>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { TestPrepFactory } from '@modules/study'
import { IonLabel, IonSelect, IonSelectOption } from '@ionic/vue'
import { useInstitutionList } from '@app/composable/study/institutions'
import { useCourseList } from '@app/composable/study/courses'

export default defineComponent({
	name: 'TestPrepForm',
	components: { IonSelect, IonSelectOption, IonLabel },
	props: {
		factory: {
			type: TestPrepFactory,
			required: true
		},
		submit: {
			type: Function,
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

	ion-label {
		font-size: 1.2rem;
		font-weight: 500;
	}
</style>
