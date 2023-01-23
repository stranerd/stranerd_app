<template>
	<span class="capitalize">
		<slot :department="department">
			{{ department?.name ?? 'Department' }}
		</slot>
	</span>
</template>

<script lang="ts" setup>
import { useDepartment } from '@app/composable/school/departments'

const props = defineProps({
	departmentId: {
		type: String,
		required: true
	},
	facultyId: {
		type: String,
		required: true
	}
})

const { department } = useDepartment(props.facultyId, props.departmentId)
</script>
