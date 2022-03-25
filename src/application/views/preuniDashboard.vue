<template>
	<DashboardLayout>
		<div class="md:p-4 flex flex-col gap-4 md:gap-6 ">
			<StatusBar v-if="isLoggedIn" />
			<ExamTab active="test"/>
			<ExamDetails class="border-bottom-line"/>
			<StudyMaterial class="border-bottom-line"/>
			<QnA class=""/>
		
	
		
		</div>
	</DashboardLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import StatusBar from '@app/components/dashboard/StatusBar.vue'
import { useAuth } from '@app/composable/auth/auth'
import StudyMaterial from '../components/dashboard/StudyMaterial.vue'
import QnA from '../components/dashboard/QnA.vue'
import ExamTab from '../components/dashboard/ExamTab.vue'
import ExamDetails from '../components/dashboard/ExamDetails.vue'

export default defineComponent({
	name: 'Dashboard',
	displayName: 'Dashboard',
	components: {
		DashboardLayout,
		StatusBar,
		StudyMaterial,
		QnA,
		ExamTab,
		ExamDetails
	},
	setup () {
		const { isLoggedIn } = useAuth()
		return { isLoggedIn }
	}
})
</script>
