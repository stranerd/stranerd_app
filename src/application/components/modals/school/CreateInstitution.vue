<template>
	<Modal>
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

<script lang="ts">
import { defineComponent } from 'vue'
import InstitutionForm from '@app/components/school/institutions/InstitutionForm.vue'
import { useCreateInstitution } from '@app/composable/school/institutions'

export default defineComponent({
	name: 'CreateInstitutionModal',
	components: { InstitutionForm },
	setup () {
		const { factory, error, loading, createInstitution } = useCreateInstitution()
		return { factory, error, loading, createInstitution }
	}
})
</script>
