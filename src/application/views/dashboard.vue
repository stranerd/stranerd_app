<template>
	<DashboardLayout>
		<div>
			<RecentQuestions class="mb-10" />
			<RecentTransaction />
		</div>
	</DashboardLayout>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import DashboardLayout from '@root/application/layouts/Dashboard.vue'
import RecentQuestions from '@app/components/dashboard/RecentQuestions.vue'
import RecentTransaction from '@app/components/dashboard/RecentTransactions.vue'

export default defineComponent({
	name: 'Dashboard',
	components: {
		DashboardLayout,
		RecentQuestions,
		RecentTransaction
	}
})
</script>
