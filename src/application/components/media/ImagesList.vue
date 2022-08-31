<template>
	<div>
		<div v-for="{ key, values } in media" :key="key" class="flex flex-col items-center">
			<IonText class="font-bold py-4">{{ key }}</IonText>
			<div class="w-full showcase-files">
				<img v-for="media in values" :key="media.hash" :src="media.media.link"
					alt="" @click="openViewFile(media.media, media.path, $router)">
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Media } from '@modules/core'
import { openViewFile } from '@app/composable/meta/media'

export default defineComponent({
	name: 'ImagesList',
	props: {
		media: {
			type: Array as PropType<{
				key: string,
				values: {
					hash: string,
					createdAt: number
					media: Media
					path: string
				}[]
			}[]>,
			required: true
		}
	},
	setup () {
		return { openViewFile }
	}
})
</script>

<style lang="scss" scoped>
img {
	aspect-ratio: 1/1;
	width: 100%;
}
</style>
