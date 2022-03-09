<template>
	<div>

		<div class="text-body md:bg-new_gray w-full lg:w-8/12 mx-auto lg:mt-6">
			<div class="bg-white rounded-xl p-4 flex flex-col">
				<div class="flex flex-col justify-start items-start">
					<ion-text class="heading font-bold mb-2 hidden md:block">
						Create a flashcard set
					</ion-text>
					<ion-input v-model="factory.title"
						class="w-full"
						mode="md"
						placeholder="Enter a title "
						show-cancel-button="never"
					></ion-input>

					<DisplayError :error="factory.errors.title" />

				</div>
			</div>
		</div>
		<!-- <div
			class="bg-primary w-full h-auto flex flex-col justify-between items-center md:pt-12 pt-4 pb-1 md:rounded-none rounded-b-xl gap-4">
			<ion-text class="heading lg:text-2xl font-bold text-white text-center mb-2 hidden md:block">
				{{ title }}
			</ion-text>
			<div class="lg:w-8/12 w-full flex flex-col gap-4 px-4">
			
			</div>
		</div> -->



		<div class="lg:w-8/12 w-full  mx-auto mt-4  flex flex-col gap-4">
			<ion-reorder-group class="flex flex-col gap-4 px-4 md:p-0" disabled="true">
				<ion-reorder v-for="(card, index) in factory.questions" :key="index"
					class="flex flex-col bg-white p-4 rounded-xl border border-new_gray ">
					<div class="flex w-full items-center justify-between">
						<ion-text class="text-main_dark font-normal"> {{ index + 1 }}</ion-text>
						<div class="flex" @click="factory.removeQuestion(index)">
							<ion-icon :icon='trashOutline' class="text-red" />
						</div>
					</div>

					<div class="flex w-full md:flex-row flex-col md:gap-4 gap-1 md:h-auto">
						<ion-textarea v-model="card.question"
							class="ion-bg-white border border-faded_gray ion-rounded-xl rounded-xl w-full h-16"
							placeholder="Enter question or word"
						/>
						<ion-textarea v-model="card.answer"
							class="ion-bg-white border border-faded_gray ion-rounded-xl rounded-xl w-full"
							placeholder="Enter answer or definition"
						/>
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

			<div class="w-full flex justify-end mb-8 px-4">
				<ion-button :disabled="loading || !factory.valid" class="btn-primary btn-lg !pr-0 w-full md:w-auto" @click="submit()">
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
	ion-textarea{
		height: 104px;
	}
	.ion-item-transparent {
		--background: transparent;
	}
	ion-input{
		--background: rgba(242, 243, 245, 1);
	}

	ion-label {
		@media (max-width: 640px) {
			font-size: 12px !important;
		}
	}
</style>
