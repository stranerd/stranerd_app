<template>
	<div :id="answer.id" class="flex flex-col  py-3 mt-4">
		<div class="p-6 rounded-xl bg-white flex flex-col w-full md:text-base text-xs relative cursor-pointer gap-6">
			<div class="w-full flex flex-col gap-3">
				<ion-text class="text-main_dark font-bold">
					Answer <span class="text-gray">({{ formatTime(answer.createdAt) }})</span>
				</ion-text>
				<router-link :to="`/questions/${answer.questionId}#${answer.id}`">
					{{ answer.trimmedTitle }}
				</router-link>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { arrowBackOutline, arrowRedo, chevronDown, send, shareSocial, star, thumbsDown, thumbsUp } from 'ionicons/icons'
import { AnswerEntity } from '@modules/questions'
import { formatTime } from '@utils/dates'

export default defineComponent({
	name: 'UserAnswerListCard',
	props: {
		answer: {
			required: true,
			type: AnswerEntity
		}
	},
	setup () {
		return {
			formatTime, arrowBackOutline, arrowRedo, shareSocial,
			chevronDown, thumbsDown, thumbsUp, star,
			send
		}
	}
})
</script>
