<template>
	<form @submit.prevent="submit">
		<div class="mb-8">
			<label>Name</label>
			<IonInput v-model="factory.name" class="mb-2" placeholder="Enter Course Name" />
			<DisplayError :error="factory.errors.name" />
		</div>

		<div class="mb-8">
			<label>Institution</label>
			<IonSelect v-model="factory.institutionId" class="capitalize" interface="action-sheet"
				placeholder="Select the institution the course belongs to">
				<IonSelectOption v-for="institution in institutions" :key="institution.hash" :value="institution.id"
					class="capitalize">
					{{ institution.name }}
				</IonSelectOption>
			</IonSelect>
		</div>

		<div class="flex w-full mt-8 items-center gap-6">
			<ion-button :disabled="loading || !factory.valid" class="ml-auto btn-primary" type="submit">
				<slot name="buttonText">Submit</slot>
			</ion-button>
		</div>

		<PageLoading v-if="loading" />
		<PageLoading v-if="institutionLoading" />
	</form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CourseFactory } from '@modules/study'
import { IonSelect, IonSelectOption } from '@ionic/vue'
import { useInstitutionList } from '@app/composable/study/institutions'

export default defineComponent({
	name: 'CourseForm',
	components: { IonSelect, IonSelectOption },
	props: {
		factory: {
			type: CourseFactory,
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
	},
	setup () {
		const { institutions, loading } = useInstitutionList()
		return { institutions, institutionLoading: loading }
	}
})
</script>

<style lang="scss" scoped>
	ion-input, ion-textarea, ion-select {
		background-color: $color-newGray;
		border-radius: 0.25rem !important;
	}

	label {
		font-size: 1.2rem;
		font-weight: 500;
	}
</style>
