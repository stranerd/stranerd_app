<template>
	<form @submit.prevent="submit">
		<p>What is wrong with this answer?</p>
		<div class="d-flex flex-column gap-0-5 mb-1">
			<span v-for="message in AnswerMessages" :key="message.id" class="d-flex gap-0-5 align-items-center fw-bold">
				<input v-model="factory.message" :value="message.body" name="message" type="radio">
				<DynamicText>It {{ message.body }}</DynamicText>
			</span>
		</div>
		<button :disabled="loading || !factory.valid" class="btn btn-primary btn-lg px-2 fw-bold" type="submit">
			<PageLoading v-if="loading" />
			<span>Report</span>
		</button>
		<DisplayError :error="error" />
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ReportFactory } from '@/modules/reports'
import { AnswerMessages } from '@/application/hooks/reports/form'

export default defineComponent({
	name: 'AnswerReportForm',
	props: {
		factory: {
			type: Object as PropType<ReportFactory>,
			required: true
		},
		submit: {
			type: Function,
			required: true
		},
		loading: {
			type: Boolean,
			required: true
		},
		error: {
			type: String,
			required: true
		}
	},
	setup () {
		return { AnswerMessages }
	}
})
</script>
