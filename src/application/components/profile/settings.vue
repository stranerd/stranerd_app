<template>
	<div class="col-span-12 flex flex-col gap-6 px-3 mb-7 normalText text-icon_inactive">
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
			<h2 class="headings font-bold text-dark_gray">Username</h2>
			<p>
				*Use your real names, they can only be changed once
			</p>
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

		<div class="flex flex-col gap-2">
			<h2 class="headings font-bold text-dark_gray">Course</h2>
			<div class="py-2 px-2 w-full pl-6 bg-light_gray rounded-xl flex flex-row">
				<ion-input class="w-full font-medium" placeholder="What course are you presently studying?" value="">
				</ion-input>
			</div>
		</div>

		<div class="flex flex-col gap-2">
			<h2 class="headings font-bold text-dark_gray">Best Subject</h2>
			<div class="py-2 px-2 w-full pl-6 bg-light_gray rounded-xl flex flex-row">
				<ion-input class="w-full font-medium" placeholder="What subject do you excel at the most?" value="">
				</ion-input>
			</div>
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
				<button class="cancleBtn w-full">
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
import {
	IonButton,
	IonIcon,
	IonInput,
	IonRippleEffect,
	IonSelect,
	IonSelectOption,
	IonSpinner,
	IonTextarea
} from '@ionic/vue'
import { image } from 'ionicons/icons'
import { defineComponent, ref } from 'vue'
import { useUpdateProfile } from '@/application/composable/users/account'
import { useAuth } from '@/application/composable/auth/auth'
import { useFileInputs, usePassword, useSubjectAsTags } from '@/application/composable/core/forms'
import { selectedTab } from '@/application/composable/profile'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'profileSettings',
	components: { IonIcon, IonInput, IonTextarea, IonSelect, IonSelectOption, IonRippleEffect, IonSpinner, IonButton },

	props: {
		userId: {
			type: String,
			required: true,
			default: ''
		}
	},
	async setup (props: any) {
		const router = useRouter()
		const { hasPassword, id } = useAuth()
		const { show, toggle } = usePassword()
		if (props.userId !== id.value) {
			await router.push(`/profile/${id.value}#dashboard`)
			selectedTab.value = '#dashboard'
		}

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