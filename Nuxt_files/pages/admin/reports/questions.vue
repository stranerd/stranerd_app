<template>
	<QuestionReportsList />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import QuestionReportsList from '@/application/components/reports/questions/QuestionReportsList.vue'

export default defineComponent({
	name: 'QuestionReportsAdminPage',
	components: { QuestionReportsList },
	// setup () {
	// 	useMeta(() => ({
	// 		title: 'Question Reports | Stranerd'
	// 	}))
	// },
	head: {}
})
</script>
