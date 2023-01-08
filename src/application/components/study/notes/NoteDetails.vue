<template>
	<div class="flex flex-col">
		<IonText class="border-bottom-line py-6 px-4 font-bold lg:px-0">{{ note.title }}</IonText>

		<IonText class="flex-1 border-bottom-line py-6 px-4 lg:px-0">{{ note.content }}</IonText>

		<div class="flex items-center justify-center p-4 gap-12 text-xl text-secondaryText">
			<Share :link="note.shareLink" :title="note.title" text="Share this note" />
			<SaveToSet :entity="note" />
			<template v-if="note.user.id === id">
				<IonIcon :icon="createOutline" class="text-primaryBg" @click="openNoteEditModal(note, $router)" />
				<SpinLoading v-if="loading" />
				<IonIcon v-else :icon="trashBinOutline" class="text-danger" @click="deleteNote" />
			</template>
			<Avatar v-else :id="note.user.id" :name="note.user.bio.fullName" :size="28" :src="note.user.bio.photo" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { NoteEntity } from '@modules/study'
import { createOutline, trashBinOutline } from 'ionicons/icons'
import { useAuth } from '@app/composable/auth/auth'
import SaveToSet from '@app/components/study/sets/SaveToSet.vue'
import { openNoteEditModal, useDeleteNote } from '@app/composable/study/notes'

const props = defineProps({
	note: {
		type: Object as PropType<NoteEntity>,
		required: true
	}
})

const { id } = useAuth()
const { deleteNote, loading } = useDeleteNote(props.note.id as string)
</script>
