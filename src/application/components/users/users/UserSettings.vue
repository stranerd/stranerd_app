<template>
	<div class="flex flex-col md:gap-4 text-gray">
		<div class="border-bottom-line flex flex-col md:rounded-xl bg-white py-4 md:py-6 gap-4">
			<div class="px-4 md:px-6">
				<ion-text class="text-main_dark font-bold">Edit profile</ion-text>
			</div>
			<div class="flex flex-col items-start">
				<div class="w-full flex items-center relative">
					<img :src="coverPhotoLink || DEFAULT_PROFILE_BACKDROP" alt=""
						class="h-16 md:h-20 w-full" style="object-fit: cover;">
					<FileInput accept="image/*"
						class="rounded-full absolute right-0 mr-4 h-8 w-8 bg-gray text-white flex items-center justify-center"
						@files="catchCoverPhoto">
						<IonIcon :icon="pencilOutline" />
					</FileInput>
				</div>
				<span
					class="px-4 md:px-6 relative top-[-32px] md:top-[-40px] inline-flex items-center justify-center -mb-8 md:-mb-10">
					<img :src="photoLink || DEFAULT_PROFILE_PHOTO" alt=""
						class="w-16 h-16 md:h-20 md:w-20 rounded-full">
					<FileInput accept="image/*"
						class="rounded-full absolute h-6 w-6 bg-gray text-white flex items-center justify-center"
						@files="catchPhoto">
						<IonIcon :icon="pencilOutline" />
					</FileInput>
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
				<ion-button :disabled="profileLoading" class="btn-primary w-32" @click="updateProfile">
					Save
					<IonSpinner v-if="profileLoading" name="lines-small" />
				</ion-button>
			</div>
		</div>

		<div class="border-bottom-line bg-white p-4 md:p-6 flex flex-col md:rounded-xl gap-4">
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
			<ion-button :disabled="passwordLoading" class="btn-primary w-40" @click="updatePassword">
				Save Password
				<IonSpinner v-if="passwordLoading" name="lines-small" />
			</ion-button>
		</div>

		<div class="border-bottom-line bg-white p-4 md:p-6 flex flex-col md:rounded-xl gap-4">
			<ion-radio-group v-model="schoolFactory.type" class="flex flex-col items-start gap-4 !text-gray">
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

		<div v-if="schoolFactory.isCollegeType"
			class="border-bottom-line bg-white p-4 md:p-6 flex flex-col md:rounded-xl gap-4">
			<h2 class="text-heading font-semibold">University set up</h2>

			<div class="flex flex-col items-start gap-1">
				<ion-label>What university are you in?</ion-label>
				<ion-select v-model="schoolFactory.institutionId"
					class="bg-new_gray w-full capitalize"
					interface="action-sheet"
					placeholder="Select university">
					<ion-select-option v-for="school in schools" :key="school.hash" :value="school.id"
						class="capitalize text-gray">
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
						class="capitalize text-gray">
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
						class="capitalize text-gray">
						{{ department.name }}
					</ion-select-option>
				</ion-select>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
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
import { image, pencilOutline } from 'ionicons/icons'
import { useProfileUpdate, useUserSchoolUpdate } from '@app/composable/auth/profile'
import { useAuth } from '@app/composable/auth/auth'
import { useFileInputCallback } from '@app/composable/core/forms'
import { usePasswordUpdate } from '@app/composable/auth/passwords'
import { DEFAULT_PROFILE_BACKDROP, DEFAULT_PROFILE_PHOTO } from '@utils/constants'
import { UserSchoolType } from '@modules/users'
import { useInstitutionList } from '@app/composable/school/institutions'
import { useFacultyList } from '@app/composable/school/faculties'
import { useDepartmentList } from '@app/composable/school/departments'

export default defineComponent({
	name: 'ProfileSettings',
	components: {
		IonTextarea, IonRadio, IonRadioGroup,
		IonSpinner, IonButton, IonInput, IonSelect, IonSelectOption
	},
	setup () {
		const { hasPassword, user } = useAuth()
		const {
			factory: profileFactory, error: profileError, loading: profileLoading, updateProfile
		} = useProfileUpdate()
		const {
			factory: passwordFactory, error: passwordError, loading: passwordLoading, updatePassword
		} = usePasswordUpdate()
		const {
			factory: schoolFactory, error: schoolError, loading: schoolLoading, updateSchool
		} = useUserSchoolUpdate()
		const photoLink = ref((profileFactory.value.photo as any)?.link ?? '')
		const coverPhotoLink = ref((profileFactory.value.coverPhoto as any)?.link ?? '')
		const catchPhoto = useFileInputCallback(async ([file]) => {
			photoLink.value = window.URL.createObjectURL(file.data)
			profileFactory.value.photo = file
			await updateProfile()
		})
		const catchCoverPhoto = useFileInputCallback(async ([file]) => {
			coverPhotoLink.value = window.URL.createObjectURL(file.data)
			profileFactory.value.coverPhoto = file
			await updateProfile()
		})
		const removePhoto = () => {
			photoLink.value = ''
			profileFactory.value.photo = null
		}
		const removeCoverPhoto = () => {
			coverPhotoLink.value = ''
			profileFactory.value.coverPhoto = null
		}

		const { schools, gatewayExams } = useInstitutionList()
		const { faculties } = useFacultyList()
		const { departments } = useDepartmentList()
		const filteredFaculties = computed(() => faculties.value.filter((f) => f.institutionId === schoolFactory.value.institutionId))
		const filteredDepartments = computed(() => departments.value.filter((d) => d.facultyId === schoolFactory.value.facultyId))

		return {
			user,
			DEFAULT_PROFILE_PHOTO, DEFAULT_PROFILE_BACKDROP, pencilOutline,
			profileFactory, profileError, profileLoading, updateProfile,
			image, catchPhoto, photoLink, removePhoto,
			passwordFactory, passwordError, passwordLoading, updatePassword,
			schoolFactory, schoolError, schoolLoading, updateSchool, UserSchoolType,
			hasPassword, coverPhotoLink, catchCoverPhoto, removeCoverPhoto,
			schools, gatewayExams, filteredFaculties, filteredDepartments
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

	ion-select {
		color: $color-gray !important;
	}
</style>
