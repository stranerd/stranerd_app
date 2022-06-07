<template>
	<router-link :id="question.id" :to="`/questions/${question.id}`" class="card-padding flex flex-col">
		<span>{{ question.trimmedBody }}</span>
		<div class="flex items-center justify-between text-secondaryText text-sub gap-2">
			<QuestionTag :tagId="question.tagId" />
			<IonIcon :icon="ellipse" class="dot" />
			<span class="mr-auto">{{ formatTime(question.createdAt) }}</span>
			<IonIcon v-if="question.attachments.length" :icon="imageOutline" class="text-heading" />
			<span class="flex gap-1 items-center">
				<IonIcon :icon="readerOutline" class="text-heading" />
				<span>{{ formatNumber(question.answers.length) }}</span>
			</span>
		</div>
	</router-link>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ellipse, imageOutline, readerOutline } from 'ionicons/icons'
import { QuestionEntity } from '@modules/questions'
import { formatNumber } from '@utils/commons'
import { formatTime } from '@utils/dates'
import QuestionTag from '@app/components/questions/tags/Tag.vue'

export default defineComponent({
	name: 'UserQuestionsListCard',
	components: { QuestionTag },
	props: {
		question: {
			required: true,
			type: QuestionEntity
		}
	},
	setup () {
		return { formatTime, formatNumber, readerOutline, ellipse, imageOutline }
	}
})
</script>
