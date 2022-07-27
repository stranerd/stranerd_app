<template>
	<div class="showcase-flex">
		<form class="p-4 lg:p-0" @submit.prevent="search">
			<IonSearchbar v-model.trim="searchValue" placeholder="Search" type="search" />
		</form>
		<EmptyState v-if="!loading && !error && answers.length === 0">
			<div class="flex flex-col items-center gap-4">
				<img src="@/assets/images/emptyStates/question.svg" alt="question empty state">
				<p class="text-lg font-bold">No answers</p>
				<span class="text-center ">Your answers to questions will show up here.</span>
				<IonButton class="btn-outline" style="--border-radius:20px">Answer a question</IonButton>
			</div>
		</EmptyState>
		<AnswerCard v-for="answer in (searchMode ? searchResults : answers)" :key="answer.hash" :answer="answer"
			class="border-bottom-line" />
		<BlockLoading v-if="loading" />
		<LoadMore v-if="hasMore && !searchMode" :load="fetchOlderAnswers" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AnswerCard from '@app/components/questions/answers/UserAnswerListCard.vue'
import { useUserAnswerList } from '@app/composable/users/users/answers'
import { UserEntity } from '@modules/users'

export default defineComponent({
	name: 'UserAnswers',
	components: { AnswerCard },
	props: {
		user: {
			type: UserEntity,
			required: true
		}
	},
	setup (props) {
		const {
			answers, error, loading, hasMore, fetchOlderAnswers,
			search, searchMode, searchResults, searchValue
		} = useUserAnswerList(props.user.id)
		return {
			answers, error, loading, hasMore, fetchOlderAnswers,
			searchMode, searchResults, searchValue, search
		}
	}
})
</script>
