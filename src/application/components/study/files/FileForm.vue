<template>
	<form class="flex flex-col gap-6" @submit.prevent="submit">
		<div class="flex flex-col gap-2">
			<IonLabel>File</IonLabel>
			<FileInput accept="*"
				class="flex justify-center items-center gap-2 border-2 border-dashed border-primaryBg text-primaryBg bg-itemBg px-4 py-2 rounded-xl"
				@files="catchPhoto">
				<span>
					<IonIcon :icon="documentOutline" class="align-middle" />
				</span>
				<span class="truncate">{{ factory.media?.name ?? 'Tap to upload' }}</span>
			</FileInput>
			<DisplayError :error="factory.errors.media" />
		</div>

		<div class="flex flex-col gap-2">
			<IonLabel>Title <span class="font-normal">(optional)</span></IonLabel>
			<IonInput v-model="factory.title"
				:class="{'valid': factory.isValid('title'), 'invalid': factory.errors.title}"
				:disabled="disabled.name"
				placeholder="Rename your file"
				show-cancel-button="never"
			/>
			<DisplayError :error="factory.errors.title" />
		</div>

		<IonButton :disabled="loading || !factory.valid" class="w-full btn-primary" type="submit">
			<SpinLoading v-if="loading" />
			<slot v-else name="buttonText">Submit</slot>
		</IonButton>
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { FileFactory } from '@modules/study'
import { useFileInputCallback } from '@app/composable/core/forms'
import { documentOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'FileForm',
	props: {
		factory: {
			type: FileFactory,
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
		},
		disabled: {
			type: Object,
			required: false,
			default: () => ({})
		}
	},
	setup (props) {
		const catchPhoto = useFileInputCallback(async ([file]) => {
			props.factory.media = file
		})
		return { catchPhoto, documentOutline }
	}
})
</script>
