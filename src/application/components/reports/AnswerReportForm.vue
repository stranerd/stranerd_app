<template>
	<form class="mt-5" @submit.prevent="submit">
		<div class="flex flex-col gap-4 mb-4">
			<span
				v-for="message in AnswerMessages"
				:key="message.id"
				class="flex gap-0.5 items-center font-semibold"
			>
				<input v-model="factory.message" :value="message.body" name="message" type="radio">
				<span>It {{ message.body }}</span>
			</span>
		</div>

		<IonButton :disabled="loading || !factory.valid" class="btn-primary font-bold px-2" type="submit">
			<span>Report</span>
		</IonButton>

		<DisplayError :error="error" />
	</form>
	<PageLoading v-if="loading" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ReportFactory } from '@modules/reports'
import { AnswerMessages } from '@app/composable/reports/form'

export default defineComponent({
	name: 'AnswerReportForm',
	props: {
		factory: {
			type: Object as PropType<ReportFactory>,
			required: true
		},
		submit: {
			type: Function as PropType<() => Promise<void>>,
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

<style lang="scss" scoped>
	input[type="radio"] {
		width: 18px;
		height: 18px;
	}
</style>
