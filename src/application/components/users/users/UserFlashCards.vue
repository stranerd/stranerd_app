<template>
	<div class="showcase-flex flex-1">
		<form v-if="flashCards.length && 0" class="p-4 lg:p-0" @submit.prevent="search">
			<IonSearchbar v-model.trim="searchValue" placeholder="Search" type="search" />
		</form>
		<EmptyUserFlashCards v-if="!loading && !error && flashCards.length === 0" />
		<FlashCardListCard v-for="flashCard in (searchMode ? searchResults : flashCards)" :key="flashCard.hash"
			:flashCard="flashCard" />
		<BlockLoading v-if="loading" />
		<LoadMore v-if="hasMore && !searchMode" :load="fetchOlderFlashCards" />
	</div>
</template>

<script lang="ts" setup>
import FlashCardListCard from '@app/components/study/flashCards/FlashCardListCard.vue'
import { useUserFlashCardList } from '@app/composable/users/users/flashCards'
import { UserEntity } from '@modules/users'

const props = defineProps({
	user: {
		type: UserEntity,
		required: true
	}
})

const {
	flashCards, error, loading, hasMore, fetchOlderFlashCards,
	searchMode, searchResults, searchValue, search
} = useUserFlashCardList(props.user.id)
</script>
