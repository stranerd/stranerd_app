<template>
	<ExploreWrapper>
		<ExploreDocumentsList />
	</ExploreWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ExploreWrapper from '@app/components/explore/ExploreWrapper.vue'
import ExploreDocumentsList from '@app/components/study/documents/ExploreDocumentsList.vue'
import { useRouteMeta } from '@app/composable/core/states'

export default defineComponent({
	name: 'ExploreDocuments',
	components: { ExploreWrapper, ExploreDocumentsList },
	setup () {
		useRouteMeta('Explore Documents', { back: true })
	}
})
</script>
