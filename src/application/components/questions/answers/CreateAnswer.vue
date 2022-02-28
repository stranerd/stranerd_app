<template>
	<div class="w-full flex flex-col bg-white mt-9 lg:p-12 p-5 lg:rounded-3xl rounded-xl">
		<h2 class="lg:text-xl text-base text-main_dark font-bold">
			Give your answer
		</h2>

		<div
			class="lg:mt-9 mt-5 py-3 px-4 flex flex-row items-center bg-light_gray rounded-lg border border-faded_gray">
			<span class="text-main_dark font-bold">Main answer -</span>
			<ion-input v-model="factory.title" class="w-full px-2 ml-1 font-medium" placeholder="Keep it short!">
			</ion-input>
		</div>
		<DisplayError :error="factory.errors.title" />

		<div class="lg:mt-9 mt-5 py-5 flex-col">
			<span class="text-main_dark font-bold">Explanation - </span>
			<div class="border border-faded_gray rounded-lg">
				<BaseEditor v-model:value="factory.body" :error="factory.errors.body" :valid="factory.isValid('body')"
					placeholder="Write out the detailed explanation of the answer you gave above. (Optional)" />
			</div>
		</div>

		<div
			class="lg:mt-9 mt-5 rounded-xl text-main_dark relative bg-light_gray border border-faded_gray flex flex-col h-32 justify-center items-center">
			<IonIcon :icon="imageOutline" class="!text-3xl" />
			<FileInput
				:multiple="true"
				accept="image/x-png,image/jpeg,image/jpg"
				class="mt-3"
				@files="catchAttachments">
				<ion-text class="font-bold lg:text-base">
					Add images to accompany your answer (Optional)
				</ion-text>
			</FileInput>
		</div>
		<div v-if="factory.attachments.length > 0" class="py-2 flex flex-row flex-wrap gap-x-2">
			<span v-for="attachment in factory.attachments" :key="attachment.name">
				<span
					class="py-1 px-2 font-bold text-white bg-faded_gray rounded-xl flex flex-row items-center">
					{{ attachment.name }} <IonIcon :icon="closeOutline" class="ml-1 cursor-pointer"
						@click="factory.removeAttachment(attachment)" />
				</span>
			</span>
		</div>
		<DisplayError :error="factory.errors.attachments" />

		<div class="flex w-full lg:mt-8 mt-5 items-center gap-6">
			<ion-button class="w-1/2 btn-secondary " @click="showAddAnswer = false">
				Cancel
			</ion-button>
			<ion-button class=" w-1/2 btn-primary"
				type="submit" @click="createAnswer">
				Post answer
			</ion-button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonIcon, IonInput } from '@ionic/vue'
import { closeOutline, imageOutline } from 'ionicons/icons'
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
			showAddAnswer,
			factory, error, loading, answeringQuestion, createAnswer, catchAttachments
		}
	}
})
</script>

<style scoped>
	ion-input, ion-select {
		--placeholder-color: #8B9EB1;
		--placeholder-opacity: 1;
	}

	ion-icon {
		font-size: 24px;
	}
</style>
