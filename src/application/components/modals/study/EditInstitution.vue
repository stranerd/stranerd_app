<template>
	<Modal>
		<template v-slot:title>
			Edit an institution body
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
import InstitutionForm from '@app/components/study/institutions/InstitutionForm.vue'
import { useEditInstitution } from '@app/composable/study/institutions'

export default defineComponent({
	name: 'EditInstitutionModal',
	setup () {
		const { factory, error, loading, editInstitution } = useEditInstitution()
		return { factory, error, loading, editInstitution }
	},
	components: { InstitutionForm }
})
</script>
