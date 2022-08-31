<template>
	<Modal :close="close">
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
import CourseForm from '@app/components/school/courses/CourseForm.vue'
import { useEditCourse } from '@app/composable/school/courses'

export default defineComponent({
	name: 'EditCourseModal',
	components: { CourseForm },
	props: {
		close: {
			type: Function,
			required: true
		}
	},
	setup () {
		const { factory, error, loading, editCourse } = useEditCourse()
		return { factory, error, loading, editCourse }
	}
})
</script>
