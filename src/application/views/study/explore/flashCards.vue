<template>
	<ExploreWrapper>
		<div class="p-4 md:w-8/12 w-full mx-auto">
			<ExploreFlashcards />
		</div>
	</ExploreWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ExploreWrapper from '@app/components/study/explore/ExploreWrapper.vue'
import ExploreFlashcards from '@app/components/study/explore/ExploreFlashcards.vue'

export default defineComponent({
	name: 'Explore FlashCard',
	displayName: 'Explore',
	components: { ExploreWrapper, ExploreFlashcards }
})
</script>

<style lang="scss" scoped>
	.ion-iten-transparent {
		--background: transparent;
	}

	ion-searchbar {
		--box-shadow: 'none';
		--border-radius: 0.5rem;
	}

	.searchbar-input.sc-ion-searchbar-md {
		padding-top: 12px;
		padding-bottom: 12px;
	}
</style>
