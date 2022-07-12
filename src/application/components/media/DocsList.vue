<template>
	<div>
		<div v-for="{ key, values } in media" :key="key" class="showcase-flex">
			<IonText class="font-bold lg:!p-0 card-padding border-bottom-line">{{ key }}</IonText>
			<div v-for="media in values" :key="media.hash"
				class="card card-padding flex items-center border-bottom-line"
				@click="openViewFile(media.media, media.path, $router)">
				<span class="text-3xl">
					<IonIcon :icon="documentOutline" />
				</span>
				<div class="flex w-fit truncate flex-col gap-1 leading-none">
					<span class="truncate">{{ media.media.name }}</span>
					<span class="text-secondaryText text-sm">{{ formatFileSize(media.media.size) }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { documentOutline } from 'ionicons/icons'
import { formatFileSize } from '@utils/dates'
import { Media } from '@modules/core'
import { openViewFile } from '@app/composable/meta/media'

export default defineComponent({
	name: 'DocsList',
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
		return { formatFileSize, openViewFile, documentOutline }
	}
})
</script>
