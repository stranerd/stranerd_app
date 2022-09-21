<template>
	<div class="!gap-4 card-sm card-padding flex flex-col">
		<div class="flex justify-between gap-2">
			<Avatar :id="question.user.id" :size="36" :src="question.user.bio.photo" />
			<div class="flex flex-col">
				<span class="font-semibold text-secondaryText flex gap-1 items-center">
					<span>{{ question.user.bio.fullName }}</span>
					<Verified :verified="question.isUserVerified" />
				</span>
				<div class="flex gap-2 items-center text-secondaryText text-sm">
					<InteractionTag :tagId="question.tagId" />
					<IonIcon :icon="ellipse" class="dot" />
					<span>{{ formatTime(question.createdAt) }}</span>
				</div>
			</div>
			<div class="flex-1" />
			<IonButton v-if="showAnswerButton" class="btn-primary" @click="openAnswerModal(question, $router)">
				Answer
			</IonButton>
		</div>

		<DisplayHtml :html="question.body" />

		<Gallery v-if="question.attachments.length" :media="question.attachments" :path="question.saveFilePath"
			class="py-3" />

		<div class="flex items-center gap-4 text-secondaryText text-sm">
			<IonIcon :icon="flagOutline" @click="openReportModal" />
			<div class="flex-1" />
			<Share :link="question.shareLink" :text="question.strippedBody" title="Share this question" />
			<SaveToSet :entity="question" />
			<IonIcon v-if="showEditButton" :icon="createOutline" class="text-warning" @click="openEditModal" />
			<IonIcon v-if="showDeleteButton" :icon="trashBinOutline" class="text-danger" @click="deleteQuestion" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { createOutline, ellipse, flagOutline, pencil, shareSocial, trashBinOutline } from 'ionicons/icons'
import { QuestionEntity } from '@modules/questions'
import InteractionTag from '@app/components/interactions/tags/Tag.vue'
import { pluralize } from '@utils/commons'
import { useAuth } from '@app/composable/auth/auth'
import { openAnswerModal } from '@app/composable/questions/answers'
import { openQuestionEditModal, useDeleteQuestion } from '@app/composable/questions/questions'
import { formatTime } from '@utils/dates'
import { useRouter } from 'vue-router'
import { openCreateReportModal } from '@app/composable/reports/reports'
import { ReportType } from '@modules/reports'
import SaveToSet from '@app/components/study/sets/SaveToSet.vue'

export default defineComponent({
	name: 'QuestionPageCard',
	props: {
		question: {
			type: QuestionEntity,
			required: true
		}
	},
	components: { InteractionTag, SaveToSet },
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
			shareSocial, flagOutline, pencil, trashBinOutline, createOutline, ellipse,
			formatTime, pluralize,
			showAnswerButton, openAnswerModal, showEditButton, showDeleteButton,
			loading, error, deleteQuestion,
			openReportModal: () => openCreateReportModal(ReportType.questions, props.question.id),
			openEditModal: () => openQuestionEditModal(props.question, router)
		}
	}
})
</script>
