<template>
	<router-link :to="`/admin/school/institutions/${faculty.institutionId}/faculties/${faculty.id}`"
		class="bg-white p-4">
		<span class="uppercase">{{ faculty.name }}</span>
	</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { FacultyEntity } from '@modules/school'

export default defineComponent({
	name: 'AdminFacultyListCard',
	props: {
		faculty: {
			type: FacultyEntity,
			required: true
		}
	}
})
</script>
