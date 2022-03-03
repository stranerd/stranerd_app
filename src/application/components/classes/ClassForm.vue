<template>
	<form class="flex flex-col gap-4 text-center justify-center items-center" @submit.prevent="submit">
		<div class="flex justify-content items-center">
			<FileInput accept="image/*" @files="catchFiles">
				<img :src="imageLink || DEFAULT_PROFILE_IMAGE" alt="" class="w-16 h-16 rounded-full">
			</FileInput>
		</div>
		<div class="bg-light_gray w-full rounded-md flex items-center p-4">
			<ion-text class="text-primary font-bold">
				TITLE
			</ion-text>
			<ion-input v-model="factory.name"
				class="w-full text-left"
				placeholder="Name the class"
				show-cancel-button="never"
			/>
		</div>
		<div class="bg-light_gray w-full rounded-md flex items-center p-4">
			<ion-text class="text-primary font-bold">
				DESC
			</ion-text>
			<ion-input v-model="factory.description"
				class="w-full text-left"
				placeholder="Add a short description"
				show-cancel-button="never"
			/>
		</div>

		<hr class="text-faded_gray w-full hidden" />
		<div class="flex flex-col w-full hidden">
			<ion-item class="w-full ion-item-transparent">
				<ion-checkbox :value="true" class="ion-white" name="admin" />
				<ion-label class="text-icon_inactive font-bold text-base ml-3 ion-white">Only admin and tutors can add
					study materials
				</ion-label>
			</ion-item>

			<ion-item class="w-full ion-item-transparent">
				<ion-checkbox :value="false" class="ion-white" name="admin" />
				<ion-label class="text-icon_inactive font-bold text-base ml-3 ion-white">All participants can add study
					materials
				</ion-label>
			</ion-item>
		</div>

		<hr class="text-faded_gray w-full" />

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
import { IonCheckbox, IonItem, IonLabel, IonRippleEffect } from '@ionic/vue'
import { DEFAULT_PROFILE_IMAGE } from '@utils/constants'
import { addOutline } from 'ionicons/icons'
import { useFileInputCallback } from '@app/composable/core/forms'

export default defineComponent({
	name: 'ClassForm',
	components: { IonRippleEffect, IonItem, IonLabel, IonCheckbox },
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
		const imageLink = ref((props.factory.photo as any)?.link ?? '')
		const catchFiles = useFileInputCallback(async ([file]) => {
			imageLink.value = window.URL.createObjectURL(file.data)
			props.factory.photo = file
		})
		return { imageLink, DEFAULT_PROFILE_IMAGE, addOutline, catchFiles }
	}
})
</script>

<style lang="scss" scoped>
	ion-label {
		--color: #8B9EB1 !important;
	}

	ion-input {
		--padding-top: 0;
		--padding-bottom: 0;
		--padding-right: 0;
		--padding-left: 0;
	}

	ion-label {
		@media (max-width: 640px) {
			font-size: 12px !important;
		}
	}
</style>

