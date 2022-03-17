<template>
	<div class="w-full px-4">
		<div class="bg-primary h-24 -mx-4 hidden md:block" />

		<PageLoading v-if="profileLoading" />
		<PageLoading v-if="passwordLoading" />

		<div
			class="custom-shadow bg-white lg:w-7/12 p-6 mx-auto flex flex-col items-center justify-center rounded-xl mb-6 md:-mt-12 mt-6">
			<ion-text class="text-heading text-main_dark font-bold mt-2">
				Profile Picture
			</ion-text>
			<img :src="photoLink || DEFAULT_PROFILE_PHOTO"
				alt=""
				class="mt-3 w-24 h-24 rounded-full">
			<FileInput accept="image/*" class="mt-4" @files="catchPhoto">
				<label class="bg-primary text-white py-3 px-6 rounded-xl font-bold">
					Upload a profile picture
				</label>
			</FileInput>
		</div>

		<div
			class="custom-shadow bg-white lg:w-7/12 p-6 mx-auto flex flex-col items-center justify-center rounded-xl mb-6">
			<ion-text class="text-main_dark text-left w-full mt-2">
				<span class="text-heading font-bold">Full names</span> *Use your real names, as they will be used to
				identify you throughout the platform
			</ion-text>
			<div class="flex md:flex-row items-center justify-center flex-col w-full mt-2">
				<div class="border border-faded_gray rounded-xl lg:w-1/2 md:mr-4 w-full mt-4">
					<IonInput v-model="profileFactory.first" class="w-full font-medium" placeholder="First name" />
				</div>
				<div class="border border-faded_gray rounded-xl lg:w-1/2 w-full mt-4">
					<IonInput v-model="profileFactory.last" class="w-full font-medium" placeholder="Last name" />
				</div>
			</div>
			<ion-text class="text-heading text-main_dark font-bold text-left w-full mt-4">
				About
			</ion-text>
			<div class="flex md:flex-row items-center justify-center flex-col w-full mt-2">
				<div class="border border-faded_gray rounded-xl w-full">
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

		<div
			class="custom-shadow bg-white lg:w-7/12 p-6 mx-auto flex flex-col items-center justify-center rounded-xl mb-6">
			<ion-text class="text-heading text-main_dark font-bold text-left w-full">
				{{ hasPassword ? 'Update Password' : 'Add Password' }}
			</ion-text>
			<div v-if="hasPassword" class="border border-faded_gray rounded-xl w-full mt-4">
				<IonInput v-model="passwordFactory.oldPassword" class="w-full font-medium"
					placeholder="Confirm Old Password"
					type="password" />
			</div>
			<div class="flex md:flex-row gap-4 items-center justify-center flex-col w-full mt-4">
				<div class="border border-faded_gray rounded-xl w-full">
					<IonInput v-model="passwordFactory.password" class="w-full font-medium"
						placeholder="Enter New Password"
						type="password" />
				</div>
				<div class="border border-faded_gray rounded-xl w-full">
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
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonButton, IonInput, IonSpinner, IonTextarea } from '@ionic/vue'
import { image } from 'ionicons/icons'
import { useProfileUpdate } from '@app/composable/auth/profile'
import { useAuth } from '@app/composable/auth/auth'
import { useFileInputCallback } from '@app/composable/core/forms'
import { usePasswordUpdate } from '@app/composable/auth/passwords'
import { DEFAULT_PROFILE_PHOTO } from '@utils/constants'

export default defineComponent({
	name: 'ProfileSettings',
	components: {
		IonTextarea,
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
			DEFAULT_PROFILE_PHOTO,
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
	.custom-shadow {
		box-shadow: 0 0 25px rgba(77, 92, 111, 0.1);
	}

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
