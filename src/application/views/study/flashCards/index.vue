<template>
	<DefaultLayout>
		<FlashCardsList />
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import FlashCardsList from '@app/components/study/flashCards/FlashCardsList.vue'

export default defineComponent({
	name: 'StudyFlashCards',
	components: { FlashCardsList },
	setup () {
		useRouteMeta('Flashcards', { back: true })
	}
})
</script>
