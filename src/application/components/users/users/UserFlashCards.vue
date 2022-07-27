<template>
	<div class="showcase-flex">
		<form class="p-4 lg:p-0" @submit.prevent="search">
			<IonSearchbar v-model.trim="searchValue" placeholder="Search" type="search" />
		</form>
			<EmptyState v-if="!loading && !error && questions.length === 0">
			<div class="flex flex-col items-center gap-4">
				<img src="@/assets/images/emptyStates/question.svg" alt="question empty state">
				<p class="text-lg font-bold">No answers</p>
				<span class="text-center ">Your answers to questions will show up here.</span>
				<IonButton class="btn-outline" style="--border-radius:20px">Answer a question</IonButton>
			</div>
		</EmptyState>
		<FlashCardListCard v-for="flashCard in (searchMode ? searchResults : flashCards)" :key="flashCard.hash"
			:flashCard="flashCard" class="border-bottom-line" />
		<BlockLoading v-if="loading" />
		<LoadMore v-if="hasMore && !searchMode" :load="fetchOlderFlashCards" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FlashCardListCard from '@app/components/study/flashCards/FlashCardListCard.vue'
import { useUserFlashCardList } from '@app/composable/users/users/flashCards'
import { UserEntity } from '@modules/users'

export default defineComponent({
	name: 'UserFlashCards',
	components: { FlashCardListCard },
	props: {
		user: {
			type: UserEntity,
			required: true
		}
	},
	setup (props) {
		const {
			flashCards, error, loading, hasMore, fetchOlderFlashCards,
			searchMode, searchResults, searchValue, search
		} = useUserFlashCardList(props.user.id)
		return {
			flashCards, error, loading, hasMore, fetchOlderFlashCards,
			searchMode, searchResults, searchValue, search
		}
	}
})
</script>
