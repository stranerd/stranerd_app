<template>
	<BlockLoading v-if="loading" />
	<div v-else class="flex flex-col">
		<UserQuestionsCard v-for="question in questions" :key="question.hash" :question="question"
			class="border-bottom-line" />
		<div v-if="hasMore" class="text-center py-8 text-info font-semibold">
			<a @click.prevent="fetchOlderQuestions">Load More</a>
		</div>
		<EmptyState v-if="!loading && !error && questions.length === 0"
			info="This user hasn't asked any questions yet" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserQuestionsCard from '@app/components/questions/questions/UserQuestionsListCard.vue'
import { useUserQuestionList } from '@app/composable/users/users/questions'
import EmptyState from '@app/components/core/EmptyState.vue'
import { UserEntity } from '@modules/users'

export default defineComponent({
	name: 'ProfileQuestions',
	components: { UserQuestionsCard, EmptyState },
	props: {
		user: {
			type: UserEntity,
			required: true
		}
	},
	setup (props) {
		const { questions, error, loading, hasMore, fetchOlderQuestions } = useUserQuestionList(props.user.id)
		return { questions, error, loading, hasMore, fetchOlderQuestions }
	}
})
</script>
