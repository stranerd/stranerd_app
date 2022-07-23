<template>
	<span v-if="tag"
		class="py-1 px-3 text-sm rounded-2xl bg-itemBg text-secondaryText text-center leading-none font-bold">
		<slot :tag="tag">{{ tag }}</slot>
	</span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Tag',
	props: {
		tag: {
			required: true,
			type: String
		}
	}
})
</script>
