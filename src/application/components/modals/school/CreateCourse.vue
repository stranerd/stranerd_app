<template>
	<Modal :close="close">
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
import CourseForm from '@app/components/school/courses/CourseForm.vue'
import { useCreateCourse } from '@app/composable/school/courses'

export default defineComponent({
	name: 'CreateCourseModal',
	components: { CourseForm },
	props: {
		close: {
			type: Function,
			required: true
		}
	},
	setup () {
		const { factory, error, loading, createCourse } = useCreateCourse()
		return { factory, error, loading, createCourse }
	}
})
</script>
