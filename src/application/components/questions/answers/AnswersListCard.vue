<template>
	<div class="flex flex-col mt-1 py-3 ">
		<div class="bg-light_gray rounded-lg py-4 px-3 flex flex-col border border-faded_gray lg:border-0 mb-4">
			<div class="flex flex-row items-center">
				<Avatar :id="answer.userId" :size="30" :src="answer.avatar" class="mr-2" />
				<span class="font-bold text-main_dark">{{ answer.userBio.fullName }}</span>

			</div>

			<div class="flex flex-col py-4">
				<ion-text class="text-icon_inactive font-bold mb-2">
					Main answer
				</ion-text>
				<span v-html="answer.title" />

			</div>

			<div v-if="answer.body" class="flex flex-col pb-4">
				<ion-text class="text-icon_inactive font-bold mb-2">
					Explanation
				</ion-text>
				<span v-html="answer.body" />
				<div v-if="answer.attachments" class="col-span-12 py-3">
					<photo-list :photos="answer?.attachments"></photo-list>
				</div>

			</div>

			<div class="flex flex-row items-center justify-between mt-5">
				<div class="flex flex-row items-center text-primary font-bold">
					<span class="mr-1">({{ answer.upVotes }})</span>
					<IonIcon :icon="thumbsUp" class="text-[22px] mr-2 cursor-pointer" @click="() => voteAnswer(true)" />
					<span class="mr-1 text-icon_inactive">({{ answer.downVotes }})</span>
					<IonIcon :icon="thumbsDown" class="text-[22px] text-icon_inactive cursor-pointer"
						@click="() => voteAnswer(false)" />
				</div>
				<div class="flex flex-row items-center text-icon_inactive font-bold">
					<template
						v-if="isLoggedIn && question && !question.isAnswered && !answer.best && question.userId === id"
						class="items-center flex justify-between cursor-pointer" @click.prevent="markBestAnswer">
						<span class="mr-1">Mark as best</span>
						<IonIcon :icon="star" class="text-[20px]" />
					</template>
					<template v-if="answer.best">
						<IonIcon :icon="star" class="text-[20px] text-star_yellow" />
					</template>
				</div>
			</div>
		</div>

		<div v-for="comment in comments" :key="comment.hash" class="flex mt-2 items-center">
			<Avatar :id="comment.userId" :size="24" :src="comment.avatar" class="mr-2" />
			<ion-text class="text-dark_gray">
				<b>{{ comment.userBio.firstName }} : </b>
				{{ comment.body }}
			</ion-text>
		</div>
		<div class="mt-2 py-1 flex flex-row border-faded_gray border-b-2">
			<textarea v-model="commentFactory.body" class="px-1  focus:outline-none placeholder-gray-400 flex-grow"
				placeholder="Leave a comment" />
			<IonIcon :icon="send" class="text-[22px] mr-2 text-main_dark cursor-pointer" @click="createComment" />
		</div>
	</div>
	<page-loading v-if="loading || commentLoading" />
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { IonIcon } from '@ionic/vue'
import { AnswerEntity, QuestionEntity } from '@modules/questions'
import {
	arrowBackOutline,
	arrowRedo,
	chevronDown,
	chevronUp,
	send,
	shareSocial,
	star,
	thumbsDown,
	thumbsUp
} from 'ionicons/icons'

import Avatar from '@app/components/core/Avatar.vue'
import PhotoList from '@app/components/core/PhotoList.vue'
import { useAnswer } from '@app/composable/questions/answers'
import PageLoading from '../../core/PageLoading.vue'
import { useAnswerCommentList, useCreateAnswerComments } from '@app/composable/questions/answer-comments'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'AnswerListCard',
	components: { IonIcon, Avatar, PhotoList, PageLoading },
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

		const { comments } = useAnswerCommentList(props.answer.id)

		return {
			comments,
			id, isLoggedIn, user,
			voteAnswer, loading,
			commentLoading, commentError,
			commentFactory, createComment,
			markBestAnswer,

			arrowBackOutline,
			arrowRedo,
			shareSocial,
			chevronDown,
			thumbsDown,
			thumbsUp,
			star,
			send,
			chevronUp,
			showExplanation
		}
	}
})
</script>
