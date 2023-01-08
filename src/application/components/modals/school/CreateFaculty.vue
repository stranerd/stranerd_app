<template>
	<Modal :close="close">
		<template v-slot:title>
			Create a faculty
		</template>
		<FacultyForm
			:error="error"
			:factory="factory"
			:loading="loading"
			:submit="createFaculty"
		>
			<template v-slot:buttonText>
				Create Faculty
			</template>
		</FacultyForm>
	</Modal>
</template>

<script lang="ts" setup>
import FacultyForm from '@app/components/school/faculties/FacultyForm.vue'
import { useCreateFaculty } from '@app/composable/school/faculties'

defineProps({
	close: {
		type: Function,
		required: true
	}
})

const { factory, error, loading, createFaculty } = useCreateFaculty()
</script>
