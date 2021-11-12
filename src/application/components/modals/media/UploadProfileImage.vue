<template>
	<Modal >
		<template v-slot:title>
			Upload New profile Image
		</template>
		<template v-slot:subtext >
			<span class="mb-4">
				What is wrong with this Question
			</span>

		</template>

		<div class="relative mt-5">
			<img
				:src="imageLink || DEFAULT_PROFILE_IMAGE"
				alt=""
				class="mx-auto w-28 h-28 rounded-full"
			>
			<input
				id="picture"
				accept="image/*"
				class="hidden"
				name="file"
				type="file"
				@change.prevent="catchFiles"
			>
			<label id="uploadbtn" for="picture">
				<ion-icon
					:icon="camera"
					class="text-primary w-20 h-20 absolute rounded-full right-[7.5625rem] opacity-10 hover:opacity-60 bottom-[.015625rem] text-lg bg-light_gray p-4 cursor-pointer"

				/>
			</label>

		</div>


		<div class="flex flex-row  mt-5  text-white gap-4">
			<div class="w-1/2 flex flex-row justify-center items-center">
				<ion-button class="btn-secondary w-full h-11"
					@click="closeUploadImage">
					Cancel
					<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
				</ion-button>
			</div>
			<div class="w-1/2 flex flex-row justify-center items-center">
				<ion-button class="btn-primary w-full h-11">
					save
					<!-- <ion-ripple-effect class="rounded-lg"></ion-ripple-effect> -->
				</ion-button>
			</div>
		</div>
	</Modal>

</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

import {  IonRippleEffect } from '@ionic/vue'
import { useUploadModal } from '@app/composable/core/modals'
import { DEFAULT_PROFILE_IMAGE } from '@utils/constants'
import { camera } from 'ionicons/icons'

import { useUpdateProfile } from '@app/composable/users/account'
import { useFileInputs } from '@app/composable/core/forms'

export default defineComponent({
	setup () {
		const closeUploadImage = () => {
			useUploadModal().closeUploadImage()
		}
		const { factory, error, loading, updateProfilePicture } = useUpdateProfile()
		const imageLink = ref((factory.value.avatar as any)?.link ?? '')
		const { catchFiles } = useFileInputs((file) => {
			imageLink.value = window.URL.createObjectURL(file)
			factory.value.avatar = file
		})
		return {
			updateProfilePicture,
			imageLink, catchFiles,
			error, loading,
			camera,	DEFAULT_PROFILE_IMAGE,
			closeUploadImage,

		}
	},
	components: {
		 IonRippleEffect
	}
})
</script>
<style scoped>
	ion-input {

		/* Set a different placeholder color */
		--placeholder-color: #8B9EB1;

		/* Set full opacity on the placeholder */
		--placeholder-opacity: 1;
	}

</style>
