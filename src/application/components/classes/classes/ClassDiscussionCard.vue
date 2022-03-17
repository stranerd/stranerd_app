<template>
	<div v-if="discussion.isMedia" class="bg-white flex items-center card-padding rounded-xl">
		<IonIcon
			:icon="discussion.isImage ? imageOutline : discussion.isVideo ? playCircleOutline : documentOutline"
			class="text-4xl text-gray" />
		<div class="flex flex-col mr-auto">
			<IonText class="font-semibold text-main_dark">{{ discussion.media.name }}</IonText>
			<span class="text-sub">{{ discussion.size }}</span>
		</div>
		<IonSpinner v-if="loading" class="text-2xl" color="primary" />
		<IonIcon v-else :icon="downloadOutline" class="text-2xl" color="primary" @click="download" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { DiscussionEntity } from '@modules/classes'
import { documentOutline, downloadOutline, imageOutline, playCircleOutline } from 'ionicons/icons'
import { useDownloadableLink } from '@app/composable/meta/media'
import { IonSpinner } from '@ionic/vue'

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
		const { loading, download } = useDownloadableLink(props.discussion.media!)
		return {
			imageOutline, playCircleOutline, documentOutline, downloadOutline,
			loading, download
		}
	}
})
</script>
