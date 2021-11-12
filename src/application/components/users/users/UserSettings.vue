<template>
	<div class="col-span-12 flex flex-col gap-[8rem]">
		<div class="col-span-12 flex flex-col gap-6 px-3 mb-7 normalText text-icon_inactive">
			<h1 class="headings mb-4">Profile</h1>
			<div class="flex flex-col gap-2">
				<h2 class="headings font-bold text-dark_gray">Name</h2>
				<div class="flex flex-row items-center flex-wrap ">
					<div class="pr-1 w-full md:w-1/2">
						<div class="py-2 px-2  pl-6 bg-light_gray rounded-xl flex flex-row">
							<IonInput v-model="profileFactory.first" class="w-full font-medium"
								placeholder="First name" />
						</div>
					</div>
					<div class="pl-1 w-full md:w-1/2">
						<div class="py-2 px-2 w-full   pl-6 bg-light_gray rounded-xl flex flex-row">
							<IonInput v-model="profileFactory.last" class="w-full font-medium"
								placeholder="Last name" />
						</div>
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-2">
				<h2 class="headings font-bold text-dark_gray">About</h2>
				<div class="border border-faded_gray rounded-xl py-4 px-3">
					<IonTextarea v-model="profileFactory.description"
						class="bg-white border-0 focus:outline-none w-full"
						placeholder="Write your question here and make sure it is explained in full detail."
						rows="6" />
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
			<!-- <div class="flex flex-col gap-2">
				<h2 class="headings font-bold text-dark_gray">Level</h2>
				<div class="py-1 px-2 bg-light_gray rounded-xl flex flex-row">
					<ion-select class="w-full  font-medium" interface="action-sheet"
						placeholder="Select your present level of education" value="notifications">
						<ion-select-option value="maths">Mathematics</ion-select-option>
						<ion-select-option value="physics">Physics</ion-select-option>
						<ion-select-option value="bio">Biology</ion-select-option>
						<ion-select-option value="geo">Geography</ion-select-option>
						<ion-select-option value="business">Business</ion-select-option>
						<ion-select-option value="civil">Civil Right</ion-select-option>
					</ion-select>
				</div>
			</div>
			<div class="flex flex-col gap-2">
				<h2 class="headings font-bold text-dark_gray">Course</h2>
				<div class="py-2 px-2 w-full pl-6 bg-light_gray rounded-xl flex flex-row">
					<ion-input class="w-full font-medium" placeholder="What course are you presently studying?" value="">
					</ion-input>
				</div>
			</div> -->

			<div class="flex flex-col gap-2">
				<h2 class="headings font-bold text-dark_gray">Best Subject</h2>
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
				<h2 class="headings font-bold text-dark_gray">{{ hasPassword ? 'Update' : 'Add' }} Password</h2>
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
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { IonButton, IonInput, IonRippleEffect, IonSpinner, IonTextarea } from '@ionic/vue'
import { image } from 'ionicons/icons'
import { useProfileUpdate, useTutorUpdate } from '@app/composable/auth/profile'
import { useAuth } from '@app/composable/auth/auth'
import { useFileInputs, useSubjectAsTags } from '@app/composable/core/forms'
import Subject from '@app/components/questions/subjects/Subject.vue'
import SelectSubject from '@app/components/questions/subjects/SelectSubject.vue'
import { usePasswordUpdate } from '@app/composable/auth/passwords'

export default defineComponent({
	name: 'ProfileSettings',
	components: {
		IonTextarea,
		IonRippleEffect,
		IonSpinner,
		IonButton,
		IonInput,
		Subject,
		SelectSubject
	},
	setup () {
		const { hasPassword } = useAuth()
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
			profileFactory, profileError, profileLoading, updateProfile, image, catchFiles, imageLink, removeImage,
			tutorFactory, tutorError, tutorLoading, updateTutor, removeTag, sTag,
			passwordFactory, passwordError, passwordLoading, updatePassword, hasPassword
		}
	}
})
</script>

<style scoped>
	ion-toolbar {
		--background: #F7F7FC;
	}

	ion-button {
		--background: #546DD3;
		--box-shadow: none;
		height: 2.75rem;
	}

	ion-input {
		--placeholder-color: #8B9EB1;
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
