<template>
	<form @submit.prevent="submit">
		<div class="mb-8">
			<label>Name</label>
			<IonInput v-model="factory.name" class="mb-2" placeholder="Enter Faculty Name" />
			<DisplayError :error="factory.errors.name" />
		</div>

		<div class="flex w-full mt-8 items-center gap-6">
			<IonButton :disabled="loading || !factory.valid" class="ml-auto btn-primary" type="submit">
				<slot name="buttonText">Submit</slot>
			</IonButton>
		</div>

		<PageLoading v-if="loading" />
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { FacultyFactory } from '@modules/school'

export default defineComponent({
	name: 'FacultyForm',
	props: {
		factory: {
			type: FacultyFactory,
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
	}
})
</script>
