<template>
	<form @submit.prevent="submit">
		<div class="mb-8">
			<label>Name</label>
			<IonInput v-model="factory.name" class="mb-2" placeholder="Enter Institution Name" />
			<DisplayError :error="factory.errors.name" />
		</div>

		<div class="mb-8 flex items-center">
			<IonToggle id="isGateway" v-model="factory.isGateway" />
			<label for="isGateway">
				{{ factory.isGateway ? 'Is a gateway body like JAMB, WAEC, SAT' : 'Is a tertiary institution' }}
			</label>
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
import { InstitutionFactory } from '@modules/school'

export default defineComponent({
	name: 'InstitutionForm',
	props: {
		factory: {
			type: InstitutionFactory,
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

<style lang="scss" scoped>
	ion-input, ion-textarea {
		background-color: $color-newGray;
		border-radius: 0.25rem !important;
	}

	label {
		font-size: 1.2rem;
		font-weight: 500;
	}
</style>
