<template>
	<div class="bg-tags border border-line rounded-3 mb-1">
		<div class="d-flex flex-column flex-md-row gap-1 p-1 px-md-2">
			<div class="d-flex flex-column gap-1 w-100 color-dark">
				<NuxtLink :to="`/questions/${report.reported.questionId}#${report.reportedId}`">
					<div class="mb-1">
						<DynamicText>It {{ report.reported.title }}</DynamicText>
					</div>
					<div class="editor-body" v-html="report.reported.body" />
				</NuxtLink>
				<span>
					Reported by <NuxtLink :to="`/users/${report.reporterId}`">
						<DynamicText class="text-primary">
							{{ report.reporterBio.fullName }}
						</DynamicText>
					</NuxtLink>
				</span>

				<span>This answer <DynamicText>It {{ report.message }}</DynamicText>.</span>
			</div>
			<div
				class="text-danger ms-md-auto d-flex flex-wrap flex-md-column gap-1 text-nowrap custom-border"
				style="font-size: 14px;"
			>
				<a>Send warning</a>
				<a>Suspend User</a>
				<a>Delete Answer</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { AnswerReportEntity } from '@modules/reports'

export default defineComponent({
	name: 'AnswerReportCard',
	props: {
		report: {
			type: Object as PropType<AnswerReportEntity>,
			required: true
		}
	}
})
</script>

<style lang="scss" scoped>
	.custom-border {
		border-top: 1px solid $color-line;
		padding-top: 1rem;
		@media (min-width: $md) {
			border-top: 0;
			padding-top: 0;
			padding-left: 1rem;
			border-left: 1px solid $color-line;
		}
	}
</style>
