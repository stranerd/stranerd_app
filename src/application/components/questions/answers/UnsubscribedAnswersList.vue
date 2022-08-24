<template>
	<div class="py-6 gap-6 flex flex-col">
		<h2 class="px-4 lg:p-0">
			<span class="font-semibold">Answers</span> ({{ formatNumber(question.answers.length) }})
		</h2>
		<div class="bg-itemBg flex flex-col items-center py-8 gap-1 rounded-xl mx-4 lg:mx-0">
			<IonText class="font-bold">You are not subscribed</IonText>
			<IonText class="font-light">Subscribe to be able to see answers to questions</IonText>
			<router-link to="/account/subscription/plans">
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
