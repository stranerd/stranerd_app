<template>
	<SearchWrapper>
		<template v-slot:default="{ notes }">
			<SearchNotesList :notes="notes" />
		</template>
	</SearchWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SearchWrapper from '@app/components/search/SearchWrapper.vue'
import SearchNotesList from '@app/components/study/notes/SearchNotesList.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'SearchNotes',
	components: { SearchWrapper, SearchNotesList },
	setup () {
		useRouteMeta('SearchNotes', { back: true })
	}
})
</script>
