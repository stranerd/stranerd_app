<template>
	<div class="flex justify-center items-center flex-col text-center gap-6 my-auto">
		<img src="@/assets/images/emptyStates/404.svg">
		<span>{{ title }}</span>
	</div>
</template>

<script lang="ts" setup>
defineProps({
	title: {
		type: String,
		required: false,
		default: 'Page not found'
	}
})
</script>

<style lang="scss" scoped>
img {
	min-width: 150px;
}
</style>
