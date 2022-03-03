<template>
	<div class="flex flex-col mt-1 py-3">
		<div class="bg-white rounded-xl p-6 flex flex-col mb-4">
			<div class="flex flex-row items-center">
				<Avatar :id="answer.userId" :size="30" :src="answer.avatar" class="mr-2" />
				<span class="font-bold text-main_dark flex items-center gap-1">
					<span>{{ answer.userBio.fullName }}</span>
					<IonIcon v-if="answer.isUserVerified" :icon="checkmarkCircleOutline" color="primary" />
				</span>
			</div>

			<div class="flex flex-col py-4">
				<ion-text class="text-gray font-bold mb-2">
					Main answer
				</ion-text>
				<DisplayHtml :html="answer.title" />
			</div>

			<div v-if="answer.body" class="flex flex-col pb-4">
				<ion-text class="text-gray font-bold mb-2">
					Explanation
				</ion-text>
				<DisplayHtml :html="answer.body" />
			</div>

			<PhotoList v-if="answer.attachments.length" :photos="answer.attachments" class="py-3" />

			<div class="flex flex-row items-center justify-between mt-5">
				<div class="flex flex-row items-center font-bold">
					<div
						:class="[answer.votes.find((v) => v.vote === 1 && v.userId === id) ? 'text-primary':'text-icon_inactive']"
						class="flex flex-row items-center mr-2">
						<span class="mr-1">({{ formatNumber(answer.upVotes) }})</span>
						<IonIcon :icon="thumbsUpOutline" class="text-[22px] cursor-pointer"
							@click="() => voteAnswer(true)" />
					</div>
					<div
						:class="[answer.votes.find((v) => v.vote === -1 && v.userId === id) ? 'text-primary':'text-icon_inactive']"
						class="flex flex-row items-center">
						<span class="mr-1 ">({{ formatNumber(answer.downVotes) }})</span>
						<IonIcon :icon="thumbsDownOutline" class="text-[22px] cursor-pointer"
							@click="() => voteAnswer(false)" />
					</div>
				</div>
				<div class="flex flex-row items-center text-icon_inactive font-bold gap-4">
					<span
						v-if="isLoggedIn && question && !question.isAnswered && !answer.best && question.userId === id"
						class="items-center flex cursor-pointer" @click.prevent="markBestAnswer(question)">
						<span class="mr-1">Mark as best</span>
						<IonIcon :icon="starOutline" class="text-[20px]" />
					</span>
					<IonIcon v-if="answer.best" :icon="starOutline" class="text-[20px] text-yellow_star" />
					<span class="flex items-center" @click="showComments = !showComments">
						<IonIcon :icon="showComments ? chevronDownOutline : chevronUpOutline" />
						<span>{{ showComments ? 'Hide comments' : 'Show comments' }}</span>
					</span>
				</div>
			</div>

			<form class="mt-6 p-3 flex flex-row items-center border-faded_gray border rounded-xl"
				@submit.prevent="createComment">
				<ion-input v-model="commentFactory.body" :autoGrow="true" :rows="1"
					class="px-1 focus:outline-none placeholder-gray-400 mt-0 pt-0"
					placeholder="Add comment" />
				<IonIcon :icon="sendOutline" class="text-[22px] mr-2 text-primary cursor-pointer"
					@click="createComment" />
			</form>
		</div>

		<AnswerCommentsList v-if="showComments" :answerId="answer.id" />
	</div>
	<PageLoading v-if="loading || commentLoading" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { IonIcon } from '@ionic/vue'
import { AnswerEntity, QuestionEntity } from '@modules/questions'
import {
	checkmarkCircleOutline,
	chevronDownOutline,
	chevronUpOutline,
	sendOutline,
	starOutline,
	thumbsDownOutline,
	thumbsUpOutline
} from 'ionicons/icons'
import PhotoList from '@app/components/core/media/PhotoList.vue'
import { useAnswer } from '@app/composable/questions/answers'
import { useCreateAnswerComments } from '@app/composable/questions/answer-comments'
import { useAuth } from '@app/composable/auth/auth'
import AnswerCommentsList from '@app/components/questions/comments/AnswerCommentsList.vue'
import DisplayHtml from '@app/components/core/text/DisplayHtml.vue'
import { formatNumber } from '@utils/commons'

export default defineComponent({
	name: 'AnswerListCard',
	components: { DisplayHtml, IonIcon, PhotoList, AnswerCommentsList },
	props: {
		answer: {
			type: AnswerEntity as PropType<AnswerEntity>,
			required: true
		},
		question: {
			required: true,
			type: Object as PropType<QuestionEntity>
		}
	},
	setup (props) {
		const showComments = ref(false)
		const showExplanation = ref(false)
		const { id, isLoggedIn, user } = useAuth()
		const showEditButton = computed({
			get: () => props.answer.userId === id.value && props.answer.canBeEdited,
			set: () => {
			}
		})
		const showDeleteButton = computed({
			get: () => props.answer.userId === id.value && props.answer.canBeDeleted,
			set: () => {
			}
		})
		const { error, loading, markBestAnswer, voteAnswer } = useAnswer(props.answer)
		const {
			loading: commentLoading,
			error: commentError,
			factory: commentFactory,
			createComment
		} = useCreateAnswerComments(props.answer.id)

		return {
			id,
			isLoggedIn,
			user,
			voteAnswer,
			loading,
			error,
			commentLoading,
			commentError,
			commentFactory,
			createComment,
			markBestAnswer,
			formatNumber,
			thumbsDownOutline,
			thumbsUpOutline,
			starOutline,
			sendOutline,
			chevronUpOutline,
			chevronDownOutline,
			checkmarkCircleOutline,
			showExplanation,
			showComments,
			showEditButton,
			showDeleteButton
		}
	}
})
</script>

<style scoped>
	ion-textarea {
		--background: transparent;
		--padding-bottom: 0;
		--padding-top: 0;
	}
</style>
