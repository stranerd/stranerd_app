<template>
	<div v-if="discussion.isMedia" class="bg-white flex items-center card-padding rounded-xl" @click="openFile">
		<IonIcon
			:icon="discussion.isImage ? imageOutline : discussion.isVideo ? playCircleOutline : documentOutline"
			class="text-4xl text-gray" />
		<div class="flex flex-col mr-auto">
			<IonText class="font-semibold text-main_dark">{{ discussion.media.name }}</IonText>
			<span class="text-sub">{{ discussion.size }}</span>
		</div>
		<IonSpinner v-if="loading" class="text-2xl" color="primary" />
		<IonIcon v-else-if="!content" :icon="downloadOutline" class="text-2xl" color="primary" @click="download" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { DiscussionEntity } from '@modules/classes'
import { documentOutline, downloadOutline, imageOutline, playCircleOutline } from 'ionicons/icons'
import { useDownload } from '@app/composable/meta/media'
import { IonSpinner } from '@ionic/vue'
import { isWeb } from '@utils/constants'

export default defineComponent({
	name: 'ClassDiscussionCard',
	components: { IonSpinner },
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
			imageOutline, playCircleOutline, documentOutline, downloadOutline,
			loading, download, openFile, content
		}
	}
})
</script>
