<template>
	<div class="flex flex-col gap-4">
		<div class="flex flex-col gap-2">
			<IonLabel class="text-lg">Title</IonLabel>
			<IonInput v-model="factory.title" class="w-full" placeholder="Enter a title" show-cancel-button="never" />
			<DisplayError :error="factory.errors.title" />
		</div>

		<div class="flex flex-col gap-2">
			<IonLabel class="text-lg">Cards ({{ factory.questions.length }})</IonLabel>
			<IonReorderGroup :disabled="true" class="flex flex-col gap-4">
				<IonReorder v-for="(card, index) in factory.cards" :key="index"
					class="flex flex-col p-4 gap-2 rounded-lg border border-itemBg">
					<div class="flex w-full items-center justify-between">
						<IonText class="text-secondaryText">{{ index + 1 }}</IonText>
						<IonIcon :icon="trashBinOutline" class="text-danger" @click="factory.removeQuestion(index)" />
					</div>
					<IonInput v-model="card.question" placeholder="Enter question or word" />
					<IonInput v-model="card.answer" placeholder="Enter answer or definition" />
				</IonReorder>
				<a class="flex items-center card-sm card-padding text-primaryBg justify-center font-bold"
					@click="factory.addQuestion">
					<IonIcon :icon="addOutline" />
					<IonText>ADD CARD</IonText>
				</a>
			</IonReorderGroup>
			<DisplayError :error="factory.errors.set" />
		</div>

		<div class="flex-1" />

		<IonButton :disabled="loading || !factory.valid" class="btn-primary w-full" @click="submit()">
			<SpinLoading v-if="loading" />
			<slot v-else name="buttonTitle">Submit</slot>
		</IonButton>
	</div>
</template>

<script lang="ts" setup>
import { FlashCardFactory } from '@modules/study'
import { addOutline, trashBinOutline } from 'ionicons/icons'
import { PropType } from 'vue'

defineProps({
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
	}
})
</script>
