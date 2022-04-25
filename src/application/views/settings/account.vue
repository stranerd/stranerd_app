<template>
	<Justified>
		<form class="lg:w-8/12 w-full mx-auto md:p-4 lg:py-8 max-w-[800px] flex flex-col md:gap-4"
			@submit.prevent="updateSchool">
			<IonList class="border-bottom-line bg-white md:rounded-xl text-sub">
				<ion-radio-group v-model="factory.type" class="flex flex-col items-start" required>
					<IonListHeader>
						<ion-label class="font-bold text-heading">Choose your academic level *</ion-label>
					</IonListHeader>
					<IonItem class="flex items-center gap-4">
						<ion-radio slot="start" :value="UserSchoolType.secondary" />
						<ion-label>Secondary school</ion-label>
					</IonItem>
					<IonItem class="flex items-center gap-4">
						<ion-radio slot="start" :value="UserSchoolType.aspirant" />
						<ion-label>Secondary school leaver</ion-label>
					</IonItem>
					<IonItem class="flex items-center gap-4">
						<ion-radio slot="start" :value="UserSchoolType.college" />
						<ion-label>University</ion-label>
					</IonItem>
				</ion-radio-group>
			</IonList>

			<div v-if="factory.isCollegeType"
				class="border-bottom-line bg-white p-4 md:p-6 flex flex-col md:rounded-xl gap-4">
				<h2 class="text-heading font-semibold">University set up</h2>

				<div class="flex flex-col items-start gap-1">
					<ion-label>What university are you in?</ion-label>
					<ion-select v-model="factory.institutionId"
						class="bg-new_gray w-full capitalize"
						interface="action-sheet" placeholder="Select university"
						required>
						<ion-select-option v-for="school in schools" :key="school.hash" :value="school.id"
							class="capitalize">
							{{ school.name }}
						</ion-select-option>
					</ion-select>
				</div>

				<div class="flex flex-col items-start gap-1">
					<ion-label>What faculty are you in?</ion-label>
					<ion-select v-model="factory.facultyId"
						class="bg-new_gray w-full capitalize"
						interface="action-sheet" placeholder="Select faculty"
						required>
						<ion-select-option v-for="faculty in filteredFaculties" :key="faculty.hash" :value="faculty.id"
							class="capitalize">
							{{ faculty.name }}
						</ion-select-option>
					</ion-select>
				</div>

				<div class="flex flex-col items-start gap-1">
					<ion-label>What department are you in?</ion-label>
					<ion-select v-model="factory.departmentId"
						class="bg-new_gray w-full capitalize"
						interface="action-sheet" placeholder="Select department"
						required>
						<ion-select-option v-for="department in filteredDepartments" :key="department.hash"
							:value="department.id"
							class="capitalize">
							{{ department.name }}
						</ion-select-option>
					</ion-select>
				</div>

				<ion-button :disabled="loading" class="btn-primary w-40" type="submit">
					Save School
					<SpinLoading v-if="loading" />
				</ion-button>
			</div>

			<template v-else>
				<div class="border-bottom-line bg-white p-4 md:p-6 flex flex-col md:rounded-xl gap-4">
					<IonLabel class="font-semibold">What exam(s) are you studying for?</IonLabel>
					<ion-select v-model="factory.institutions"
						:multiple="true" class="bg-new_gray w-full capitalize"
						interface="alert"
						placeholder="Select exams" required>
						<ion-select-option v-for="exam in gatewayExams" :key="exam.hash" :value="exam.id"
							class="capitalize">
							{{ exam.name }}
						</ion-select-option>
					</ion-select>
				</div>

				<div v-for="(exam, index) in factory.exams" :key="exam.institutionId"
					class="border-bottom-line bg-white p-4 md:p-6 flex flex-col md:rounded-xl gap-4">
					<IonLabel class="font-semibold">
						<Institution :institutionId="exam.institutionId" />
						subject combination
					</IonLabel>
					<ion-select v-model="exam.courseIds" :multiple="true" class="bg-new_gray w-full capitalize"
						interface="alert"
						placeholder="Select subjects" required>
						<ion-select-option
							v-for="course in courses.filter((c) => c.institutionId === exam.institutionId)"
							:key="course.hash" :value="course.id" class="capitalize">
							{{ course.name }}
						</ion-select-option>
					</ion-select>
					<div class="flex flex-col md:flex-row gap-4">
						<IonInput :min="new Date().toISOString().substring(0, 10)"
							:value="new Date(exam.startDate).toISOString().substring(0, 10)"
							class="w-full bg-new_gray" placeholder="Select start date" required
							type="date"
							@change="(e) => exam.startDate = new Date(e.target.value).getTime()" />
						<IonInput :min="new Date(exam.startDate).toISOString().substring(0, 10)"
							:value="new Date(exam.endDate).toISOString().substring(0, 10)"
							class="w-full bg-new_gray" placeholder="Select end date" required
							type="date"
							@change="(e) => exam.endDate = new Date(e.target.value).getTime()" />
					</div>
					<ion-button v-if="index === factory.exams.length - 1" :disabled="loading"
						class="btn-primary w-40" type="submit">
						Save School
						<SpinLoading v-if="loading" />
					</ion-button>
				</div>
			</template>
		</form>
	</Justified>
