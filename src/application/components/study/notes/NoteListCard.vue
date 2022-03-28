<template>
	<component :is="content ? 'router-link' : 'span'" :to="`/study/notes/${note.id}`"
		class="w-full bg-white rounded-xl flex flex-col justify-between box-border card-padding text-main_dark">
		<div class="w-full justify-between items-center flex gap-2">
			<ion-text class="font-500 truncate w-full">{{ note.title }}</ion-text>
			<IonSpinner v-if="loading" color="primary" />
			<IonIcon v-else-if="!content" :icon="downloadOutline" class="text-primary text-xl" @click="download" />
		</div>

		<div class="w-full flex items-center justify-between gap-2 text-sub">
			<Tag :index="2" tag="Note">
				<template v-slot="slotProps">
					<span class="flex items-center">
						<ion-icon :icon="documentOutline" class="text-base mr-1" />
						<ion-text class="text-sub">{{ slotProps.tag }}</ion-text>
					</span>
				</template>
			</Tag>
			<div class="flex items-center text-gray gap-3">
				<template v-if="edit && note.userId === id">
					<span class="text-primary font-bold" @click.prevent="openNoteEditModal(note, $router)">Edit</span>
					<span class="text-red font-bold" @click.prevent="deleteNote">Delete</span>
				</template>
				<template v-else>
					<Avatar :id="note.userId" :name="note.userBio.fullName" :size="24" :src="note.userBio.photo" />
					<Share :link="note.shareLink" :text="note.description" :title="note.title" cssClass="text-xl" />
					<SaveToSet :entity="note" />
				</template>
			</div>
		</div>
		<PageLoading v-if="deleteLoading" />
	</component>
</template>

<script lang="ts">
import { documentOutline, downloadOutline, ellipsisVerticalOutline } from 'ionicons/icons'
import { defineComponent } from 'vue'
import { NoteEntity } from '@modules/study'
import { IonSpinner } from '@ionic/vue'
import { useDownload } from '@app/composable/meta/media'
import SaveToSet from '@app/components/study/sets/SaveToSet.vue'
import { openNoteEditModal, useDeleteNote } from '@app/composable/study/notes'
import { useAuth } from '@app/composable/auth/auth'

export default defineComponent({
	name: 'NoteListCard',
	props: {
		note: {
			type: NoteEntity,
			required: true
		},
		edit: {
			type: Boolean,
			required: false,
			default: false
		}
	},
	components: { IonSpinner, SaveToSet },
	setup (props) {
		const { id } = useAuth()
		const {
			loading,
			content,
			error,
			download,
			deleteFromDownloads
		} = useDownload(props.note.fileName, props.note.fileLink, 'notes')
		const { deleteNote, loading: deleteLoading } = useDeleteNote(props.note.id)

		return {
			ellipsisVerticalOutline,
			documentOutline,
			downloadOutline,
			download,
			loading,
			content,
			error,
			deleteFromDownloads,
			id, deleteNote, deleteLoading, openNoteEditModal
		}
	}
})
</script>
