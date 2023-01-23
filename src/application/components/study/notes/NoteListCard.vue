<template>
	<router-link :to="`/study/notes/${note.id}`"
		class="flex flex-col justify-between card-sm card-padding">
		<div class="flex gap-4 items-center">
			<IonText class="font-500 truncate w-full">{{ note.title }}</IonText>
			<IonIcon :icon="arrowForwardOutline" />
		</div>
		<div class="w-full flex items-center justify-between gap-2 text-sm">
			<Tag tag="Note">
				<template v-slot="slotProps">
					<span class="flex items-center">
						<IonIcon :icon="documentOutline" class="text-base mr-1" />
						<IonText class="text-sm">{{ slotProps.tag }}</IonText>
					</span>
				</template>
			</Tag>
			<div class="flex items-center gap-3">
				<Avatar v-if="note.user.id !== id" :id="note.user.id" :name="note.user.bio.fullName"
					:size="24"
					:src="note.user.bio.photo" />
				<Share :link="note.shareLink" :text="note.content" :title="note.title" />
				<SaveToSet :entity="note" />
				<SpinLoading v-if="loading" />
				<IonIcon v-if="note.user.id === id" :icon="settingsOutline" @click.prevent="showMenu" />
			</div>
		</div>
	</router-link>
</template>

<script lang="ts" setup>
import {
	arrowForwardOutline,
	closeOutline,
	documentOutline,
	pencilOutline,
	settingsOutline,
	trashBinOutline
} from 'ionicons/icons'
import { NoteEntity } from '@modules/study'
import SaveToSet from '@app/components/study/sets/SaveToSet.vue'
import { useAuth } from '@app/composable/auth/auth'
import { openNoteEditModal, useDeleteNote } from '@app/composable/study/notes'
import { useRouter } from 'vue-router'
import { actionSheetController } from '@ionic/vue'

const props = defineProps({
	note: {
		type: NoteEntity,
		required: true
	},
	edit: {
		type: Boolean,
		required: false,
		default: false
	}
})

const { id } = useAuth()
const { deleteNote, loading } = useDeleteNote(props.note.id)
const router = useRouter()
const showMenu = async () => {
	const actionSheet = await actionSheetController.create({
		buttons: [
			{
				text: 'Edit note', icon: pencilOutline,
				handler: () => openNoteEditModal(props.note, router)
			},
			{ text: 'Delete note', role: 'destructive', icon: trashBinOutline, handler: deleteNote },
			{ text: 'Cancel', icon: closeOutline, role: 'cancel' }
		]
	})
	await actionSheet.present()
}
</script>
