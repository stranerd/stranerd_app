<template>
	<form class="flex flex-col gap-4 text-center justify-center items-center" @submit.prevent="submit">
		<div class="flex justify-center items-center">
			<FileInput accept="image/*" @files="catchPhoto">
				<img :src="photoLink || DEFAULT_PROFILE_PHOTO" alt="" class="w-16 h-16 rounded-full">
			</FileInput>
		</div>
		<ion-input v-model="factory.name"
			class="w-full text-left bg-new_gray w-full rounded-md"
			placeholder="Add a title"
			show-cancel-button="never"
		/>
		<ion-input v-model="factory.description"
			class="w-full text-left bg-new_gray w-full rounded-md"
			placeholder="Add a short description"
			show-cancel-button="never"
		/>

		<ion-button :disabled="loading || !factory.valid" class="btn-primary w-full" type="submit">
			<slot name="buttonText">Submit</slot>
			<ion-ripple-effect class="rounded-lg" />
		</ion-button>
		<PageLoading v-if="loading" />
	</form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { ClassFactory } from '@modules/classes'
import { IonRippleEffect } from '@ionic/vue'
import { DEFAULT_PROFILE_BACKDROP, DEFAULT_PROFILE_PHOTO } from '@utils/constants'
import { addOutline } from 'ionicons/icons'
import { useFileInputCallback } from '@app/composable/core/forms'

export default defineComponent({
	name: 'ClassForm',
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
			addOutline,
			catchPhoto,
			coverPhotoLink,
			catchCoverPhoto
		}
	}
})
</script>

<style lang="scss" scoped>
	ion-label {
		--color: #8B9EB1 !important;
	}

	ion-label {
		@media (max-width: 640px) {
			font-size: 12px !important;
		}
	}
</style>
