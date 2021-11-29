<template>
	<div class="w-full flex flex-col text-xs mg:text-sm">
		<h2 class="text-sm md:text-base text-main_dark font-bold"> 
			Give your answer
		</h2>

		<div class="mt-3 py-3 px-4 flex flex-row items-center bg-light_gray rounded-lg border border-faded_gray ">
			<span class="text-main_dark font-bold">Main answer - </span>
			<ion-input v-model="factory.title" class="w-full px-2 ml-1 font-medium" placeholder="Keep it short!">
			</ion-input>
		</div>

		<div class="mt-3 border border-faded_gray rounded-lg py-5 flex-col px-3">
			<span class="text-main_dark font-bold">Explanation - </span>
			<ion-textarea v-model="factory.body" class="bg-white border-0 focus:outline-none  w-full"
				placeholder="Write out the detailed explanation of the answer you gave above. (Optional)"
				rows="9"></ion-textarea>
		</div>


		<div
			class="lg:mt-8 mt-5 rounded-xl  text-main_dark relative bg-light_gray border border-faded_gray flex flex-col h-32 justify-center items-center">
			<IonIcon :icon="image" class="!text-3xl" />
			<input
				id="images" accept="image/x-png,image/jpeg,image/jpg"
				class="cursor-pointer w-full h-full absolute"
				multiple
				name="images"
				style="opacity:0; overflow:hidden; position:absolute;"
				type="file"
				@change="catchAttachments" />
			<ion-text class="mt-3 font-bold lg:text-base">
				Add images to help with your question (Optional)
			</ion-text>
			<div v-if="factory.attachments.length > 0" class="py-2 flex flex-row flex-wrap gap-x-2">
				<span v-for="attachment in factory.attachments" :key="attachment.name">
					<span
						class="py-1 px-2 font-bold text-white bg-faded_gray rounded-xl flex flex-row items-center">
						{{ attachment.name }}  <IonIcon :icon="close" class="ml-1 cursor-pointer"
							@click="factory.removeAttachment(attachment)" />
					</span>
				</span>
			</div>
		</div>


		<div class="flex w-full lg:mt-8 mt-5 items-center gap-6">
			<ion-button class="w-1/2 btn-secondary " @click="showAddAnswer = false">
				Cancel
			</ion-button>
			<ion-button @click="createAnswer"
				class=" w-1/2  btn-primary" type="submit">
				Post answer
			</ion-button>
		</div>


	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import { IonIcon, IonInput,  IonTextarea } from '@ionic/vue'

import { close, image } from 'ionicons/icons'
import { showAddAnswer, useCreateAnswer } from '@app/composable/questions/answers'
import { useRoute } from 'vue-router'
import { QuestionEntity } from '@modules/questions'
import { useMultipleFileInputs } from '@app/composable/core/forms'

export default defineComponent({
	props: {
		question: {
			type: Object as () => QuestionEntity
		}
	},
	setup () {
		const route = useRoute()
		const {
			factory,
			error,
			loading,
			answeringQuestion,
			createAnswer
		} = useCreateAnswer()
		factory.value.questionId = Array.isArray(route.params.id) ? '' : route.params.id

		const { catchMultipleFiles: catchAttachments } = useMultipleFileInputs(
			(files: File[]) => files.map(factory.value.addAttachment)
		)

		return {
			image, close,
			showAddAnswer,
			factory, error, loading, answeringQuestion, createAnswer, catchAttachments
		}
	},
	components: {
		IonIcon,
		IonInput,
		IonTextarea,
	}
})
</script>
<style scoped>

	ion-select {

		/* Set a different placeholder color */
		--placeholder-color: #8B9EB1;

		/* Set full opacity on the placeholder */
		--placeholder-opacity: 1;
	}

	ion-input {

		/* Set a different placeholder color */
		--placeholder-color: #8B9EB1;

		/* Set full opacity on the placeholder */
		--placeholder-opacity: 1;
	}

	ion-icon {
		font-size: 24px;
	}

	ion-input {
		--placeholder-color: #8B9EB1;
	}
</style>
