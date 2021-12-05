<template>
	<div class="w-full video-bg-box h-48 md:h-52 relative">
		<div class="rounded-tl-3xl rounded-br-3xl video-bg w-full h-full relative">
		</div>
		<button class="absolute w-14 top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
			<img alt="play button" src="@app/assets/images/icons/play-circle.png">
		</button>
	</div>
</template>

<script lang="ts">
export default {
	name: ''
}
</script>

<style scoped>
	.video-bg {
		background: #C4C4C4;
	}

	@media (min-width: 768px) {
		.video-bg-box {
			height: 25rem;
		}
	}
</style>
