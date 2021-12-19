<template>
	<PageWrapper>
		<template v-slot="{ set, notes }">
			<SetNotesList :notes="notes" :set="set" />
		</template>
	</PageWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageWrapper from '@app/components/study/sets/page/PageWrapper.vue'
import SetNotesList from '@app/components/study/notes/SetNotesList.vue'

export default defineComponent({
	name: 'SetPageNotes',
	displayName: 'Study Set',
	components: { PageWrapper, SetNotesList }
})
</script>
