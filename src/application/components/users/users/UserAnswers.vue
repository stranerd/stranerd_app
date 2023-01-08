<template>
	<div class="showcase-flex flex-1">
		<form v-if="answers.length" class="p-4 lg:p-0" @submit.prevent="search">
			<IonSearchbar v-model.trim="searchValue" placeholder="Search" type="search" />
		</form>
		<EmptyUserAnswers v-if="!loading && !error && answers.length === 0" />
		<AnswerCard v-for="answer in (searchMode ? searchResults : answers)" :key="answer.hash" :answer="answer"
			class="border-bottom-line" />
		<BlockLoading v-if="loading" />
		<LoadMore v-if="hasMore && !searchMode" :load="fetchOlderAnswers" />
	</div>
</template>

<script lang="ts" setup>
import AnswerCard from '@app/components/questions/answers/UserAnswerListCard.vue'
import { useUserAnswerList } from '@app/composable/users/users/answers'
import { UserEntity } from '@modules/users'

const props = defineProps({
	user: {
		type: UserEntity,
		required: true
	}
})

const {
	answers, error, loading, hasMore, fetchOlderAnswers,
	search, searchMode, searchResults, searchValue
} = useUserAnswerList(props.user.id)
</script>
