<template>
	<div>
		<div class="py-4 px-4 rounded-lg bg-light_gray flex flex-col text-xs md:text-sm">
			<IonRippleEffect class="rounded-lg" />
			<div class="flex flex-row items-center">
				<span class="mr-2"><avatar :photo-url="question.avatar?.link" size="28" /></span>
				<span class="font-bold text-dark_gray">{{ question.userBio.fullName }}</span>
				<div class="flex flex-row-reverse flex-grow">
					<IonIcon :icon="flag" class="text-[22px]  text-icon_inactive" />
					<IonIcon :icon="arrowRedo" class="text-[22px] mr-2 text-icon_inactive" />
				</div>
			</div>

			<div class="mt-3 flex flex-row items-center">
				<span class="h-[5px] w-[5px] rounded-full bg-icon_inactive mr-3"></span>
				<Subject :subjectId="question.subjectId" class="font-semibold text-dark_gray" />
			</div>

			<pre class="py-2 text-dark_gray leading-normal mb-3 lg:mb-5" v-html="question.body" />

			<div class="w-full flex flex-col lg:flex-row lg:justify-between w-full">
				<div class="mt-2 mb-2 flex flex-row items-center gap-y-2 gap-x-2 flex-wrap">
					<span v-for="tag in question.tags" :key="tag">
						<span class="py-1 px-2 font-bold text-white bg-faded_gray rounded-lg inline-block">
							{{ tag }}
						</span>
					</span>
				</div>

				<div class="mt-2 flex flex-row items-center">
					<span class="font-bold text-icon_inactive lg:mr-2">{{ formatTime(question.createdAt) }}</span>
					<div :class="`flex flex-row-reverse items-center flex-grow`">
						<span class="font-bold text-icon_inactive">{{
							question.answers.length
						}} {{ pluralize(question.answers.length, 'answer', 'answers') }}</span>
						<span class="h-[5px] w-[5px] rounded-full bg-icon_inactive mr-3" />
					</div>
				</div>
			</div>
		</div>
		<PhotoList v-if="question.attachments" :photos="question.attachments" class="py-3" />
		<span v-if="question.isAnswered" />
		<CreateAnswer v-else-if="showAddAnswer" :question="question" class="mt-8" />
		<button v-else-if="showAnswerButton"
			class="py-3 px-4 mt-1 justify-center rounded-lg text-white bg-dark_gray w-full font-bold flex flex-row items-center"
			@click="openAnswerModal(question)">
			<span class="mr-2">Add your answer</span>
			<span class="h-1 w-1 rounded-full bg-white mr-2"></span>
			<span class="mr-1 text-sm">+{{ question.creditable }}</span>
			<img class="h-4" src="/assets/images/bronze.svg" />
		</button>
	</div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import { IonIcon, IonRippleEffect } from '@ionic/vue'
import { arrowRedo, flag } from 'ionicons/icons'
import { QuestionEntity } from '@modules/questions'
import Subject from '@app/components/questions/subjects/Subject.vue'
import Avatar from '@app/components/core/AvatarUser.vue'
import PhotoList from '@app/components/core/PhotoList.vue'
import CreateAnswer from '@app/components/questions/answers/create.vue'
import { pluralize } from '@utils/commons'
import { useAuth } from '@app/composable/auth/auth'
import { openAnswerModal, showAddAnswer } from '@app/composable/questions/answers'
import { useDeleteQuestion } from '@app/composable/questions/questions'
import { formatTime } from '@utils/dates'

export default defineComponent({
	name: 'QuestionPageCard',
	props: {
		question: {
			type: QuestionEntity,
			required: true
		}
	},
	components: {
		IonIcon, IonRippleEffect, Avatar, Subject, PhotoList, CreateAnswer
	},
	setup (props) {
		const { id } = useAuth()

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
			arrowRedo, flag, formatTime, pluralize,
			showAnswerButton, openAnswerModal, showAddAnswer,
			showEditButton, showDeleteButton,
			loading, error, deleteQuestion
		}
	}
})
</script>
