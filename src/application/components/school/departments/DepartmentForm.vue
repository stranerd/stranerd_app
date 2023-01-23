<template>
	<form class="flex flex-col gap-6" @submit.prevent="submit">
		<div class="flex flex-col gap-2">
			<IonLabel>Name</IonLabel>
			<IonInput v-model="factory.name" :disabled="disabled.name" placeholder="Enter Department Name" />
			<DisplayError :error="factory.errors.name" />
		</div>

		<IonButton :disabled="loading || !factory.valid" class="w-full btn-primary" type="submit">
			<SpinLoading v-if="loading" />
			<slot v-else name="buttonText">Submit</slot>
		</IonButton>
	</form>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { DepartmentFactory } from '@modules/school'

defineProps({
	factory: {
		type: DepartmentFactory,
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
