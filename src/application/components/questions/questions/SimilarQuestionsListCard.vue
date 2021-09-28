<template>
	<div :id="question.id" class="questionStyle">
		<NuxtLink :to="`/questions/${question.id}`" class="d-block">
			<DynamicText>
				{{ question.trimmedBody }}
			</DynamicText>
		</NuxtLink>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { QuestionEntity } from '@modules/questions'
import { formatNumber } from '@utils/commons'

export default defineComponent({
	name: 'SimilarQuestionsListCard',
	props: {
		question: {
			required: true,
			type: Object as PropType<QuestionEntity>
		}
	},
	setup () {
		return { formatNumber }
	}
})
</script>

<style lang="scss" scoped>
	.questionStyle {
		font-size: 16px;
		color: $color-sub;
		padding-bottom: 1rem;
		border-bottom: 1px solid $color-line;
	}
</style>
