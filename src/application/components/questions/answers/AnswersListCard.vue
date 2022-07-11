<template>
	<div class="rounded-xl flex flex-col !gap-4 card-padding">
		<div class="flex items-center gap-2 text-sm">
			<Avatar :id="answer.user.id" :name="answer.user.bio.fullName" :size="20" :src="answer.user.bio.photo" />
			<span class="font-bold flex items-center gap-1">
				<span>{{ answer.user.bio.fullName }}</span>
				<Verified :verified="answer.isUserVerified" />
			</span>
			<IonIcon :icon="ellipse" class="dot" />
			<span>{{ formatTime(answer.createdAt) }}</span>
			<div class="flex flex-grow items-center justify-end gap-4 text-secondaryText">
				<Share :text="answer.strippedBody" title="Share this answer" />
				<IonIcon :icon="flagOutline" @click="openReportModal" />
			</div>
		</div>

		<DisplayHtml :html="answer.body" class="pl-7" />

		<Gallery v-if="answer.attachments.length" :media="answer.attachments" :path="answer.saveFilePath"
			class="pl-7" />

		<div class="flex items-center gap-6 text-secondaryText text-sm pl-7">
			<div class="flex items-center gap-1">
				<IonIcon :icon="like && like.value ? thumbsUp : thumbsUpOutline" @click="() => likeAnswer(true)" />
				<span>{{ formatNumber(answer.meta.likes) }}</span>
			</div>
			<div class="flex items-center gap-1">
				<IonIcon :icon="like && !like.value ? thumbsDown : thumbsDownOutline"
					@click="() => likeAnswer(false)" />
				<span>{{ formatNumber(answer.meta.dislikes) }}</span>
			</div>
			<router-link :to="`/questions/${question.id}/answers/${answer.id}`" class="flex items-center gap-1">
				<IonIcon :icon="chatbubbleOutline" />
				<span>{{ formatNumber(answer.meta.comments) }}</span>
			</router-link>
			<div class="flex-grow" />
			<span v-if="showMarkBest" class="flex items-center gap-1" @click.prevent="markBestAnswer(question)">
				<span>Mark as best</span>
				<IonIcon :icon="checkmarkCircleOutline" />
			</span>
			<IonIcon v-if="answer.best" :icon="checkmarkCircleOutline" class="text-success" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { AnswerEntity, QuestionEntity } from '@modules/questions'
import {
	chatbubbleOutline,
	checkmarkCircleOutline,
	ellipse,
	flagOutline,
	thumbsDown,
	thumbsDownOutline,
	thumbsUp,
	thumbsUpOutline
} from 'ionicons/icons'
import { useAnswer } from '@app/composable/questions/answers'
import { useAuth } from '@app/composable/auth/auth'
import { openCreateReportModal } from '@app/composable/reports/reports'
import { formatNumber } from '@utils/commons'
import { ReportType } from '@modules/reports'
import { formatTime } from '@utils/dates'
import { LikeEntity } from '@modules/interactions'

export default defineComponent({
	name: 'AnswerListCard',
	props: {
		answer: {
			type: AnswerEntity,
			required: true
		},
		like: {
			type: LikeEntity,
			required: false,
			default: null
		},
		question: {
			type: QuestionEntity,
			required: true
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
		const { error, loading, markBestAnswer, likeAnswer } = useAnswer(props.answer)

		return {
			id,
			formatNumber,
			formatTime,
			loading,
			error,
			markBestAnswer,
			likeAnswer,
			chatbubbleOutline,
			ellipse,
			flagOutline,
			thumbsDown,
			thumbsDownOutline,
			thumbsUp,
			thumbsUpOutline,
			checkmarkCircleOutline,
			showEditButton,
			showDeleteButton,
			showMarkBest,
			openReportModal: () => openCreateReportModal(ReportType.answers, props.answer.id)
		}
	}
})
</script>
