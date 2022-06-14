<template>
	<form class="flex flex-col gap-4" @submit.prevent="submit">
		<div class="flex flex-col gap-4">
			<QuestionTag :tagId="question.tagId" class="text-secondaryText font-bold" />
			<DisplayHtml :html="question.body" />
		</div>

		<BaseEditor v-model:value="factory.body" :error="factory.errors.body" :valid="factory.isValid('body')"
			class="flex-grow"
			placeholder="Answer here" />

		<div v-if="factory.attachments.length > 0">
			<div class="flex flex-row flex-wrap gap-2 text-sub">
				<span v-for="attachment in factory.attachments" :key="attachment.name">
					<span
						class="py-1 px-2 font-bold text-primaryText bg-primaryBg rounded flex flex-row items-center">
						{{ attachment.name }} <IonIcon :icon="closeOutline" class="ml-1 cursor-pointer"
							@click="factory.removeAttachment(attachment)" />
					</span>
				</span>
			</div>
			<DisplayError :error="factory.errors.attachments" />
		</div>

		<div class="flex w-full items-center gap-6">
			<FileInput
				:multiple="true"
				accept="image/x-png,image/jpeg,image/jpg"
				class="w-full"
				@files="catchAttachments"
			>
				<IonButton class="btn-outline w-full">
					<IonIcon :icon="imageOutline" class="mr-4" />
					Add image
				</IonButton>
			</FileInput>
			<IonButton :disabled="loading || !factory.valid" class="w-full btn-primary" type="submit">
				<IonIcon :icon="paperPlaneOutline" class="mr-4" />
				<slot name="buttonText">Submit</slot>
			</IonButton>
		</div>

		<PageLoading v-if="loading" />
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { closeOutline, imageOutline, paperPlaneOutline } from 'ionicons/icons'
import { useFileInputCallback } from '@app/composable/core/forms'
import { AnswerFactory, QuestionEntity } from '@modules/questions'
import BaseEditor from '@app/components/core/editors/BaseEditor.vue'
import QuestionTag from '@app/components/questions/tags/Tag.vue'

export default defineComponent({
	name: 'AnswerForm',
	components: { BaseEditor, QuestionTag },
	props: {
		factory: {
			type: Object as PropType<AnswerFactory>,
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
		},
		question: {
			type: QuestionEntity,
			required: true
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
