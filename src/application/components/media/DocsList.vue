<template>
	<div>
		<div v-for="{ key, values } in media" :key="key" class="showcase-flex">
			<IonText class="font-bold lg:!p-0 card-padding border-bottom-line">{{ key }}</IonText>
			<a v-for="media in values" :key="media.hash"
				class="card-sm card-padding flex items-center border-bottom-line"
				@click="openViewFile(media.media, media.path, $router)">
				<span class="text-3xl">
					<IonIcon :icon="documentOutline" />
				</span>
				<div class="flex w-fit truncate flex-col gap-1 leading-none">
					<span class="truncate">{{ media.media.name }}</span>
					<span class="text-secondaryText text-sm">{{ formatFileSize(media.media.size) }}</span>
				</div>
			</a>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { documentOutline } from 'ionicons/icons'
import { Media } from '@modules/core'
import { openViewFile } from '@app/composable/meta/media'
import { formatFileSize } from '@utils/commons'

defineProps({
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
})
</script>
