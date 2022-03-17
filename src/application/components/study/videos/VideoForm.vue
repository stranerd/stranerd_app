<template>
	<form @submit.prevent="submit">
		<div class="mb-4">
			<!-- <label>Title</label>  -->
			<IonInput v-model="factory.title" class="max-w-[1054px] !h-12 text-left bg-new_gray" placeholder="Enter Video Title" />
			<DisplayError :error="factory.errors.title" />
		</div>

		<div class="mb-4">
			<!-- <label>Description</label> -->
			<IonInput v-model="factory.description" class="max-w-[1054px] !h-12 text-left bg-light_gray" placeholder="Add a short description" />
			<DisplayError :error="factory.errors.description" />
		</div>

		<div v-if="false" class="mb-12 flex items-center gap-4">
			<IonToggle id="isHosted" v-model="factory.isHosted" />
			<label for="isHosted">
				{{
					factory.isHosted ? 'Upload a document for the video' : 'Provide a link if the video is hosted elsewhere on the internet'
				}}
			</label>
		</div>

		<div v-if="factory.isHosted" class="mb-12">
			<FileInput class="mb-2" type="file" @files="catchMedia">
				<label class="flex items-center gap-4">
					<ion-icon :icon="documentAttachOutline" class="!text-4xl text-gray" />
					{{ factory.media ? 'Change' : 'Add' }} Document
				</label>
			</FileInput>
			<span class="p-2 rounded-xl flex items-center">
				{{ factory.media?.name ?? 'No Media' }}
				<IonIcon v-if="factory.media" :icon="closeOutline" class="ml-2 cursor-pointer"
					@click="factory.media = null" />
			</span>
			<DisplayError :error="factory.errors.media" />
		</div>

		<div v-else class="mb-4">
			<!-- <label class="block">Link</label> -->
			<!-- <IonText class="text-sub mt-1">All links must be of videos hosted on YouTube</IonText> -->
			<IonInput v-model="factory.link"  class="max-w-[1054px] !h-12 text-left bg-light_gray" placeholder="Enter youtube video link" />
			<DisplayError :error="factory.errors.link" />
		</div>

		<div class="flex w-full items-center gap-6">
			<ion-button :disabled="loading || !factory.valid" class="w-full btn-primary md:!h-12" type="submit">
				<slot name="buttonText">Submit</slot>
			</ion-button>
		</div>

		<PageLoading v-if="loading" />
	</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { closeOutline, documentAttachOutline, image } from 'ionicons/icons'
import { useFileInputCallback } from '@app/composable/core/forms'
import { VideoFactory } from '@modules/study'
import {  IonToggle } from '@ionic/vue'

export default defineComponent({
	name: 'VideoForm',
	components: {  IonToggle },
	props: {
		factory: {
			type: VideoFactory,
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
		const catchMedia = useFileInputCallback(async ([file]) => {
			props.factory.media = file
		})

		return {
			image, documentAttachOutline, closeOutline, catchMedia
		}
	}
})
</script>

<style lang="scss" scoped>
	ion-input, ion-textarea {
	border-radius: 0.5rem !important;
	}

	label {
		font-size: 1.2rem;
		font-weight: 500;
	}
</style>
