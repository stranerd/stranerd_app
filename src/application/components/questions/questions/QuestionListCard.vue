<template>
	<router-link
		:class="`py-4 px-6 rounded-xl bg-white flex flex-col justify-between w-full text-xs md:text-sm relative cursor-pointer `"
		:to="`/questions/${question.id}`">
		<ion-ripple-effect class="rounded-lg"></ion-ripple-effect>
		<div class="flex flex-row items-center">
			<div class="flex items-center">
				<avatar :id="question.userId" :size="28" :src="question.avatar" class="mr-2 " />
				<span class="font-bold text-main_dark hidden lg:block">{{ question.userBio.fullName }}</span>
				<span class="h-[5px] w-[5px] rounded-full bg-icon_inactive mr-3 ml-2 hidden lg:block"></span>
				<Subject :key="question.subjectId" :subjectId="question.subjectId" class="font-bold text-main_dark" />
			</div>

			<ion-button v-if="showAnswerButton"
				class="btn-outline text-primary btn-outline-sm ml-auto"
				mode="md"
				@click="openAnswerModal(question)">
				Answer
			</ion-button>
		</div>

		<span class="editor-body py-2 pb-1 text-main_dark leading-normal" v-html="question.trimmedBody" />

		<div class="w-full flex flex-col lg:flex-row lg:justify-between w-full">
			<div class="mt-2 mb-2 flex flex-row items-center gap-y-2 gap-x-2 flex-wrap">
				<Tag v-for="tag in question.tags" :key="tag" :tag="tag" />
			</div>

			<div class="flex justify-between lg:justify-center items-center gap-4 text-gray">
				<span class="text-main_dark lg:mr-2">{{ formatTime(question.createdAt) }}</span>
				<span v-if="question.attachments.length" class="font-italic">
					<IonIcon :icon="image" /> IMG inside
				</span>
				<span class="text-main_dark">
					{{ question.answers.length }} {{ pluralize(question.answers.length, 'answer', 'answers') }}
				</span>
			</div>
		</div>

	</router-link>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { IonRippleEffect } from '@ionic/vue'
import { arrowRedo, flag, image } from 'ionicons/icons'
import { QuestionEntity } from '@modules/questions'
import { formatTime } from '@utils/dates'
import { pluralize } from '@utils/commons'
import Subject from '@app/components/questions/subjects/Subject.vue'
import Avatar from '@app/components/core/Avatar.vue'
import { openAnswerModal } from '@app/composable/questions/answers'
import { useReportModal } from '@app/composable/core/modals'
import Tag from '../tags/Tag.vue'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'QuestionListCard',
	props: {
		colorClass: {
			type: String,
			default: 'bg-white'
		},
		question: {
			type: QuestionEntity,
			required: true
		}
	},
	components: { IonRippleEffect, Avatar, Subject, Tag },
	setup (props) {
		const { id } = useAuth()
		const showAnswerButton = computed({
			get: () => props.question.userId !== id.value && !props.question.isAnswered && !props.question.answers.find((a) => a.userId === id.value),
			set: () => {
			}
		})
		return {
			showAnswerButton,
			openAnswerModal: () => openAnswerModal(props.question),
			openReportQuestionModal: () => useReportModal().openReportQuestion(),
			arrowRedo, flag, image,
			formatTime, pluralize
		}
	}
})
</script>
