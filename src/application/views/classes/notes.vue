<template>
	<classWrapper>
		<ExploreNotesList />
	</classWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import classWrapper from '@app/components/classes/ClassWrapper.vue'
import ExploreNotesList from '@app/components/study/notes/ExploreNotesList.vue'

export default defineComponent({
	name: 'ClassNotes',
	displayName: 'Classes',
	components: { classWrapper, ExploreNotesList }
})
</script>
