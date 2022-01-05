<template>
	<div class="overflow-x-auto flex gap-2">
		<!-- TODO: Add modal to show photo gallery -->
		<span v-for="photo in photos" :key="photo.link" :href="photo.link" target="_blank">
			<img :src="photo.link" alt="" class="rounded-lg border-[1px] border-faded_gray bg-light_gray h-24 w-24 ">
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Media } from '@modules/core'

export default defineComponent({
	name: 'PhotoList',
	props: {
		photos: {
			type: Array as PropType<Media[]>,
			required: true
		}
	}
})
</script>
