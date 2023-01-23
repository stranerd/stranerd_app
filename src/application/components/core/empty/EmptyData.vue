<template>
	<div class="flex justify-center items-center flex-col text-center gap-4 my-auto">
		<img src="@/assets/images/emptyStates/data.svg">
		<p class="text-lg font-bold">{{ title }}</p>
		<span class="text-center">{{ sub }}</span>
	</div>
</template>

<script lang="ts" setup>
defineProps({
	title: {
		type: String,
		required: true
	},
	sub: {
		type: String,
		required: true
	}
})
</script>

<style lang="scss" scoped>
img {
	min-width: 150px;
}
</style>
