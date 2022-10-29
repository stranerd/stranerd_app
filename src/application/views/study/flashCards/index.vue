<template>
	<DefaultLayout>
		<h1>Hello from flashcards</h1>
	</DefaultLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'StudyFlashCards',
	setup () {
		useRouteMeta('Flashcards', { back: true })
	}
})
</script>
