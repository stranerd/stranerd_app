<template>
	<form @submit.prevent="submit">
		<div class="mb-4">
			<IonInput v-model="factory.title" class="!h-12 text-left bg-new_gray" placeholder="Enter Document Title" />
			<DisplayError :error="factory.errors.title" />
		</div>

		<div class="mb-4">
			<IonInput v-model="factory.description" class="!h-12 text-left bg-new_gray"
				placeholder="Add a short description" />
			<DisplayError :error="factory.errors.description" />
		</div>
 
		<div v-if="factory.isHosted">
			<FileInput type="file" @files="catchMedia">
				<IonButton class="flex items-center btn-outline border-primary text-primary">
					<IonIcon :icon="documentOutline" class="text-heading2 text-primary mr-2" />
					{{ factory.media ? 'Change' : 'Add' }} Document
				</IonButton>
			</FileInput>
			<span v-if="factory.media" class="p-2 rounded-xl flex items-center text-primary">
				{{ factory.media.name }}
				<IonIcon :icon="closeOutline" class="ml-2 cursor-pointer" @click="factory.media = null" />
			</span>
			<DisplayError :error="factory.errors.media" />
		</div>

		<div v-else class="mb-12">
			<label>Link</label>
			<IonInput v-model="factory.link" class="mb-2" inputmode="url" placeholder="Enter Link for the Document"
				type="url" />
			<DisplayError :error="factory.errors.link" />
		</div>

		<IonButton :disabled="loading || !factory.valid" class="btn-primary w-full md:!h-12" type="submit">
			<slot name="buttonText">Submit</slot>
		</IonButton>

		<PageLoading v-if="loading" />
	</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { closeOutline, documentOutline, image } from 'ionicons/icons'
import { useFileInputCallback } from '@app/composable/core/forms'
import { DocumentFactory } from '@modules/study'

export default defineComponent({
	name: 'DocumentForm',
	props: {
		factory: {
			type: DocumentFactory,
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
			image, documentOutline, closeOutline, catchMedia
		}
	}
})
</script>
