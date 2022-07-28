<template>
	<div class="flex flex-col gap-4">
		<h2 class="text-xl font-bold p-4 lg:p-0 flex items-center">
			<span>Answers</span>
			<span
				:style="`width: ${question.answers.length.toString().length + 0.5}ch; min-width: 2ch;max-width:3.1ch;`"
				class="text-primaryText bg-primaryBg text-xs rounded-full ml-auto aspect-square flex items-center justify-center">
				<span>{{ formatNumber(question.answers.length) }}</span>
			</span>
		</h2>
		<div class="bg-itemBg flex flex-col items-center py-8 gap-1 rounded-xl mx-4 lg:mx-0">
			<IonText class="font-bold">You are not subscribed</IonText>
			<IonText>Subscribe to be able to see answers to questions</IonText>
			<router-link to="/settings/subscription/plans">
				<IonButton class="btn-primary">Subscribe</IonButton>
			</router-link>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { QuestionEntity } from '@modules/questions'
import { formatNumber } from '@utils/commons'

export default defineComponent({
	name: 'UnsubscribedAnswersList',
	props: {
		question: {
			type: QuestionEntity,
			required: true
		}
	},
	setup (props) {
		return { formatNumber }
	}
})
</script>
