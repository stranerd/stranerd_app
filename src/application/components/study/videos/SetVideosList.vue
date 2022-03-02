<template>
	<div>
		<EmptyState v-if="filtered.length === 0" info="You have not saved any videos yet. <br>
Find the ones you need to study for your exams, tests or homeworks and save them now." route="/search/videos" />
		<div class="showcase">
			<VideoListCard v-for="video in filtered" :key="video.hash" :video="video" />
		</div>
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
