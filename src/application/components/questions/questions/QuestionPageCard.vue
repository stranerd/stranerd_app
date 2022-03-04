<template>
	<div class="flex flex-col md:gap-4">
		<div class="bg-white card-padding md:rounded-xl border-b border-new_gray text-sm flex flex-col">
			<div class="flex items-center gap-4">
				<span class="font-semibold text-main_dark capitalize">{{ question.subject }}</span>
				<div class="flex flex-grow items-center justify-end gap-2">
					<Share
						:text="question.strippedBody"
						cssClass="text-[22px] mr-2 text-main_dark"
						title="Share this question" />
					<IonIcon :icon="flagOutline" class="text-[22px] text-main_dark cursor-pointer"
						@click="openReportQuestionModal" />
				</div>
			</div>
			<DisplayHtml :html="question.body" class="text-main_dark" />

			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<avatar :id="question.userId" :size="24" :src="question.avatar" />
					<span class="font-semibold text-main_dark flex gap-1 items-center">
						<span>{{ question.userBio.fullName }}</span>
						<IonIcon v-if="question.isUserVerified" :icon="checkmarkCircle" color="primary" />
					</span>
				</div>
				<div class="flex items-center gap-2">
					<ion-text v-if="showEditButton" class="text-primary cursor-pointer"
						@click="openEditModal">Edit
					</ion-text>
					<ion-text v-if="showDeleteButton" class="text-red cursor-pointer"
						@click="deleteQuestion">Delete
					</ion-text>
					<span class="text-gray">{{ formatTime(question.createdAt) }}</span>
				</div>
			</div>
			<PhotoList v-if="question.attachments.length" :photos="question.attachments" class="py-3" />

			<ion-button v-if="showAnswerButton && !showAddAnswer"
				class="btn-primary w-full"
				@click="openAnswerModal(question)">
				<span class="mr-2">Add your answer</span>
			</ion-button>
			<ion-button v-if="showAnswerButton && showAddAnswer"
				class="btn-primary w-full"
				@click="showAddAnswer = false">
				<span class="mr-2">Close answer form</span>
			</ion-button>
		</div>
		<CreateAnswer v-if="!question.isAnswered && showAddAnswer" :question="question" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { IonIcon } from '@ionic/vue'
import { checkmarkCircle, flagOutline, pencil, shareSocial, trashBinOutline } from 'ionicons/icons'
import { QuestionEntity } from '@modules/questions'
import Avatar from '@app/components/core/Avatar.vue'
import PhotoList from '@app/components/core/media/PhotoList.vue'
import CreateAnswer from '@app/components/questions/answers/CreateAnswer.vue'
import { pluralize } from '@utils/commons'
import { useAuth } from '@app/composable/auth/auth'
import { openAnswerModal, showAddAnswer } from '@app/composable/questions/answers'
import { openQuestionEditModal, useDeleteQuestion } from '@app/composable/questions/questions'
import { formatTime } from '@utils/dates'
import { useRouter } from 'vue-router'
import { useReportModal } from '@app/composable/core/modals'

export default defineComponent({
	name: 'QuestionPageCard',
	props: {
		question: {
			type: QuestionEntity,
			required: true
		}
	},
	components: { IonIcon, Avatar, PhotoList, CreateAnswer },
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
		const { loading, error, deleteQuestion } = useDeleteQuestion(props.question.id)

		return {
			shareSocial, flagOutline, pencil, trashBinOutline, checkmarkCircle,
			formatTime, pluralize,
			showAnswerButton, showAddAnswer,
			showEditButton, showDeleteButton,
			loading, error, deleteQuestion,
			openAnswerModal: () => openAnswerModal(props.question),
			openReportQuestionModal: () => useReportModal().openReportQuestion(),
			openEditModal: () => openQuestionEditModal(props.question, router)
		}
	}
})
</script>
