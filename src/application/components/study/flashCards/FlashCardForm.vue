<template>
	<div>
		<div
			class="bg-primary w-full h-auto flex flex-col justify-between items-center md:pt-12 pt-4 pb-1 md:rounded-none rounded-b-xl gap-4">
			<ion-text class="heading lg:text-2xl font-bold text-white text-center mb-2 hidden md:block">
				{{ title }}
			</ion-text>
			<div class="lg:w-8/12 w-full flex flex-col gap-4 px-4">
				<div>
					<div class="bg-white rounded-md flex items-center px-4">
						<ion-text class="text-primary font-bold w-12">
							TITLE
						</ion-text>
						<ion-input v-model="factory.title"
							class="max-w-[1054px]"
							mode="md"
							placeholder="Enter a title with the format; “[subject] - [sub-topics covered] or [exam/test studying for]”"
							show-cancel-button="never"
						></ion-input>
					</div>
					<DisplayError :error="factory.errors.title" />
				</div>
			</div>
		</div>

		<div class="lg:w-8/12 w-full px-4 mx-auto mt-4 md:mt-8 flex flex-col gap-4">
			<ion-reorder-group class="flex flex-col gap-4" disabled="true">
				<ion-reorder v-for="(card, index) in factory.questions" :key="index"
					class="flex flex-col bg-white p-4 rounded-xl">
					<div class="flex w-full items-center justify-between">
						<ion-text class="text-main_dark font-bold">Card {{ index + 1 }}</ion-text>
						<div class="flex" @click="factory.removeQuestion(index)">
							<ion-icon :icon='trashOutline' class="text-main_dark" />
						</div>
					</div>

					<div class="flex w-full md:flex-row flex-col gap-4 md:h-auto">
						<ion-textarea v-model="card.question"
							class="ion-bg-white border border-faded_gray ion-rounded-xl rounded-xl w-full"
							placeholder="Front (Questions or Words)"
							rows="5" />
						<ion-textarea v-model="card.answer"
							class="ion-bg-white border border-faded_gray ion-rounded-xl rounded-xl w-full"
							placeholder="Back (Answers or Definitions or Translations)"
							rows="5" />
					</div>
				</ion-reorder>
			</ion-reorder-group>
			<DisplayError :error="factory.errors.set" />

			<div
				class="w-full flex bg-white items-center p-8 rounded-xl text-lg text-icon_inactive justify-center font-bold cursor-pointer"
				@click="factory.addQuestion"
			>
				<ion-icon :icon="addOutline" class="text-2xl" />
				<ion-text>ADD CARD</ion-text>
			</div>

			<div class="w-full flex justify-end mb-8">
				<ion-button :disabled="loading || !factory.valid" class="btn-primary btn-lg !pr-0" @click="submit">
					<slot name="buttonTitle">Submit</slot>
				</ion-button>
			</div>
		</div>

		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonReorder, IonReorderGroup, IonTextarea } from '@ionic/vue'
import { addOutline, closeOutline, trashOutline } from 'ionicons/icons'
import { FlashCardFactory } from '@modules/study'

export default defineComponent({
	name: 'FlashcardForm',
	props: {
		factory: {
			type: FlashCardFactory,
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
		},
		title: {
			type: String,
			required: true
		}
	},
	components: { IonTextarea, IonReorderGroup, IonReorder },
	setup () {
		return { closeOutline, trashOutline, addOutline }
	}
})
</script>

<style lang="scss" scoped>
	.ion-item-transparent {
		--background: transparent;
	}

	ion-label {
		@media (max-width: 640px) {
			font-size: 12px !important;
		}
	}
</style>
