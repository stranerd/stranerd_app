<template>
	<ExploreWrapper>
		<ExploreFlashCardsList />
	</ExploreWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ExploreWrapper from '@app/components/explore/ExploreWrapper.vue'
import ExploreFlashCardsList from '@app/components/study/flashCards/ExploreFlashCardsList.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'ExploreFlashCards',
	components: { ExploreWrapper, ExploreFlashCardsList },
	setup () {
		useRouteMeta('Explore Flashcards')
	}
})
</script>
