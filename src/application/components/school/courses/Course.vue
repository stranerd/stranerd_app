<template>
	<span class="capitalize">
		<slot :course="course">
			{{ course?.name ?? '' }}
		</slot>
	</span>
</template>

<script lang="ts" setup>
import { useCourse } from '@app/composable/school/courses'

const props = defineProps({
	courseId: {
		type: String,
		required: true
	}
})

const { course } = useCourse(props.courseId)
</script>
