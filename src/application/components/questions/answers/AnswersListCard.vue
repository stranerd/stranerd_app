<template>
	<div class="rounded-xl flex flex-col !gap-4 card-padding">
		<div class="flex items-center gap-2 text-sub">
			<Avatar :id="answer.user.id" :name="answer.user.bio.fullName" :size="20" :src="answer.user.bio.photo" />
			<span class="font-bold flex items-center gap-1">
				<span>{{ answer.user.bio.fullName }}</span>
				<Verified :verified="answer.isUserVerified" />
			</span>
			<IonIcon :icon="ellipse" class="dot" />
			<span>{{ formatTime(answer.createdAt) }}</span>
			<div class="flex flex-grow items-center justify-end gap-4 text-heading2 text-secondaryText">
				<Share :text="answer.strippedBody" title="Share this answer" />
				<IonIcon :icon="flagOutline" @click="openReportAnswerModal" />
			</div>
		</div>

		<DisplayHtml :html="answer.body" class="pl-7" />

		<PhotoList v-if="answer.attachments.length" :photos="answer.attachments" class="pl-7" />

		<div class="flex items-center gap-6 text-secondaryText text-sub pl-7">
			<div :class="{ 'text-primaryBg': answer.votes.find((v) => v.vote === 1 && v.userId === id) }"
				class="flex items-center gap-1">
				<IonIcon :icon="thumbsUpOutline" class="text-heading2" @click="() => voteAnswer(true)" />
				<span>{{ formatNumber(answer.upVotes) }}</span>
			</div>
			<div
				:class="{ 'text-primaryBg': answer.votes.find((v) => v.vote === -1 && v.userId === id) }"
				class="flex items-center gap-1">
				<IonIcon :icon="thumbsDownOutline" class="text-heading2" @click="() => voteAnswer(false)" />
				<span>{{ formatNumber(answer.downVotes) }}</span>
			</div>
			<div class="flex items-center gap-1">
				<IonIcon :icon="chatbubbleOutline" class="text-heading2" />
				<span>{{ formatNumber(answer.comments) }}</span>
			</div>
			<div class="flex-grow" />
			<span v-if="showMarkBest" class="flex items-center gap-1" @click.prevent="markBestAnswer(question)">
				<span>Mark as best</span>
				<IonIcon :icon="checkmarkCircleOutline" class="text-heading2" />
			</span>
			<IonIcon v-if="answer.best" :icon="checkmarkCircleOutline" class="text-heading2 text-success" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { AnswerEntity, QuestionEntity } from '@modules/questions'
import {
	chatbubbleOutline,
	checkmarkCircleOutline,
	ellipse,
	flagOutline,
	thumbsDownOutline,
	thumbsUpOutline
} from 'ionicons/icons'
import PhotoList from '@app/components/core/media/PhotoList.vue'
import { useAnswer } from '@app/composable/questions/answers'
import { useAuth } from '@app/composable/auth/auth'
import AnswerCommentsList from '@app/components/questions/comments/AnswerCommentsList.vue'
import DisplayHtml from '@app/components/core/text/DisplayHtml.vue'
import { openCreateReportModal } from '@app/composable/reports/reports'
import { formatNumber } from '@utils/commons'
import { ReportType } from '@modules/reports'
import { formatTime } from '@utils/dates'

export default defineComponent({
	name: 'AnswerListCard',
	components: { DisplayHtml, PhotoList, AnswerCommentsList },
	props: {
		answer: {
			type: AnswerEntity as PropType<AnswerEntity>,
			required: true
		},
		question: {
			required: true,
			type: Object as PropType<QuestionEntity>
		}
	},
	setup (props) {
		const { id } = useAuth()
		const showEditButton = computed({
			get: () => props.answer.user.id === id.value && props.answer.canBeEdited,
			set: () => {
			}
		})
		const showDeleteButton = computed({
			get: () => props.answer.user.id === id.value && props.answer.canBeDeleted,
			set: () => {
			}
		})
		const showMarkBest = computed({
			get: () => !props.question.isAnswered && !props.answer.best && props.question.user.id === id.value,
			set: () => {
			}
		})
		const { error, loading, markBestAnswer, voteAnswer } = useAnswer(props.answer)

		return {
			id, formatNumber, formatTime,
			loading, error, markBestAnswer, voteAnswer,
			chatbubbleOutline, ellipse, flagOutline, thumbsDownOutline, thumbsUpOutline, checkmarkCircleOutline,
			showEditButton, showDeleteButton, showMarkBest,
			openReportAnswerModal: () => openCreateReportModal(ReportType.answers, props.answer.id)
		}
	}
})
</script>
