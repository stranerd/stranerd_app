<template>
	<div>
		<div class="w-full flex justify-between mb-4">
			<div class="heading font-bold text-main_dark flex items-center">


				<ion-text class="mr-3">
					Videos
				</ion-text>
				<ion-badge v-if="suggested" class="uppercase">
					Latest
				</ion-badge>
			</div>

			<router-link
				class="text-primary normalText flex items-center font-bold"
				to="/study/explore/videos">
				<span>view all</span>
			</router-link>
		</div>

		<template v-if="videos.length === 0">
			<EmptyState info="No videos available." />
		</template>

		<template v-else>
			<div class="showcase">
				<VideoListCard v-for="video in videos" :key="video.hash" :video="video" />
			</div>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { chevronForwardOutline } from 'ionicons/icons'
import { useVideoList } from '@app/composable/study/videos'
import VideoListCard from '@app/components/study/videos/VideoListCard.vue'
import { IonBadge } from '@ionic/vue'

export default defineComponent({
	name: 'VideosList',
	props: {
		suggested: {
			required: false,
			default: false
		}
	},
	components: { VideoListCard, IonBadge },
	setup () {
		const { videos: allVideos, listener, loading, error } = useVideoList()
		const videos = computed({
			get: () => allVideos.value.slice(0, 6),
			set: () => {
			}
		})

		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)

		return {
			videos,
			chevronForwardOutline
		}
	}
})
</script>

<style>

</style>
