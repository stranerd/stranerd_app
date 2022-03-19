<template>
	<form class="flex flex-col gap-4 text-center justify-center" @submit.prevent="submit">
		<div class="flex flex-col gap-4 modal-padding-x">
			<div class="flex flex-col items-start">
				<ion-label class="font-bold mb-4">What university are you in?</ion-label>
				<ion-select v-model="answered"
					class="bg-white md:bg-new_gray !text-gray flex-grow w-full text-left font-bold select-primary"
					interface="action-sheet"
					placeholder="Select university">
					<ion-select-option v-for="choice in 5" :key="choice"
						:value="choice" @click="answered = choice">
						{{ choice }}
					</ion-select-option>
				</ion-select>
			</div>

			<div class="flex flex-col items-start mt-4">
				<ion-label class="font-bold mb-4">What faculty are you in?</ion-label>
				<ion-select v-model="answered"
					class="bg-white md:bg-new_gray !text-gray flex-grow w-full text-left font-bold select-primary"
					interface="action-sheet"
					placeholder="Select faculty">
					<ion-select-option v-for="choice in 5" :key="choice"
						:value="choice" @click="answered = choice">
						{{ choice }}
					</ion-select-option>
				</ion-select>
			</div>

			<div class="flex flex-col items-start mt-4">
				<ion-label class="font-bold mb-4">What department are you in?</ion-label>
				<ion-select v-model="answered"
					class="bg-white md:bg-new_gray !text-gray flex-grow w-full text-left font-bold select-primary"
					interface="action-sheet"
					placeholder="Select department">
					<ion-select-option v-for="choice in 5" :key="choice"
						:value="choice" @click="answered = choice">
						{{ choice }}
					</ion-select-option>
				</ion-select>
			</div>

			<div class="flex w-full justify-end gap-4">
				<ion-button  class="btn-outline text-primary w-[7.5rem]" type="submit">
					Skip
					<ion-ripple-effect class="rounded-lg" />
				</ion-button>
				<ion-button :disabled="loading || !factory.valid" class="btn-primary w-[7.5rem]" type="submit">
					<slot name="buttonText">Done</slot>
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
	name: 'UniversityStudentForm',
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
