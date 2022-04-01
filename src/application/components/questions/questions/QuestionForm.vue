<template>
	<form class="flex flex-col gap-4" @submit.prevent="submit">
		<IonInput
			v-model="factory.subject"
			class="w-full bg-white border border-new_gray lg:hidden"
			placeholder="Associated subject/course?"
		/>
		<BaseEditor v-model:value="factory.body" :error="factory.errors.body" :valid="factory.isValid('body')"
			placeholder="Write your question here." />

		<div v-if="factory.attachments.length > 0" class="flex flex-row flex-wrap gap-2">
			<span v-for="attachment in factory.attachments" :key="attachment.name">
				<span
					class="py-1 px-2 font-bold text-white bg-faded_gray rounded-xl flex flex-row items-center">
					{{ attachment.name }} <IonIcon :icon="closeOutline" class="ml-1 cursor-pointer"
						@click="factory.removeAttachment(attachment)" />
				</span>
			</span>
		</div>
		<DisplayError :error="factory.errors.attachments" />

		<div class="flex items-center gap-4">
			<IonInput
				v-model="factory.subject"
				class="w-full flex-grow bg-white border border-new_gray hidden lg:block"
				placeholder="Associated subject/course?"
			/>
			<FileInput
				:multiple="true"
				accept="image/x-png,image/jpeg,image/jpg"
				class="w-full lg:w-auto"
				@files="catchAttachments"
			>
				<ion-button class="btn-secondary w-full text-primary flex items-center" size="small">
					<ion-icon :icon="imageOutline" class="!text-2xl text-primary mr-2" />
					<span>Add image</span>
				</ion-button>
			</FileInput>
			<ion-button :disabled="loading || !factory.valid" class="w-full lg:w-auto btn-primary flex items-center"
				size="small" type="submit">
				<ion-icon :icon="paperPlaneOutline" class="!text-2xl text-white mr-2" />
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

<style lang="scss" scoped>
	ion-input {
		--placeholder-color: #{$color-iconInactive};
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
