<template>
	<form class="flex flex-col gap-6" @submit.prevent="submit">
		<IonSelect v-model="factory.tagId" :disabled="disabled.tagId" class="capitalize"
			interface="action-sheet" placeholder="Associated subject">
			<IonSelectOption v-for="tag in childrenTags" :key="tag.hash" :value="tag.id" class="capitalize">
				{{ tag.title }}
			</IonSelectOption>
		</IonSelect>

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
				<IonIcon :icon="paperPlaneOutline" class="mr-4" />
				<slot name="buttonText">Submit</slot>
			</IonButton>
		</div>

		<PageLoading v-if="loading" />
	</form>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { closeOutline, imageOutline, paperPlaneOutline } from 'ionicons/icons'
import { useFileInputCallback } from '@app/composable/core/forms'
import { QuestionFactory } from '@modules/questions'
import BaseEditor from '@app/components/core/editors/BaseEditor.vue'
import { useTagList } from '@app/composable/interactions/tags'

export default defineComponent({
	name: 'QuestionForm',
	components: { BaseEditor },
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
			type: Object,
			required: false,
			default: () => ({})
		}
	},
	setup (props) {
		const { questionTags } = useTagList()
		const childrenTags = computed(() => questionTags.value.filter((t) => t.parent))
		const catchAttachments = useFileInputCallback(async (files) => {
			files.map(props.factory.addAttachment)
		})
		return { childrenTags, imageOutline, paperPlaneOutline, closeOutline, catchAttachments }
	}
})
</script>
