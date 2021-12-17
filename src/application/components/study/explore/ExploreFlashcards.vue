<template>
	<div>
		<template v-if="flashCards.length === 0">
			<EmptyState info="No flashCards available." />
		</template>
		<template v-else>
			<div class="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
				<FlashCardCard v-for="flashCard in flashCards" :key="flashCard.id" :flashCard="flashCard" />
			</div>
		</template>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import FlashCardCard from '@app/components/study/flashCards/FlashCardListCard.vue'
import { useFlashCardList } from '@app/composable/study/flashCards'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'ExploreFlashCards',
	components: { FlashCardCard },
	props: {
		sliced: {
			type: Boolean,
			default: false,
			required: false
		}
	},
	setup () {
		const { id, isLoggedIn } = useAuth()
		const { flashCards, listener, loading, error } = useFlashCardList()

		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)

		return {
			flashCards, loading,
			id, isLoggedIn
		}
	}
})
</script>
