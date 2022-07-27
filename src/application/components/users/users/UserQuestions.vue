<template>
	<div class="showcase-flex">
		<form class="p-4 lg:p-0" @submit.prevent="search">
			<IonSearchbar v-model.trim="searchValue" placeholder="Search" type="search" />
		</form>
		<EmptyState v-if="!loading && !error && questions.length === 0">
			<div class="flex flex-col items-center gap-4">
				<img src="@/assets/images/emptyStates/question.svg" alt="question empty state">
				<p class="text-lg font-bold">No questions</p>
				<span class="text-center ">Questions you ask will show up here.</span>
				<IonButton class="btn-outline" style="--border-radius:20px">Ask a question</IonButton>
			</div>
		</EmptyState>
		<UserQuestionsCard v-for="question in (searchMode ? searchResults : questions)" :key="question.hash"
			:question="question" class="border-bottom-line" />
		<BlockLoading v-if="loading" />
		<LoadMore v-if="hasMore && !searchMode" :load="fetchOlderQuestions" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserQuestionsCard from '@app/components/questions/questions/UserQuestionsListCard.vue'
import { useUserQuestionList } from '@app/composable/users/users/questions'
import { UserEntity } from '@modules/users'

export default defineComponent({
	name: 'UserQuestions',
	components: { UserQuestionsCard },
	props: {
		user: {
			type: UserEntity,
			required: true
		}
	},
	setup (props) {
		const {
			questions, error, loading, hasMore, fetchOlderQuestions,
			search, searchMode, searchResults, searchValue
		} = useUserQuestionList(props.user.id)
		return {
			questions, error, loading, hasMore, fetchOlderQuestions,
			searchMode, searchResults, searchValue, search
		}
	}
})
</script>
