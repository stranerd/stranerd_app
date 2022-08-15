<template>
	<DefaultLayout>
		<div></div>
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import { generateMiddlewares } from '@app/middlewares'
import { useRoute } from 'vue-router'
import { useCourse } from '@app/composable/school/courses'

export default defineComponent({
	name: 'StudyPrepsCoursesCourseId',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		const route = useRoute()
		const { courseId } = route.params
		const { course } = useCourse(courseId as string)
		useRouteMeta(computed(() => course.value?.name ?? 'Course'), { back: true })
	}
})
</script>
