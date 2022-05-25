<template>
	<BlockLoading v-if="loading" />
	<div v-else class="flex flex-col">
		<FlashCardListCard v-for="flashCard in flashCards" :key="flashCard.hash"
			:flashCard="flashCard" class="border-bottom-line" />
		<EmptyState v-if="!loading && !error && flashCards.length === 0"
			info="This user hasn't created any flashCards yet" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IonProgressBar } from '@ionic/vue'
import FlashCardListCard from '@app/components/study/flashCards/FlashCardListCard.vue'
import { useUserFlashCardList } from '@app/composable/users/users/flashCards'
import EmptyState from '@app/components/core/EmptyState.vue'
import { UserEntity } from '@modules/users'

export default defineComponent({
	name: 'ProfileFlashCards',
	components: { FlashCardListCard, IonProgressBar, EmptyState },
	props: {
		user: {
			type: UserEntity,
			required: true
		}
	},
	setup (props) {
		const { flashCards, error, loading, hasMore, fetchOlderFlashCards } = useUserFlashCardList(props.user.id)
		return { flashCards, error, loading, hasMore, fetchOlderFlashCards }
	}
})
</script>
