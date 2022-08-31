<template>
	<div>
		<div v-for="{ key, values } in media" :key="key" class="flex flex-col items-center">
			<IonText class="font-bold py-4">{{ key }}</IonText>
			<div class="w-full showcase-files">
				<div v-for="media in values" :key="media.hash" class="w-full relative"
					@click="openViewFile(media.media, media.path, $router)">
					<video :autoplay="false" :controls="false" :src="media.media.link" />
					<div class="absolute bottom-0 w-full flex items-center justify-between gap-4 p-2 font-semibold">
						<IonIcon :icon="videocamOutline" />
						<IonText class="leading-none">{{ formatDuration(media.media.duration) }}</IonText>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { videocamOutline } from 'ionicons/icons'
import { Media } from '@modules/core'
import { openViewFile } from '@app/composable/meta/media'
import { formatDuration } from '@utils/commons'

export default defineComponent({
	name: 'VideosList',
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
		return { videocamOutline, openViewFile, formatDuration }
	}
})
</script>

<style lang="scss" scoped>
video {
	aspect-ratio: 16 / 10;
	width: 100%;
}
</style>
