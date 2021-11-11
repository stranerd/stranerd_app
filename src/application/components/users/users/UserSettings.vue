<template>
	<div v-if="loading" class="flex items-center justify-center w-full col-span-12 pt-12 px-5">
		<ion-progress-bar type="indeterminate"></ion-progress-bar>
	</div>
	<div v-else class="col-span-12 flex flex-col gap-6 px-3 mb-7 normalText text-icon_inactive">
		<div class="flex flex-col gap-2">
			<h2 class="headings font-bold text-dark_gray">Profile picture</h2>
			<div
				class=" rounded-lg py-5 px-3 text-icon_inactive relative bg-light_gray flex flex-col justify-center items-center">
				<ion-icon :icon="image" class="text-[32px]"></ion-icon>
				<input
					id="images" accept="image/x-png,image/jpeg,image/jpg"
					class="cursor-pointer w-full h-full absolute"
					name="images"
					style="opacity:0; overflow:hidden; position:absolute;"
					type="file"
					@change.prevent="catchFiles" />
				<p class="mt-3">
					Upload a new profile picture
				</p>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<h2 class="headings font-bold text-dark_gray">Name</h2>
			<div class="flex flex-row items-center flex-wrap ">
				<div class="pr-1 w-full md:w-1/2">
					<div class="py-2 px-2  pl-6 bg-light_gray rounded-xl flex flex-row">
						<ion-input v-model="factory.first" class="w-full font-medium" placeholder="First name" value="">
						</ion-input>
					</div>
				</div>
				<div class="pl-1 w-full md:w-1/2">
					<div class="py-2 px-2 w-full   pl-6 bg-light_gray rounded-xl flex flex-row">
						<ion-input v-model="factory.last" class="w-full font-medium" placeholder="Last name" value="">
						</ion-input>
					</div>
				</div>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<h2 class="headings font-bold text-dark_gray">About</h2>
			<div class="border border-faded_gray rounded-xl py-4 px-3">
				<ion-textarea v-model="factory.description"
					class="bg-white border-0 focus:outline-none  w-full"
					placeholder="Write your question here and make sure it is explained in full detail."
					rows="6" />
			</div>
		</div>

		<div class="flex flex-col gap-2">
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
		<!-- <div class="flex flex-col gap-2">
			<h2 class="headings font-bold text-dark_gray">Course</h2>
			<div class="py-2 px-2 w-full pl-6 bg-light_gray rounded-xl flex flex-row">
				<ion-input class="w-full font-medium" placeholder="What course are you presently studying?" value="">
				</ion-input>
			</div>
		</div> -->

		<div class="flex flex-col gap-2">
			<h2 class="headings font-bold text-dark_gray">Best Subject</h2>
			<SelectSubject
				v-model:subject-id="factory.strongestSubject"
				:exclude="factory.weakerSubjects"
				:show-all="false"
				class="p-0 select"
			/>
			<span v-if="factory.strongestSubject">
				Strongest subject chosen: <Subject :subject-id="factory.strongestSubject" />
			</span>
		</div>

		<div class="flex flex-col gap-2">
			<h2 class="headings font-bold text-dark_gray">Password</h2>
			<p>
				*Login without Google
			</p>
			<div class="flex flex-row items-center flex-wrap ">
				<div class="pr-1 w-full md:w-1/2">
					<div class="py-2 px-2 w-full pl-6 bg-light_gray rounded-xl flex flex-row">
						<ion-input v-model="factory.password" class="w-full font-medium" placeholder="New Password"
							type="password">
						</ion-input>
					</div>
				</div>
				<div class="pl-1 w-full md:w-1/2">
					<div class="py-2 px-2 w-full pl-6 bg-light_gray rounded-xl flex flex-row">
						<ion-input v-model="factory.cPassword" class="w-full font-medium" placeholder="Confirm Password"
							type="password">
						</ion-input>
					</div>
				</div>
			</div>

		</div>


		<div class="flex flex-row gap-3 mt-7  text-white">
			<div class="w-1/2 flex flex-row justify-center items-center">
				<button class="cancelBtn w-full" @click="$router.go(-1)">
					Cancel
					<ion-ripple-effect class="rounded-lg  ion-activatable"></ion-ripple-effect>
				</button>
			</div>
			<div class="w-1/2 flex flex-row justify-center items-center">
				<ion-button class=" actionBtn  ion-activatable w-full " @click="updateProfile">
					Save
					<ion-spinner v-if="loading" name="lines-small"></ion-spinner>
				</ion-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
	IonButton,
	IonIcon,
	IonInput,
	IonProgressBar,
	IonRippleEffect,
	IonSelect,
	IonSelectOption,
	IonSpinner,
	IonTextarea
} from '@ionic/vue'
import { image } from 'ionicons/icons'
import { useUpdateProfile } from '@app/composable/users/account'
import { useAuth } from '@app/composable/auth/auth'
import { useFileInputs, usePassword, useSubjectAsTags } from '@app/composable/core/forms'
import Subject from '../../questions/subjects/Subject.vue'
import SelectSubject from '../../questions/subjects/SelectSubject.vue'
import { UserEntity } from '@modules/users'

export default defineComponent({
	name: 'ProfileSettings',
	components: {
		IonIcon,
		IonInput,
		IonTextarea,
		IonSelect,
		IonSelectOption,
		IonRippleEffect,
		IonSpinner,
		IonButton,
		IonProgressBar,
		Subject,
		SelectSubject
	},
	props: {
		user: {
			type: UserEntity,
			required: true,
			default: ''
		}
	},
	setup () {
		const { hasPassword } = useAuth()
		const { show, toggle } = usePassword()

		const { factory, error, loading, updateProfile } = useUpdateProfile()
		const imageLink = ref((factory.value.avatar as any)?.link ?? '')
		const { catchFiles } = useFileInputs((file) => {
			imageLink.value = window.URL.createObjectURL(file)
			factory.value.avatar = file
		})
		const removeImage = () => {
			imageLink.value = ''
			factory.value.avatar = undefined
		}

		const { sTag, removeTag } = useSubjectAsTags(
			(sTag: string) => factory.value.addWeakerSubjects(sTag),
			(sTag: string) => factory.value.removeWeakerSubjects(sTag)
		)
		return {
			hasPassword, show, toggle, catchFiles, imageLink, removeImage, sTag, removeTag,
			factory, error, loading, updateProfile, image
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
