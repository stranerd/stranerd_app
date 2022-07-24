<template>
	<div class="showcase-flex">
		<form class="p-4 lg:p-0" @submit.prevent="search">
			<IonSearchbar v-model.trim="searchValue" placeholder="Search" type="search" />
		</form>
		<EmptyState v-if="!loading && !error && questions.length === 0" class="border-bottom-line"
			info="This user hasn't asked any questions yet" />
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
