<template>
	<div class="!gap-4 card-padding flex flex-col">
		<div class="flex items-center gap-4 text-secondaryText text-sm justify-between">
			<div class="flex items-center gap-2">
				<Avatar :id="answer.user.id" :size="24" :src="answer.user.bio.photo" />
				<span class="font-semibold flex gap-1 items-center">
					<span>{{ answer.user.bio.fullName }}</span>
					<Verified :verified="answer.isUserVerified" />
				</span>
				<IonIcon :icon="ellipse" class="dot" />
				<span>{{ formatTime(answer.createdAt) }}</span>
			</div>
			<div class="flex items-center justify-end gap-4 text-2xl">
				<Share :text="answer.strippedBody" title="Share this answer" />
				<IonIcon :icon="flagOutline" @click="openReportAnswerModal" />
			</div>
		</div>

		<DisplayHtml :html="answer.body" />

		<PhotoList v-if="answer.attachments.length" :photos="answer.attachments" class="py-3" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ellipse, flagOutline, shareSocial } from 'ionicons/icons'
import { AnswerEntity } from '@modules/questions'
import { pluralize } from '@utils/commons'
import { formatTime } from '@utils/dates'
import { openCreateReportModal } from '@app/composable/reports/reports'
import { ReportType } from '@modules/reports'

export default defineComponent({
	name: 'AnswerPageCard',
	props: {
		answer: {
			type: AnswerEntity,
			required: true
		}
	},
	setup (props) {
		return {
			ellipse, shareSocial, flagOutline,
			formatTime, pluralize,
			openReportAnswerModal: () => openCreateReportModal(ReportType.answers, props.answer.id)
		}
	}
})
</script>
