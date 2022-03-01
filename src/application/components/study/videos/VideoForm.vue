<template>
	<form @submit.prevent="submit">
		<div class="mb-12">
			<label>Title</label>
			<IonInput v-model="factory.title" class="mb-2" placeholder="Enter Video Title" />
			<DisplayError :error="factory.errors.title" />
		</div>

		<div class="mb-12">
			<label>Description</label>
			<IonTextarea v-model="factory.description" class="mb-2" placeholder="Enter Video Description" rows="4" />
			<DisplayError :error="factory.errors.description" />
		</div>

		<div class="mb-12 gap-4 flex items-center">
			<IonToggle id="isGateway" v-model="factory.isPublic" />
			<label for="isGateway">
				{{ factory.isPublic ? 'Is public' : 'Is private' }}
			</label>
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

		<div v-else class="mb-12">
			<label class="block">Link</label>
			<IonText class="text-sm mt-1">All links must be of videos hosted on YouTube</IonText>
			<IonInput v-model="factory.link" class="mb-2" placeholder="Enter youtube video link" />
			<DisplayError :error="factory.errors.link" />
		</div>

		<div class="flex w-full mt-8 items-center gap-6">
			<ion-button :disabled="loading || !factory.valid" class="ml-auto btn-primary" type="submit">
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
import { IonTextarea, IonToggle } from '@ionic/vue'

export default defineComponent({
	name: 'VideoForm',
	components: { IonTextarea, IonToggle },
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
		background-color: $color-newGray;
		border-radius: 0.25rem !important;
	}

	label {
		font-size: 1.2rem;
		font-weight: 500;
	}
</style>
