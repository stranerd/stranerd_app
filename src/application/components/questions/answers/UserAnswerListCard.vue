<template>
	<router-link :id="answer.id" :to="`/questions/${answer.questionId}#${answer.id}`"
		class="card-padding rounded-xl bg-white flex flex-col w-full text-sub relative cursor-pointer">
		<ion-text class="text-main_dark font-bold">
			Answer <span class="text-gray">({{ formatTime(answer.createdAt) }})</span>
		</ion-text>
		<span>{{ answer.trimmedTitle }}</span>
	</router-link>
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
