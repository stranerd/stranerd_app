<template>
	<div class="bg-white p-6 rounded-xl">
		<div
			class=" rounded-xl bg-white flex flex-col">
			<IonRippleEffect class="rounded-lg" />
			<div class="flex flex-row items-center gap-4">
				<avatar :id="question.userId" :size="28" :src="question.avatar" class="hidden lg:block" />
				<span class="font-bold text-main_dark hidden lg:flex gap-1 items-center">
					<span>{{ question.userBio.fullName }}</span>
					<IonIcon v-if="question.isUserVerified" :icon="checkmarkCircle" color="primary" />
				</span>
				<div class="h-1 w-1 bg-icon_inactive rounded-full hidden lg:block" />
				<span class="font-semibold text-main_dark capitalize">{{ question.subject }}</span>
				<div class="flex flex-row-reverse flex-grow">
					<IonIcon :icon="flag" class="text-[22px] text-main_dark cursor-pointer"
						@click="openReportQuestionModal" />
					<Share
						:text="question.strippedBody"
						cssClass="text-[22px] mr-2 text-main_dark"
						title="Share this question" />
				</div>
			</div>
			<DisplayHtml :html="question.body" class="py-2 text-main_dark mb-3 lg:mb-5" />
			<div class="w-full flex flex-wrap items-center lg:justify-between">
				<div class="lg:hidden flex items-center">
					<avatar :id="question.userId" :size="20" :src="question.avatar" />
					<span class="font-bold text-main_dark text-xs ml-2 flex gap-1 items-center">
						<span>{{ question.userBio.fullName }}</span>
						<IonIcon v-if="question.isUserVerified" :icon="checkmarkCircle" color="primary" />
					</span>
				</div>
				<div class=" flex flex-row items-center ml-auto">
					<span class="font-bold text-gray lg:mr-2">{{ formatTime(question.createdAt) }}</span>
					<div :class="`flex flex-row-reverse items-center`">
						<span class="font-bold text-gray ">
							{{ question.answers.length }} {{ pluralize(question.answers.length, 'answer', 'answers') }}
						</span>
						<span class="h-[5px] w-[5px] rounded-full bg-main_dark mx-3" />
					</div>
				</div>

				<div class="flex gap-2 ml-auto">
					<ion-text v-if="showEditButton" class="font-bold text-primary lg:text-base cursor-pointer"
						@click="openEditModal">Edit
					</ion-text>
					<ion-text v-if="showDeleteButton" class="font-bold text-red lg:text-base cursor-pointer"
						@click="deleteQuestion">Delete
					</ion-text>
				</div>
			</div>
		</div>
		<PhotoList v-if="question.attachments.length" :photos="question.attachments" class="py-3" />

		<ion-button v-if="showAnswerButton"
			class="btn-primary w-full"
			@click="openAnswerModal(question)">
			<span class="mr-2">Add your answer</span>
		</ion-button>
	</div>

	<span v-if="question.isAnswered" />
	<CreateAnswer v-else-if="showAddAnswer" :question="question" class="mt-8" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { IonIcon, IonRippleEffect } from '@ionic/vue'
import { checkmarkCircle, flag, pencil, shareSocial, trashBinOutline } from 'ionicons/icons'
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
	components: {
		IonIcon, IonRippleEffect, Avatar, PhotoList, CreateAnswer
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
		const { loading, error, deleteQuestion } = useDeleteQuestion(props.question.id)

		return {
			shareSocial, flag, pencil, trashBinOutline, checkmarkCircle,
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
