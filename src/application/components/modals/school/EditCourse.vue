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

<script lang="ts" setup>
import CourseForm from '@app/components/school/courses/CourseForm.vue'
import { useEditCourse } from '@app/composable/school/courses'
import { PropType } from 'vue'

defineProps({
	close: {
		type: Function as PropType<() => void>,
		required: true
	}
})

const { factory, error, loading, editCourse } = useEditCourse()
</script>
