<template>
	<div>
		<div class="w-full flex justify-between">
			<span class="heading font-bold text-main_dark">
				Videos
			</span>

			<router-link v-if="true && isLoggedIn"
				class="text-primary normalText flex items-center font-bold "
				to="/study/video/explore">
				<span>view all</span>
				<ion-icon :icon="chevronForwardOutline" class="text-xs md:text-xl"></ion-icon>
			</router-link>
		</div>

		<template v-if="videos.length === 0">
			<div class="py-3">
				<empty-state
					info="You Have no Videos Available."
				></empty-state>
			</div>
		</template>
		<template v-else>
			<Swiper :freeMode="true" :items="videos" :slides="1.1" class="mt-2 overflow-x-auto flex"
				slideClass="flex md:!w-[300px] !w-[265px] mr-3 lg:!w-2/5 lg:!max-w-[18rem] !mr-6">
				<template v-slot:default="{ item, index }">
					<VideoCard :colorClass=" index  === 0 ? 'bg-light_blue' : 'bg-light_blue'"  :index="index + 1" :video="item"
					/>

				</template>
			</Swiper>
		</template>
	
	</div>
</template>




<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'
import { IonIcon } from '@ionic/vue'
import { chevronBackOutline, chevronForwardOutline, ellipse } from 'ionicons/icons'
import Swiper from '@app/components/core/Swiper.vue'
import { useAuth } from '@app/composable/auth/auth'
import { useVideoList } from '@app/composable/study/videos'
import VideoCard from './VideoCard.vue'

export default defineComponent({
	name: 'RecentTransactions',
	components: { IonIcon, Swiper,  VideoCard },
	setup () {
		const { id, isLoggedIn } = useAuth()
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
			chevronForwardOutline, chevronBackOutline, ellipse,
			 isLoggedIn, 
		}
	}
})
</script>

<style>

</style>
