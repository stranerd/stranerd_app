<template>
	<Modal :close="close">
		<template v-slot:title>
			Edit a department
		</template>
		<DepartmentForm
			:disabled="{}"
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

<script lang="ts">
import { defineComponent } from 'vue'
import DepartmentForm from '@app/components/school/departments/DepartmentForm.vue'
import { useEditDepartment } from '@app/composable/school/departments'

export default defineComponent({
	name: 'EditDepartmentModal',
	components: { DepartmentForm },
	props: {
		close: {
			type: Function,
			required: true
		}
	},
	setup () {
		const { factory, error, loading, editDepartment } = useEditDepartment()
		return { factory, error, loading, editDepartment }
	}
})
</script>
