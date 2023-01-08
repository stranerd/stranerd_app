<template>
	<div>
		<EmptyState v-if="!loading && !error && departments.length === 0" info="No departments found." />
		<div class="flex flex-col gap-4">
			<DepartmentListCard v-for="department in departments" :key="department.hash" :department="department" />
		</div>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import DepartmentListCard from '@app/components/school/departments/AdminDepartmentListCard.vue'
import { useDepartmentList } from '@app/composable/school/departments'

const props = defineProps({
	facultyId: {
		type: String,
		required: true
	}
})

const { loading, error, departments: allDepartments, fetchDepartments } = useDepartmentList()
onMounted(async () => {
	await fetchDepartments(props.facultyId)
})
const departments = computed(() => allDepartments.value.filter((d) => d.facultyId === props.facultyId))
</script>
