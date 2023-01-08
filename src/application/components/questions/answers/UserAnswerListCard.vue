<template>
	<router-link :id="answer.id" :to="`/questions/${answer.questionId}#${answer.id}`"
		class="card-sm card-padding flex flex-col">
		<span>{{ answer.trimmedBody }}</span>
		<div class="flex items-center justify-between text-secondaryText text-sm gap-2">
			<InteractionTag :tagId="answer.tagId" />
			<IonIcon :icon="ellipse" class="dot" />
			<span class="mr-auto">{{ formatTime(answer.createdAt) }}</span>
			<IonIcon v-if="answer.attachments.length" :icon="imageOutline" />
		</div>
	</router-link>
</template>

<script lang="ts" setup>
import { AnswerEntity } from '@modules/questions'
import { formatTime } from '@utils/dates'
import { ellipse, imageOutline } from 'ionicons/icons'
import InteractionTag from '@app/components/interactions/tags/Tag.vue'

defineProps({
	answer: {
		required: true,
		type: AnswerEntity
	}
})
</script>
