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

<script lang="ts">
import { defineComponent } from 'vue'
import InstitutionForm from '@app/components/school/institutions/InstitutionForm.vue'
import { useEditInstitution } from '@app/composable/school/institutions'

export default defineComponent({
	name: 'EditInstitutionModal',
	components: { InstitutionForm },
	props: {
		close: {
			type: Function,
			required: true
		}
	},
	setup () {
		const { factory, error, loading, editInstitution } = useEditInstitution()
		return { factory, error, loading, editInstitution }
	}
})
</script>
