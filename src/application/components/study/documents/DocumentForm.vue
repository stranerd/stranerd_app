<template>
	<form @submit.prevent="submit">
		<div class="mb-4">
			<IonInput v-model="factory.title" class="!h-12 text-left" placeholder="Enter Document Title" />
			<DisplayError :error="factory.errors.title" />
		</div>

		<div class="mb-4">
			<IonInput v-model="factory.content" class="!h-12 text-left"
				placeholder="Add a short description" />
			<DisplayError :error="factory.errors.content" />
		</div>

		<IonButton :disabled="loading || !factory.valid" class="btn-primary w-full md:!h-12" type="submit">
			<slot name="buttonText">Submit</slot>
		</IonButton>

		<PageLoading v-if="loading" />
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
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
			type: Function as PropType<() => Promise<void>>,
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
