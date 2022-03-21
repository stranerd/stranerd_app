<template>
	<form class="flex flex-col gap-4 text-center justify-center" @submit.prevent="submit">
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
				class="modal-padding-x relative top-[-32px] md:top-[-40px] inline-flex items-center justify-center -mb-8 md:-mb-10">
				<img :src="photoLink || DEFAULT_PROFILE_PHOTO" alt="" class="w-16 h-16 md:h-20 md:w-20 rounded-full">
				<FileInput accept="image/*"
					class="rounded-full absolute right-10 bottom-2 h-6 w-6 bg-gray text-white flex items-center justify-center"
					@files="catchPhoto">
					<IonIcon :icon="pencilOutline" />
				</FileInput>
			</span>
		</div>
		<div class="flex flex-col gap-4 modal-padding-x">
			<div class="flex flex-col items-start">
				<ion-label class="font-bold mb-4 ">Name</ion-label>
				<div class="flex w-full justify-between">
					<ion-input v-model="factory.name"
						class="w-1/2 mr-4 text-left bg-transparent border border-faded_gray  rounded-md "
						placeholder="First name"
					/>
					<ion-input v-model="factory.name"
						class="w-1/2  text-left bg-transparent border border-faded_gray  rounded-md "
						placeholder="Last name"
					/>
				</div>
			
			</div>

			<div class="flex flex-col items-start">
				<ion-label class="font-bold mb-4">Bio</ion-label>
				<ion-input v-model="factory.description"
					class="w-full text-left bg-transparent border border-faded_gray rounded-md"
					placeholder="Short description on your profile"
					show-cancel-button="never"
				/>
			</div>


			<div class="flex w-full justify-end gap-4">
				<ion-button  class="btn-outline text-primary w-[7.5rem]" type="submit">
					Skip
					<ion-ripple-effect class="rounded-lg" />
				</ion-button>
				<ion-button :disabled="loading || !factory.valid" class="btn-primary w-[7.5rem]" type="submit">
					<slot name="buttonText">Submit</slot>
					<ion-ripple-effect class="rounded-lg" />
				</ion-button>
			</div>
	
			<PageLoading v-if="loading" />
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ClassFactory } from '@modules/classes'
import { IonRippleEffect } from '@ionic/vue'
import { DEFAULT_PROFILE_BACKDROP, DEFAULT_PROFILE_PHOTO } from '@utils/constants'
import { addOutline, pencilOutline } from 'ionicons/icons'
import { useFileInputCallback } from '@app/composable/core/forms'

export default defineComponent({
	name: 'SetupAccountForm',
	components: { IonRippleEffect },
	props: {
		factory: {
			type: ClassFactory,
			required: true
		},
		submit: {
			type: Function,
			required: true
		},
		loading: {
			type: Boolean,
			required: true
		},
		error: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const photoLink = ref((props.factory.photo as any)?.link ?? '')
		const coverPhotoLink = ref((props.factory.coverPhoto as any)?.link ?? '')
		const catchPhoto = useFileInputCallback(async ([file]) => {
			photoLink.value = window.URL.createObjectURL(file.data)
			props.factory.photo = file
		})
		const catchCoverPhoto = useFileInputCallback(async ([file]) => {
			coverPhotoLink.value = window.URL.createObjectURL(file.data)
			props.factory.coverPhoto = file
		})
		return {
			photoLink,
			DEFAULT_PROFILE_PHOTO,
			DEFAULT_PROFILE_BACKDROP,
			addOutline, pencilOutline,
			catchPhoto,
			coverPhotoLink,
			catchCoverPhoto
		}
	}
})
</script>

<style lang="scss" scoped>
	ion-label {
		--color: #132740 !important;
		color: #132740 !important;
	}

	ion-label {
		@media (max-width: 640px) {
			font-size: 12px !important;
		}
	}
</style>
