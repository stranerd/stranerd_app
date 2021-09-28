<template>
	<AnswerReportsList />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AnswerReportsList from '@/application/components/reports/answers/AnswerReportsList.vue'

export default defineComponent({
	name: 'AnswerReportsAdminPage',
	components: { AnswerReportsList },
	// setup () {

	// },
	head: {}
})
</script>
