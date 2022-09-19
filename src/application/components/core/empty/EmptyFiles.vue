<template>
	<div class="flex justify-center items-center flex-col text-center gap-4 my-auto">
		<img src="@/assets/images/emptyStates/file.png">
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
</style>
