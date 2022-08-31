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

<script lang="ts">
import { defineComponent } from 'vue'
import DepartmentForm from '@app/components/school/departments/DepartmentForm.vue'
import { useCreateDepartment } from '@app/composable/school/departments'

export default defineComponent({
	name: 'CreateDepartmentModal',
	components: { DepartmentForm },
	props: {
		close: {
			type: Function,
			required: true
		}
	},
	setup () {
		const { factory, error, loading, createDepartment } = useCreateDepartment()
		return { factory, error, loading, createDepartment }
	}
})
</script>
