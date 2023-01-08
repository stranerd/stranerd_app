<template>
	<router-link :to="`/admin/school/institutions/${faculty.institutionId}/faculties/${faculty.id}`"
		class="card-sm card-padding">
		<span class="uppercase">{{ faculty.name }}</span>
	</router-link>
</template>

<script lang="ts" setup>
import { FacultyEntity } from '@modules/school'

defineProps({
	faculty: {
		type: FacultyEntity,
		required: true
	}
})
</script>
