<template>
	<Modal :close="close">
		<template v-slot:title>
			Report {{ factory.isQuestionsType ? 'Question' : factory.isAnswersType ? 'Answer' : 'User' }}
		</template>
		<template v-if="factory.isQuestionsType || factory.isAnswersType" v-slot:subtext>
			What is wrong with this
			{{ factory.isQuestionsType ? 'Question' : factory.isAnswersType ? 'Answer' : 'User' }}
		</template>
		<QuestionReportForm v-if="factory.isQuestionsType" :error="error" :factory="factory" :loading="loading"
			:submit="createReport" class="mt-6" />
		<AnswerReportForm v-if="factory.isAnswersType" :error="error" :factory="factory" :loading="loading"
			:submit="createReport" class="mt-6" />
		<QuestionReportForm v-if="factory.isUsersType" :error="error" :factory="factory" :loading="loading"
			:submit="createReport" class="mt-6" />
	</Modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useCreateReport } from '@app/composable/reports/reports'
import QuestionReportForm from '@app/components/reports/QuestionReportForm.vue'
import AnswerReportForm from '@app/components/reports/AnswerReportForm.vue'

export default defineComponent({
	name: 'CreateReport',
	components: { QuestionReportForm, AnswerReportForm },
	props: {
		close: {
			type: Function,
			required: true
		}
	},
	setup () {
		const { factory, loading, error, message, createReport } = useCreateReport()
		return { factory, loading, error, message, createReport }
	}
})
</script>
