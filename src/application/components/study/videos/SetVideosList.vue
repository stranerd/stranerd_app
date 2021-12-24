<template>
	<div>
		<template v-if="filtered.length === 0">
			<EmptyState info="No videos saved." />
		</template>
		<template v-else>
			<div class="showcase">
				<VideoListCard v-for="video in filtered" :key="video.hash" :openMenu="(event) => openMenu(video, event)"
					:video="video" />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import VideoListCard from '@app/components/study/videos/VideoListCard.vue'
import { SetEntity, VideoEntity } from '@modules/study'
import { openStudyEntityMenu } from '@app/composable/study/menus'

export default defineComponent({
	name: 'SetVideosList',
	components: { VideoListCard },
	props: {
		set: {
			type: SetEntity,
			required: true
		},
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
		const openMenu = (entity: VideoEntity, event: Event) => openStudyEntityMenu(entity, { set: props.set }, event)
		const filtered = computed(() => props.videos.slice(0, props.sliced ? 6 : undefined))
		return { filtered, openMenu }
	}
})
</script>
