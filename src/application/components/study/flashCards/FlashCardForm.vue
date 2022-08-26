<template>
	<div>
		<div class="flex flex-col gap-4 p-4">
			<IonInput v-model="factory.title" class="w-full" placeholder="Enter a title" show-cancel-button="never" />
			<IonReorderGroup class="flex flex-col gap-4" disabled="true">
				<IonReorder v-for="(card, index) in factory.questions" :key="index"
					class="flex flex-col p-4 gap-2 rounded-lg border border-itemBg">
					<div class="flex w-full items-center justify-between">
						<IonText class="text-secondaryText">{{ index + 1 }}</IonText>
						<IonIcon :icon="trashBinOutline" class="text-danger" @click="factory.removeQuestion(index)" />
					</div>
					<IonInput v-model="card.question" placeholder="Enter question or word" />
					<IonInput v-model="card.answer" placeholder="Enter answer or definition" />
				</IonReorder>
			</IonReorderGroup>
			<DisplayError :error="factory.errors.set" />

			<div
				class="flex items-center border border-itemBg p-2 rounded-lg justify-center font-bold cursor-pointer"
				@click="factory.addQuestion">
				<IonIcon :icon="addOutline" />
				<IonText>ADD CARD</IonText>
			</div>

			<IonButton :disabled="loading || !factory.valid" class="btn-primary w-full"
				@click="submit()">
				<SpinLoading v-if="loading" />
				<slot v-else name="buttonTitle">Submit</slot>
			</IonButton>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
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
