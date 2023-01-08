<template>
	<Modal :close="close">
		<template v-slot:title>
			Edit an institution
		</template>
		<InstitutionForm
			:error="error"
			:factory="factory"
			:loading="loading"
			:submit="editInstitution"
		>
			<template v-slot:buttonText>
				Update Institution
			</template>
		</InstitutionForm>
	</Modal>
</template>

<script lang="ts" setup>
import InstitutionForm from '@app/components/school/institutions/InstitutionForm.vue'
import { useEditInstitution } from '@app/composable/school/institutions'

defineProps({
	close: {
		type: Function,
		required: true
	}
})

const { factory, error, loading, editInstitution } = useEditInstitution()
</script>
