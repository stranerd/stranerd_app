<template>
	<div v-if="media.length" class="hide-scrollbar overflow-x-auto flex gap-2">
		<img v-for="m in media" :key="m.link" :src="m.link" alt=""
			class="rounded-lg aspect-square w-24 lg:w-32"
			@click="openViewFile(m, path)">
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Media } from '@modules/core'
import { openViewFile } from '@app/composable/meta/media'

export default defineComponent({
	name: 'Gallery',
	props: {
		media: {
			type: Array as PropType<Media[]>,
			required: true
		},
		path: {
			type: String,
			required: true
		}
	},
	setup () {
		return { openViewFile }
	}
})
</script>
