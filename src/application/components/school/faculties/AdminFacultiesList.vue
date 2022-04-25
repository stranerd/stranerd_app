<template>
	<div>
		<EmptyState v-if="!loading && !error && faculties.length === 0" info="No faculties found." />
		<div class="flex flex-col gap-4">
			<FacultyListCard v-for="faculty in faculties" :key="faculty.hash" :faculty="faculty" />
		</div>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import FacultyListCard from '@app/components/school/faculties/AdminFacultyListCard.vue'
import { useFacultyList } from '@app/composable/school/faculties'

export default defineComponent({
	name: 'AdminFacultiesList',
	props: {
		institutionId: {
			type: String,
			required: true
		}
	},
	components: { FacultyListCard },
	setup (props) {
		const { loading, error, faculties, fetchFaculties } = useFacultyList()
		onMounted(async () => {
			await fetchFaculties(props.institutionId)
		})
		return { loading, error, faculties }
	}
})
</script>
