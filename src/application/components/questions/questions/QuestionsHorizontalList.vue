<template>
	<div class="flex flex-col">
		<span class="flex gap-4 justify-between card-padding !py-0">
			<IonText class="font-bold">{{ title }}</IonText>
			<router-link class="text-info" :to="route">view all</router-link>
		</span>
		<div class="showcase-flex !flex-row overflow-x-auto hide-scrollbar items-start">
			<EmptyState v-if="empty" :info="emptyMsg" />
			<QuestionListCard v-for="question in slice" :key="question.hash" :question="question"
				class="min-w-[85%]" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import QuestionListCard from '@app/components/questions/questions/QuestionListCard.vue'
import { useUserQuestionList } from '@app/composable/users/users/questions'
import { useAuth } from '@app/composable/auth/auth'
import { QuestionEntity } from '@modules/questions'

export default defineComponent({
	name: 'QuestionsHorizontalList',
	props: {
		title: {
			type: String,
			required: true
		},
		route: {
			type: String,
			required: true
		},
		questions: {
			type: Array as PropType<QuestionEntity[]>,
			required: true
		},
		empty: {
			type: Boolean,
			required: true
		},
		emptyMsg: {
			type: String,
			required: true,
			default: ''
		}
	},
	components: { QuestionListCard },
	setup (props) {
		const slice = computed(() => props.questions.slice(0, 10))
		return { slice }
	}
})
</script>
