<template>
	<form class="flex flex-col gap-6" @submit.prevent="submit">
		<div v-if="!disabled.isPrivate && !disabled.tagId" class="flex gap-4">
			<IonSelect v-if="!disabled.isPrivate" v-model="factory.isPrivate" class="capitalize flex-1"
				interface="action-sheet"
				placeholder="Question privacy">
				<IonSelectOption :value="true">Private Question</IonSelectOption>
				<IonSelectOption :value="false">Public Question</IonSelectOption>
			</IonSelect>
			<SelectTag v-if="!disabled.tagId" v-model:value="factory.tagId" class="flex-1" />
		</div>

		<BaseEditor v-model:value="factory.body" :error="factory.errors.body" :valid="factory.isValid('body')"
			class="flex-grow"
			placeholder="Write your question here." />

		<div v-if="factory.attachments.length > 0">
			<div class="flex flex-row flex-wrap gap-2 text-sm">
				<span v-for="attachment in factory.attachments" :key="attachment.name">
					<span
						class="py-1 px-2 font-bold text-primaryText bg-primaryBg rounded flex flex-row items-center">
						{{ attachment.name }} <IonIcon :icon="closeOutline" class="ml-1"
							@click="factory.removeAttachment(attachment)" />
					</span>
				</span>
			</div>
			<DisplayError :error="factory.errors.attachments" />
		</div>

		<div class="text-center">
			Ask only if you abide by
			<router-link class="text-primaryBg font-bold" to="/legal/honor-code">our honor code</router-link>
		</div>

		<div class="flex w-full justify-end items-center gap-6">
			<FileInput
				:multiple="true"
				accept="image/x-png,image/jpeg,image/jpg"
				class="w-full lg:w-auto"
				@files="catchAttachments"
			>
				<IonButton class="btn-outline w-full">
					<IonIcon :icon="imageOutline" class="mr-4" />
					Add image
				</IonButton>
			</FileInput>
			<IonButton :disabled="loading || !factory.valid" class="w-full lg:w-auto btn-primary" type="submit">
				<SpinLoading v-if="loading" class="mr-4" />
				<IonIcon v-else :icon="paperPlaneOutline" class="mr-4" />
				<slot name="buttonText">Submit</slot>
			</IonButton>
		</div>
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { closeOutline, imageOutline, paperPlaneOutline } from 'ionicons/icons'
import { useFileInputCallback } from '@app/composable/core/forms'
import { QuestionFactory } from '@modules/questions'
import BaseEditor from '@app/components/core/editors/BaseEditor.vue'
import SelectTag from '@app/components/questions/questions/SelectTag.vue'

export default defineComponent({
	name: 'QuestionForm',
	components: { BaseEditor, SelectTag },
	props: {
		factory: {
			type: Object as PropType<QuestionFactory>,
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
			type: Object as PropType<Partial<Record<keyof QuestionFactory, boolean>>>,
			required: false,
			default: () => ({})
		}
	},
	setup (props) {
		const catchAttachments = useFileInputCallback(async (files) => {
			files.map(props.factory.addAttachment)
		})
		return { imageOutline, paperPlaneOutline, closeOutline, catchAttachments }
	}
})
</script>
