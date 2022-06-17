<template>
	<div v-if="discussion.isMedia" class="bg-white flex items-center card-padding rounded-xl" @click="openFile">
		<span>
			<IonIcon
				:icon="discussion.isImage ? imageOutline : discussion.isVideo ? playCircleOutline : documentOutline"
				class="text-5xl text-gray" />
		</span>
		<div class="flex flex-col mr-auto">
			<IonText class="font-semibold text-secondaryText">{{ discussion.media.name }}</IonText>
			<span class="text-sm">{{ discussion.size }}</span>
		</div>
		<SpinLoading v-if="loading" class="text-3xl" />
		<span v-else-if="!content">
			<IonIcon :icon="downloadOutline" class="text-3xl" color="primary" @click="download" />
		</span>
	</div>
	<div v-if="discussion.links.length > 0" class="bg-white card-padding flex rounded-xl items-center">
		<IonIcon :icon="linkOutline" class="text-5xl text-itemBg" />
		<span class="font-semibold text-secondaryText" v-html="discussion.formattedContent" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { DiscussionEntity } from '@modules/classes'
import { documentOutline, downloadOutline, imageOutline, linkOutline, playCircleOutline } from 'ionicons/icons'
import { useDownload } from '@app/composable/meta/media'
import { isWeb } from '@utils/constants'

export default defineComponent({
	name: 'ClassDiscussionCard',
	props: {
		discussion: {
			type: DiscussionEntity,
			required: true
		}
	},
	setup (props) {
		const {
			content, loading, openFile, downloadWeb, download: downloadApp
		} = useDownload(props.discussion.media?.name ?? '', props.discussion.media?.link ?? '', 'discussions')
		const download = isWeb ? downloadWeb : downloadApp
		return {
			imageOutline, playCircleOutline, documentOutline, downloadOutline, linkOutline,
			loading, download, openFile, content
		}
	}
})
</script>
