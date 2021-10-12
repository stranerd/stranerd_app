<template>
	<div class="flex flex-col gap-1">
		<AnswerReportCard v-for="report in reports" :key="report.hash" :report="report" />
		<div v-if="hasMore" class="text-center py-2 text-18 text-primaryDark">
			<a @click.prevent="fetchOlderReports">Load More</a>
		</div>
		<DisplayWarning v-if="!loading && !error && reports.length === 0" message="No reports found." />
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AnswerReportCard from '@app/components/reports/answers/AnswerReportCard.vue'
import { useReportsList } from '@/application/hooks/reports/answers'

export default defineComponent({
	name: 'AnswerReportsList',
	components: { AnswerReportCard },
	setup () {
		const { error, loading, hasMore, reports, fetchOlderReports } = useReportsList()
		return { error, loading, hasMore, reports, fetchOlderReports }
	}
})
</script>
