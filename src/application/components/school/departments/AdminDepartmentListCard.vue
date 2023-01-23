<template>
	<router-link
		:to="`/admin/school/institutions/${department.institutionId}/faculties/${department.facultyId}/departments/${department.id}`"
		class="card-sm card-padding">
		<span class="uppercase">{{ department.name }}</span>
	</router-link>
</template>

<script lang="ts" setup>
import { DepartmentEntity } from '@modules/school'

defineProps({
	department: {
		type: DepartmentEntity,
		required: true
	}
})
</script>
