<template>
	<Modal>
		<template v-slot:title>
			Report Question
		</template>
		<template v-slot:subtext>
			What is wrong with this Question
		</template>
		<ReportForm :error="error" :factory="factory" :loading="loading" :submit="createReport" class="mt-6" />
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
