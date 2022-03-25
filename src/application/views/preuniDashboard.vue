<template>
	<DashboardLayout>
		<div class="md:p-4 flex flex-col gap-4 md:gap-6 ">
			<StatusBar v-if="isLoggedIn" />
			<ExamTab active="test"/>
			<ExamDetails class="border-bottom-line"/>
			<ProgressView class="border-bottom-line"/>
			<Testprep class="border-bottom-line"/>
			<History/>
		
	
		
		</div>
	</DashboardLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import StatusBar from '@app/components/dashboard/StatusBar.vue'
import { useAuth } from '@app/composable/auth/auth'
import ExamTab from '../components/dashboard/ExamTab.vue'
import ExamDetails from '../components/dashboard/ExamDetails.vue'
import Testprep from '../components/dashboard/Testprep.vue'
import ProgressView from '../components/dashboard/ProgressView.vue'
import History from '../components/dashboard/History.vue'

export default defineComponent({
	name: 'Dashboard',
	displayName: 'Dashboard',
	components: {
		DashboardLayout,
		StatusBar,
		ExamTab,
		ExamDetails,
		Testprep,
		ProgressView,
		History
	},
	setup () {
		const { isLoggedIn } = useAuth()
		return { isLoggedIn }
	}
})
</script>
