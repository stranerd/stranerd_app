<template>
	<form @submit.prevent="submit">
		<div class="lg:mt-3 border border-faded_gray rounded-xl px-1">
			<IonTextarea v-model="factory.body" class="bg-white border-0 focus:outline-none w-full p-2"
				placeholder="Write your question here and make sure it is explained in full detail."
				rows="7" />
		</div>

		<div class="flex items-center mt-5 gap-5 flex-col lg:flex-row">
			<div class="flex items-center gap-5 w-full">
				<input
					id="images" accept="image/x-png,image/jpeg,image/jpg"
					class="cursor-pointer lg:w-full h-full hidden"
					multiple
					name="images"
					style="opacity:0; overflow:hidden; position:absolute;"
					type="file"
					@change="catchAttachments" />
				<label class="cursor-pointer" for="images">
					<ion-icon :icon="image" class="!text-4xl text-gray"
					/>
				</label>
				<IonInput v-model="tag" class="w-1/4 font-medium bg-new_gray text-main_dark px-3"
					placeholder="Add related tags">
				</IonInput>
			</div>
			<SelectSubject v-model:subject-id="factory.subjectId" :show-all="false" class="w-full bg-new_gray" />
		</div>

		<div v-if="factory.tags.length > 0" class="py-2 flex flex-row flex-wrap gap-x-2">
			<span v-for="tag in factory.tags" :key="tag">
				<span
					class="py-1 px-2 font-bold text-white bg-faded_gray rounded-xl flex flex-row items-center">
					{{ tag }}  <ion-icon :icon="close" class="ml-1 cursor-pointer" @click="removeTag(tag)" />
				</span>
			</span>
		</div>

		<div v-if="factory.attachments.length > 0" class="py-2 flex flex-row flex-wrap gap-x-2">
			<span v-for="attachment in factory.attachments" :key="attachment.name" class="my-1">
				<span
					class="py-1 px-2 font-bold text-white bg-faded_gray rounded-xl flex flex-row items-center">
					{{ attachment.name }}  <IonIcon :icon="close" class="ml-1 cursor-pointer"
						@click="factory.removeAttachment(attachment)" />
				</span>
			</span>
		</div>

		<div class="flex w-full lg:mt-8 mt-5 items-center gap-6">
			<ion-button class="w-1/2 btn-secondary" @click="closeAskQuestion()">
				Cancel
			</ion-button>
			<ion-button :disabled="loading || !factory.valid"
				class="w-1/2 btn-primary" type="submit">
				Submit
			</ion-button>
		</div>

		<PageLoading v-if="loading" />
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IonIcon, IonInput, IonTextarea } from '@ionic/vue'
import { close, image } from 'ionicons/icons'
import { useMultipleFileInputs, useTags } from '@app/composable/core/forms'
import { QuestionFactory } from '@modules/questions'
import SelectSubject from '@app/components/questions/subjects/SelectSubject.vue'
import { useQuestionModal } from '@app/composable/core/modals'

export default defineComponent({
	name: 'QuestionForm',
	components: {
		IonTextarea,
		IonIcon,
		IonInput,
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
		const closeAskQuestion = () => {
			useQuestionModal().closeAskQuestion()
		}

		const { tag, removeTag } = useTags(
			(tag: string) => props.factory.addTag(tag),
			(tag: string) => props.factory.removeTag(tag)
		)

		const { catchMultipleFiles: catchAttachments } = useMultipleFileInputs(
			(files: File[]) => files.map(props.factory.addAttachment)
		)

		return {
			image, close, closeAskQuestion,
			tag, removeTag, catchAttachments
		}
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
