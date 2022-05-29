<template>
	<div>
		<div class="md:bg-new_gray w-full lg:w-8/12 mx-auto lg:mt-6">
			<div class="bg-white rounded-xl p-4 flex flex-col">
				<div class="flex flex-col justify-start items-start">
					<IonText class="text-heading font-bold mb-2 hidden md:block">
						Create a flashcard set
					</IonText>
					<IonInput v-model="factory.title"
						class="w-full"
						mode="md"
						placeholder="Enter a title "
						show-cancel-button="never"
					/>
					<DisplayError :error="factory.errors.title" />
				</div>
			</div>
		</div>
		<div class="lg:w-8/12 w-full  mx-auto mt-4  flex flex-col gap-4">
			<IonReorderGroup class="flex flex-col gap-4 px-4 md:p-0" disabled="true">
				<IonReorder v-for="(card, index) in factory.questions" :key="index"
					class="flex flex-col bg-white p-4 rounded-xl border border-new_gray ">
					<div class="flex w-full items-center justify-between mb-1">
						<IonText class="text-secondaryText font-normal"> {{ index + 1 }}</IonText>
						<div class="flex" @click="factory.removeQuestion(index)">
							<IonIcon :icon='trashBinOutline' class="text-red" />
						</div>
					</div>

					<div class="flex w-full md:flex-row flex-col md:gap-4 gap-1">
						<IonTextarea v-model="card.question"
							class="ion-bg-white border border-faded_gray ion-rounded-xl rounded-xl w-full h-16"
							placeholder="Enter question or word"
						/>
						<IonTextarea v-model="card.answer"
							class="ion-bg-white border border-faded_gray ion-rounded-xl rounded-xl w-full"
							placeholder="Enter answer or definition"
						/>
					</div>
				</IonReorder>
			</IonReorderGroup>
			<DisplayError :error="factory.errors.set" />

			<div
				class="w-full flex bg-white items-center p-4 rounded-xl text-lg text-icon_inactive justify-center font-bold cursor-pointer"
				@click="factory.addQuestion"
			>
				<IonIcon :icon="addOutline" class="text-heading3" />
				<IonText>ADD CARD</IonText>
			</div>

			<div class="w-full flex justify-end mb-8 px-4">
				<IonButton :disabled="loading || !factory.valid" class="btn-primary w-full md:w-auto"
					@click="submit()">
					<slot name="buttonTitle">Submit</slot>
				</IonButton>
			</div>
		</div>

		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { addOutline, closeOutline, trashBinOutline } from 'ionicons/icons'
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
	setup () {
		return { closeOutline, trashBinOutline, addOutline }
	}
})
</script>

<style lang="scss" scoped>
	ion-textarea {
		height: 104px;
	}

	.ion-item-transparent {
		--background: transparent;
	}

	ion-input {
		--background: #{$color-newGray};
	}

	ion-label {
		@media (max-width: 640px) {
			font-size: 12px !important;
		}
	}
</style>
