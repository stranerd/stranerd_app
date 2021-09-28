<template>
	<div class="d-flex flex-column gap-1">
		<UserReportCard v-for="report in reports" :key="report.hash" :report="report" />
		<div v-if="hasMore" class="text-center py-2 text-18 text-primary-dark">
			<a @click.prevent="fetchOlderReports">Load More</a>
		</div>
		<DisplayWarning v-if="!loading && !error && reports.length === 0" message="No reports found." />
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserReportCard from '@app/components/reports/users/UserReportCard.vue'
import { useReportsList } from '@/application/hooks/reports/users'

export default defineComponent({
	name: 'UserReportsList',
	components: { UserReportCard },
	setup () {
		const { error, loading, hasMore, reports, fetchOlderReports } = useReportsList()
		return { error, loading, hasMore, reports, fetchOlderReports }
	}
})
</script>
