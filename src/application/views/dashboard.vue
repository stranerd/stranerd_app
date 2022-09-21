<template>
	<DefaultLayout>
		<StudentDashboard v-if="false"/>
		<TeacherDashboard v-else/>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import { generateMiddlewares } from '@app/middlewares'
import StudentDashboard from '@app/components/student/dashboard.vue'
import TeacherDashboard from '@app/components/teacher/dashboard.vue'
export default defineComponent({
	name: 'Dashboard',
	beforeRouteEnter: generateMiddlewares(['isAuthenticated']),
	components:{StudentDashboard, TeacherDashboard},
	setup () {
		useRouteMeta('Home', {})
	
		return {
		
		}
	}
})
</script>
