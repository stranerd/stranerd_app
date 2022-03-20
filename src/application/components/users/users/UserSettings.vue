<template>
	<div class="w-full lg:w-8/12 mx-auto lg:mt-6">
		<!-- <div class="bg-primary h-24  hidden md:block" /> -->

		<PageLoading v-if="profileLoading" />
		<PageLoading v-if="passwordLoading" />
		<div class="flex flex-col w-full md:rounded-lg border-bottom-line md:pt-8 pt-4  bg-white ">
			<ion-text class="text-main_dark font-bold md:mb-8 mb-4 md:pl-8 pl-4">Edit profile</ion-text>
			<CoverAvatar :src="user.bio.coverPhoto" class=" h-11 md:h-28" />
			<div class="bg-white md:rounded-b-xl px-4 md:px-8 flex flex-col pb-6">
				<span class="relative">
					<img :src="photoLink || DEFAULT_PROFILE_PHOTO"
						alt=""
						class="-mt-10 md:-mt-12 md:w-24 md:h-24 w-20 h-20 rounded-full">
					<FileInput accept="image/*"
						class="rounded-full absolute left-14 bottom-2 h-6 w-6 bg-gray text-white flex items-center justify-center"
						@files="catchPhoto">
						<IonIcon :icon="pencilOutline" />
					</FileInput>
				</span>
				<ion-text class="text-heading text-main_dark font-bold text-left w-full mt-7 mb-2">
					Name
				</ion-text>
				<div class="flex flex-row items-center justify-center  w-full">
					<div class="border border-faded_gray rounded-lg w-1/2 md:mr-4  mr-2">
						<IonInput v-model="profileFactory.first" class="w-full font-medium mr-2" placeholder="First name" />
					</div>
					<div class="border border-faded_gray rounded-lg w-1/2  ">
						<IonInput v-model="profileFactory.last" class="w-full font-medium" placeholder="Last name" />
					</div>
				</div>

				<ion-text class="text-heading text-main_dark font-bold text-left w-full mt-4">
					Bio
				</ion-text>
				<div class="flex md:flex-row items-center justify-center flex-col w-full mt-2">
					<div class="border border-faded_gray rounded-lg w-full">
						<IonTextarea v-model="profileFactory.description"
							class="bg-white border-0 focus:outline-none w-full"
							placeholder="Tell us a little more about yourself"
							rows="6" />
					</div>
				</div>
				<div class="w-full justify-start mt-2">
					<ion-button class="btn-primary w-32" @click="updateProfile">
						Save
						<IonSpinner v-if="profileLoading" name="lines-small" />
					</ion-button>
				</div>
			
			</div>
		</div>


		<div
			class="bg-white md:mt-4 p-6 mx-auto flex flex-col items-center justify-center rounded-lg mb-6">
			<ion-text class="text-heading text-main_dark font-bold text-left w-full">
				{{ hasPassword ? 'Update Password' : 'Add Password' }}
			</ion-text>
			<div v-if="hasPassword" class="border border-faded_gray rounded-lg w-full mt-4">
				<IonInput v-model="passwordFactory.oldPassword" class="w-full font-medium"
					placeholder="Confirm Old Password"
					type="password" />
			</div>
			<div class="flex md:flex-row gap-4 items-center justify-center flex-col w-full mt-4">
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
			<div class="w-full justify-start mt-4">
				<ion-button class="btn-primary" @click="updatePassword">
					Save Password
					<IonSpinner v-if="passwordLoading" name="lines-small" />
				</ion-button>
			</div>
		</div>
		

		<div
			class="bg-white md:mt-4 p-6 mx-auto flex flex-col items-center justify-center rounded-lg mb-6">

			<div class="flex flex-col gap-4 w-full">
				<ion-radio-group value="ss" class="flex flex-col items-start">
					<ion-label class="font-bold mb-4">Choose your academic level *</ion-label>

					<div class="flex items-center mt-4">
						<ion-radio  value="ss" class="mr-4"></ion-radio>
						<ion-label class="!text-gray">Secondary school</ion-label>
					</div>			
					<div class="flex items-center mt-4">
						<ion-radio  value="ssl" class="mr-4"></ion-radio>
						<ion-label class="!text-gray">Secondary school leaver</ion-label>
					</div>			
					<div class="flex items-center mt-4">
						<ion-radio  value="uni" class="mr-4"></ion-radio>
						<ion-label class="!text-gray">University</ion-label>
					</div>			
				</ion-radio-group>


				<div class="flex w-full justify-between gap-4 mt-4">
					<ion-button class="btn-primary w-[7.5rem]" type="submit">
						Save
					</ion-button>
				</div>
	

			</div>

		</div>

		<div
			class="bg-white md:mt-4 p-6 mx-auto flex flex-col items-center justify-center rounded-lg mb-6">

			<div class="flex flex-col gap-4 w-full">
				<div class="flex flex-col items-start">
					<ion-label class="font-bold mb-4">What exam(s) are you studying for?</ion-label>
					<ion-select v-model="answered"
						class="bg-white md:bg-new_gray !text-gray flex-grow w-full text-left font-bold select-primary"
						interface="action-sheet"
						placeholder="Select exam(s)">
						<ion-select-option v-for="choice in 5" :key="choice"
							:value="choice" @click="answered = choice">
							{{ choice }}
						</ion-select-option>
					</ion-select>
				</div>
	
				<div class="flex w-full justify-start gap-4">			
					<ion-button  class="btn-primary w-[7.5rem]" type="submit">
						Save
					</ion-button>
				</div>
			</div>

		</div>

	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonButton, IonInput, IonSpinner, IonTextarea, IonRadio, IonRadioGroup } from '@ionic/vue'
import { image, pencilOutline } from 'ionicons/icons'
import { useProfileUpdate } from '@app/composable/auth/profile'
import { useAuth } from '@app/composable/auth/auth'
import { useFileInputCallback } from '@app/composable/core/forms'
import { usePasswordUpdate } from '@app/composable/auth/passwords'
import { DEFAULT_PROFILE_PHOTO } from '@utils/constants'

	
export default defineComponent({
	name: 'ProfileSettings',
	components: {
		IonTextarea,IonRadio, IonRadioGroup,
		IonSpinner,
		IonButton,
		IonInput
	},
	setup () {
		const { hasPassword, user } = useAuth()
		const {
			factory: profileFactory,
			error: profileError,
			loading: profileLoading,
			updateProfile
		} = useProfileUpdate()
		const {
			factory: passwordFactory,
			error: passwordError,
			loading: passwordLoading,
			updatePassword
		} = usePasswordUpdate()
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

		return {
			user,
			DEFAULT_PROFILE_PHOTO, pencilOutline,
			profileFactory,
			profileError,
			profileLoading,
			updateProfile,
			image,
			catchPhoto,
			photoLink,
			removePhoto,
			passwordFactory,
			passwordError,
			passwordLoading,
			updatePassword,
			hasPassword,
			coverPhotoLink,
			catchCoverPhoto,
			removeCoverPhoto
		}
	}
})
</script>

<style scoped>

	ion-button {
		--background: #546DD3;
		--box-shadow: none;
		height: 2.75rem;
	}

	ion-input, ion-textarea {
		--border-width: 1px !important;
		--border-style: solid !important;
	}
</style>
