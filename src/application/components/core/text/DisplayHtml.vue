<template>
	<pre class="whitespace-pre-wrap break-all font-rale editor-body" v-html="value" />
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
