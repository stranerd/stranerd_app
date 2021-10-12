<template>
	<div class="bg-tags border border-line rounded-3 mb-1">
		<div class="flex flex-col flex-md-row gap-1 p-1 px-md-2">
			<div class="flex flex-col gap-1 w-100 color-dark">
				<span><DynamicText>{{ report.message }}</DynamicText></span>

				<span>
					Reported by <NuxtLink :to="`/users/${report.reporterId}`">
						<DynamicText class="text-primary">
							{{ report.reporterBio.fullName }}
						</DynamicText>
					</NuxtLink>
				</span>
				<span>
					Reported user <NuxtLink :to="`/users/${report.reportedId}`">
						<DynamicText class="text-primary">
							{{ report.reported.bio.fullName }}
						</DynamicText>
					</NuxtLink>
				</span>
			</div>
			<div
				class="text-danger ms-md-auto flex flex-wrap flex-md-column gap-1 text-nowrap custom-border"
				style="font-size: 14px;"
			>
				<a>Send warning</a>
				<a>Suspend User</a>
				<a>Delete User</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { UserReportEntity } from '@/modules/reports'

export default defineComponent({
	name: 'UserReportCard',
	props: {
		report: {
			type: Object as PropType<UserReportEntity>,
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
