<template>
	<div class="flex items-center gap-2">
		<img :style="`width: ${size}rem;`" alt="Stranerd" src="/images/icon.png">
		<span v-if="showName" :style="`font-size: clamp(0.5rem, ${size*0.8}rem, 3rem)`"
			class="font-extrabold">&nbsp;Stranerd</span>
	</div>
</template>

<script lang="ts" setup>
defineProps({
	size: {
		type: Number,
		required: false,
		default: 2
	},
	showName: {
		type: Boolean,
		required: false,
		default: false
	}
})
</script>
