<template>
	<form class="flex flex-col gap-4" @submit.prevent="submit">
		<div class="flex flex-col gap-4 card-sm card-padding">
			<InteractionTag :tagId="question.tagId" class="text-secondaryText font-bold" />
			<DisplayHtml :html="question.body" />
		</div>

		<BaseEditor v-model:value="factory.body" :error="factory.errors.body" :valid="factory.isValid('body')"
			class="flex-grow"
			placeholder="Answer here" />

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
				<SpinLoading v-if="loading" class="mr-4" />
				<IonIcon v-else :icon="paperPlaneOutline" class="mr-4" />
				<slot name="buttonText">Submit</slot>
			</IonButton>
		</div>
	</form>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { closeOutline, imageOutline, paperPlaneOutline } from 'ionicons/icons'
import { useFileInputCallback } from '@app/composable/core/forms'
import { AnswerFactory, QuestionEntity } from '@modules/questions'
import BaseEditor from '@app/components/core/editors/BaseEditor.vue'
import InteractionTag from '@app/components/interactions/tags/Tag.vue'

const props = defineProps({
	factory: {
		type: Object as PropType<AnswerFactory>,
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
	question: {
		type: QuestionEntity,
		required: true
	}
})

const catchAttachments = useFileInputCallback(async (files) => {
	files.map(props.factory.addAttachment)
})
</script>
