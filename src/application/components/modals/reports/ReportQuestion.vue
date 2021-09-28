<template>
	<Modal :hide-separator="true" :modal="$attrs.modal">
		<template slot="title">
			Report Question
		</template>
		<ReportForm :error="error" :factory="factory" :loading="loading" :submit="createReport" />
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCreateReport } from '@/application/hooks/reports/questions'
import ReportForm from '@app/components/reports/questions/QuestionReportForm.vue'

export default defineComponent({
	name: 'ReportQuestion',
	components: { ReportForm },
	setup () {
		const { factory, loading, error, message, createReport } = useCreateReport()
		return { factory, loading, error, message, createReport }
	}
})
</script>
