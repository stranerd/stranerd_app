<template>
	<div>
		<EmptyState v-if="!loading && !error && courses.length === 0" info="No courses found." />
		<div class="flex flex-col gap-4">
			<CourseListCard v-for="course in courses" :key="course.hash" :course="course" />
		</div>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import CourseListCard from '@app/components/school/courses/AdminCourseListCard.vue'
import { useCourseList } from '@app/composable/school/courses'

export default defineComponent({
	name: 'AdminCoursesList',
	props: {
		departmentId: {
			type: String,
			required: true
		}
	},
	components: { CourseListCard },
	setup (props) {
		const { loading, error, courses: allCourses, fetchCourses } = useCourseList()
		onMounted(async () => {
			await fetchCourses(props.departmentId)
		})
		const courses = computed(() => allCourses.value.filter((c) => c.departmentId === props.departmentId))
		return { loading, error, courses }
	}
})
</script>
