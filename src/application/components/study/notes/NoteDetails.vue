<template>
	<div>
		<Note v-if="content" :link="content" />
		<IonSkeletonText v-else-if="loading" animated class="h-36 rounded-xl" />
		<div v-else class="flex flex-col gap-2 items-center">
			<p>The note needs to be downloaded before it can be viewed</p>
			<IonButton class="btn-primary" size="small" @click="download">Download</IonButton>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref } from 'vue'
import { NoteEntity } from '@modules/study'
import { Directory, Encoding, Filesystem } from '@capacitor/filesystem'
import Note from '@app/components/core/media/Note.vue'
import { blobToBase64 } from '@utils/commons'
import { IonSkeletonText } from '@ionic/vue'

export default defineComponent({
	name: 'NoteDetails',
	props: {
		note: {
			type: Object as PropType<NoteEntity>,
			required: true
		}
	},
	components: { Note, IonSkeletonText },
	setup (props) {
		const loading = ref(false)
		const content = ref('')
		const options = {
			path: `notes/${props.note.fileName}`,
			directory: Directory.Documents
		}

		const download = async () => {
			loading.value = true
			const data = await fetch(props.note.fileLink).then(async (r) => blobToBase64(await r.blob()))
			await Filesystem.writeFile({
				...options, recursive: true, data, encoding: Encoding.UTF8
			}).catch(() => null)
			const contents = await Filesystem.readFile({ ...options, encoding: Encoding.UTF8 })
			content.value = contents.data
			loading.value = false
		}

		const deleteFromDownloads = async () => {
			loading.value = true
			await Filesystem.deleteFile(options).catch(() => null)
			content.value = ''
			loading.value = false
		}

		onMounted(async () => {
			loading.value = true
			const contents = await Filesystem.readFile({ ...options, encoding: Encoding.UTF8 }).catch(() => null)
			loading.value = false
			if (!contents) return
			content.value = contents.data
		})

		return { loading, content, download, deleteFromDownloads }
	}
})
</script>
