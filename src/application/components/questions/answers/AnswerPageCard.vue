<template>
	<div class="!gap-4 card-sm card-padding flex flex-col">
		<div class="flex items-center gap-4 text-secondaryText text-sm justify-between">
			<div class="flex items-center gap-2">
				<Avatar :id="answer.user.id" :size="24" :src="answer.user.bio.photo" />
				<UserName :isTutor="answer.user.roles.isStranerdTutor" :name="answer.user.bio.fullName"
					class="font-semibold" />
				<IonIcon :icon="ellipse" class="dot" />
				<span>{{ formatTime(answer.createdAt) }}</span>
			</div>
			<div class="flex items-center justify-end gap-4">
				<Share :link="answer.shareLink" :text="answer.strippedBody" title="Share this answer" />
				<IonIcon :icon="flagOutline" @click="openReportModal" />
			</div>
		</div>

		<DisplayHtml :html="answer.body" />

		<Gallery v-if="answer.attachments.length" :media="answer.attachments" :path="answer.saveFilePath"
			class="py-3" />
	</div>
</template>

<script lang="ts" setup>
import { ellipse, flagOutline } from 'ionicons/icons'
import { AnswerEntity } from '@modules/questions'
import { formatTime } from '@utils/dates'
import { openCreateReportModal } from '@app/composable/moderation/reports'
import { ReportType } from '@modules/moderation'

const props = defineProps({
	answer: {
		type: AnswerEntity,
		required: true
	}
})

const openReportModal = () => openCreateReportModal(ReportType.answers, props.answer.id)
</script>
