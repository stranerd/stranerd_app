<template>
	<form @submit.prevent="submit">
		<div class="mb-4">
			<IonInput v-model="factory.title" class="!h-12 text-left bg-new_gray" placeholder="Enter Note Title" />
			<DisplayError :error="factory.errors.title" />
		</div>

		<div class="mb-4">
			<IonInput v-model="factory.description" class="!h-12 text-left bg-new_gray"
				placeholder="Add a short description" />
			<DisplayError :error="factory.errors.description" />
		</div>

		<div v-if="false" class="mb-12 flex items-center gap-4">
			<IonToggle id="isHosted" v-model="factory.isHosted" />
			<label for="isHosted">
				{{
					factory.isHosted ? 'Upload a document for the note' : 'Provide a link if the note is hosted elsewhere on the internet'
				}}
			</label>
		</div>

		<div v-if="factory.isHosted">
			<FileInput type="file" @files="catchMedia">
				<ion-button class="flex items-center btn-outline border-primary text-primary">
					<ion-icon :icon="documentOutline" class="!text-xl text-primary mr-2" />
					{{ factory.media ? 'Change' : 'Add' }} Document
				</ion-button>
			</FileInput>
			<span v-if="factory.media" class="p-2 rounded-xl flex items-center text-primary">
				{{ factory.media.name }}
				<IonIcon :icon="closeOutline" class="ml-2 cursor-pointer" @click="factory.media = null" />
			</span>
			<DisplayError :error="factory.errors.media" />
		</div>

		<div v-else class="mb-12">
			<label>Link</label>
			<IonInput v-model="factory.link" class="mb-2" inputmode="url" placeholder="Enter Link for the Note"
				type="url" />
			<DisplayError :error="factory.errors.link" />
		</div>

		<ion-button :disabled="loading || !factory.valid" class="btn-primary w-full md:!h-12" type="submit">
			<slot name="buttonText">Submit</slot>
		</ion-button>

		<PageLoading v-if="loading" />
	</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { closeOutline, documentOutline, image } from 'ionicons/icons'
import { useFileInputCallback } from '@app/composable/core/forms'
import { NoteFactory } from '@modules/study'
import { IonToggle } from '@ionic/vue'

export default defineComponent({
	name: 'NoteForm',
	components: { IonToggle },
	props: {
		factory: {
			type: NoteFactory,
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

<style lang="scss" scoped>
	ion-input, ion-textarea {
		border-radius: 0.5rem !important;
	}

	label {
		font-size: 1.2rem;
		font-weight: 500;
	}
</style>
