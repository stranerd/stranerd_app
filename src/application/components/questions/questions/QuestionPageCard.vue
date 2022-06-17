<template>
	<div class="!gap-4 card-padding flex flex-col">
		<div class="flex items-center gap-4 text-secondaryText text-sm justify-between">
			<QuestionTag :tagId="question.tagId" class="font-bold" />
			<div class="flex flex-grow items-center justify-end gap-4 text-2xl">
				<Share :text="question.strippedBody" title="Share this question" />
				<IonIcon :icon="flagOutline" @click="openReportQuestionModal" />
			</div>
		</div>

		<DisplayHtml :html="question.body" />

		<div class="flex items-center justify-between gap-4 text-secondaryText text-sm">
			<div class="flex items-center gap-2">
				<Avatar :id="question.user.id" :size="24" :src="question.user.bio.photo" />
				<span class="font-semibold text-secondaryText flex gap-1 items-center">
					<span>{{ question.user.bio.fullName }}</span>
					<Verified :verified="question.isUserVerified" />
				</span>
			</div>
			<div class="flex items-center gap-4">
				<IonIcon v-if="showEditButton" :icon="createOutline" class="text-primaryText"
					@click="openEditModal" />
				<IonIcon v-if="showDeleteButton" :icon="trashBinOutline" class="text-danger"
					@click="deleteQuestion" />
				<span>{{ formatTime(question.createdAt) }}</span>
			</div>
		</div>

		<PhotoList v-if="question.attachments.length" :photos="question.attachments" class="py-3" />

		<IonButton v-if="showAnswerButton"
			class="btn-primary w-full" @click="openAnswerModal(question, $router)">
			Add your answer
		</IonButton>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { createOutline, flagOutline, pencil, shareSocial, trashBinOutline } from 'ionicons/icons'
import { QuestionEntity } from '@modules/questions'
import QuestionTag from '@app/components/questions/tags/Tag.vue'
import { pluralize } from '@utils/commons'
import { useAuth } from '@app/composable/auth/auth'
import { openAnswerModal } from '@app/composable/questions/answers'
import { openQuestionEditModal, useDeleteQuestion } from '@app/composable/questions/questions'
import { formatTime } from '@utils/dates'
import { useRouter } from 'vue-router'
import { openCreateReportModal } from '@app/composable/reports/reports'
import { ReportType } from '@modules/reports'

export default defineComponent({
	name: 'QuestionPageCard',
	props: {
		question: {
			type: QuestionEntity,
			required: true
		}
	},
	components: { QuestionTag },
	setup (props) {
		const { id } = useAuth()
		const router = useRouter()

		const showAnswerButton = computed({
			get: () => props.question.user.id !== id.value && !props.question.isAnswered && !props.question.answers.find((a) => a.userId === id.value),
			set: () => {
			}
		})
		const showEditButton = computed({
			get: () => props.question.user.id === id.value && props.question.canBeEdited,
			set: () => {
			}
		})
		const showDeleteButton = computed({
			get: () => props.question.user.id === id.value && props.question.canBeDeleted,
			set: () => {
			}
		})
		const { loading, error, deleteQuestion } = useDeleteQuestion(props.question.id)

		return {
			shareSocial, flagOutline, pencil, trashBinOutline, createOutline,
			formatTime, pluralize,
			showAnswerButton, openAnswerModal,
			showEditButton, showDeleteButton,
			loading, error, deleteQuestion,
			openReportQuestionModal: () => openCreateReportModal(ReportType.questions, props.question.id),
			openEditModal: () => openQuestionEditModal(props.question, router)
		}
	}
})
</script>
