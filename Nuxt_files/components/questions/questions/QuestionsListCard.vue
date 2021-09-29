<template>
	<div :id="question.id" class="d-flex flex-column py-1-5 gap-1 gap-lg-1-5 border-bottom border-line">
		<div class="question-head d-flex flex-wrap align-items-center gap-1">
			<div class="d-flex align-items-center gap-0-5">
				<NuxtLink :to="`/users/${question.userId}`">
					<Avatar :size="36" :src="question.avatar" />
				</NuxtLink>
				<div class="d-flex flex-column align-items-md-center flex-md-row gap-md-0-5 fw-bold">
					<NuxtLink :to="`/users/${question.userId}`" class="name d-none d-md-inline">
						<DynamicText>{{ question.userName }}</DynamicText>
					</NuxtLink>
					<div class="dot d-none d-md-inline ms-0-25 me-0-75" />
					<Subject :subject-id="question.subjectId" class="subject" />
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

		<NuxtLink :to="`/questions/${question.id}`" class="question-body">
			<DynamicText>
				{{ question.trimmedBody }}
			</DynamicText>
		</NuxtLink>

		<div class="d-flex align-items-center flex-row flex-wrap gap-1">
			<div class="d-flex align-items-center flex-wrap gap-0-5 gap-md-1 me-auto tags">
				<Tag v-for="tag in question.tags" :key="tag" :tag="tag" />
			</div>
			<DynamicText class="name">
				Posted {{ formatTime(question.createdAt) }}
			</DynamicText>
			<div class="dot" />
			<div class="d-flex align-items-center gap-1">
				<span class="d-flex align-items-center gap-0-25">
					<img alt="" class="sub-icons" src="@app/assets/images/icons/answers.svg">
					<DynamicText>
						{{ formatNumber(question.answers.length) }} {{
							pluralize(question.answers.length, 'answer', 'answers')
						}}</DynamicText>
				</span>
				<span v-if="question.attachments" class="d-flex align-items-center gap-0-25">
					<i class="sub-icons fas fa-paperclip" />
					<DynamicText>
						{{ formatNumber(question.attachments) }} {{
							pluralize(question.attachments, 'image', 'images')
						}}
					</DynamicText>
				</span>
			</div>
		</div>

		<PageLoading v-if="loading" />
		<DisplayError :error="error" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { QuestionEntity } from '@/modules/questions'
import { useAuth } from '@/application/hooks/auth/auth'
import { openAnswerModal } from '@/application/hooks/questions/answers'
import { formatNumber, pluralize } from '@/utils/commons'
import { formatTime } from '@/utils/dates'
import Tag from '@app/components/questions/tags/Tag.vue'
import Subject from '@app/components/questions/subjects/Subject.vue'
import { openQuestionEditModal, useDeleteQuestion } from '@/application/hooks/questions/questions'
import { useRouter } from 'vue-router'

export default defineComponent({
	name: 'QuestionsListCard',
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
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			set: () => {
			}
		})
		const showEditButton = computed({
			get: () => props.question.userId === id.value && props.question.canBeEdited,
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			set: () => {
			}
		})
		const showDeleteButton = computed({
			get: () => props.question.userId === id.value && props.question.canBeDeleted,
			// eslint-disable-next-line @typescript-eslint/no-empty-function
			set: () => {
			}
		})
		const { loading, error, deleteQuestion } = useDeleteQuestion(props.question.id)
		return {
			id, formatTime, formatNumber, pluralize, showAnswerButton, showEditButton, showDeleteButton,
			loading, error, deleteQuestion,
			openAnswerModal: () => openAnswerModal(props.question, router),
			openEditModal: () => openQuestionEditModal(props.question, router)
		}
	}
})
</script>

<style lang="scss" scoped>
	.question-body {
		font-size: 16px;
		@media (min-width: $md) {
			font-size: 20px;
		}
	}

	.sec-text {
		font-size: 14px;
		@media (min-width: $md) {
			font-size: 16px;
		}
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

		.subject {
			color: $color-sub;
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
