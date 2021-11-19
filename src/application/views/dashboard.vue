<template>
	<DashboardLayout>
		<div class="pl-3 pr-1.5 pt-2">
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
