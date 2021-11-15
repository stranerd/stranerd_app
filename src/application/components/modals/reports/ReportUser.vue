<template>
<<<<<<< HEAD
	<Modal >
=======
	<Modal>
>>>>>>> cfd3b62752a3a1b19b2ae5633522a66ebbe7150c
		<slot name="title">
			Report Question
		</slot>
		<ReportForm :error="error" :factory="factory" :loading="loading" :submit="createReport" />
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCreateReport } from '@app/composable/reports/questions'
import Modal from '../../core/Modal.vue'
import ReportForm from '@app/components/reports/questions/QuestionReportForm.vue'

export default defineComponent({
	components: { Modal, ReportForm },
	name: 'ReportQuestion',
	setup () {
		const { factory, loading, error, message, createReport } = useCreateReport()
		return { factory, loading, error, message, createReport }
	}
})
</script>
