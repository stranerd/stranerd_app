<template>
	<div>
		<Note v-if="content" :link="content" />
		<BlockLoading v-else-if="loading" />
		<div v-else class="flex flex-col gap-2 items-center">
			<p>The note needs to be downloaded before it can be viewed</p>
			<IonButton class="btn-primary" size="small" @click="download">Download</IonButton>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { NoteEntity } from '@modules/study'
import Note from '@app/components/core/media/Note.vue'
import { useDownload } from '@app/composable/meta/media'

export default defineComponent({
	name: 'NoteDetails',
	props: {
		note: {
			type: Object as PropType<NoteEntity>,
			required: true
		}
	},
	components: { Note },
	setup (props) {
		const {
			loading,
			content,
			error,
			download,
			deleteFromDownloads
		} = useDownload(props.note.fileName, props.note.fileLink, 'notes')
		return { loading, content, error, download, deleteFromDownloads }
	}
})
</script>
