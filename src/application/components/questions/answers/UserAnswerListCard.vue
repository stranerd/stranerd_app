<template>
	<router-link :id="answer.id" :to="`/questions/${answer.questionId}#${answer.id}`"
		class="card-padding flex flex-col">
		<span>{{ answer.trimmedBody }}</span>
		<div class="flex items-center justify-between text-secondaryText text-sm gap-2">
			<QuestionTag :tagId="answer.tagId" />
			<IonIcon :icon="ellipse" class="dot" />
			<span class="mr-auto">{{ formatTime(answer.createdAt) }}</span>
			<IonIcon v-if="answer.attachments.length" :icon="imageOutline" class="text-xl" />
		</div>
	</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AnswerEntity } from '@modules/questions'
import { formatTime } from '@utils/dates'
import { formatNumber } from '@utils/commons'
import { ellipse, imageOutline, readerOutline } from 'ionicons/icons'
import QuestionTag from '@app/components/questions/tags/Tag.vue'

export default defineComponent({
	name: 'UserAnswerListCard',
	components: { QuestionTag },
	props: {
		answer: {
			required: true,
			type: AnswerEntity
		}
	},
	setup () {
		return { formatTime, formatNumber, readerOutline, ellipse, imageOutline }
	}
})
</script>
