<template>
	<div>
		<EmptyState v-if="!loading && !error && filtered.length === 0" info="No videos found." />
		<IonSkeletonText v-if="loading" animated class="h-28 rounded-xl px-4" />
		<div class="showcase">
			<VideoListCard v-for="video in filtered" :key="video.hash" :video="video" />
		</div>
		<div v-if="hasMore && !sliced"
			class="text-center py-8 text-lg text-primary w-full font-semibold cursor-pointer">
			<a @click.prevent="fetchOlderVideos">Load More</a>
		</div>
		<!-- <PageLoading v-if="loading" /> -->
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import VideoListCard from '@app/components/study/videos/VideoListCard.vue'
import { useVideoList } from '@app/composable/study/videos'
import { IonSkeletonText } from '@ionic/vue'

export default defineComponent({
	name: 'ExploreVideosList',
	components: { VideoListCard, IonSkeletonText },
	props: {
		sliced: {
			type: Boolean,
			default: false,
			required: false
		}
	},
	setup (props) {
		const { loading, error, videos, hasMore, fetchOlderVideos } = useVideoList()
		const filtered = computed(() => videos.value.slice(0, props.sliced ? 3 : undefined))
		return { filtered, loading, error, hasMore, fetchOlderVideos }
	}
})
</script>
