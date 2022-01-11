<template>
	<Modal>
		<slot name="title">
			Report Answer
		</slot>
		<ReportForm :error="error" :factory="factory" :loading="loading" :submit="createReport" />
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCreateReport } from '@app/composable/reports/answers'
import Modal from '../../core/Modal.vue'
import ReportForm from '@app/components/reports/answers/AnswerReportForm.vue'

export default defineComponent({
	name: 'ReportAnswer',
	components: { Modal, ReportForm },
	setup () {
		const { factory, loading, error, message, createReport } = useCreateReport()
		return { factory, loading, error, message, createReport }
	}
})
</script>
