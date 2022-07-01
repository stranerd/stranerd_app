<template>
	<ExploreWrapper>
		<ExploreNotesList />
	</ExploreWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ExploreWrapper from '@app/components/explore/ExploreWrapper.vue'
import ExploreNotesList from '@app/components/study/notes/ExploreNotesList.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'ExploreNotes',
	components: { ExploreWrapper, ExploreNotesList },
	setup () {
		useRouteMeta('Explore Notes', { back: true })
	}
})
</script>
