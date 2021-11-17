<template>
	<DashboardLayout>
		<div>
			<RecentQuestions />
		</div>
	</DashboardLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@app/layouts/Dashboard.vue'
import RecentQuestions from '@app/components/dashboard/RecentQuestions.vue'

export default defineComponent({
	name: 'Dashboard',
	components: {
		DashboardLayout,
		RecentQuestions
	}
})
</script>
