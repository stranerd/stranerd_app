<template>
	<div class="w-full h-44 md:h-80 relative">
		<div class="rounded-tl-3xl rounded-br-3xl video-bg w-full h-full relative">        
		</div>
		<button class="absolute w-14 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
			<img src="@app/assets/images/icons/play-circle.png" alt="play button">      
		</button>
	</div>
</template>

<script lang="ts">
export default {
	name: '',
}
</script>

<style scoped>
.video-bg {
	background: #C4C4C4;
}
</style>