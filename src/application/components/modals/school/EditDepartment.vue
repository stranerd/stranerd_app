<template>
	<Modal :close="close">
		<template v-slot:title>
			Edit a department
		</template>
		<DepartmentForm
			:disabled="{ tagId: true }"
			:error="error"
			:factory="factory"
			:loading="loading"
			:submit="editDepartment"
		>
			<template v-slot:buttonText>
				Update Department
			</template>
		</DepartmentForm>
	</Modal>
</template>

<script lang="ts" setup>
import DepartmentForm from '@app/components/school/departments/DepartmentForm.vue'
import { useEditDepartment } from '@app/composable/school/departments'

defineProps({
	close: {
		type: Function,
		required: true
	}
})

const { factory, error, loading, editDepartment } = useEditDepartment()
</script>
