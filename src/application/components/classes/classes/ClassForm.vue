<template>
	<form class="flex flex-col gap-4 text-center justify-center" @submit.prevent="submit">
		<div class="flex flex-col items-start">
			<div class="w-full flex items-center relative">
				<CoverAvatar :src="factory.coverPhoto" class="h-20 md:h-20" />
				<FileInput accept="image/*"
					class="rounded-full absolute right-0 mr-4 h-8 w-8 bg-gray text-white flex items-center justify-center"
					@files="catchCoverPhoto">
					<IonIcon :icon="pencilOutline" />
				</FileInput>
			</div>
			<span
				class="modal-padding-x relative top-[-32px] md:top-[-40px] inline-flex items-center justify-center -mb-8 md:-mb-10">
				<Avatar :name="factory.name" :size="64" :src="factory.photo" class="md:hidden" />
				<Avatar :name="factory.name" :size="80" :src="factory.photo"
					class="hidden md:inline" />
				<FileInput accept="image/*"
					class="rounded-full absolute h-6 w-6 right-[15%] bottom-0 bg-gray text-white flex items-center justify-center"
					@files="catchPhoto">
					<IonIcon :icon="pencilOutline" />
				</FileInput>
			</span>
		</div>
		<div class="flex flex-col gap-4 modal-padding-x">
			<ion-input v-model="factory.name"
				class="w-full text-left bg-new_gray rounded-md"
				placeholder="Add a title"
				show-cancel-button="never"
			/>
			<ion-input v-model="factory.description"
				class="w-full text-left bg-new_gray rounded-md"
				placeholder="Add a short description"
				show-cancel-button="never"
			/>

			<ion-button :disabled="loading || !factory.valid" class="btn-primary w-full" type="submit">
				<slot name="buttonText">Submit</slot>
				<ion-ripple-effect class="rounded-lg" />
			</ion-button>
			<PageLoading v-if="loading" />
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ClassFactory } from '@modules/classes'
import { IonRippleEffect } from '@ionic/vue'
import { pencilOutline } from 'ionicons/icons'
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
		const catchPhoto = useFileInputCallback(async ([file]) => {
			props.factory.photo = file
		})
		const catchCoverPhoto = useFileInputCallback(async ([file]) => {
			props.factory.coverPhoto = file
		})
		return { pencilOutline, catchPhoto, catchCoverPhoto }
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
