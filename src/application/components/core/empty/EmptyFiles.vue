<template>
	<div class="flex justify-center items-center flex-col text-center gap-4 my-auto">
		<img src="@/assets/images/emptyStates/file.svg">
		<p class="text-lg font-bold">No files</p>
		<span class="text-center">Files will show up here.</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'EmptyFiles'
})
</script>

<style lang="scss" scoped>
	img {
		min-width: 150px;
	}

	ion-button {
		--border-radius: 10rem;
		--padding-top: 1.25rem;
		--padding-bottom: 1.25rem;
	}
</style>
