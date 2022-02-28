<template>
	<form @submit.prevent="submit">
		<SelectSubject v-model:subjectId="factory.subjectId" :show-all="false" class="w-full bg-new_gray" />
		<BaseEditor v-model:value="factory.body" :error="factory.errors.body" :valid="factory.isValid('body')"
			class="lg:mt-3 px-1"
			placeholder="Write your question here." />

		<!-- <div class="flex items-center mt-5 gap-5 flex-col lg:flex-row">
			<div class="flex items-center gap-5 w-full">

				<IonInput v-model="tag" class="w-1/4 font-medium bg-new_gray text-main_dark px-3"
					placeholder="Add related tags">
				</IonInput>
			</div>

		</div> -->
		<!--
		<div v-if="factory.tags.length > 0" class="py-2 flex flex-row flex-wrap gap-x-2">
			<span v-for="tag in factory.tags" :key="tag">
				<span
					class="py-1 px-2 font-bold text-white bg-faded_gray rounded-xl flex flex-row items-center">
					{{ tag }} <ion-icon :icon="closeOutline" class="ml-1 cursor-pointer" @click="removeTag(tag)" />
				</span>
			</span>
		</div>
		<DisplayError :error="factory.errors.tags" /> -->

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
				<ion-button class=" btn-secondary w-full">
					<ion-icon :icon="image" class="!text-2xl text-gray mr-4" />
					Add image
				</ion-button>
			</FileInput>
			<ion-button :disabled="loading || !factory.valid"
				class="w-1/2 btn-primary h-12" type="submit">
				<slot name="buttonText">Submit</slot>
			</ion-button>
		</div>

		<PageLoading v-if="loading" />
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IonIcon } from '@ionic/vue'
import { closeOutline, image } from 'ionicons/icons'
import { useFileInputCallback, useTags } from '@app/composable/core/forms'
import { QuestionFactory } from '@modules/questions'
import SelectSubject from '@app/components/questions/subjects/SelectSubject.vue'
import BaseEditor from '@app/components/core/editors/BaseEditor.vue'

export default defineComponent({
	name: 'QuestionForm',
	components: {
		BaseEditor,
		IonIcon,
		SelectSubject
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
		const { tag, removeTag } = useTags(
			(tag: string) => props.factory.addTag(tag),
			(tag: string) => props.factory.removeTag(tag)
		)

		const catchAttachments = useFileInputCallback(async (files) => {
			files.map(props.factory.addAttachment)
		})

		return { image, closeOutline, tag, removeTag, catchAttachments }
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
