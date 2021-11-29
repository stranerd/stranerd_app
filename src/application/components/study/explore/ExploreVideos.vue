<template>
	<div class="md:w-8/12 w-full px-4 mx-auto   mt-8">
	

		<template v-if="videos.length === 0">
			<div class="py-3">
				<empty-state
					info="No Videos to Explore."
				></empty-state>
			</div>
		</template>
		<template v-else>
			<div class="grid lg:grid-cols-3 md:grid-cols-2 gap-5 mt-8">
				<VideoCard  v-for="video in videos" :key="video.id" />
			</div>
		</template>

	
	
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue'

import VideoCard from '@app/components/study/videos/VideoCard.vue'
import { useVideoList } from '@app/composable/study/videos'
export default {
	components: { VideoCard },
    	setup () {
		// const { id, isLoggedIn } = useAuth()
		const { videos, listener, loading, error } = useVideoList()
	

		onMounted(listener.startListener)
		onBeforeUnmount(listener.closeListener)



		return {
			videos,
		}
	}
}
</script>

<style scoped>
ion-select{
   --background: #F7F7FC;  
   background: #F7F7FC;  
   --padding-start: 1rem;
   --padding-end: 1rem;
}
ion-segment{
    --background: #F7F7FC;
    color: #8B9EB1;
    font-weight: bold;
}
ion-segment-button{
    --background-checked: #4D5C6F;
    --background-focused: #4D5C6F;
    --indicator-color: #4D5C6F;
    --indicator-box-shadow:none;
    --padding-top:0.5rem;
    --padding-bottom:0.5rem;
    color: #8B9EB1;
    font-weight: bold;
}
</style>