<template>
	<ExploreWrapper>
		<ExploreFlashCardsList />
	</ExploreWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ExploreWrapper from '@app/components/explore/ExploreWrapper.vue'
import ExploreFlashCardsList from '@app/components/study/flashCards/ExploreFlashCardsList.vue'

export default defineComponent({
	name: 'ExploreFlashCards',
	displayName: 'Explore',
	components: { ExploreWrapper, ExploreFlashCardsList }
})
</script>
