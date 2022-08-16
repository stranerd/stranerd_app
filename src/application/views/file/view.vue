<template>
	<DefaultLayout :hideBottom="true">
		<div v-if="openMedia"
			class="h-full flex-grow overflow-y-auto flex flex-col justify-center items-center text-center p-4 gap-2">
			<img v-if="isImage(openMedia.media).valid" :src="content || openMedia.media.link" alt="" class="w-full">
			<video v-else-if="isVideo(openMedia.media).valid" :src="content || openMedia.media.link" class="w-full"
				controls />
			<span v-else class="text-5xl leading-none">
				<IonIcon :icon="documentOutline" />
			</span>
			<IonText class="text-lg font-semibold">{{ openMedia.media.name }}</IonText>
			<IonText class="text-secondaryText">{{ formatFileSize(openMedia.media.size) }}</IonText>
			<SpinLoading v-if="loading" />
			<template v-else-if="content">
				<IonButton class="btn-primary" @click="openFile">Open</IonButton>
				<IonButton class="btn-primary primary-danger" @click="deleteFromDownloads">Delete</IonButton>
			</template>
			<IonButton v-else class="btn-primary" @click="download">Download</IonButton>
		</div>
	</DefaultLayout>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { documentOutline } from 'ionicons/icons'
import { generateMiddlewares } from '@app/middlewares'
import { useRouteMeta } from '@app/composable/core/states'
import { closeMediaFullScreen, openMedia, useDownload } from '@app/composable/meta/media'
import { isWeb } from '@utils/constants'
import { isImage, isVideo } from '@stranerd/validate'
import { formatFileSize } from '@utils/commons'

export default defineComponent({
	name: 'FileView',
	beforeRouteEnter: generateMiddlewares([async ({ from }) => {
		if (!openMedia.value) return from?.fullPath ?? '/dashboard'
	}]),
	beforeRouteLeave: () => closeMediaFullScreen(),
	setup () {
		useRouteMeta(computed(() => openMedia.value?.media.name ?? 'File'), { back: true })
		const {
			content, loading, openFile, downloadWeb, download: downloadApp, deleteFromDownloads
		} = useDownload(openMedia.value!.media, openMedia.value!.path)
		const download = isWeb ? downloadWeb : downloadApp
		return {
			openMedia, documentOutline, formatFileSize, isImage, isVideo,
			content, loading, openFile, download, deleteFromDownloads
		}
	}
})
</script>

<style lang="scss" scoped>
ion-button::part(native) {
	min-width: 100px;
}
</style>
