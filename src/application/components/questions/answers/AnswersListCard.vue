<template>
	<div :id="answer.id" class="answer">
		<div class="border-bottom-line answer-content d-flex align-items-center gap-0-5">
			<NuxtLink :to="`/users/${answer.userId}`">
				<Avatar :size="40" :src="answer.avatar" />
			</NuxtLink>
			<NuxtLink :to="`/users/${answer.userId}`" class="d-block fw-bold text-dark text-wrap">
				<BodyText class="text-dark" variant="large">
					<DynamicText>{{ answer.userName }}</DynamicText>
				</BodyText>
			</NuxtLink>
		</div>
		<div class="answer-content d-flex flex-column gap-1">
			<BodyText class="text-dark" variant="large">
				<DynamicText>{{ answer.title || 'N/A' }}</DynamicText>
			</BodyText>
			<div class="d-flex gap-1 gap-md-2 align-items-center text-primary fw-bold flex-row flex-wrap">
				<span class="d-flex align-items-center gap-0-25 me-auto" @click="showExplanation = !showExplanation">
					<span>Explanation</span>
					<i :class="showExplanation ? 'fa-angle-up' : 'fa-angle-down'" class="fas" />
				</span>
				<span
					v-if="answer.best"
					class="d-flex align-items-center gap-0-25 text-success"
					@click.prevent="markBestAnswer"
				>
					<span>Best answer</span>
					<i class="fas fa-check-circle" />
				</span>
				<a
					v-if="answer.commentsCount"
					class="d-flex align-items-center gap-0-25"
					@click.prevent="showComments = !showComments"
				>
					<span>{{ showComments ? 'Hide' : 'Show' }} Comments</span>
					<i :class="showComments ? 'fa-angle-up' : 'fa-angle-down'" class="fas" />
				</a>
				<span
					v-if="isLoggedIn && question && !question.isAnswered && !answer.best && question.userId === id"
					class="d-flex align-items-center gap-0-25"
					@click.prevent="markBestAnswer"
				>
					<span>Mark as best</span>
					<i class="fas fa-check-circle" />
				</span>
				<span class="d-flex gap-0-75 text-sub">
					<span class="d-flex gap-0-25 align-items-center">
						<span>{{ answer.upVotes }}</span>
						<i
							:class="{'text-primary': answer.votes.find((v) => v.vote === 1 && v.userId === id)}"
							class="fas fa-thumbs-up"
							@click="() => voteAnswer(true)"
						/>
					</span>
					<span class="d-flex gap-0-25 align-items-center">
						<span>{{ answer.downVotes }}</span>
						<i
							:class="{'text-primary': answer.votes.find((v) => v.vote === -1 && v.userId === id)}"
							class="fas fa-thumbs-down"
							@click="() => voteAnswer(false)"
						/>
					</span>
				</span>
				<Share
					:link="`/questions/${answer.questionId}#${answer.id}`"
					:text="answer.strippedBody"
					:title="answer.title"
				/>
				<span v-if="id && answer.userId !== id" @click="reportAnswer">
					<i class="fas fa-flag" />
				</span>
				<span
					v-if="showEditButton"
					class="d-flex align-items-center gap-0-25 text-warning"
					@click.prevent="openEditModal"
				>
					<span>Edit answer</span>
					<i class="fas fa-pen" />
				</span>
				<span
					v-if="showDeleteButton"
					class="d-flex align-items-center gap-0-25 text-danger"
					@click.prevent="deleteAnswer"
				>
					<span>Delete answer</span>
					<i class="fas fa-trash" />
				</span>
			</div>
		</div>
		<div v-if="showExplanation" class="answer-content bg-tags">
			<div class="editor-body" v-html="answer.body || 'No explanation'" />
		</div>
		<div v-if="showComments && answer.commentsCount" class="answer-content">
			<CommentList :answer-id="answer.id" />
		</div>
		<div class="border-0 answer-content">
			<CommentForm :answer-id="answer.id" />
		</div>
		<DisplayError :error="error" style="margin: 0 !important;" />
		<DisplayError :error="deleteError" style="margin: 0 !important;" />
		<PageLoading v-if="loading" />
		<PageLoading v-if="deleteLoading" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { AnswerEntity, QuestionEntity } from '@/modules/questions'
import { openAnswerEditModal, useAnswer, useDeleteAnswer } from '@/application/hooks/questions/answers'
import { useAuth } from '@/application/hooks/auth/auth'
import CommentForm from '@app/components/questions/comments/AnswerCommentForm.vue'
import CommentList from '@app/components/questions/comments/AnswerCommentsList.vue'
import { formatTime } from '@/utils/dates'
import { useReportModal } from '@/application/hooks/core/modals'
import { setReportedEntity } from '@/application/hooks/reports/answers'
import { formatNumber } from '@/utils/commons'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'AnswerListCard',
	components: {
		CommentForm,
		CommentList
	},
	props: {
		answer: {
			required: true,
			type: Object as PropType<AnswerEntity>
		},
		question: {
			required: true,
			type: Object as PropType<QuestionEntity>
		}
	},
	setup (props) {
		const router = useRouter()
		const showComments = ref(false)
		const showExplanation = ref(false)
		const { id, isLoggedIn, user } = useAuth()
		const showEditButton = computed({
			get: () => props.answer.userId === id.value && props.answer.canBeEdited,
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			set: () => {
			}
		})
		const showDeleteButton = computed({
			get: () => props.answer.userId === id.value && props.answer.canBeDeleted,
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			set: () => {
			}
		})
		const { error, loading, markBestAnswer, voteAnswer } = useAnswer(props.answer)
		const reportAnswer = () => {
			setReportedEntity(props.answer.id)
			useReportModal().openReportAnswer()
		}
		const { loading: deleteLoading, error: deleteError, deleteAnswer } = useDeleteAnswer(props.answer.id)
		return {
			id, isLoggedIn, user, formatTime, showComments, showExplanation,
			showEditButton, showDeleteButton, deleteLoading, deleteError, deleteAnswer,
			openEditModal: () => openAnswerEditModal({ question: props.question, answer: props.answer }, router),
			error, loading, voteAnswer, formatNumber,
			markBestAnswer: () => markBestAnswer(props.question),
			reportAnswer
		}
	}
})
</script>

<style lang="scss" scoped>
	.answer {
		border: 1px solid $color-line;
		border-radius: 12px;

		.answer-content {
			border-bottom: 1px solid $color-line;
			padding: 0.5rem 0.75rem;
			@media (min-width: $md) {
				padding: 1rem;
			}
		}
	}

	.icons {
		font-size: 14px;
		font-weight: 600;
	}
</style>
