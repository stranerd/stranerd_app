<template>
	<HomeLayout>
		<FlashCard />
	</HomeLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'
import FlashCard from '@app/components/landing/flashcard-contest/index.vue'

export default defineComponent({
	name: 'Flashcard-contest',
	components: { FlashCard },
	setup () {
		useRouteMeta('Flashcard-context', {})
	}
})
</script>
