<template>
	<div>
		<div class="w-full flex justify-between mb-4">
			<div class="heading font-bold text-main_dark flex items-center">
				<ion-text>Videos</ion-text>
			</div>
			<router-link
				class="text-primary normalText flex items-center font-bold"
				to="/study/explore/videos">
				<span>explore</span>
			</router-link>
		</div>

		<template v-if="videos.length === 0">
			<div class="py-3">
				<EmptyState info="No videos saved." />
			</div>
		</template>

		<template v-else>
			<div class="showcase">
				<VideoListCard v-for="(video, index) in videos" :key="video.hash" :index="index+1" :video="video" />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import VideoListCard from '@app/components/study/videos/VideoListCard.vue'
import { VideoEntity } from '@modules/study'

export default defineComponent({
	name: 'SetVideosList',
	props: {
		videos: {
			type: Array as PropType<VideoEntity[]>,
			required: true
		}
	},
	components: { VideoListCard }
})
</script>

<style>

</style>
