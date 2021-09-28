<template>
	<div class="d-flex flex-column gap-1 gap-lg-2 pb-1 border-bottom border-line">
		<div class="question-head d-flex flex-row flex-wrap align-items-center">
			<div class="d-flex align-items-center gap-0-5">
				<NuxtLink :to="`/users/${question.userId}`">
					<Avatar :size="40" :src="question.avatar" class="d-md-none" />
					<Avatar :size="50" :src="question.avatar" class="d-none d-md-inline" />
				</NuxtLink>
				<div class="d-flex flex-column align-items-md-center flex-md-row gap-md-0-5">
					<NuxtLink :to="`/users/${question.userId}`" class="name d-none d-md-inline">
						<BodyText>
							<DynamicText>{{ question.userName }}</DynamicText>
						</BodyText>
					</NuxtLink>
					<div class="dot d-none d-md-inline ms-0-25 me-0-75" />
					<BodyText>
						<Subject :subject-id="question.subjectId" />
					</BodyText>
				</div>
			</div>

			<div class="d-flex align-items-center ms-auto gap-0-5">
				<template v-if="question.isAnswered">
					<img alt="" class="sub-icons" src="@app/assets/images/icons/profile-best-answers.svg">
				</template>
				<template v-else-if="showAnswerButton">
					<div class="d-flex align-items-center gap-0-25">
						<DynamicText>+{{ formatNumber(question.creditable) }}</DynamicText>
						<Coins :size="28" />
					</div>
					<button class="action-btn btn btn-sm bg-primary" @click="openAnswerModal">
						Answer
					</button>
				</template>
				<template v-if="showEditButton">
					<button class="btn btn-sm action-btn bg-warning" @click="openEditModal">
						Edit
					</button>
				</template>
				<template v-if="showDeleteButton">
					<button class="btn btn-sm action-btn bg-danger" @click="deleteQuestion">
						Delete
					</button>
				</template>
			</div>
		</div>

		<div class="question-body editor-body" v-html="question.body" />

		<div class="d-flex align-items-center flex-row flex-wrap gap-1">
			<div class="d-flex align-items-center flex-wrap gap-0-5 gap-md-1 me-auto tags">
				<Tag v-for="tag in question.tags" :key="tag" :tag="tag" />
			</div>
			<DynamicText class="name">
				Posted {{ formatTime(question.createdAt) }}
			</DynamicText>
			<div class="dot" />
			<div class="d-flex align-items-center gap-1">
				<span class="d-flex align-items-center gap-0-5">
					<img alt="" class="sub-icons" src="@app/assets/images/icons/answers.svg">
					<DynamicText>
						{{
							formatNumber(question.answers.length)
						}} {{ pluralize(question.answers.length, 'answer', 'answers') }}</DynamicText>
				</span>
				<span v-if="id && question.userId !== id" @click="reportQuestion">
					<i class="fas fa-flag sub-icons" />
				</span>
			</div>
		</div>

		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, useRouter } from '@nuxtjs/composition-api'
import { QuestionEntity } from '@modules/questions'
import { openAnswerModal } from '@app/hooks/questions/answers'
import { useAuth } from '@app/hooks/auth/auth'
import { formatNumber, pluralize } from '@utils/commons'
import { formatTime } from '@utils/dates'
import Tag from '@app/components/questions/tags/Tag.vue'
import Subject from '@app/components/questions/subjects/Subject.vue'
import { useReportModal } from '@app/hooks/core/modals'
import { setReportedEntity } from '@app/hooks/reports/questions'
import { openQuestionEditModal, useDeleteQuestion } from '@app/hooks/questions/questions'

export default defineComponent({
	name: 'QuestionPageCard',
	components: { Tag, Subject },
	props: {
		question: {
			required: true,
			type: Object as PropType<QuestionEntity>
		}
	},
	setup (props) {
		const { id } = useAuth()
		const router = useRouter()
		const showAnswerButton = computed({
			get: () => props.question.userId !== id.value && !props.question.isAnswered && !props.question.answers.find((a) => a.userId === id.value),
			set: () => {
			}
		})
		const showEditButton = computed({
			get: () => props.question.userId === id.value && props.question.canBeEdited,
			set: () => {
			}
		})
		const showDeleteButton = computed({
			get: () => props.question.userId === id.value && props.question.canBeDeleted,
			set: () => {
			}
		})
		const reportQuestion = () => {
			setReportedEntity(props.question.id)
			useReportModal().openReportQuestion()
		}
		const { loading, error, deleteQuestion } = useDeleteQuestion(props.question.id)
		return {
			id, formatTime, formatNumber, pluralize, showAnswerButton, showEditButton, showDeleteButton,
			loading, error, deleteQuestion,
			openAnswerModal: () => openAnswerModal(props.question, router),
			openEditModal: () => openQuestionEditModal(props.question, router),
			reportQuestion
		}
	}
})
</script>

<style lang="scss" scoped>
	.question-body {
		font-size: 20px;
	}

	.dot {
		width: 6px;
		height: 6px;
		background-color: $color-sub;
		border-radius: 50px;
	}

	.question-head {
		.name {
			color: $color-dark;
			font-size: 18px;
			font-weight: 600;
		}
	}

	.action-btn {
		color: $color-white;
		border: none;
		border-radius: 18px;
		width: fit-content;
		padding: 9px 27px;

		&:hover {
			transform: scale(1.1);
			transition: 0.5s;
		}
		@media (max-width: $md) {
			font-size: 13px;
		}
	}

	.tags {
		flex: 1 0 100%;
		@media (min-width: $md) {
			flex: 1 1 0;
		}
	}
</style>
