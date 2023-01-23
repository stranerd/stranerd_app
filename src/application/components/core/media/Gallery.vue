<template>
	<div v-if="media.length" class="hide-scrollbar overflow-x-auto flex gap-2">
		<img v-for="m in media" :key="m.link" :src="m.link" alt=""
			class="rounded-lg aspect-square w-24 lg:w-32"
			@click="openViewFile(m, path, $router)">
	</div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { Media } from '@modules/core'
import { openViewFile } from '@app/composable/meta/media'

defineProps({
	media: {
		type: Array as PropType<Media[]>,
		required: true
	},
	path: {
		type: String,
		required: true
	}
})
</script>
