<template>
	<div>
		<template v-if="filtered.length === 0">
			<EmptyState info="No videos available." />
		</template>
		<template v-else>
			<div class="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
				<VideoListCard v-for="video in filtered" :key="video.hash" :video="video" />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import VideoListCard from '@app/components/study/videos/VideoListCard.vue'
import { SetEntity, VideoEntity } from '@modules/study'

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
		const filtered = computed(() => props.videos.slice(0, props.sliced ? 6 : undefined))
		return { filtered }
	}
})
</script>
