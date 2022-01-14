<template>
	<ExploreWrapper>
		<ExploreVideosList />
	</ExploreWrapper>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ExploreWrapper from '@app/components/explore/ExploreWrapper.vue'
import ExploreVideosList from '@app/components/study/videos/ExploreVideosList.vue'

export default defineComponent({
	name: 'ExploreVideos',
	displayName: 'Explore',
	components: { ExploreWrapper, ExploreVideosList }
})
</script>
