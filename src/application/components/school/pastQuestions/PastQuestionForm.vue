<template>
	<form @submit.prevent="submit">
		<div class="mb-8">
			<label>Institution</label>
			<IonSelect v-model="factory.institutionId" class="capitalize" interface="action-sheet"
				placeholder="Select the question's institution">
				<IonSelectOption v-for="institution in institutions" :key="institution.hash" :value="institution.id"
					class="capitalize">
					{{ institution.name }}
				</IonSelectOption>
			</IonSelect>
		</div>

		<div class="mb-8">
			<label>Course</label>
			<IonSelect v-model="factory.courseId" class="capitalize" interface="action-sheet"
				placeholder="Select the question's course">
				<IonSelectOption v-for="course in courses" :key="course.hash" :value="course.id"
					class="capitalize">
					{{ course.name }}
				</IonSelectOption>
			</IonSelect>
		</div>

		<div class="mb-8">
			<label>Year</label>
			<IonSelect v-model="factory.year" class="capitalize" interface="action-sheet"
				placeholder="Select the question's year">
				<IonSelectOption v-for="year in years" :key="year" :value="year"
					class="capitalize">
					{{ year }}
				</IonSelectOption>
			</IonSelect>
		</div>

		<div class="mb-8">
			<label>Question Type</label>
			<IonSelect v-model="factory.type" class="capitalize" interface="action-sheet"
				placeholder="Select the type of question">
				<IonSelectOption v-for="questionType in factory.questionTypes" :key="questionType" :value="questionType"
					class="capitalize">
					{{ questionType }}
				</IonSelectOption>
			</IonSelect>
		</div>

		<div class="mb-8">
			<label>Question</label>
			<IonTextarea v-model="factory.question" class="mb-2" placeholder="Enter Question" :rows="3" />
			<DisplayError :error="factory.errors.question" />
		</div>

		<template v-if="factory.isObjective">
			<div class="mb-8 flex flex-col">
				<IonRadioGroup v-model="factory.correctIndex" class="flex flex-col gap-4">
					<div v-for="(_, index) in factory.options" :key="index" class="flex gap-4 justify-between">
						<IonIcon :icon="trashBinOutline" class="text-danger"
							@click="factory.removeOption(index)" />
						<IonTextarea v-model="factory.options[index]"
							:placeholder="`Enter Option ${getAlphabet(index).toUpperCase()}`"
							:rows="3" class="my-0 flex-grow" />
						<IonRadio :value="index" />
					</div>
				</IonRadioGroup>
				<IonButton class="ml-auto rounded-xl mt-4 btn-primary" @click="factory.addOption">
					<IonIcon :icon="addOutline" class="mr-2" />
					Add New Option
				</IonButton>
			</div>
			<div class="mb-8">
				<label>Explanation</label>
				<IonTextarea v-model="factory.explanation" class="mb-2" placeholder="Enter Explanation" :rows="3" />
				<DisplayError :error="factory.errors.explanation" />
			</div>
		</template>
		<template v-else>
			<div class="mb-8">
				<label>Answer</label>
				<IonTextarea v-model="factory.answer" class="mb-2" placeholder="Enter Answer" :rows="3" />
				<DisplayError :error="factory.errors.answer" />
			</div>
		</template>

		<div class="flex w-full mt-8 items-center gap-6">
			<IonButton :disabled="loading || !factory.valid" class="ml-auto btn-primary" type="submit">
				<slot name="buttonText">Submit</slot>
			</IonButton>
		</div>

		<PageLoading v-if="loading" />
		<PageLoading v-if="institutionLoading" />
		<PageLoading v-if="courseLoading" />
	</form>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue'
import { PastQuestionFactory } from '@modules/school'
import { getAlphabet } from '@stranerd/validate'
import { addOutline, trashBinOutline } from 'ionicons/icons'
import { useInstitutionList } from '@app/composable/school/institutions'
import { useCourseList } from '@app/composable/school/courses'
import { years } from '@utils/constants'

const props = defineProps({
	factory: {
		type: PastQuestionFactory,
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
})

const { institutions, loading: institutionLoading } = useInstitutionList()
const { courses: allCourses, loading: courseLoading } = useCourseList()
const courses = computed(() => allCourses.value.filter((c) => c.institutionId === props.factory.institutionId))
</script>
