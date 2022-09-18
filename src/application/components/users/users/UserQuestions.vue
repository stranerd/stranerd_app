<template>
	<div class="showcase-flex flex-1">
		<form v-if="questions.length && 0" class="p-4 lg:p-0" @submit.prevent="search">
			<IonSearchbar v-model.trim="searchValue" placeholder="Search" type="search" />
		</form>
		<EmptyUserQuestions v-if="!loading && !error && questions.length === 0" />
		<QuestionListCard v-for="question in (searchMode ? searchResults : questions)" :key="question.hash"
			:question="question" />
		<BlockLoading v-if="loading" />
		<LoadMore v-if="hasMore && !searchMode" :load="fetchOlderQuestions" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import QuestionListCard from '@app/components/questions/questions/QuestionListCard.vue'
import { useUserQuestionList } from '@app/composable/users/users/questions'
import { UserEntity } from '@modules/users'

export default defineComponent({
	name: 'UserQuestions',
	components: { QuestionListCard },
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
