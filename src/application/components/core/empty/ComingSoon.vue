<template>
	<div class="flex justify-center items-center flex-col text-center gap-4 my-auto">
		<img src="@/assets/images/emptyStates/coming_soon.svg">
		<p class="text-lg font-bold">Coming soon</p>
		<span class="text-center w-[90%] mx-auto text-secondaryText">{{ title }}</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'ComingSoon',
	props: {
		title: {
			type: String,
			required: true
		}
	}
})
</script>

<style lang="scss" scoped>
img {
	min-width: 240px;
}
</style>
