<template>
	<div>
		<template v-if="flashCards.length === 0">
			<EmptyState info="No flashCards available." />
		</template>
		<template v-else>
			<div class="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-8">
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

<style scoped>
	.segment-button-checked {
		color: white !important
	}

	ion-select {
		--background: #F7F7FC;
		background: #F7F7FC;
		--padding-start: 1rem;
		--padding-end: 1rem;
	}

	ion-segment {
		--background: #F7F7FC;
		color: #8B9EB1;
		font-weight: bold;
	}

	ion-segment-button {
		--background-checked: #4D5C6F;
		--background-focused: #4D5C6F;
		--indicator-color: #4D5C6F;
		--indicator-box-shadow: none;
		--padding-top: 0.5rem;
		--padding-bottom: 0.5rem;
		color: #8B9EB1;
		font-weight: bold;
	}
</style>
