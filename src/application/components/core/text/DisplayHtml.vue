<template>
	<pre class="body" v-html="value" />
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
	html: {
		type: String,
		required: true
	}
})

const value = computed(() => props.html.replace(/<p><br><\/p>/gi, ''))
</script>

<style lang="scss" scoped>
.body {
	font-family: inherit;
	white-space: pre-wrap;
	word-wrap: break-word;
	word-break: break-word;
	overflow-wrap: break-word;

	p {
		margin-bottom: 0.25rem;
	}

	& > p:last-child {
		margin-bottom: 0;
	}

	* {
		word-wrap: break-word;
		word-break: break-word;
		overflow-wrap: break-word;
	}
}
</style>
