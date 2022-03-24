<template>
	<div class="flex flex-col md:gap-4 text-gray">
		<form class="border-bottom-line flex flex-col md:rounded-xl bg-white py-4 md:py-6 gap-4"
			@submit.prevent="updateProfile">
			<div class="px-4 md:px-6">
				<ion-text class="text-main_dark font-bold">Edit profile</ion-text>
			</div>
			<div class="flex flex-col items-start">
				<CoverAvatar :editable="true" :src="profileFactory.coverPhoto" class="h-20"
					@photo="(p) => { profileFactory.coverPhoto = p; updateProfile() }" />
				<span class="modal-padding-x relative top-[-40px] inline-flex items-center justify-center -mb-10">
					<Avatar :editable="true" :name="profileFactory.first" :size="80"
						:src="profileFactory.photo" @photo="(p) => { profileFactory.photo = p; updateProfile() }" />
				</span>
			</div>
			<div class="px-4 md:px-6">
				<ion-text class="text-heading text-main_dark font-bold text-left mb-1">Name</ion-text>
				<div class="flex items-center justify-center gap-2 md:gap-4 w-full">
					<div class="border border-faded_gray rounded-lg w-1/2">
						<IonInput v-model="profileFactory.first" class="font-medium" placeholder="First name" />
					</div>
					<div class="border border-faded_gray rounded-lg w-1/2">
						<IonInput v-model="profileFactory.last" class="font-medium" placeholder="Last name" />
					</div>
				</div>
			</div>
			<div class="px-4 md:px-6">
				<ion-text class="text-heading text-main_dark font-bold text-left mb-1">Bio</ion-text>
				<div class="flex md:flex-row items-center justify-center flex-col w-full">
					<div class="border border-faded_gray rounded-lg w-full">
						<IonTextarea v-model="profileFactory.description"
							class="bg-white border-0 focus:outline-none w-full"
							placeholder="Tell us a little more about yourself"
							rows="6" />
					</div>
				</div>
			</div>
			<div class="px-4 md:px-6 flex">
				<ion-button :disabled="profileLoading" class="btn-primary w-40" type="submit">
					Save Profile
					<IonSpinner v-if="profileLoading" name="lines-small" />
				</ion-button>
			</div>
		</form>

		<form class="border-bottom-line bg-white p-4 md:p-6 flex flex-col md:rounded-xl gap-4"
			@submit.prevent="updatePassword">
			<ion-text class="text-heading font-semibold">
				{{ hasPassword ? 'Update Password' : 'Add Password' }}
			</ion-text>
			<div v-if="hasPassword" class="border border-faded_gray rounded-lg">
				<IonInput v-model="passwordFactory.oldPassword" class="w-full font-medium"
					placeholder="Confirm Old Password"
					type="password" />
			</div>
			<div class="flex md:flex-row gap-4 flex-col w-full">
				<div class="border border-faded_gray rounded-lg w-full">
					<IonInput v-model="passwordFactory.password" class="w-full font-medium"
						placeholder="Enter New Password"
						type="password" />
				</div>
				<div class="border border-faded_gray rounded-lg w-full">
					<IonInput v-model="passwordFactory.cPassword" class="w-full font-medium"
						placeholder="Confirm New Password"
						type="password" />
				</div>
			</div>
			<ion-button :disabled="passwordLoading" class="btn-primary w-40" type="submit">
				Save Password
				<IonSpinner v-if="passwordLoading" name="lines-small" />
			</ion-button>
		</form>

		<div class="border-bottom-line bg-white p-4 md:p-6 flex flex-col md:rounded-xl gap-4">
			<ion-radio-group v-model="schoolFactory.type" class="flex flex-col items-start gap-4">
				<ion-label class="font-bold">Choose your academic level *</ion-label>
				<div class="flex items-center gap-4">
					<ion-radio :value="UserSchoolType.secondary" />
					<ion-label>Secondary school</ion-label>
				</div>
				<div class="flex items-center gap-4">
					<ion-radio :value="UserSchoolType.aspirant" />
					<ion-label>Secondary school leaver</ion-label>
				</div>
				<div class="flex items-center gap-4">
					<ion-radio :value="UserSchoolType.college" />
					<ion-label>University</ion-label>
				</div>
			</ion-radio-group>
		</div>

		<form v-if="schoolFactory.isCollegeType"
			class="border-bottom-line bg-white p-4 md:p-6 flex flex-col md:rounded-xl gap-4"
			@submit.prevent="updateSchool">
			<h2 class="text-heading font-semibold">University set up</h2>

			<div class="flex flex-col items-start gap-1">
				<ion-label>What university are you in?</ion-label>
				<ion-select v-model="schoolFactory.institutionId"
					class="bg-new_gray w-full capitalize"
					interface="action-sheet"
					placeholder="Select university">
					<ion-select-option v-for="school in schools" :key="school.hash" :value="school.id"
						class="capitalize">
						{{ school.name }}
					</ion-select-option>
				</ion-select>
			</div>

			<div class="flex flex-col items-start gap-1">
				<ion-label>What faculty are you in?</ion-label>
				<ion-select v-model="schoolFactory.facultyId"
					class="bg-new_gray w-full capitalize"
					interface="action-sheet"
					placeholder="Select faculty">
					<ion-select-option v-for="faculty in filteredFaculties" :key="faculty.hash" :value="faculty.id"
						class="capitalize">
						{{ faculty.name }}
					</ion-select-option>
				</ion-select>
			</div>

			<div class="flex flex-col items-start gap-1">
				<ion-label>What department are you in?</ion-label>
				<ion-select v-model="schoolFactory.departmentId"
					class="bg-new_gray w-full capitalize"
					interface="action-sheet"
					placeholder="Select department">
					<ion-select-option v-for="department in filteredDepartments" :key="department.hash"
						:value="department.id"
						class="capitalize">
						{{ department.name }}
					</ion-select-option>
				</ion-select>
			</div>

			<ion-button :disabled="schoolLoading" class="btn-primary w-40" type="submit">
				Save School
				<IonSpinner v-if="schoolLoading" name="lines-small" />
			</ion-button>
		</form>

		<form v-else class="flex flex-col md:gap-4" @submit.prevent="updateSchool">
			<div class="border-bottom-line bg-white p-4 md:p-6 flex flex-col md:rounded-xl gap-4">
				<IonLabel class="font-semibold">What exam(s) are you studying for?</IonLabel>
				<ion-select v-model="schoolFactory.institutions"
					:multiple="true"
					class="bg-new_gray w-full capitalize"
					interface="alert" placeholder="Select exams">
					<ion-select-option v-for="exam in gatewayExams" :key="exam.hash" :value="exam.id"
						class="capitalize">
						{{ exam.name }}
					</ion-select-option>
				</ion-select>
			</div>

			<div v-for="(exam, index) in schoolFactory.exams" :key="exam.institutionId"
				class="border-bottom-line bg-white p-4 md:p-6 flex flex-col md:rounded-xl gap-4">
				<IonLabel class="font-semibold">
					<Institution :institutionId="exam.institutionId" />
					subject combination
				</IonLabel>
				<ion-select v-model="exam.courseIds" :multiple="true"
					class="bg-new_gray w-full capitalize"
					interface="alert" placeholder="Select subjects">
					<ion-select-option v-for="course in courses.filter((c) => c.institutionId === exam.institutionId)"
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
				<ion-button v-if="index === schoolFactory.exams.length - 1" :disabled="schoolLoading"
					class="btn-primary w-40" type="submit">
					Save School
					<IonSpinner v-if="schoolLoading" name="lines-small" />
				</ion-button>
			</div>
		</form>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import {
	IonButton,
	IonInput,
	IonRadio,
	IonRadioGroup,
	IonSelect,
	IonSelectOption,
	IonSpinner,
	IonTextarea
} from '@ionic/vue'
import { useProfileUpdate, useUserSchoolUpdate } from '@app/composable/auth/profile'
import { useAuth } from '@app/composable/auth/auth'
import { usePasswordUpdate } from '@app/composable/auth/passwords'
import { UserSchoolType } from '@modules/users'
import { useInstitutionList } from '@app/composable/school/institutions'
import { useFacultyList } from '@app/composable/school/faculties'
import { useDepartmentList } from '@app/composable/school/departments'
import Institution from '@app/components/school/institutions/Institution.vue'
import { useCourseList } from '@app/composable/school/courses'

