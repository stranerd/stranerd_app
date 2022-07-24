<template>
	<div class="showcase-flex">
		<form class="p-4 lg:p-0" @submit.prevent="search">
			<IonSearchbar v-model.trim="searchValue" placeholder="Search" type="search" />
		</form>
		<EmptyState v-if="!loading && !error && flashCards.length === 0" class="border-bottom-line"
			info="This user hasn't created any flashCards yet" />
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
