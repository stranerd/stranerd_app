<template>
	<div>
		<div class="w-full flex justify-between">
			<span class="heading font-bold text-main_dark">
				Videos
			</span>

			<router-link
				class="text-primary normalText flex items-center font-bold "
				to="/study/videos/explore">
				<span>view all</span>
				<ion-icon :icon="chevronForwardOutline" class="text-xs md:text-xl" />
			</router-link>
		</div>

		<template v-if="videos.length === 0">
			<div class="py-3">
				<EmptyState info="No Videos Available." />
			</div>
		</template>
		<template v-else>
			<Swiper :freeMode="true" :items="videos" :slides="1.1" class="mt-2 overflow-x-auto flex"
				slideClass="flex md:!w-[300px] !w-[265px] mr-3 lg:!w-2/5 lg:!max-w-[18rem] !mr-6">
				<template v-slot:default="{ item, index }">
					<VideoCard :index="index + 1" :video="item" colorClass="bg-light_blue" />
				</template>
			</Swiper>
		</template>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { IonIcon } from '@ionic/vue'
import { chevronForwardOutline } from 'ionicons/icons'
import Swiper from '@app/components/core/Swiper.vue'
import { useVideoList } from '@app/composable/study/videos'
import VideoCard from '@app/components/study/videos/StudyVideoListCard.vue'

export default defineComponent({
	name: 'StudyVideosList',
	components: { IonIcon, Swiper, VideoCard },
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
