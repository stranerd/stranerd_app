<template>
	<div :id="answer.id" class="flex flex-col gap-0-5 py-1 border-bottom border-line">
		<NuxtLink :to="`/questions/${answer.questionId}#${answer.id}`" class="text-18">
			<DynamicText>
				{{ answer.trimmedTitle }}
			</DynamicText>
		</NuxtLink>
		<div class="flex items-center gap-0-5">
			<DynamicText class="me-auto">
				Posted {{ formatTime(answer.createdAt) }}
			</DynamicText>
			<img v-if="answer.best" class="sub-icons" src="@app/assets/images/icons/profile-best-answers.svg">
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { AnswerEntity } from '@/modules/questions'
import { formatTime } from '@/utils/dates'

export default defineComponent({
	name: 'UserAnswerListCard',
	props: {
		answer: {
			required: true,
			type: Object as PropType<AnswerEntity>
		}
	},
	setup () {
		return { formatTime }
	}
})
</script>
