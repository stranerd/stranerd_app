<template>
	<div>
		<EmptyState v-if="!loading && !error && faculties.length === 0" info="No faculties found." />
		<div class="flex flex-col gap-4">
			<FacultyListCard v-for="faculty in faculties" :key="faculty.hash" :faculty="faculty" />
		</div>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import FacultyListCard from '@app/components/school/faculties/AdminFacultyListCard.vue'
import { useFacultyList } from '@app/composable/school/faculties'

const props = defineProps({
	institutionId: {
		type: String,
		required: true
	}
})

const { loading, error, faculties: allFaculties, fetchFaculties } = useFacultyList()
onMounted(async () => {
	await fetchFaculties(props.institutionId)
})
const faculties = computed(() => allFaculties.value.filter((f) => f.institutionId === props.institutionId))
</script>
