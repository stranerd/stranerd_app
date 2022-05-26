<template>
	<ExploreWrapper>
		<ExploreDocumentsList />
	</ExploreWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ExploreWrapper from '@app/components/explore/ExploreWrapper.vue'
import ExploreDocumentsList from '@app/components/study/documents/ExploreDocumentsList.vue'

export default defineComponent({
	name: 'ExploreDocuments',
	displayName: 'Explore Documents',
	components: { ExploreWrapper, ExploreDocumentsList }
})
</script>