export default defineComponent({
	name: 'ProfileSettings',
	components: {
		IonTextarea, IonRadio, IonRadioGroup, Institution,
		IonSpinner, IonButton, IonInput, IonSelect, IonSelectOption
	},
	setup () {
		const { hasPassword } = useAuth()
		const {
			factory: profileFactory, error: profileError, loading: profileLoading, updateProfile
		} = useProfileUpdate()
		const {
			factory: passwordFactory, error: passwordError, loading: passwordLoading, updatePassword
		} = usePasswordUpdate()
		const {
			factory: schoolFactory, error: schoolError, loading: schoolLoading, updateSchool
		} = useUserSchoolUpdate()

		const { schools, gatewayExams } = useInstitutionList()
		const { courses } = useCourseList()
		const { faculties } = useFacultyList()
		const { departments } = useDepartmentList()
		const filteredFaculties = computed(() => faculties.value.filter((f) => f.institutionId === schoolFactory.value.institutionId))
		const filteredDepartments = computed(() => departments.value.filter((d) => d.facultyId === schoolFactory.value.facultyId))

		return {
			profileFactory, profileError, profileLoading, updateProfile,
			hasPassword, passwordFactory, passwordError, passwordLoading, updatePassword,
			schoolFactory, schoolError, schoolLoading, updateSchool, UserSchoolType,
			schools, gatewayExams, filteredFaculties, filteredDepartments, courses
		}
	}
})
</script>

<style lang="scss" scoped>
	ion-button {
		--background: #546DD3;
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
