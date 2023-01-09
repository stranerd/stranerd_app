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

<script lang="ts" setup>
import CourseForm from '@app/components/school/courses/CourseForm.vue'
import { useCreateCourse } from '@app/composable/school/courses'
import { PropType } from 'vue'

defineProps({
	close: {
		type: Function as PropType<() => void>,
		required: true
	}
})

const { factory, error, loading, createCourse } = useCreateCourse()
</script>
