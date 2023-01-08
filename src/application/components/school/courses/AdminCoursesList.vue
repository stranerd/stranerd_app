<template>
	<div>
		<EmptyState v-if="!loading && !error && courses.length === 0" info="No courses found." />
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
	departmentId: {
		type: String,
		required: true
	}
})

const { loading, error, courses: allCourses, fetchDepartmentCourses } = useCourseList()
onMounted(async () => {
	await fetchDepartmentCourses(props.departmentId)
})
const courses = computed(() => allCourses.value.filter((c) => c.departmentId === props.departmentId))
</script>
