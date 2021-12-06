<template>
	<DashboardLayout>
		<div class="pl-6 lg:pl-2 pr-1.5 pt-8">
			<StatusBar/>
			<!-- <RecentQuestions /> -->
			<!-- <ContinueStudy class="mt-8" /> -->
			<!-- <MyStudy class="mt-8" /> -->
			<StudyTools class="mt-20" />
		</div>
	</DashboardLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import RecentQuestions from '@app/components/dashboard/RecentQuestions.vue'
import ContinueStudy from '@app/components/dashboard/ContinueStudy.vue'
import MyStudy from '@app/components/study/MyStudy.vue'
import StudyTools from '../components/study/studyTools/index.vue'
import StatusBar from '../components/dashboard/StatusBar.vue'

export default defineComponent({
	name: 'Dashboard',
	components: {
		DashboardLayout,
		// RecentQuestions,
		// ContinueStudy,
		// MyStudy,
		StudyTools,
		StatusBar
	}
})
</script>
