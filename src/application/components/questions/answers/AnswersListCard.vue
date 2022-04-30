<template>
	<div class="bg-white rounded-xl flex flex-col card-padding">
		<div class="flex items-center">
			<Avatar :id="answer.userId" :name="answer.userBio.fullName" :size="24" :src="answer.userBio.photo"
				class="mr-2" />
			<span class="font-semibold text-main_dark flex items-center gap-1">
				<span>{{ answer.userBio.fullName }}</span>
				<Verified :verified="answer.isUserVerified" />
			</span>
		</div>

		<div class="flex flex-col">
			<ion-text class="text-gray font-semibold">Answer</ion-text>
			<DisplayHtml :html="answer.title" />
		</div>

		<div v-if="answer.body" class="flex flex-col">
			<ion-text class="text-gray font-semibold">Explanation</ion-text>
			<DisplayHtml :html="answer.body" />
		</div>

		<PhotoList v-if="answer.attachments.length" :photos="answer.attachments" />

		<div class="flex items-center gap-2 text-icon_inactive">
			<div
				:class="[answer.votes.find((v) => v.vote === 1 && v.userId === id) ? 'text-primary':'text-icon_inactive']"
				class="flex flex-row items-center mr-2">
				<IonIcon :icon="thumbsUpOutline" class="text-[22px] cursor-pointer"
					@click="() => voteAnswer(true)" />
				<span class="ml-1">{{ formatNumber(answer.upVotes) }}</span>
			</div>
			<div
				:class="[answer.votes.find((v) => v.vote === -1 && v.userId === id) ? 'text-primary':'text-icon_inactive']"
				class="flex flex-row items-center mr-2">
				<IonIcon :icon="thumbsDownOutline" class="text-[22px] cursor-pointer"
					@click="() => voteAnswer(false)" />
				<span class="ml-1 ">{{ formatNumber(answer.downVotes) }}</span>
			</div>
			<div class="flex items-center">
				<IonIcon :icon="chatbubbleOutline" class="text-[22px] cursor-pointer"
					@click="showComments = !showComments" />
				<span class="ml-1">{{ formatNumber(comments.length) }}</span>
			</div>
			<span
				v-if="isLoggedIn && question && !question.isAnswered && !answer.best && question.userId === id"
				class="items-center flex cursor-pointer" @click.prevent="markBestAnswer(question)">
				<span class="mr-1">Mark as best</span>
				<IonIcon :icon="starOutline" class="text-[20px]" />
			</span>
			<IonIcon v-if="answer.best" :icon="starOutline" class="text-[20px] text-yellow_star" />
		</div>

		<form class="flex gap-2 pr-4 items-center bg-new_gray rounded-lg"
			@submit.prevent="createComment">
			<ion-input v-model="commentFactory.body" :autoGrow="true"
				class="focus:outline-none placeholder-gray-400 mt-0 pt-0"
				placeholder="Add comment" />
			<IonIcon :icon="paperPlaneOutline" class="text-[22px] text-primary cursor-pointer"
				@click="createComment" />
		</form>

		<AnswerCommentsList v-if="showComments" :answerId="answer.id" />
	</div>
	<PageLoading v-if="loading || commentLoading" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { IonIcon } from '@ionic/vue'
import { AnswerEntity, QuestionEntity } from '@modules/questions'
import {
	chatbubbleOutline,
	chevronDownOutline,
	chevronUpOutline,
	paperPlaneOutline,
	starOutline,
	thumbsDownOutline,
	thumbsUpOutline
} from 'ionicons/icons'
import PhotoList from '@app/components/core/media/PhotoList.vue'
import { useAnswer } from '@app/composable/questions/answers'
import { useAnswerCommentList, useCreateAnswerComments } from '@app/composable/questions/answer-comments'
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
		const { comments } = useAnswerCommentList(props.answer.id)
		const {
			loading: commentLoading,
			error: commentError,
			factory: commentFactory,
			createComment
		} = useCreateAnswerComments(props.answer.id)

		return {
			id, chatbubbleOutline,
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
			paperPlaneOutline,
			chevronUpOutline,
			chevronDownOutline,
			showExplanation,
			showComments,
			showEditButton,
			showDeleteButton,
			comments
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
