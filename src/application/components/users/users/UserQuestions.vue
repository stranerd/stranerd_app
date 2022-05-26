<template>
	<BlockLoading v-if="loading" />
	<div v-else class="flex flex-col">
		<form class="p-4" @submit.prevent="search">
			<IonSearchbar v-model.trim="searchValue" placeholder="Search" type="search" />
		</form>
		<UserQuestionsCard v-for="question in (searchMode ? searchResults : questions)" :key="question.hash"
			:question="question" class="border-bottom-line" />
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
import { IonSearchbar } from '@ionic/vue'

export default defineComponent({
	name: 'ProfileQuestions',
	components: { UserQuestionsCard, EmptyState, IonSearchbar },
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
