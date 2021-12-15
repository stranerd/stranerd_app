<template>
	<div class="w-full  mt-8 px-4">
		<div
			class=" custom-shadow lg:w-7/12 p-6 mx-auto flex flex-col items-center justify-center rounded-xl gap-2 mb-6">
			<ion-text class="text-xl text-main_dark font-bold">
				Profile picture
			</ion-text>
			<Avatar :id="user.id" :size="90" :src="user.avatar" color="#C7D6E3" />
			<ion-button class="btn-primary" @click="openUploadModal()">
				Upload a profile picture
			</ion-button>
		</div>


		<div
			class=" custom-shadow lg:w-7/12 p-6 mx-auto flex flex-col items-center justify-center rounded-xl gap-2 mb-6">
			<ion-text class="text-xl text-main_dark font-bold text-left w-full">
				Usernames <span
					class="font-normal text-sm">*Use your real names, they can only be changed once	</span>
			</ion-text>
			<div class="flex md:flex-row items-center justify-center flex-col w-full gap-4">
				<div class="border border-faded_gray rounded-xl lg:w-1/2 md:mr-4 w-full">
					<IonInput v-model="profileFactory.first" class="w-full font-medium"
						placeholder="First name" />
				</div>
				<div class="border border-faded_gray rounded-xl lg:w-1/2 w-full">
					<IonInput v-model="profileFactory.last" class="w-full font-medium"
						placeholder="Last name" />
				</div>
			</div>
			<div class="w-full justify-start">
				<ion-button class="btn-primary w-32" @click="updateProfile()">
					Save
					<IonSpinner v-if="profileLoading" name="lines-small" />
				</ion-button>
			</div>

		</div>


		<div
			class=" custom-shadow lg:w-7/12 p-6 mx-auto flex flex-col items-center justify-center rounded-xl gap-2 mb-6">
			<ion-text class="text-xl text-main_dark font-bold text-left w-full">
				About
			</ion-text>
			<div class="flex md:flex-row items-center justify-center flex-col w-full gap-4">
				<div class="border border-faded_gray rounded-xl w-full mr-4">
					<IonTextarea v-model="profileFactory.description"
						class="bg-white border-0 focus:outline-none w-full"
						placeholder="Write your question here and make sure it is explained in full detail."
						rows="6" />
				</div>

			</div>
			<div class="w-full justify-start">
				<ion-button class="btn-primary w-32" @click="updateProfile()">
					Save
					<IonSpinner v-if="profileLoading" name="lines-small" />
				</ion-button>
			</div>

		</div>


		<!-- <div class=" flex flex-col gap-[8rem]">
			<div class="col-span-12 flex flex-col gap-6 px-3 mb-7 normalText text-icon_inactive">
				<div class="flex flex-col gap-2">
					<h2 class="headings font-bold text-main_dark">Name</h2>

				</div>

				<div class="flex flex-col gap-2">
					<h2 class="headings font-bold text-main_dark">About</h2>
					<div class="border border-faded_gray rounded-xl py-4 px-3">

					</div>
				</div>

				<div class="flex flex-row gap-3 mt-7 text-white">
					<div class="w-1/2 flex flex-row justify-center items-center">
						<IonButton class="cancelBtn w-full hidden" @click="profileFactory.reset()">
							Cancel
							<IonRippleEffect class="rounded-lg ion-activatable" />
						</IonButton>
					</div>
					<div class="w-1/2 flex flex-row justify-center items-center">
						<IonButton class="actionBtn ion-activatable w-full" @click="updateProfile">
							Save
							<IonSpinner v-if="profileLoading" name="lines-small" />
							<IonRippleEffect class="rounded-lg ion-activatable" />
						</IonButton>
					</div>
				</div>
			</div>
			<div class="col-span-12 flex flex-col gap-6 px-3 mb-7 normalText text-icon_inactive">


				<div class="flex flex-col gap-2">
					<h2 class="headings font-bold text-main_dark">Best Subject</h2>
					<SelectSubject
						v-model:subject-id="tutorFactory.strongestSubject"
						:exclude="tutorFactory.weakerSubjects"
						:show-all="false"
						class="p-0 select"
					/>
					<span v-if="tutorFactory.strongestSubject">
						Strongest subject chosen: <Subject :subject-id="tutorFactory.strongestSubject" />
					</span>
				</div>

				<div class="flex flex-row gap-3 mt-7 text-white">
					<div class="w-1/2 flex flex-row justify-center items-center">
						<IonButton class="btn-secondary w-full hidden" @click="tutorFactory.reset()">
							Cancel
							<IonRippleEffect class="rounded-lg ion-activatable" />
						</IonButton>
					</div>
					<div class="w-1/2 flex flex-row justify-center items-center">
						<IonButton class="btn-primary ion-activatable w-full" @click="updateTutor">
							Save
							<IonSpinner v-if="tutorLoading" name="lines-small" />
							<IonRippleEffect class="rounded-lg ion-activatable" />
						</IonButton>
					</div>
				</div>
			</div>
			<div class="col-span-12 flex flex-col gap-6 px-3 mb-7 normalText text-icon_inactive">
				<div class="flex flex-col gap-2">
					<h2 class="headings font-bold text-main_dark">{{ hasPassword ? 'Update' : 'Add' }} Password</h2>
					<p>
						*Login without Google
					</p>

					<div v-if="hasPassword" class="flex flex-col gap-2">
						<div class="py-2 px-2 w-full pl-6 bg-light_gray rounded-xl flex flex-row">
							<IonInput v-model="passwordFactory.oldPassword" class="w-full font-medium"
								placeholder="Current Password"
								type="password" />
						</div>
					</div>

					<div class="flex flex-row items-center flex-wrap">
						<div class="pr-1 w-full md:w-1/2">
							<div class="py-2 px-2 w-full pl-6 bg-light_gray rounded-xl flex flex-row">
								<IonInput v-model="passwordFactory.password" class="w-full font-medium"
									placeholder="New Password"
									type="password" />
							</div>
						</div>
						<div class="pl-1 w-full md:w-1/2">
							<div class="py-2 px-2 w-full pl-6 bg-light_gray rounded-xl flex flex-row">
								<IonInput v-model="passwordFactory.cPassword" class="w-full font-medium"
									placeholder="Confirm Password"
									type="password" />
							</div>
						</div>
					</div>
				</div>

				<div class="flex flex-row gap-3 mt-7 text-white">
					<div class="w-1/2 flex flex-row justify-center items-center">
						<IonButton class="cancelBtn w-full hidden" @click="passwordFactory.reset()">
							Cancel
							<IonRippleEffect class="rounded-lg ion-activatable" />
						</IonButton>
					</div>
					<div class="w-1/2 flex flex-row justify-center items-center">
						<IonButton class="actionBtn ion-activatable w-full" @click="updatePassword">
							Save
							<IonSpinner v-if="passwordLoading" name="lines-small" />
						</IonButton>
					</div>
				</div>
			</div>
		</div> -->

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
		const openUploadModal = () => {
			useProfileModal().openUploadImage()
		}
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
		box-shadow: 0px 0px 25px rgba(77, 92, 111, 0.1);
	}

	ion-button {
		--background: #546DD3;
		--box-shadow: none;
		height: 2.75rem;
	}

	ion-input {
		--placeholder-color: #8B9EB1;
		--border-width: 1px !important;
		--border-style: solid !important;
		--border-width: #8B9EB1 !important;

	}

	ion-select {
		/* Set a different placeholder color */
		--placeholder-color: #8B9EB1;

		/* Set full opacity on the placeholder */
		--placeholder-opacity: 1;
	}

	ion-textarea {

		/* Set a different placeholder color */
		--placeholder-color: #8B9EB1;

		/* Set full opacity on the placeholder */
		--placeholder-opacity: 1;
	}

	ion-input {

		/* Set a different placeholder color */
		--placeholder-color: #8B9EB1;

		/* Set full opacity on the placeholder */
		--placeholder-opacity: 1;
	}

</style>
