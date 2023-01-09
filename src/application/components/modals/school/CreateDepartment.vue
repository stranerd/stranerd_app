<template>
	<Modal :close="close">
		<template v-slot:title>
			Create a department
		</template>
		<DepartmentForm
			:error="error"
			:factory="factory"
			:loading="loading"
			:submit="createDepartment"
		>
			<template v-slot:buttonText>
				Create Department
			</template>
		</DepartmentForm>
	</Modal>
</template>

<script lang="ts" setup>
import DepartmentForm from '@app/components/school/departments/DepartmentForm.vue'
import { useCreateDepartment } from '@app/composable/school/departments'
import { PropType } from 'vue'

defineProps({
	close: {
		type: Function as PropType<() => void>,
		required: true
	}
})

const { factory, error, loading, createDepartment } = useCreateDepartment()
</script>
