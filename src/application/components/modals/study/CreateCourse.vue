<template>
	<Modal>
		<template v-slot:title>
			Create a course
		</template>
		<CourseForm
			:error="error"
			:factory="factory"
			:loading="loading"
			:submit="createCourse"
		>
			<template v-slot:buttonText>
				Create Course
			</template>
		</CourseForm>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CourseForm from '@app/components/study/courses/CourseForm.vue'
import { useCreateCourse } from '@app/composable/study/courses'

export default defineComponent({
	name: 'CreateCourseModal',
	setup () {
		const { factory, error, loading, createCourse } = useCreateCourse()
		return { factory, error, loading, createCourse }
	},
	components: { CourseForm }
})
</script>
