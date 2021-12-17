<template>
	<ExploreWrapper>
		<div>
			<EmptyState v-if="videos.length === 0" info="No available videos" />
			<ExploreVideosList :videos="videos" />
			<PageLoading v-if="loading" />
		</div>
	</ExploreWrapper>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted } from 'vue'
import ExploreWrapper from '@app/components/study/explore/ExploreWrapper.vue'
import { useVideoList } from '@app/composable/study/videos'
import ExploreVideosList from '@app/components/study/videos/ExploreVideosList.vue'

export default defineComponent({
	name: 'ExploreVideos',
	displayName: 'Explore',
	components: { ExploreWrapper, ExploreVideosList },
	setup () {
		const { videos, listener, loading, error } = useVideoList()
		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)
		return { videos, loading, error }
	}
})
</script>
