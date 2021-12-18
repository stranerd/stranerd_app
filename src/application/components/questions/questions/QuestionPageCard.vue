<template>
	<div class="bg-white p-6 rounded-xl">
		<div
			class=" rounded-xl bg-white flex flex-col text-xs md:text-sm ">
			<IonRippleEffect class="rounded-lg" />
			<div class="flex flex-row items-center gap-4">
				<avatar :id="question.userId" :size="28" :src="question.avatar" class="hidden lg:block" />
				<span class="font-bold text-main_dark hidden lg:block">{{ question.userBio.fullName }}</span>
				<div class="h-1 w-1 bg-icon_inactive rounded-full hidden lg:block" />
				<Subject :subjectId="question.subjectId" class="font-semibold text-main_dark" />
				<div class="flex flex-row-reverse flex-grow">
					<IonIcon :icon="flag" class="text-[22px]  text-main_dark cursor-pointer"
						@click="openReportQuestionModal" />
					<share
						:text="question.body"
						:title="question.strippedBody"
						cssClass="text-[22px] mr-2 text-main_dark" />
				</div>
			</div>


			<span class="editor-body py-2 text-main_dark mb-3 lg:mb-5" v-html="question.body" />

			<div class="flex justify-start items-center gap-4 mb-4">

				<Tag v-for="tag in question.tags" :key="tag" :tag="tag" />
			</div>


			<div class="w-full flex flex-wrap items-center lg:justify-between ">


				<div class="lg:hidden flex items-center">
					<avatar :id="question.userId" :size="20" :src="question.avatar" />
					<span class="font-bold text-main_dark text-xs ml-2">{{ question.userBio.fullName }}</span>
				</div>


				<div v-if="!showEditButton" class=" flex flex-row items-center ml-auto">
					<span class="font-bold text-gray lg:mr-2">{{ formatTime(question.createdAt) }}</span>
					<div :class="`flex flex-row-reverse items-center`">
						<span class="font-bold text-gray ">{{
							question.answers.length
						}} {{ pluralize(question.answers.length, 'answer', 'answers') }}</span>
						<span class="h-[5px] w-[5px] rounded-full bg-main_dark mx-3" />
					</div>
				</div>

				<div v-else class="flex gap-2 ml-auto">
					<!-- <button v-if="showEditButton"
						class="mt-2 rounded-lg py-3 px-4 bg-butter_yellow flex items-center gap-1"
						@click="openEditModal"> -->
					<ion-text class="font-bold text-primary lg:text-base cursor-pointer" @click="openEditModal">Edit
					</ion-text>
					<!-- </button> -->
					<!-- <button v-if="showDeleteButton"
						class="mt-2 rounded-lg py-3 px-4 bg-delete_red flex items-center gap-1"
						@click="deleteQuestion"> -->
					<ion-text class="font-bold text-red lg:text-base cursor-pointer" @click="deleteQuestion">Delete
					</ion-text>
					<!-- </button> -->
				</div>
			</div>
		</div>
		<PhotoList v-if="question.attachments" :photos="question.attachments" class="py-3" />

		<ion-button v-else-if="showAnswerButton"
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
import { flag, pencil, shareSocial, trashBinOutline } from 'ionicons/icons'
import { QuestionEntity } from '@modules/questions'
import Subject from '@app/components/questions/subjects/Subject.vue'
import Avatar from '@app/components/core/Avatar.vue'
import PhotoList from '@app/components/core/PhotoList.vue'
import CreateAnswer from '@app/components/questions/answers/create.vue'
import { pluralize } from '@utils/commons'
import { useAuth } from '@app/composable/auth/auth'
import { openAnswerModal, showAddAnswer } from '@app/composable/questions/answers'
import { openQuestionEditModal, useDeleteQuestion } from '@app/composable/questions/questions'
import { formatTime } from '@utils/dates'
import { useRouter } from 'vue-router'
import { useReportModal } from '@app/composable/core/modals'
import Tag from '../tags/Tag.vue'

export default defineComponent({
	name: 'QuestionPageCard',
	props: {
		question: {
			type: QuestionEntity,
			required: true
		}
	},
	components: {
		IonIcon, IonRippleEffect, Avatar, Subject, PhotoList, CreateAnswer, Tag
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
			shareSocial, flag, pencil, trashBinOutline,
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
