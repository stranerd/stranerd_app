<template>
	<div>
		<EmptyState v-if="!loading && !error && filtered.length === 0" info="No videos found." />
		<div class="showcase">
			<VideoListCard v-for="video in filtered" :key="video.hash" :openMenu="(event) => openMenu(video, event)"
				:video="video" />
		</div>
		<div v-if="hasMore && !sliced"
			class="text-center py-8 text-lg text-primary w-full font-semibold cursor-pointer">
			<a @click.prevent="fetchOlderVideos">Load More</a>
		</div>
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import VideoListCard from '@app/components/study/videos/VideoListCard.vue'
import { VideoEntity } from '@modules/study'
import { openStudyEntityMenu } from '@app/composable/study/menus'
import { useVideoList } from '@app/composable/study/videos'

export default defineComponent({
	name: 'ExploreVideosList',
	components: { VideoListCard },
	props: {
		sliced: {
			type: Boolean,
			default: false,
			required: false
		}
	},
	setup (props) {
		const { loading, error, videos, hasMore, fetchOlderVideos } = useVideoList()
		const openMenu = (entity: VideoEntity, event: Event) => openStudyEntityMenu(entity, {}, event)
		const filtered = computed(() => videos.value.slice(0, props.sliced ? 6 : undefined))
		return { filtered, openMenu, loading, error, hasMore, fetchOlderVideos }
	}
})
</script>
