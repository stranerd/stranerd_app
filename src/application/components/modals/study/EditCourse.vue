<template>
	<Modal>
		<template v-slot:title>
			Edit a course
		</template>
		<CourseForm
			:error="error"
			:factory="factory"
			:loading="loading"
			:submit="editCourse"
		>
			<template v-slot:buttonText>
				Update Course
			</template>
		</CourseForm>
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CourseForm from '@app/components/study/courses/CourseForm.vue'
import { useEditCourse } from '@app/composable/study/courses'

export default defineComponent({
	name: 'EditCourseModal',
	components: { CourseForm },
	setup () {
		const { factory, error, loading, editCourse } = useEditCourse()
		return { factory, error, loading, editCourse }
	}
})
</script>
