<template>
	<form class="flex justify-between mb-4" @submit.prevent="submit">
		<ion-input v-model="factory.name" class="bg-white border border-faded_gray !p-0 w-full"
			placeholder="Add a subject" />
		<ion-button :disabled="loading || !factory.valid" class="btn-primary" type="submit">
			<slot name="buttonText">Submit</slot>
		</ion-button>
		<PageLoading v-if="loading" />
	</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { SubjectFactory } from '@modules/questions'

export default defineComponent({
	name: 'SubjectForm',
	props: {
		factory: {
			type: SubjectFactory,
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
		}
	}
})
</script>

<style scoped>
	ion-button.btn-primary {
		--padding-top: 1.7rem !important;
		--padding-bottom: 1.7rem !important;
		--border-radius: 0 0.75rem 0.75rem 0 !important;
	}

	ion-input {
		--padding-top: 1rem !important;
		--padding-bottom: 1rem !important;
		border-bottom-right-radius: 0 !important;
		border-top-right-radius: 0 !important;
	}
</style>
