<template>
	<div class="d-flex flex-column gap-1">
		<QuestionReportCard v-for="report in reports" :key="report.hash" :report="report" />
		<div v-if="hasMore" class="text-center py-2 text-18 text-primary-dark">
			<a @click.prevent="fetchOlderReports">Load More</a>
		</div>
		<DisplayWarning v-if="!loading && !error && reports.length === 0" message="No reports found." />
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import QuestionReportCard from '@app/components/reports/questions/QuestionReportCard.vue'
import { useReportsList } from '@app/hooks/reports/questions'

export default defineComponent({
	name: 'QuestionReportsList',
	components: { QuestionReportCard },
	setup () {
		const { error, loading, hasMore, reports, fetchOlderReports } = useReportsList()
		return { error, loading, hasMore, reports, fetchOlderReports }
	}
})
</script>
