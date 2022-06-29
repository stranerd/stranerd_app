<template>
	<div class="showcase-flex">
		<form class="p-4 lg:p-0" @submit.prevent="search">
			<IonSearchbar v-model.trim="searchValue" placeholder="Search" type="search" />
		</form>
		<EmptyState v-if="!loading && !error && answers.length === 0" class="border-bottom-line"
			info="This user hasn't answered any questions yet." />
		<AnswerCard v-for="answer in (searchMode ? searchResults : answers)" :key="answer.hash" :answer="answer"
			class="border-bottom-line" />
		<BlockLoading v-if="loading" />
		<LoadMore v-if="hasMore" :load="fetchOlderAnswers" />
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