</template>

<script lang="ts">
import { computed, defineComponent, watch } from 'vue'
import Justified from '@app/layouts/Justified.vue'
import { useUserSchoolUpdate } from '@app/composable/auth/profile'
import {
	IonButton,
	IonInput,
	IonItem,
	IonList,
	IonListHeader,
	IonRadio,
	IonRadioGroup,
	IonSelect,
	IonSelectOption
} from '@ionic/vue'
import Institution from '@app/components/school/institutions/Institution.vue'
import { useInstitutionList } from '@app/composable/school/institutions'
import { useCourseList } from '@app/composable/school/courses'
import { useFacultyList } from '@app/composable/school/faculties'
import { useDepartmentList } from '@app/composable/school/departments'
import { UserSchoolType } from '@modules/users'

export default defineComponent({
	name: 'SettingsAccount',
	displayName: 'Account setup',
	components: {
		Justified, IonRadio, IonRadioGroup, Institution, IonList, IonListHeader,
		IonButton, IonInput, IonSelect, IonSelectOption, IonItem
	},
	middlewares: ['isAuthenticated'],
	setup () {
		const { factory, error, loading, updateSchool } = useUserSchoolUpdate()

		const { schools, gatewayExams } = useInstitutionList()
		const { courses } = useCourseList()
		const { faculties, fetchFaculties } = useFacultyList()
		const { departments, fetchDepartments } = useDepartmentList()
		const filteredFaculties = computed(() => faculties.value.filter((f) => f.institutionId === factory.value.institutionId))
		const filteredDepartments = computed(() => departments.value.filter((d) => d.facultyId === factory.value.facultyId))

		watch(() => factory.value.institutionId, async () => {
			factory.value.resetProp('facultyId')
			if (factory.value.institutionId) await fetchFaculties(factory.value.institutionId)
		})

		watch(() => factory.value.facultyId, async () => {
			factory.value.resetProp('departmentId')
			if (factory.value.facultyId) await fetchDepartments(factory.value.facultyId)
		})

		return {
			factory, error, loading, updateSchool, UserSchoolType,
			schools, gatewayExams, filteredFaculties, filteredDepartments, courses
		}
	}
})
</script>

<style lang="scss" scoped>
	ion-button {
		--background: #{$color-primary};
		--box-shadow: none;
		height: 2.75rem;
	}

	ion-input, ion-textarea {
		--border-width: 1px !important;
		--border-style: solid !important;
	}

	ion-select, ion-radio-group {
		color: $color-gray !important;
	}
</style>
