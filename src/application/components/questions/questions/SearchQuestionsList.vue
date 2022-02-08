<template>
	<div>
		<EmptyState v-if="filtered.length === 0" info="No results found." />
		<div class="showcase">
			<QuestionListCard v-for="question in filtered" :key="question.hash" :question="question" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import QuestionListCard from '@app/components/questions/questions/RecentQuestionListCard.vue'
import { QuestionEntity } from '@modules/questions'

export default defineComponent({
	name: 'SearchQuestionsList',
	components: { QuestionListCard },
	props: {
		questions: {
			type: Array as PropType<QuestionEntity[]>,
			required: true
		},
		sliced: {
			type: Boolean,
			default: false,
			required: false
		}
	},
	setup (props) {
		const filtered = computed(() => props.questions.slice(0, props.sliced ? 6 : undefined))
		return { filtered }
	}
})
</script>
