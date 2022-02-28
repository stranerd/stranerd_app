<template>
	<div :id="answer.id"
		class="p-4 md:p-6 rounded-xl bg-white flex flex-col w-full md:text-base text-xs relative cursor-pointer gap-6">
		<div class="w-full flex flex-col gap-3">
			<ion-text class="text-main_dark font-bold">
				Answer <span class="text-gray">({{ formatTime(answer.createdAt) }})</span>
			</ion-text>
			<router-link :to="`/questions/${answer.questionId}#${answer.id}`">
				{{ answer.trimmedTitle }}
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
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
			formatTime
		}
	}
})
</script>
