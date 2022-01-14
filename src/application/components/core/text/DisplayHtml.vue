<template>
	<pre class="font-rale body" v-html="value" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'DisplayHtml',
	props: {
		html: {
			type: String,
			required: true
		}
	},
	setup (props) {
		const value = computed(() => props.html.replace(/<p><br><\/p>/gi, ''))
		return { value }
	}
})
</script>

<style lang="scss" scoped>
	.body {
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
