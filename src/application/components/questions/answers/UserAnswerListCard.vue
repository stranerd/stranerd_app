<template>
	<div :id="answer.id" class="flex flex-col mt-1 py-3">
		<div class="p-6 rounded-xl bg-white flex flex-col w-full md:text-base text-xs relative cursor-pointer gap-6">
			<div class="w-full flex flex-col gap-3">
				<ion-text class="text-main_dark font-bold">
					Question
					<span class="text-gray">
						(<Subject :subject-id="subjectId" />, {{ formatTime(answer.createdAt) }}) 
					</span>
				</ion-text>
				<router-link :to="`/questions/${answer.questionId}#${answer.id}`" >
					<!-- {{ questions }} -->


					Skipped this page for now performance reason
				</router-link>
			</div>

			<div class="w-full flex flex-col gap-3">
				<ion-text class="text-main_dark font-bold">
					Answer 

					<span class="text-gray">
						({{ formatTime(answer.createdAt) }}) 
					</span>
				</ion-text>
				<router-link :to="`/questions/${answer.questionId}#${answer.id}`" >
					{{ answer.trimmedTitle }}
				</router-link>
			</div>
		

		


		</div>

	</div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { arrowBackOutline, arrowRedo, chevronDown, send, shareSocial, star, thumbsDown, thumbsUp } from 'ionicons/icons'
import { AnswerEntity } from '@modules/questions'
import { formatTime } from '@utils/dates'
// import { useUserQuestionList } from '@app/composable/users/user/questions'
// import Subject from '../subjects/Subject.vue'


export default defineComponent({
	// components: { Subject },
	name: 'eachAnswer',
	props: {
		answer: {
			required: true,
			type: Object as PropType<AnswerEntity>
		}
	},

	setup (props: any) {

		// const {
		// 	subjectId, error, loading, hasMore,questions,
		// 	answered, answeredChoices
		// } = useUserQuestionList(props.answer.questionId)

		return {
			// questions, subjectId,
			formatTime,	arrowBackOutline,arrowRedo,	shareSocial,
			chevronDown,thumbsDown,	thumbsUp, star,
			send
		}
	}
})
</script>
