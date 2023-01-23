<template>
	<div>
		<EmptyState v-if="!loading && !error && courses.length === 0" info="No general courses found." />
		<div class="flex flex-col gap-4">
			<CourseListCard v-for="course in courses" :key="course.hash" :course="course" />
		</div>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import CourseListCard from '@app/components/school/courses/AdminCourseListCard.vue'
import { useCourseList } from '@app/composable/school/courses'

const props = defineProps({
	institutionId: {
		type: String,
		required: true
	}
})

const { loading, error, courses: allCourses, fetchInstitutionCourses } = useCourseList()
onMounted(async () => {
	await fetchInstitutionCourses(props.institutionId, true)
})
const courses = computed(() => allCourses.value.filter((c) => c.institutionId === props.institutionId && !c.facultyId))
</script>
