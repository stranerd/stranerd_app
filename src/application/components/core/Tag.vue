<template>
	<span v-if="tag"
		class="py-1 px-3 text-sm rounded-2xl bg-bodyBg text-center leading-none">
		<slot :tag="tag">{{ tag }}</slot>
	</span>
</template>

<script lang="ts" setup>

defineProps({
	tag: {
		required: true,
		type: String
	}
})
</script>
