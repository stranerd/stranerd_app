<template>
	<div v-if="chat.isMedia" class="flex items-center card-padding rounded-xl" @click="openFile">
		<span>
			<IonIcon
				:icon="chat.isImage ? imageOutline : chat.isVideo ? playCircleOutline : documentOutline"
				class="text-3xl" />
		</span>
		<div class="flex flex-col mr-auto">
			<IonText class="font-semibold text-secondaryText">{{ chat.media.name }}</IonText>
			<span class="text-sm">{{ chat.size }}</span>
		</div>
		<SpinLoading v-if="loading" />
		<span v-else-if="!content">
			<IonIcon :icon="downloadOutline" @click="download" />
		</span>
	</div>
	<div v-if="chat.links.length > 0" class="card-padding flex rounded-xl items-center">
		<IonIcon :icon="linkOutline" class="text-3xl" />
		<span class="font-semibold text-secondaryText" v-html="chat.formattedBody" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { documentOutline, downloadOutline, imageOutline, linkOutline, playCircleOutline } from 'ionicons/icons'
import { useDownload } from '@app/composable/meta/media'
import { isWeb } from '@utils/constants'
import { ChatEntity } from '@modules/messaging'

export default defineComponent({
	name: 'ClassLibraryCard',
	props: {
		chat: {
			type: ChatEntity,
			required: true
		}
	},
	setup (props) {
		const {
			content, loading, openFile, downloadWeb, download: downloadApp
		} = useDownload(props.chat.media?.name ?? '', props.chat.media?.link ?? '', 'messaging/chats')
		const download = isWeb ? downloadWeb : downloadApp
		return {
			imageOutline, playCircleOutline, documentOutline, downloadOutline, linkOutline,
			loading, download, openFile, content
		}
	}
})
</script>
