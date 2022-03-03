<template>
	<form @submit.prevent="submit">
		<IonInput
			v-model="factory.subject"
			class="w-full bg-new_gray"
			placeholder="Select a Subject"
		/>
		<BaseEditor v-model:value="factory.body" :error="factory.errors.body" :valid="factory.isValid('body')"
			class="lg:mt-3 px-1"
			placeholder="Write your question here." />

		<div v-if="factory.attachments.length > 0" class="py-2 flex flex-row flex-wrap gap-x-2">
			<span v-for="attachment in factory.attachments" :key="attachment.name" class="my-1">
				<span
					class="py-1 px-2 font-bold text-white bg-faded_gray rounded-xl flex flex-row items-center">
					{{ attachment.name }} <IonIcon :icon="closeOutline" class="ml-1 cursor-pointer"
						@click="factory.removeAttachment(attachment)" />
				</span>
			</span>
		</div>
		<DisplayError :error="factory.errors.attachments" />

		<div class="flex w-full lg:mt-8 mt-5 items-center gap-6">
			<FileInput
				:multiple="true"
				accept="image/x-png,image/jpeg,image/jpg"
				class="w-1/2"
				@files="catchAttachments"
			>
				<ion-button class=" btn-secondary w-full text-primary">
					<ion-icon :icon="imageOutline" class="!text-2xl text-primary mr-4" />
					Add image
				</ion-button>
			</FileInput>
			<ion-button :disabled="loading || !factory.valid"
				class="w-1/2 btn-primary h-12" type="submit">
				<ion-icon :icon="paperPlaneOutline" class="!text-2xl text-white mr-4" />
				<slot name="buttonText">Submit</slot>
			</ion-button>
		</div>

		<PageLoading v-if="loading" />
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IonIcon } from '@ionic/vue'
import { closeOutline, imageOutline, paperPlaneOutline } from 'ionicons/icons'
import { useFileInputCallback } from '@app/composable/core/forms'
import { QuestionFactory } from '@modules/questions'
import BaseEditor from '@app/components/core/editors/BaseEditor.vue'

export default defineComponent({
	name: 'QuestionForm',
	components: {
		BaseEditor,
		IonIcon
	},
	props: {
		factory: {
			type: Object as PropType<QuestionFactory>,
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
		const catchAttachments = useFileInputCallback(async (files) => {
			files.map(props.factory.addAttachment)
		})

		return { imageOutline, paperPlaneOutline, closeOutline, catchAttachments }
	}
})
</script>

<style scoped>
	ion-select {
		--placeholder-color: #8B9EB1;
		--placeholder-opacity: 1;
	}

	ion-input {
		--placeholder-color: #8B9EB1;
		--placeholder-opacity: 1;
		--padding-start: 24px;
		--padding-end: 24px;
		--padding-top: 12px;
		--padding-bottom: 12px;
	}

	ion-icon {
		font-size: 22px;
	}
</style>
