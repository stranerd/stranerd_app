<template>
	<form class="flex flex-col gap-4 h-screen overflow-hidden" @submit.prevent="submit">
		<IonInput
			v-model="factory.subject"
			class="h-9 flex-none"
			placeholder="Associated subject/course?"
		/>
		<BaseEditor class="h-5/6" v-model:value="factory.body" :error="factory.errors.body" :valid="factory.isValid('body')"
			placeholder="Write your question here." />

		<div v-if="factory.attachments.length > 0" class="flex flex-row flex-wrap gap-2">
			<span v-for="attachment in factory.attachments" :key="attachment.name">
				<span
					class="py-1 px-2 font-bold text-primaryText bg-primaryBg rounded flex flex-row items-center">
					{{ attachment.name }} <IonIcon :icon="closeOutline" class="ml-1 cursor-pointer"
						@click="factory.removeAttachment(attachment)" />
				</span>
			</span>
		</div>
		<DisplayError :error="factory.errors.attachments" />

		<!-- <div class="flex items-center gap-4">
		
			<FileInput
				:multiple="true"
				accept="image/x-png,image/jpeg,image/jpg"
				class="w-full lg:w-auto"
				@files="catchAttachments"
			>
				<IonButton class="btn-outline w-full flex items-center">
					<IonIcon :icon="imageOutline" class="text-heading3 text-primary mr-2" />
					<span>Add image</span>
				</IonButton>
			</FileInput>
			<IonButton :disabled="loading || !factory.valid"
				class="w-full lg:w-auto btn-primary flex items-center" type="submit">
				<IonIcon :icon="paperPlaneOutline" class="text-heading3 text-white mr-2" />
				<slot name="buttonText">Submit</slot>
			</IonButton>
		</div> -->

		<div class="flex w-full items-center gap-6 md:p-0">
			<FileInput
				:multiple="true"
				accept="image/x-png,image/jpeg,image/jpg"
				class="w-1/2"
				@files="catchAttachments"
			>
				<IonButton class="btn-outline w-full h-8">
					<IonIcon :icon="imageOutline" class="!text-base text-primaryBg mr-4" />
					Add image
				</IonButton>
			</FileInput>
			<IonButton :disabled="loading || !factory.valid"
				class="w-1/2 btn-primary h-9"
				type="submit" >
				<IonIcon :icon="paperPlaneOutline" class="!text-base text-primaryText mr-4" />
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
import { QuestionFactory } from '@modules/questions'
import BaseEditor from '@app/components/core/editors/BaseEditor.vue'

export default defineComponent({
	name: 'QuestionForm',
	components: { BaseEditor },
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
