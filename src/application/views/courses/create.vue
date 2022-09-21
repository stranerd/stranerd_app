<template>
	<DefaultLayout :hideBottom="true" :hideFab="true">
		<span>Create a Course</span>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'


export default defineComponent({
	name: 'CreateCourses',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	setup () {
		useRouteMeta('Create a Course', { back: true })

		return {  }
	}
})
</script>
