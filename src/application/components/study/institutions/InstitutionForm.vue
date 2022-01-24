<template>
	<form @submit.prevent="submit">
		<div class="mb-8">
			<IonLabel>Name</IonLabel>
			<IonInput v-model="factory.name" class="mb-2" placeholder="Enter Institution Name" />
			<DisplayError :error="factory.errors.name" />
		</div>

		<div class="mb-8 flex items-center">
			<IonToggle id="isGateway" v-model="factory.isGateway" />
			<IonLabel for="isGateway">
				{{ factory.isGateway ? 'Is a gateway body like JAMB, WAEC, SAT' : 'Is a tertiary institution' }}
			</IonLabel>
		</div>

		<div class="flex w-full mt-8 items-center gap-6">
			<ion-button :disabled="loading || !factory.valid" class="ml-auto btn-primary" type="submit">
				<slot name="buttonText">Submit</slot>
			</ion-button>
		</div>

		<PageLoading v-if="loading" />
	</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { InstitutionFactory } from '@modules/study'
import { IonLabel, IonToggle } from '@ionic/vue'

export default defineComponent({
	name: 'InstitutionForm',
	components: { IonToggle, IonLabel },
	props: {
		factory: {
			type: InstitutionFactory,
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

<style lang="scss" scoped>
	ion-input, ion-textarea {
		background-color: $color-newGray;
		border-radius: 0.25rem !important;
	}

	ion-label {
		font-size: 1.2rem;
		font-weight: 500;
	}
</style>
