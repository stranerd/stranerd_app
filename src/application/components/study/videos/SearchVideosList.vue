<template>
	<div>
		<EmptyState v-if="filtered.length === 0" info="No results found." />
		<div class="showcase">
			<VideoListCard v-for="video in filtered" :key="video.hash"
				:openMenu="(event) => openMenu(video, event)"
				:video="video" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import VideoListCard from '@app/components/study/videos/VideoListCard.vue'
import { VideoEntity } from '@modules/study'
import { openStudyEntityMenu } from '@app/composable/study/menus'

export default defineComponent({
	name: 'SearchVideosList',
	components: { VideoListCard },
	props: {
		videos: {
			type: Array as PropType<VideoEntity[]>,
			required: true
		},
		sliced: {
			type: Boolean,
			default: false,
			required: false
		}
	},
	setup (props) {
		const openMenu = (entity: VideoEntity, event: Event) => openStudyEntityMenu(entity, {}, event)
		const filtered = computed(() => props.videos.slice(0, props.sliced ? 6 : undefined))
		return { filtered, openMenu }
	}
})
</script>
