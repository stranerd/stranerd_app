<template>
	<div class="flex flex-col">
		<form class="p-4" @submit.prevent="search">
			<IonSearchbar v-model.trim="searchValue" placeholder="Search" type="search" />
		</form>
		<FlashCardListCard v-for="flashCard in (searchMode ? searchResults : flashCards)" :key="flashCard.hash"
			:flashCard="flashCard" class="border-bottom-line" />
		<EmptyState v-if="!loading && !error && flashCards.length === 0" class="border-bottom-line"
			info="This user hasn't created any flashCards yet" />
		<LoadMore v-if="hasMore" :load="fetchOlderFlashCards" />
		<BlockLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import FlashCardListCard from '@app/components/study/flashCards/FlashCardListCard.vue'
import { useUserFlashCardList } from '@app/composable/users/users/flashCards'
import EmptyState from '@app/components/core/EmptyState.vue'
import { UserEntity } from '@modules/users'

export default defineComponent({
	name: 'ProfileFlashCards',
	components: { FlashCardListCard, EmptyState },
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
