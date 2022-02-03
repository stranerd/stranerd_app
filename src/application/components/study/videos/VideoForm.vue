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

		<div class="mb-12">
			<label>Tags</label>
			<IonInput v-model="tag" class="mb-2" placeholder="Add related tags" />
			<div v-if="factory.tags.length > 0" class="mb-2 flex flex-wrap gap-2">
				<span v-for="tag in factory.tags" :key="tag">
					<span
						class="p-2 text-white bg-faded_gray rounded-xl flex items-center">
						{{ tag }} <ion-icon :icon="close" class="ml-1 cursor-pointer" @click="removeTag(tag)" />
					</span>
				</span>
			</div>
			<DisplayError :error="factory.errors.tags" />
		</div>

		<div class="mb-12">
			<input
				id="preview" accept="image/x-png,image/jpeg,image/jpg"
				class="hidden" type="file" @change="catchPreview" />
			<label class="cursor-pointer flex items-center gap-4 mb-2" for="preview">
				<ion-icon :icon="image" class="!text-4xl text-gray" />
				{{ factory.preview ? 'Change' : 'Add' }} Preview (optional)
			</label>
			<span class="p-2 rounded-xl flex items-center">
				{{ factory.preview?.name ?? 'No Preview' }}
				<IonIcon v-if="factory.preview" :icon="close" class="ml-2 cursor-pointer"
					@click="factory.preview = null" />
			</span>
			<DisplayError :error="factory.errors.preview" />
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
			<input id="video" class="hidden" type="file" @change="catchMedia" />
			<label class="cursor-pointer flex items-center gap-4 mb-2" for="video">
				<ion-icon :icon="documentAttach" class="!text-4xl text-gray" />
				{{ factory.preview ? 'Change' : 'Add' }} Document
			</label>
			<span class="p-2 rounded-xl flex items-center">
				{{ factory.media?.name ?? 'No Media' }}
				<IonIcon v-if="factory.media" :icon="close" class="ml-2 cursor-pointer" @click="factory.media = null" />
			</span>
			<DisplayError :error="factory.errors.media" />
		</div>

		<div v-else class="mb-12">
			<label class="block">Link</label>
			<IonText class="text-sm mt-1">All links must be videos hosted on YouTube</IonText>
			<div class="flex mb-2">
				<span class="bg-new_gray py-3 pl-4 pr-1 text-icon_inactive">{{ factory.youTubeUrl }}</span>
				<IonInput id="link" v-model="factory.link" placeholder="Enter id of the youtube video"
					type="url" />
			</div>
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
import { close, documentAttach, image } from 'ionicons/icons'
import { useFileInputs, useTags } from '@app/composable/core/forms'
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
		const { tag, removeTag } = useTags(
			(tag: string) => props.factory.addTag(tag),
			(tag: string) => props.factory.removeTag(tag)
		)

		const { catchFiles: catchMedia } = useFileInputs((file: File) => props.factory.media = file)
		const { catchFiles: catchPreview } = useFileInputs((file: File) => props.factory.preview = file)

		return {
			image, documentAttach, close, tag, removeTag, catchMedia, catchPreview
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

	#link {
		--padding-start: 0 !important;
	}
</style>
