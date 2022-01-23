<template>
	<div
		class="flex flex-col lg:flex-row items-center justify-between gap-4 bg-white rounded-xl font-bold lg:text-base text-xs text-main_dark py-4 px-6">
		<div class="w-full flex items-center gap-2">
			<img :src="note.preview.link" class="bg-faded_gray h-[5.375rem] w-[4.5rem] rounded-md object-cover" />
			<ion-text>{{ note.title }}</ion-text>
		</div>
		<div class="w-full font-bold text-right cursor-pointer">
			<router-link :to="`/study/notes/${note.id}`" class="text-primary mr-4">View</router-link>
			<a class="text-orange mr-4" @click.prevent="openNoteEditModal(note, $router)">Edit</a>
			<a class="text-delete_red" @click.prevent="deleteNote">Delete</a>
		</div>
		<DisplayError :error="error" />
		<PageLoading v-if="loading" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NoteEntity } from '@modules/study'
import { openNoteEditModal, useDeleteNote } from '@app/composable/study/notes'

export default defineComponent({
	name: 'AdminNoteListCard',
	props: {
		note: {
			type: NoteEntity,
			required: true
		}
	},
	setup (props) {
		const { loading, error, deleteNote } = useDeleteNote(props.note.id)
		return { loading, error, deleteNote, openNoteEditModal }
	}
})
</script>
