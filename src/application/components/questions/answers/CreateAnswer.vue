<template>
	<div class="w-full flex flex-col bg-white md:p-4 rounded-xl md:gap-4">
		<div class="p-4 flex flex-col rounded-lg md:border md:border-faded_gray border-bottom-line gap-1">
			<span class="text-secondaryText font-bold">Answer</span>
			<ion-input v-model="factory.title" class="w-full" placeholder="Write main answer here and keep it short" />
			<DisplayError :error="factory.errors.title" />
		</div>

		<div class="p-4 flex flex-col rounded-lg md:border md:border-faded_gray border-bottom-line gap-1">
			<span class="text-secondaryText font-bold">Explanation (Optional)</span>
			<BaseEditor v-model:value="factory.body" :error="factory.errors.body" :valid="factory.isValid('body')"
				placeholder="Write a detailed explanation for your answer here" />
		</div>

		<div v-if="factory.attachments.length > 0" class="flex flex-wrap gap-2 p-4 md:p-0">
			<span v-for="attachment in factory.attachments" :key="attachment.name">
				<span
					class="py-1 px-2 font-bold text-white bg-faded_gray rounded-xl flex flex-row items-center">
					{{ attachment.name }} <IonIcon :icon="closeOutline" class="ml-1 cursor-pointer"
						@click="factory.removeAttachment(attachment)" />
				</span>
			</span>
		</div>
		<DisplayError :error="factory.errors.attachments" />

		<div class="flex w-full items-center gap-6 p-4 md:p-0">
			<FileInput
				:multiple="true"
				accept="image/x-png,image/jpeg,image/jpg"
				class="w-1/2"
				@files="catchAttachments"
			>
				<ion-button class="btn-outline w-full">
					<ion-icon :icon="imageOutline" class="!text-2xl text-primary mr-4" />
					Add image
				</ion-button>
			</FileInput>
			<ion-button
				class="w-1/2 btn-primary h-12"
				type="submit" @click="createAnswer">
				<ion-icon :icon="paperPlaneOutline" class="!text-2xl text-white mr-4" />
				<slot name="buttonText">Send</slot>
			</ion-button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonIcon, IonInput } from '@ionic/vue'
import { closeOutline, imageOutline, paperPlaneOutline } from 'ionicons/icons'
import { showAddAnswer, useCreateAnswer } from '@app/composable/questions/answers'
import { QuestionEntity } from '@modules/questions'
import { useFileInputCallback } from '@app/composable/core/forms'
import BaseEditor from '@app/components/core/editors/BaseEditor.vue'

export default defineComponent({
	props: {
		question: {
			type: Object as () => QuestionEntity
		}
	},
	components: { IonIcon, IonInput, BaseEditor },
	setup () {
		const {
			factory,
			error,
			loading,
			answeringQuestion,
			createAnswer
		} = useCreateAnswer()

		const catchAttachments = useFileInputCallback(async (files) => {
			files.map(factory.value.addAttachment)
		})

		return {
			imageOutline, closeOutline,
			showAddAnswer, paperPlaneOutline,
			factory, error, loading, answeringQuestion, createAnswer, catchAttachments
		}
	}
})
</script>

<style lang="scss" scoped>
	ion-input {
		--placeholder-color: #{$color-iconInactive};
		--placeholder-opacity: 1;
		--padding-start: 0 !important;
		--padding-end: 0 !important;
		--padding-top: 0 !important;
		--padding-bottom: 0 !important;
	}

	ion-icon {
		font-size: 24px;
	}

	:deep(.ql-editor) {
		padding: 0 !important;
	}
</style>
