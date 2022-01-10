<template>
	<div class="w-full px-4">
		<div class="bg-primary h-24 -mx-4 hidden md:block" />

		<div
			class=" custom-shadow bg-white lg:w-7/12 p-6 mx-auto flex flex-col items-center justify-center rounded-xl  mb-6 md:-mt-12 mt-6">
			<ion-text class="text-xl text-main_dark font-bold mt-2">
				Profile picture
			</ion-text>
			<Avatar :id="user.id" :size="90" :src="user.avatar" class="mt-3" color="#C7D6E3" />
			<ion-button class="btn-primary mt-4" @click="openUploadModal()">
				Upload a profile picture
			</ion-button>
		</div>

		<div
			class=" custom-shadow bg-white lg:w-7/12 p-6 mx-auto flex flex-col items-center justify-center rounded-xl mb-6">
			<ion-text class="text-xl text-main_dark font-bold text-left w-full mt-2">
				Full names <span class="font-normal text-sm">*Use your real names, as they will be used to identify you throughout the platform</span>
			</ion-text>
			<div class="flex md:flex-row items-center justify-center flex-col w-full mt-2">
				<div class="border border-faded_gray rounded-xl lg:w-1/2 md:mr-4 w-full mt-4">
					<IonInput v-model="profileFactory.first" class="w-full font-medium" placeholder="First name" />
				</div>
				<div class="border border-faded_gray rounded-xl lg:w-1/2 w-full mt-4">
					<IonInput v-model="profileFactory.last" class="w-full font-medium" placeholder="Last name" />
				</div>
			</div>
			<div class="w-full justify-start mt-2">
				<ion-button class="btn-primary w-32" @click="updateProfile()">
					Save
					<IonSpinner v-if="profileLoading" name="lines-small" />
				</ion-button>
			</div>
		</div>

		<div
			class=" custom-shadow bg-white lg:w-7/12 p-6 mx-auto flex flex-col items-center justify-center rounded-xl mb-6">
			<ion-text class="text-xl text-main_dark font-bold text-left w-full">
				About
			</ion-text>
			<div class="flex md:flex-row items-center justify-center flex-col w-full mt-2">
				<div class="border border-faded_gray rounded-xl w-full mr-4">
					<IonTextarea v-model="profileFactory.description"
						class="bg-white border-0 focus:outline-none w-full"
						placeholder="Write your question here and make sure it is explained in full detail."
						rows="6" />
				</div>
			</div>
			<div class="w-full justify-start mt-2">
				<ion-button class="btn-primary w-32" @click="updateProfile()">
					Save
					<IonSpinner v-if="profileLoading" name="lines-small" />
				</ion-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonButton, IonInput, IonSpinner, IonTextarea } from '@ionic/vue'
import { image } from 'ionicons/icons'
import { useProfileUpdate, useTutorUpdate } from '@app/composable/auth/profile'
import { useAuth } from '@app/composable/auth/auth'
import { useFileInputs, useSubjectAsTags } from '@app/composable/core/forms'
import { usePasswordUpdate } from '@app/composable/auth/passwords'
import { useProfileModal } from '@app/composable/core/modals'

export default defineComponent({
	name: 'ProfileSettings',
	components: {
		IonTextarea,
		IonSpinner,
		IonButton,
		IonInput
		// Subject,
		// SelectSubject
	},
	setup () {
		const openUploadModal = () => useProfileModal().openUploadImage()
		const { hasPassword, user } = useAuth()
		const {
			factory: profileFactory,
			error: profileError,
			loading: profileLoading,
			updateProfile
		} = useProfileUpdate()
		const { factory: tutorFactory, error: tutorError, loading: tutorLoading, updateTutor } = useTutorUpdate()
		const {
			factory: passwordFactory,
			error: passwordError,
			loading: passwordLoading,
			updatePassword
		} = usePasswordUpdate()
		const imageLink = ref((profileFactory.value.avatar as any)?.link ?? '')
		const { catchFiles } = useFileInputs((file) => {
			imageLink.value = window.URL.createObjectURL(file)
			profileFactory.value.avatar = file
		})
		const removeImage = () => {
			imageLink.value = ''
			profileFactory.value.avatar = undefined
		}

		const { sTag, removeTag } = useSubjectAsTags(
			(sTag: string) => tutorFactory.value.addWeakerSubjects(sTag),
			(sTag: string) => tutorFactory.value.removeWeakerSubjects(sTag)
		)
		return {
			openUploadModal,
			user,
			profileFactory, profileError, profileLoading, updateProfile, image, catchFiles, imageLink, removeImage,
			tutorFactory, tutorError, tutorLoading, updateTutor, removeTag, sTag,
			passwordFactory, passwordError, passwordLoading, updatePassword, hasPassword
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
		--placeholder-opacity: 1;
		--placeholder-color: #8B9EB1;
		--border-width: 1px !important;
		--border-style: solid !important;
		--border-color: #8B9EB1 !important;
	}
</style>
