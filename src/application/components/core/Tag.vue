<template>
	<span v-if="tag" class="py-[3px] px-3 text-sub rounded-2xl bg-itemBg text-secondaryText text-center">
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
