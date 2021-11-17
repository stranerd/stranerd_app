<template>
	<div class="md:w-8/12 w-full px-4 mx-auto   mt-8">
	

		<div class="grid lg:grid-cols-3 md:grid-cols-2 gap-5 mt-8">
			<VideoCard  v-for="n in 12" :key="n" />
		</div>
	
	</div>
</template>

<script lang="ts">
import VideoCard from '@app/components/study/videos/VideoCard.vue'
export default {
	components: { VideoCard },
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