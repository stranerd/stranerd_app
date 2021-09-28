<template>
	<form @submit.prevent="submit">
		<div class="form-group mb-1">
			<label for="message">Message</label>
			<textarea
				id="message"
				v-model="factory.message"
				:class="{'is-invalid': factory.errors.message, 'is-valid': factory.isValid('message')}"
				class="form-control"
				placeholder="Explain in full detail what happened"
				rows="6"
			/>
			<DynamicText v-if="factory.errors.message" class="small text-danger d-block">
				{{ factory.errors.message }}
			</DynamicText>
		</div>
		<button :disabled="loading || !factory.valid" class="btn btn-dark fw-bold px-2 btn-lg" type="submit">
			<PageLoading v-if="loading" />
			<span>Report</span>
		</button>
		<DisplayError :error="error" />
	</form>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { ReportFactory } from '@modules/reports'

export default defineComponent({
	name: 'UserReportForm',
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
	}
})
</script>
