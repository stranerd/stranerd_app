<template>
	<BlockLoading v-if="loading" />
	<div v-else class="flex flex-col">
		<AnswerCard v-for="answer in answers" :key="answer.hash" :answer="answer" class="border-bottom-line" />
		<div v-if="hasMore" class="text-center py-8 text-info font-semibold">
			<a @click.prevent="fetchOlderAnswers">Load More</a>
		</div>
		<EmptyState v-if="!loading && !error && answers.length === 0"
			info="This user hasn't answered any questions yet." />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AnswerCard from '@app/components/questions/answers/UserAnswerListCard.vue'
import { useUserAnswerList } from '@app/composable/users/users/answers'
import EmptyState from '@app/components/core/EmptyState.vue'
import { UserEntity } from '@modules/users'

export default defineComponent({
	name: 'ProfileAnswers',
	components: { AnswerCard, EmptyState },
	props: {
		user: {
			type: UserEntity,
			required: true
		}
	},
	setup (props) {
		const { answers, error, loading, hasMore, fetchOlderAnswers } = useUserAnswerList(props.user.id)
		return { answers, error, loading, hasMore, fetchOlderAnswers }
	}
})
</script>
