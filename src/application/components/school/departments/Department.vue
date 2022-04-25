<template>
	<span class="uppercase">
		<slot :department="department">
			{{ department?.name ?? '' }}
		</slot>
	</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useDepartment } from '@app/composable/school/departments'

export default defineComponent({
	name: 'Department',
	props: {
		departmentId: {
			type: String,
			required: true
		},
		facultyId: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { department } = useDepartment(props.facultyId, props.departmentId)
		return { department }
	}
})
</script>
