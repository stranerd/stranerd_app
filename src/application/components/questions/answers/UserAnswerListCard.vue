<template>
	<router-link :id="answer.id" :to="`/questions/${answer.questionId}#${answer.id}`"
		class="card-padding flex flex-col">
		<span>{{ answer.trimmedTitle }}</span>
		<div class="flex items-center justify-between text-secondaryText text-sub gap-2">
			<span class="capitalize">{{ answer.tagId }}</span>
			<IonIcon :icon="ellipse" class="text-[6px]" />
			<span class="mr-auto">{{ formatTime(answer.createdAt) }}</span>
			<IonIcon v-if="answer.attachments.length" :icon="imageOutline" class="text-heading" />
		</div>
	</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { AnswerEntity } from '@modules/questions'
import { formatTime } from '@utils/dates'
import { formatNumber } from '@utils/commons'
import { ellipse, imageOutline, readerOutline } from 'ionicons/icons'

export default defineComponent({
	name: 'UserAnswerListCard',
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
