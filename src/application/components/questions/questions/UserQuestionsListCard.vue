<template>
	<router-link :id="question.id" :to="`/questions/${question.id}`" class="card-padding flex flex-col">
		<span>{{ question.trimmedBody }}</span>
		<div class="flex items-center justify-between text-secondaryText text-sm gap-2">
			<InteractionTag :tagId="question.tagId" />
			<IonIcon :icon="ellipse" class="dot" />
			<span class="mr-auto">{{ formatTime(question.createdAt) }}</span>
			<IonIcon v-if="question.attachments.length" :icon="imageOutline" />
			<span class="flex gap-1 items-center">
				<IonIcon :icon="readerOutline" />
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
import InteractionTag from '@app/components/interactions/tags/Tag.vue'

export default defineComponent({
	name: 'UserQuestionsListCard',
	components: { InteractionTag },
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
