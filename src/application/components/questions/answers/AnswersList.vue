<template>
	<div class="flex flex-col">
		<h2 class="text-main_dark lg:text-xl text-base font-bold">
			Answers  <span class="text-gray">({{ question.answers.length }})</span>
		</h2>
		<template v-if="answers.length">
			<AnswersListCard v-for="answer in answers" :key="answer.hash" :answer="answer" :question="question" />
		</template>

		<empty-state v-else
			:link="false"
			class="mt-4  text-xs lg:text-base "
			info="No answers yet. <br/>
Help Timmy answer this question!"
			btnText="Answer it"
			:onClick="openAnswerModal"
			:funcParams="question"
		/>

		

	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { useAnswerList } from '@app/composable/questions/answers'
import { QuestionEntity } from '@modules/questions'
import AnswersListCard from '@app/components/questions/answers/AnswersListCard.vue'
import EmptyState from '../../core/EmptyState.vue'
import { openAnswerModal } from '@app/composable/questions/answers'


export default defineComponent({
	name: 'AnswersList',
	props: {
		question: {
			type: QuestionEntity,
			required: true
		}
	},
	components: { AnswersListCard, EmptyState },
	setup (props) {
		const { answers, listener, error, loading } = useAnswerList(props.question.id)

		
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { 
			openAnswerModal: () => openAnswerModal(props.question),
			answers, error, loading }
	}
})
</script>
