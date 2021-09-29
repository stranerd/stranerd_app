<template>
	<form @submit.prevent="submit">
		<p>What is wrong with this question?</p>
		<div class="flex flex-col gap-0-5 mb-1">
			<span
				v-for="message in QuestionMessages"
				:key="message.id"
				class="flex gap-0-5 items-center font-bold"
			>
				<input v-model="factory.message" :value="message.body" name="message" type="radio">
				<DynamicText>It {{ message.body }}</DynamicText>
			</span>
		</div>
		<button :disabled="loading || !factory.valid" class="btn btn-primary font-bold px-2 btn-lg" type="submit">
			<PageLoading v-if="loading" />
			<span>Report</span>
		</button>
		<DisplayError :error="error" />
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ReportFactory } from '@/modules/reports'
import { QuestionMessages } from '@/application/hooks/reports/form'

export default defineComponent({
	name: 'QuestionReportForm',
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
		return { QuestionMessages }
	}
})
</script>

<style lang="scss" scoped>
	input[type="radio"] {
		width: 18px;
		height: 18px;
	}
</style>
