<template>
	<form class="flex flex-col gap-6" @submit.prevent="submit">
		<div class="flex flex-col gap-2">
			<IonLabel>Title</IonLabel>
			<IonInput v-model="factory.title"
				:class="{'valid': factory.isValid('title'), 'invalid': factory.errors.title}"
				:disabled="disabled.title" class="w-full" placeholder="Input title" />
			<DisplayError :error="factory.errors.title" />
		</div>

		<div v-if="!factory.parent" class="flex flex-col gap-2">
			<IonLabel>Type</IonLabel>
			<IonSelect v-model="factory.type" :disabled="disabled.type" class="capitalize w-full"
				interface="action-sheet" placeholder="Select tag type">
				<IonSelectOption v-for="type in TagTypes" :key="type" :value="type" class="capitalize">
					{{ type }}
				</IonSelectOption>
			</IonSelect>
		</div>

		<IonButton :disabled="loading || !factory.valid" class="w-full btn-primary" type="submit">
			<SpinLoading v-if="loading" />
			<slot v-else name="buttonText">Submit</slot>
		</IonButton>
	</form>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { TagFactory, TagTypes } from '@modules/interactions'

defineProps({
	factory: {
		type: Object as PropType<TagFactory>,
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
})
</script>
