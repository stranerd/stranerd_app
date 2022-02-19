<template>
	<div class="flex">
		<YouTube ref="youtube"
			:src="video.link" class="mx-auto flex-grow"
			width="100%" @ready="onReady" />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { VideoEntity } from '@modules/study'
import YouTube from './YouTube.vue'

export default defineComponent({
	name: 'Video',
	components: { YouTube },
	props: {
		video: {
			type: Object as PropType<VideoEntity>,
			required: true
		}
	},
	setup () {
		const youtube = ref(null as typeof YouTube | null)

		const onReady = async () => {
			youtube.value?.playVideo()
		}

		return { youtube, onReady }
	}
})
</script>
