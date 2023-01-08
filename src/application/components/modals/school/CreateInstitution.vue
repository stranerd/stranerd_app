<template>
	<Modal :close="close">
		<template v-slot:title>
			Create an institution
		</template>
		<InstitutionForm
			:error="error"
			:factory="factory"
			:loading="loading"
			:submit="createInstitution"
		>
			<template v-slot:buttonText>
				Create Institution
			</template>
		</InstitutionForm>
	</Modal>
</template>

<script lang="ts" setup>
import InstitutionForm from '@app/components/school/institutions/InstitutionForm.vue'
import { useCreateInstitution } from '@app/composable/school/institutions'

defineProps({
	close: {
		type: Function,
		required: true
	}
})

const { factory, error, loading, createInstitution } = useCreateInstitution()
</script>
