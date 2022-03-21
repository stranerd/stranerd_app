<template>
	<form class="flex flex-col gap-4 text-center justify-center" @submit.prevent="submit">
		<div class="flex flex-col gap-4 modal-padding-x">
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
				<ion-button  class="btn-outline text-primary w-[7.5rem]" type="submit">
					Back
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
import { DEFAULT_PROFILE_BACKDROP, DEFAULT_PROFILE_PHOTO } from '@utils/constants'
import { addOutline, pencilOutline } from 'ionicons/icons'
import { useFileInputCallback } from '@app/composable/core/forms'
import { 
	IonRadio, 
	IonRippleEffect,    
	IonRadioGroup
} from '@ionic/vue'

export default defineComponent({
	name: 'SetupAccountForm',
	components: { IonRippleEffect, IonRadioGroup, IonRadio },
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
