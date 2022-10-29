<template>
	<router-link
		:to="`/admin/school/institutions/${department.institutionId}/faculties/${department.facultyId}/departments/${department.id}`"
		class="card-sm card-padding">
		<span class="uppercase">{{ department.name }}</span>
	</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { DepartmentEntity } from '@modules/school'

export default defineComponent({
	name: 'AdminDepartmentListCard',
	props: {
		department: {
			type: DepartmentEntity,
			required: true
		}
	}
})
</script>
