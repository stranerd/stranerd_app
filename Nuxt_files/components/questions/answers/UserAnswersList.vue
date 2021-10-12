<template>
	<div>
		<AnswerCard v-for="answer in answers" :key="answer.hash" :answer="answer" />
		<div v-if="hasMore" class="text-center py-2 text-18 text-primaryDark">
			<a @click.prevent="fetchOlderAnswers">Load More</a>
		</div>
		<DisplayWarning
			v-if="!loading && !error && answers.length === 0"
			message="This user has not answered any questions yet."
		/>
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AnswerCard from '@app/components/questions/answers/UserAnswersListCard.vue'
import { useUserAnswerList } from '@/application/hooks/users/user/answers'

export default defineComponent({
	name: 'UserAnswersList',
	components: { AnswerCard },
	props: {
		userId: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const { answers, error, loading, hasMore, fetchOlderAnswers } = useUserAnswerList(props.userId)
		return {
			answers, error, loading, hasMore,
			fetchOlderAnswers
		}
	}
})
</script>
