<template>
	<span class="capitalize">
		<slot :course="course">
			{{ course?.name ?? '' }}
		</slot>
	</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCourse } from '@app/composable/school/courses'

export default defineComponent({
	name: 'Course',
	props: {
		courseId: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { course } = useCourse(props.courseId)
		return { course }
	}
})
</script>
