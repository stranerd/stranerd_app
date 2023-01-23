<template>
	<Modal :close="close">
		<template v-slot:title>
			Edit a faculty
		</template>
		<FacultyForm
			:error="error"
			:factory="factory"
			:loading="loading"
			:submit="editFaculty"
		>
			<template v-slot:buttonText>
				Update Faculty
			</template>
		</FacultyForm>
	</Modal>
</template>

<script lang="ts" setup>
import FacultyForm from '@app/components/school/faculties/FacultyForm.vue'
import { useEditFaculty } from '@app/composable/school/faculties'
import { PropType } from 'vue'

defineProps({
	close: {
		type: Function as PropType<() => void>,
		required: true
	}
})

const { factory, error, loading, editFaculty } = useEditFaculty()
</script>
